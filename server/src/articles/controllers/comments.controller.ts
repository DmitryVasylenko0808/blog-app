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
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { EditCommentDto } from '../dto/edit.comment.dto';
import { CurrentUser } from 'src/auth/decorators';
import { TokenPayload } from 'src/auth/types/token.payload';

@Controller('articles/:articleId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async get(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('sort') sort: 'asc' | 'desc',
  ) {
    return await this.commentsService.get(articleId, page, sort);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @CurrentUser() user: TokenPayload,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.create(user.userId, articleId, createCommentDto);
  }

  @Patch(':commentId')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() editCommentDto: EditCommentDto,
  ) {
    return await this.commentsService.edit(articleId, commentId, editCommentDto);
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.commentsService.delete(articleId, commentId);
  }

  @Get(':commentId/replies')
  async getReplies(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.commentsService.getReplies(articleId, commentId);
  }

  @Post(':commentId/replies')
  @UseGuards(AuthGuard('jwt'))
  async reply(
    @CurrentUser() user: TokenPayload,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.reply(
      user.userId,
      articleId,
      commentId,
      createCommentDto,
    );
  }
}
