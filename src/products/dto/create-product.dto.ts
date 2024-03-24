import { IsNumber, IsNotEmpty, IsJSON } from "class-validator";

export class CreateProductDto {

    // @IsNotEmpty()
    // data: {
        // name: string;
        // price: number;
        // brand: string;
        // category: string;
        // discount: number;
        // details: string;
    // }

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
}   