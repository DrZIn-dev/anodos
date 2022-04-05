import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import faker from '@faker-js/faker';
import { AppModule } from './../src/app.module';
import { TodoEntity } from 'src/pkg/entity/todo/todo.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('Create Todo', () => {
    const mockText = faker.lorem.sentence();
    const mockUser = faker.datatype.uuid();
    it('(POST) /api/todo', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/todo')
        .set('x-user-id', mockUser)
        .send({
          text: mockText,
        } as CreateTodoDto)
        .expect(201);
      const { text, userId, done } = body as TodoEntity;
      expect(text).toBe(mockText);
      expect(userId).toBe(mockUser);
      expect(done).toBeFalsy();
    });
  });
});
