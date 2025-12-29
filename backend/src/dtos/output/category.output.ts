import { Field, Int, ObjectType } from 'type-graphql';
import { CategoryModel } from '../../models/category.model';

@ObjectType()
export class CategoryWithStats extends CategoryModel {
  @Field(() => Int)
  transactionCount!: number;
}

@ObjectType()
export class CategoriesListOutput {
  @Field(() => [CategoryWithStats])
  categories!: CategoryWithStats[];

  @Field(() => Int)
  totalCategories!: number;

  @Field(() => Int)
  totalTransactions!: number;

  @Field(() => CategoryWithStats, { nullable: true })
  mostUsedCategory?: CategoryWithStats;
}
