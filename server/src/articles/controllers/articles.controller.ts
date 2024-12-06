import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('recently')
  async getRecently(
    @Query('page', ParseIntPipe) page: number,
    @Query('categories_ids') categoriesIds: string,
  ) {
    return await this.articlesService.getRecently(page, categoriesIds);
  }
}
