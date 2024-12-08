import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticlesStatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTopSummaryViews(limit: number) {
    const summaryViews = await this.prismaService.article.groupBy({
      by: ['authorId'],
      _sum: {
        viewsCount: true,
      },
      orderBy: {
        _sum: {
          viewsCount: 'desc',
        },
      },
      take: limit,
    });
    const formattedByUserId = summaryViews.reduce(
      (res, curr) => ({
        [curr.authorId]: curr._sum.viewsCount,
        ...res,
      }),
      {},
    );
    const usersIds = summaryViews.map((item) => item.authorId);
    const res = { stats: formattedByUserId, usersIds };

    return res;
  }
}
