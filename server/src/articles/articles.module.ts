import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { PrismaService } from 'src/prisma.service';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './controllers/articles.controller';

@Module({
  providers: [PrismaService, CategoriesService, ArticlesService],
  controllers: [CategoriesController, ArticlesController],
})
export class ArticlesModule {}
