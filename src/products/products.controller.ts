import { Controller, Get, Param, Body, Post, UseInterceptors, UploadedFiles, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Product, ProductDetail } from '@prisma/client';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get("/categories/:category")
    async getByCategory(@Param() params): Promise<Product[]> {
        return this.productsService.getByCategory(params.category);
    }

    @Post('create')
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: diskStorage({
            destination: join(process.cwd(), 'public', 'images'),
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    }))
    async createProduct(
        @Body() body: any,// CreateProductDto,
        @UploadedFiles() files: Array<Express.Multer.File>): Promise<Product> {
            const images: {url: string; product_id: number}[] = [];
            console.log("Body: ", body);
            const json = JSON.parse(body.data);
            const product = await this.productsService.createProduct({
                name: json.name,
                price: Number(json.price),
                brand: json.brand,
                category: json.category,
                discount: Number(json.discount),
            });
            for(const file of files) {
                images.push({url: file.originalname, product_id: product.id});
            }
            images.sort((a,b) => {
                if(a.url > b.url) {
                    return 1;
                }
                if(a.url < b.url) {
                    return -1;
                }
                return 0;
            });
            await this.productsService.addDetailsForProduct({details: json.details, product_id: product.id});
            await this.productsService.addImagesForProduct(images);
            return product;
        }

    @Get('/:id')
    async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProduct(id);
    }


    @Get(':id/details')
    async getProductDetails(@Param('id', ParseIntPipe) id: number): Promise<ProductDetail> {
        return this.productsService.getProductDetails(id);
    }   
}
