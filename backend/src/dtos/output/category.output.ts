import { Field, Int, ObjectType } from 'type-graphql';
import { CategoryModel } from '../../models/category.model';

@ObjectType()
export class CategoriesListOutput {
  @Field(() => [CategoryModel])
  categories!: CategoryModel[];

  @Field(() => Int)
  totalCategories!: number;

  @Field(() => Int)
  totalTransactions!: number;

  @Field(() => CategoryModel, { nullable: true })
  mostUsedCategory?: CategoryModel;
}
