import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product, Prisma, ProductImage } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async getByCategory(category: string): Promise<any> {
        return this.prisma.product.findMany({
            where: {
                category,
            }
        })
    }
    async createProduct(product: CreateProductDto): Promise<Product> {
        return this.prisma.product.create({
            data: product,
        });
    }

    async addImagesForProduct(data:{url: string; product_id: number;}[]):Promise<any> {
        return this.prisma.productImage.createMany({
            data: data,
        });
    }
}
