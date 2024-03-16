import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class SignUpUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @MinLength(10)
    password: string;

    roles: string;
}