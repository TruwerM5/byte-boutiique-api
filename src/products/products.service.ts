import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product, Prisma, ProductImage, ProductDetail } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async getByCategory(category: string): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: {
                category,
            },
            include: {
                images: true,
            }
        });
        
    }

    async getProductDetails(product_id: number): Promise<ProductDetail> {
        return this.prisma.productDetail.findFirst({
            where: {
                product_id
            }
        });
    }

    async getProduct(id: number): Promise<Product> {
        return this.prisma.product.findFirst({
            where: {
                id,
            }
        })
    }

    async createProduct(product: CreateProductDto): Promise<Product> {
        return this.prisma.product.create({
            data: product,
        });
    }

    async addDetailsForProduct(data:{details: string; product_id: number;}) {
        return this.prisma.productDetail.createMany({
            data,
        });
    }

    async addImagesForProduct(data:{url: string; product_id: number;}[]):Promise<any> {
        return this.prisma.productImage.createMany({
            data: data,
        });
    }
}
