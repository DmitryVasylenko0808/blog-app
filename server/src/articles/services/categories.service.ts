import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async get() {
    const categories = await this.prismaService.category.findMany();

    return categories;
  }
}
