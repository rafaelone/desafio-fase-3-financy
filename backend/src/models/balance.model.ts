import { Field, Float, ObjectType } from 'type-graphql';

@ObjectType()
export class BalanceModel {
  @Field(() => Float)
  totalBalance: number;

  @Field(() => Float)
  totalIncome: number;

  @Field(() => Float)
  totalExpense: number;
}
