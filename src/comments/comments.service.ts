import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private commentRepository: CommentsRepository) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.create(createCommentDto.message);
  }

  async list() {
    return await this.commentRepository.findAll();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update(id, updateCommentDto.message);
  }

  async remove(id: string) {
    return await this.commentRepository.delete(id);
  }
}
