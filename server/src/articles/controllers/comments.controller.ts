import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';

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
}
