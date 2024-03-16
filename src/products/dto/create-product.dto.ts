import { IsNumber, IsNotEmpty, IsJSON } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    discount: number;

    @IsNotEmpty()
    @IsJSON()
    details: string;
}   