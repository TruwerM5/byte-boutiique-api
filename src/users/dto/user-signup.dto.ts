import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class SignUpUserDto {
    @ApiProperty({
        example: 'example@gmail.com',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'example name',
        required: true,
    })
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @ApiProperty({
        example: 'password',
        required: true,
    })
    @IsNotEmpty()
    @MinLength(10)
    password: string;

    roles: string;
}