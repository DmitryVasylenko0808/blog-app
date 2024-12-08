import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { PrismaService } from 'src/prisma.service';
import { ArticlesService } from './services/articles.service';
import { ArticlesStatsService } from './services/articles.stats.service';
import { ArticlesManagementService } from './services/articles.management.service';
import { ArticlesController } from './controllers/articles.controller';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';

@Module({
  providers: [
    PrismaService,
    CategoriesService,
    ArticlesService,
    ArticlesStatsService,
    ArticlesManagementService,
    CommentsService,
  ],
  controllers: [CategoriesController, ArticlesController, CommentsController],
  exports: [ArticlesService, ArticlesStatsService],
})
export class ArticlesModule {}
