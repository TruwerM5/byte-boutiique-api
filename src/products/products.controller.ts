import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get(":category")
    async getByCategory(@Param() params): Promise<any> {
        return this.productsService.getByCategory(params.category);
    }
}
