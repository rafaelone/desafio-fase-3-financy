import { Field, InputType } from 'type-graphql';
import { IsHexColor, IsNotEmpty, MinLength } from 'class-validator';

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
  @IsHexColor({ message: 'Cor deve ser um código hexadecimal válido (ex: #FF5733)' })
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
  @IsHexColor({ message: 'Cor deve ser um código hexadecimal válido (ex: #FF5733)' })
  color?: string;
}
