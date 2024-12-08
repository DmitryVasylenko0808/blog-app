import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateArticleDto } from '../dto/create.article.dto';
import { EditArticleDto } from '../dto/edit.article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadsStorage } from 'src/multer';
import { CurrentUser } from 'src/auth/decorators';
import { TokenPayload } from 'src/auth/types/token.payload';
import { ArticlesManagementService } from '../services/articles.management.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articleManagementService: ArticlesManagementService,
  ) {}

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
  @UseInterceptors(FileInterceptor('imageFile', { storage: uploadsStorage }))
  async create(
    @CurrentUser() user: TokenPayload,
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'jpeg' }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return await this.articleManagementService.create(
      user.userId,
      createArticleDto,
      file?.filename,
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('imageFile', { storage: uploadsStorage }))
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editArticleDto: EditArticleDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'jpeg' }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return await this.articleManagementService.edit(id, editArticleDto, file?.filename);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.articleManagementService.delete(id);
  }
}
