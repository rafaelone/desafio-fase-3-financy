import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @MinLength(3, { message: 'Nome completo deve ter no mínimo 3 caracteres' })
  fullName!: string;
}
