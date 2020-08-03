//const { ApolloServer, gql } = require('apollo-server');
const { Prompt, sequelize } = require('./models');

// Lambda Apollo Server, file must be graphql.js
const { ApolloServer, gql } = require('apollo-server-lambda');

const port = process.env.PORT || 4000;

//SCHEMA DEFINITION LANGUAGE (SDL) 
// GraphQl you have to define your schema and that is being done here.
// Defing 2 unique properties TYPEDEFS and RESOLVERS

// TypeDefs - defines types of data avaible in GraphQl
const typeDefs = gql`
        type Prompt { 
            title: String!, 
            id: ID! 
        }
        type Query { 
            prompt: Prompt
        }
`;
// Prompt type
// - obj with 2 keys (title, id)

//Query type
// - prompt, a resolver that will return a Prompt obj


// Resolvers
//  - executes logic based on backend models
//  - provides instructions for returning a GraphQl operations to data   

const resolvers = {
    Query: {      
        prompt: async (_, args) =>{
            const prompt = await Prompt.findOne({
                order: sequelize.random()
            });
            return prompt; //prompt is the result of our resolver
        }
    }
};


//4 FIELD THAT COULD BE USED AS ARGUMENTS   
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





const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
      }),  
 //ADDED FOR PRODUCTION RUN
    introspection: true,
    playground: {
        endpoint: "/dev/graphql"
      }
});



// server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   });

//Lambda Apollo Server
//  This creates an export named graphqlHandler with a Lambda function handler.
// exports.graphqlHandler = server.createHandler({
//     cors: {
//       origin: '*',
//       credentials: true,
//     },
//   });

  
server.listen({port}, () => 
    console.log(`Server running on port ${port}!`)
);