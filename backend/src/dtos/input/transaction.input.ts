import { Field, Float, InputType } from 'type-graphql';
import { IsIn, IsNotEmpty, IsPositive, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Tipo é obrigatório' })
  @IsIn(['expense', 'income'], { message: 'Tipo deve ser "expense" ou "income"' })
  type!: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @MinLength(3, { message: 'Descrição deve ter no mínimo 3 caracteres' })
  description!: string;

  @Field(() => Date)
  @IsNotEmpty({ message: 'Data é obrigatória' })
  date!: Date;

  @Field(() => Float)
  @IsNotEmpty({ message: 'Valor é obrigatório' })
  @IsPositive({ message: 'Valor deve ser positivo' })
  amount!: number;

  @Field(() => String)
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  @IsUUID('4', { message: 'ID da categoria inválido' })
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  @IsIn(['expense', 'income'], { message: 'Tipo deve ser "expense" ou "income"' })
  type?: string;

  @Field(() => String, { nullable: true })
  @MinLength(3, { message: 'Descrição deve ter no mínimo 3 caracteres' })
  description?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => Float, { nullable: true })
  @IsPositive({ message: 'Valor deve ser positivo' })
  amount?: number;

  @Field(() => String, { nullable: true })
  @IsUUID('4', { message: 'ID da categoria inválido' })
  categoryId?: string;
}
