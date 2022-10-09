require("dotenv").config();

import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  // * initialise mikroORM database connection instance
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const fork = orm.em.fork();

  // * initialise express server for our api
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
    }),
    context: () => ({ fork }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("listening on port 4000...");
  });
};

main();
