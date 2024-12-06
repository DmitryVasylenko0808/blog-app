import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ArticlesService } from 'src/articles/services/articles.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesService,
  ) {}

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getOneOrThrow(id);
  }

  @Get(':id/articles')
  async getUserArticles(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.articlesService.getByUser(id, page);
  }
}
