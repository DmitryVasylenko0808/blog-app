import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('featured')
  async getFeatured() {
    return await this.articlesService.getFeatured();
  }

  @Get('popular')
  async getPopular() {
    return await this.articlesService.getPopular();
  }

  @Get('recently')
  async getRecently(
    @Query('page', ParseIntPipe) page: number,
    @Query('categories_ids') categoriesIds: string,
  ) {
    return await this.articlesService.getRecently(page, categoriesIds);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.getOneOrThrow(id);
  }
}
