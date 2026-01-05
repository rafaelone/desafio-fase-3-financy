import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, MinLength, IsIn } from 'class-validator';

const VALID_COLORS = ['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'brand'];

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @MinLength(3, { message: 'Título deve ter no mínimo 3 caracteres' })
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Ícone é obrigatório' })
  icon!: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Cor é obrigatória' })
  @IsIn(VALID_COLORS, { message: 'Cor inválida. Use: blue, purple, pink, red, orange, yellow, green ou brand' })
  color!: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  @MinLength(3, { message: 'Título deve ter no mínimo 3 caracteres' })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  icon?: string;

  @Field(() => String, { nullable: true })
  @IsIn(VALID_COLORS, { message: 'Cor inválida. Use: blue, purple, pink, red, orange, yellow, green ou brand' })
  color?: string;
}
