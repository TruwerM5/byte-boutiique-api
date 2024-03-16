import { Controller, Get, Param, Body, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Product } from '@prisma/client';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get(":category")
    async getByCategory(@Param() params): Promise<any> {
        return this.productsService.getByCategory(params.category);
    }

    @Post('create')
    @UseInterceptors(FilesInterceptor('files', 3, {
        storage: diskStorage({
            destination: join(process.cwd(), 'public', 'images'),
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    }))
    async createProduct(
        @Body() body: CreateProductDto,
        @UploadedFiles() files: Array<Express.Multer.File>): Promise<Product> {
            const images: {url: string; product_id: number}[] = [];
            const product = await this.productsService.createProduct({
                name: body.name,
                price: Number(body.price),
                brand: body.brand,
                category: body.category,
                discount: Number(body.discount),
                details: body.details,
            });
            console.log("Id: ", product.id);
            for(const file of files) {
                images.push({url: file.originalname, product_id: product.id});
            }

            await this.productsService.addImagesForProduct(images);

            return product;
        }
}
