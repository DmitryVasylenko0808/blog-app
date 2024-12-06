import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleDto } from '../dto/create.article.dto';
import { EditArticleDto } from '../dto/edit.article.dto';

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

  @Get(':id/related')
  async getRelated(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.getRelated(id);
  }

  @Get('search/by/title')
  async search(@Query('title') title: string, @Query('page', ParseIntPipe) page: number) {
    return await this.articlesService.search(title, page);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req: any, @Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(req.user.userId, createArticleDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editArticleDto: EditArticleDto,
  ) {
    return await this.articlesService.edit(id, editArticleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.delete(id);
  }
}
