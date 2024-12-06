import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { PrismaService } from 'src/prisma.service';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './controllers/articles.controller';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';

@Module({
  providers: [PrismaService, CategoriesService, ArticlesService, CommentsService],
  controllers: [CategoriesController, ArticlesController, CommentsController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
