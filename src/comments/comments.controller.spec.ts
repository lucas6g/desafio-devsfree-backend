import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';

import { PrismaService } from '../database/prisma.service';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService, CommentsRepository, PrismaService],
    }).compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(commentsController).toBeDefined();
    expect(commentsService).toBeDefined();
  });
  it('should create a comment', async () => {
    const comment = {
      id: 'b8001add-cd32-4468-9c02-b32bd0c54326',
      message: 'Seu post é legal',
      created_at: new Date('2023-04-25T05:14:54.322Z'),
      updated_at: new Date('2023-04-25T05:14:54.322Z'),
    };
    jest
      .spyOn(commentsService, 'create')
      .mockImplementationOnce(async () => await Promise.resolve(comment));

    const response = await commentsController.create({
      message: 'Seu post é legal',
    });

    expect(response.message).toBe(comment.message);
  });
  it('should return a list of comments', async () => {
    const comments = [
      {
        id: 'b8001add-cd32-4468-9c02-b32bd0c54326',
        message: 'Seu post é legal',
        created_at: new Date('2023-04-25T05:14:54.322Z'),
        updated_at: new Date('2023-04-25T05:14:54.322Z'),
      },
    ];

    jest
      .spyOn(commentsService, 'list')
      .mockImplementationOnce(async () => await Promise.resolve(comments));

    expect(await commentsController.findAll()).toBe(comments);
  });
  it('should update a comment', async () => {
    const comment = {
      id: 'b8001add-cd32-4468-9c02-b32bd0c54326',
      message: 'Novo Comentario',
      created_at: new Date('2023-04-25T05:14:54.322Z'),
      updated_at: new Date('2023-04-25T05:14:54.322Z'),
    };

    const commentServiceUpdateMethodSpy = jest
      .spyOn(commentsService, 'update')
      .mockImplementationOnce(async () => await Promise.resolve(comment));

    const updatedComment = await commentsController.update(comment.id, {
      message: 'Novo Comentario',
    });

    expect(updatedComment.message).toBe('Novo Comentario');
    expect(commentServiceUpdateMethodSpy).toHaveBeenCalledWith(comment.id, {
      message: 'Novo Comentario',
    });
  });
  it('should delete a comment', async () => {
    const comment = {
      id: 'b8001add-cd32-4468-9c02-b32bd0c54326',
      message: 'Adorei seu Post',
      created_at: new Date('2023-04-25T05:14:54.322Z'),
      updated_at: new Date('2023-04-25T05:14:54.322Z'),
    };

    const commentServiceDeleteMethodSpy = jest
      .spyOn(commentsService, 'remove')
      .mockImplementationOnce(async () => await Promise.resolve(comment));

    const deletedComment = await commentsController.remove(comment.id);

    expect(deletedComment.id).toBe(comment.id);
    expect(commentServiceDeleteMethodSpy).toHaveBeenCalledWith(comment.id);
  });
});
