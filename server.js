const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello world';
        }
    }
}

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send('Hello from express apollo server');
    })

    app.listen(4000, () => 'Server is running on port 4000');
}
startServer();