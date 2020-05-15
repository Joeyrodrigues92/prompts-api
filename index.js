const { ApolloServer, gql } = require('apollo-server');
const { Prompt, sequelize } = require('./models');

const port = process.env.PORT || 4000;

//SCHEMA DEFINITION LANGUAGE (SDL) 
// GraphQl you have to define your schema and that is being done here.
// Defing 2 unique properties TYPEDEFS and RESOLVERS

// Define what types of data is avaible in the GraphQL server
const typeDefs = gql
// The first object is defining ea Prompt and making it avaible to be referenced in our query

`
        type Prompt { 
            title: String!, 
            id: ID! 
        }
        type Query { 
            prompt: Prompt
        }
    `;

// Since we defined a Query type that contains Prompt obj
// We can fetch Prompt from our db








//      Resolver Map
//      Executes logic based on backend models
//      Provides instructions for returning a GraphQl operations to data   

const resolvers = {
//  Contains a Query key , and models associated with Query (Prompt) 
//  This query is based on the query above it (line 16)   
    Query: {
//     This prompt matches rompt above it (line 17)           
        prompt: async (_, args) =>{
//    4 FIELD THAT BE USED AS ARGUMENTS   
//       parent: 
//          an obj that contains parent type (Query) dont really need it but nice to have access to resolver map
//     
//       args:
//          handles any arguments  passed into the resolver  

//      context:
//          an object shared by all resolvers in GraohQL operations
//           - GOOD FOR AUTHENTICATION
//           -  USED TO DEFINE WHAT TOKENS ARE AVAIBLE FOR EA REQUEST
//           - OR SHARED SESSION INFO  AVIABLE FOR EA REQUEST
//          -AUTHENTICATION IS STATELESS WE NEED TO USE CONTEXT TO CONTAIN THE PER REQUEST STATE AND ACCESS THAT INFO FROM SOURCE
//          - pretty much text is always avaible for us, just like context in React
//      
//       info: 
//           (not used much), info about  the execution of our operation

// EXAMPLE          prompt: (parent, args, context, info) =>{
            const prompt = await Prompt.findOne({
                order: sequelize.random()
            });
            return prompt;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port}, () => 
    console.log(`Server running on port ${port}!`)
);