import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { ArticlesService } from '../services/articles.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly articlesService: ArticlesService,
  ) {}

  @Get()
  async get() {
    return await this.categoriesService.get();
  }

  @Get(':categoryId/articles')
  async getArticlesByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.articlesService.getByCategory(categoryId, page);
  }
}
