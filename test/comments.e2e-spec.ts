import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CommentsModule } from '../src/comments/comments.module';
import { CommentsService } from '../src/comments/comments.service';
import { INestApplication } from '@nestjs/common';
import { PrismaModule } from '../src/database/prisma.module';
import { CommentsRepository } from '../src/comments/comments.repository';
import { PrismaService } from '../src/database/prisma.service';

describe('Commnets Routes', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommentsModule, PrismaModule],
      providers: [CommentsService, CommentsRepository],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await prismaService.comment.deleteMany();
  });

  it(`should return 201 when POST on /commnets `, async () => {
    const response = await request(app.getHttpServer()).post('/comments').send({
      message: 'Seu Post Foi Maneiro',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Seu Post Foi Maneiro');
  });
  it(`should return 200 when GET on /commnets `, async () => {
    await prismaService.comment.create({
      data: { message: 'Seu Post Foi Maneiro' },
    });

    const response = await request(app.getHttpServer()).get('/comments');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });
  it(`should return 200 when PATCH on /comments `, async () => {
    const createdComment = await prismaService.comment.create({
      data: { message: 'Seu Post Foi Maneiro' },
    });

    const response = await request(app.getHttpServer())
      .patch(`/comments/${createdComment.id}`)
      .send({ message: 'Atualizando o Comentario' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Atualizando o Comentario');
  });
  it(`should return 204 when DELETE on /comments `, async () => {
    const createdComment = await prismaService.comment.create({
      data: { message: 'Seu Post Foi Maneiro' },
    });

    const response = await request(app.getHttpServer())
      .delete(`/comments/${createdComment.id}`)
      .send({ message: 'Atualizando o Comentario' });

    expect(response.statusCode).toBe(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
