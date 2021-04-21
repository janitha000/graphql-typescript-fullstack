import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import "reflect-metadata";
import mongoose from 'mongoose'
// import { typeDefs } from './schema'
// import { resolvers } from './resolvers'
import { HelloResolver } from './resolvers/hello';
import { buildSchema } from 'type-graphql';
import { PersonResolver } from './resolvers/person';
import { UserResolver } from './resolvers/user';


const main = async () => {
    const auth: String = "Auth"
    const app = express();

    app.get('/', (_, res) => {
        res.send("Server is working")
    })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PersonResolver, UserResolver],
        }),
        context: () => ({ auth })
    })

    // const apolloServer = new ApolloServer({
    //     typeDefs,
    //     resolvers,
    //     playground: { endpoint: '/graphql' }

    // })

    apolloServer.applyMiddleware({ app });

    mongoose.connect("mongodb+srv://admin:admin@cluster0.pdksp.mongodb.net/graphql-db?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            app.listen(4000, () => {
                console.log("Server is running on port 4000")
            })
        })
}


main();