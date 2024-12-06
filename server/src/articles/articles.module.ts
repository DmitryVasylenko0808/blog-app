import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, CategoriesService],
  controllers: [CategoriesController],
})
export class ArticlesModule {}
