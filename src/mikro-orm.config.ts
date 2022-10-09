import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
  },
  // entities = db tables
  entities: [Post],
  type: "postgresql",
  dbName: "reddit-clone",
  user: "postgres",
  password: "postgres",
  // true when not in production -> logs behind the scenes SQL queries etc
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
