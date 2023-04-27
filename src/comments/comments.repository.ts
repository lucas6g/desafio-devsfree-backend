import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(message: string): Promise<Comment> {
    return await this.prisma.comment.create({ data: { message } });
  }

  async findAll(): Promise<Comment[]> {
    return await this.prisma.comment.findMany();
  }

  async update(id: string, message: string) {
    return await this.prisma.comment.update({
      where: { id },
      data: { message },
    });
  }

  async delete(id: string) {
    return await this.prisma.comment.delete({ where: { id } });
  }
}
