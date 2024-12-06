import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ArticlesService } from 'src/articles/services/articles.service';
import { EditUserDto } from './types/edit.user.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async edit(@Param('id', ParseIntPipe) id: number, @Body() editUserDto: EditUserDto) {
    return await this.usersService.edit(id, editUserDto);
  }

  @Get(':id/articles')
  async getUserArticles(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.articlesService.getByUser(id, page);
  }
}
