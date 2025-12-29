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

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
