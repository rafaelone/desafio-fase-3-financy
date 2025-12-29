import { Field, InputType } from 'type-graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @MinLength(3, { message: 'Nome completo deve ter no mínimo 3 caracteres' })
  fullName!: string;
  
  @Field(() => String)
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;
  
  @Field(() => String)
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password!: string;
}


@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;
  
  @Field(() => String)
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password!: string;
}
