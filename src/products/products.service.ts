import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product, Prisma } from '@prisma/client';
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
}
