const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

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

    await mongoose.connect('mongodb://localhost:27017/post_db', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    console.log('MongoDB connected...');

    app.listen(4000, () => 'Server is running on port 4000');
}
startServer();