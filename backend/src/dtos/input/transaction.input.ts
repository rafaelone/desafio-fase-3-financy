import { Field, Float, InputType } from 'type-graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => Float)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}
