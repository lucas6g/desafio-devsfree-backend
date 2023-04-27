import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { PrismaService } from '../database/prisma.service';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let commentsRepository: CommentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, CommentsRepository, PrismaService],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get<CommentsRepository>(CommentsRepository);
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
    expect(commentsRepository).toBeDefined();
  });
  it('should create a comment', async () => {
    const message = 'Gostei Muito do seu Post';
    const comment = {
      id: 'b8001add-cd32-4468-9c02-b32bd0c54326',
      message,
      created_at: new Date('2023-04-25T05:14:54.322Z'),
      updated_at: new Date('2023-04-25T05:14:54.322Z'),
    };

    const commentsRepositoryCreateMethodSpy = jest
      .spyOn(commentsRepository, 'create')
      .mockImplementationOnce(async () => await Promise.resolve(comment));

    const createdComment = await commentsService.create({ message });

    expect(createdComment.message).toBe(message);
    expect(commentsRepositoryCreateMethodSpy).toHaveBeenCalledWith(message);
    expect(commentsRepositoryCreateMethodSpy).toHaveBeenCalled();
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
      .spyOn(commentsRepository, 'findAll')
      .mockImplementationOnce(async () => await Promise.resolve(comments));

    expect(await commentsService.list()).toBe(comments);
  });
  it('should update a comment', async () => {
    const comment = {
      id: 'b8001add-cd32-4468-9c02-b32bd0c54326',
      message: 'Novo Comentario',
      created_at: new Date('2023-04-25T05:14:54.322Z'),
      updated_at: new Date('2023-04-25T05:14:54.322Z'),
    };

    const commentsRepositoryUpdateMethodSpy = jest
      .spyOn(commentsRepository, 'update')
      .mockImplementationOnce(async () => await Promise.resolve(comment));

    const updatedComment = await commentsService.update(comment.id, {
      message: 'Novo Comentario',
    });

    expect(updatedComment.message).toBe('Novo Comentario');
    expect(commentsRepositoryUpdateMethodSpy).toHaveBeenCalledWith(
      comment.id,
      'Novo Comentario',
    );
  });
  it('should delete a comment', async () => {
    const comment = {
      id: 'b8001add-cd32-4468-9c02-b32bd0c54326',
      message: 'Adorei seu Post',
      created_at: new Date('2023-04-25T05:14:54.322Z'),
      updated_at: new Date('2023-04-25T05:14:54.322Z'),
    };

    const commentsRepositoryDeleteMethodSpy = jest
      .spyOn(commentsRepository, 'delete')
      .mockImplementationOnce(async () => await Promise.resolve(comment));

    const deletedComment = await commentsService.remove(comment.id);

    expect(deletedComment.id).toBe(comment.id);
    expect(commentsRepositoryDeleteMethodSpy).toHaveBeenCalledWith(comment.id);
  });
});
