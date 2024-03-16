import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { RolesGuard } from './roles.guard';
@Module({
  providers: [UsersService, PrismaService, RolesGuard],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
