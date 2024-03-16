import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma, Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from './dto/user-signup.dto';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({
            where: {
                email: username,
            }
        });
    }

    async signUp(data: SignUpUserDto): Promise<any> {
            const user = await this.findOne(data.email);
            if (user) {
                throw new BadRequestException("User already exists");
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(data.password, salt);
            return this.prisma.user.create({
                data: {
                    email: data.email,
                    name: data.username,
                    hash,
                }
            })
    }
}
