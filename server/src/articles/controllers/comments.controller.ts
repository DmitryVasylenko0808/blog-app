import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { AuthGuard } from '@nestjs/passport';

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
    @Request() req: any,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.create(
      req.user.userId,
      articleId,
      createCommentDto,
    );
  }
}
