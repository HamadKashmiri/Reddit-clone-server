import { Post } from "../entities/Post";
import { Resolver, Query, Ctx } from "type-graphql";
import { MyContext } from "../types";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { fork }: MyContext): Promise<Post[]> {
    return fork.find(Post, {});
  }
}
