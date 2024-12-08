import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto } from '../dto/create.article.dto';
import { EditArticleDto } from '../dto/edit.article.dto';
import { ArticlesService } from './articles.service';

@Injectable()
export class ArticlesManagementService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly articlesService: ArticlesService,
  ) {}

  async create(authorId: number, dto: CreateArticleDto, filename?: string) {
    const createdArticle = await this.prismaService.article.create({
      data: {
        ...dto,
        imageUrl: filename,
        authorId,
        categoryId: Number(dto.categoryId),
      },
    });

    return createdArticle;
  }

  async edit(id: number, dto: EditArticleDto, filename?: string) {
    await this.articlesService.getOneOrThrow(id);

    const editedArticle = await this.prismaService.article.update({
      where: {
        id,
      },
      data: {
        ...dto,
        categoryId: Number(dto.categoryId),
        imageUrl: filename,
      },
    });

    if (!editedArticle) {
      throw new NotFoundException('Article is not found');
    }

    return editedArticle;
  }

  async delete(id: number) {
    await this.articlesService.getOneOrThrow(id);

    const deletedArticle = await this.prismaService.article.delete({
      where: {
        id,
      },
    });

    if (!deletedArticle) {
      throw new NotFoundException('Article is not found');
    }

    return deletedArticle;
  }
}
