"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const hello_1 = require("./resolvers/hello");
const type_graphql_1 = require("type-graphql");
const person_1 = require("./resolvers/person");
const user_1 = require("./resolvers/user");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.get('/', (_, res) => {
        res.send("Server is working");
    });
    const jwtAuth = express_jwt_1.default({ secret: 'janitha000', credentialsRequired: false, algorithms: ['sha1', 'RS256', 'HS256'] });
    app.use(jwtAuth);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, person_1.PersonResolver, user_1.UserResolver],
        }),
        context: ({ req, res }) => {
            const user = req.headers.user ? JSON.parse(req.headers.user)
                : req.user ? req.user : null;
            return { user, req, res };
        }
    });
    apolloServer.applyMiddleware({ app });
    mongoose_1.default.connect("mongodb+srv://admin:admin@cluster0.pdksp.mongodb.net/graphql-db?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });
    });
});
main();
//# sourceMappingURL=index.js.map