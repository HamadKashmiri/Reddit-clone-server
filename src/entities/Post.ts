import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class Post {
  [OptionalProps]?: "updatedAt" | "createdAt";

  @PrimaryKey()
  @Field()
  id!: number;

  @Property({ type: "date" })
  @Field(() => String)
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  @Field(() => String)
  updatedAt = new Date();

  @Property({ type: "text" })
  @Field()
  title!: string;
}
