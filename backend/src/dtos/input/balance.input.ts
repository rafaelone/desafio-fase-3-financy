import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class BalanceInput {
  @Field(() => Int, { nullable: true })
  month?: number; // 1-12

  @Field(() => Int, { nullable: true })
  year?: number; // 2024, 2025, etc
}
