import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import "reflect-metadata";
import mongoose from 'mongoose'

import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'

// import { typeDefs } from './schema'
// import { resolvers } from './resolvers'
import { HelloResolver } from './resolvers/hello';
import { buildSchema } from 'type-graphql';
import { PersonResolver } from './resolvers/person';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';


declare module 'express-session' {
    export interface SessionData {
        qid: string
    }
}


const main = async () => {
    const auth: String = "Auth"
    const app = express();

    const RedisStore = connectRedis(session)
    const RedisClient = redis.createClient()

    app.get('/', (_, res) => {
        res.send("Server is working")
    })

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({ client: RedisClient, disableTouch: true }),
            secret: 'safdsfsdfasfasdf',
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            },
            resave: false,
            saveUninitialized: false
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PersonResolver, UserResolver],
        }),
        context: ({ req, res }): MyContext => ({ auth, req, res })
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