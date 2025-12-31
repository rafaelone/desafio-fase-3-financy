import { Field, GraphQLISODateTime, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  icon!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => Int)
  transactionCount!: number;

  @Field(() => Number)
  totalAmount!: number;
}
