const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express()

const authors = [
    {id: 1, name: 'Ken Brook'},
    {id: 2, name: 'Mercy Len'},
    {id: 3, name: 'Orelly Tom'}
]

const books = [
    {id: 1, name: 'Learn js', authorId: 1},
    {id: 2, name: 'Learn py', authorId: 2},
    {id: 3, name: 'Learn graphql', authorId: 1},
    {id: 4, name: 'Learn css', authorId: 3},
    {id: 5, name: 'Learn ht;l', authorId: 1},
    {id: 6, name: 'Learn heto', authorId: 2},
    {id: 7, name: 'Learn chinnese', authorId: 3}
]
const BookType = new GraphQLObjectType({
    name:'Books',
    description: 'book written by author',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name:{ type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
    })

})
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(5000., () => console.log('Server running...'))