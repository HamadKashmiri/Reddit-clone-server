import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

// initialise mikroORM instance
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  // fork is a duplicate so we dont run commands with the 'global' entity manager
  const fork = orm.em.fork();

  // const post = fork.create(Post, { title: "post 1" });
  // await fork.persistAndFlush(post);

  // const posts = await fork.find(Post, {});
  // console.log(posts);
};

main();
