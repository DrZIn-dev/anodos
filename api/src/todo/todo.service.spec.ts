import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoEntity } from 'src/pkg/entity/todo/todo.entity';
import { TodoService } from './todo.service';
import { faker } from '@faker-js/faker';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('todo service', () => {
  let todoService: TodoService;

  // mock repository function
  let create: jest.Mock;
  let save: jest.Mock;
  beforeEach(async () => {
    create = jest.fn();
    save = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            create,
            save,
          },
        },
      ],
    }).compile();

    todoService = await module.get<TodoService>(TodoService);
  });

  describe('Create Todo', () => {
    const createUserId = faker.datatype.uuid();
    const dto: CreateTodoDto = {
      text: faker.lorem.sentence(),
    };

    beforeEach(() => {
      const todo = new TodoEntity();
      todo.id = faker.datatype.uuid();
      create.mockReturnValue(todo);
      save.mockReturnValue(Promise.resolve());
    });

    it('should be defined', () => {
      expect(todoService.createTodo).toBeDefined();
    });

    it('Should Create Todo', async () => {
      const newTodo = await todoService.createTodo(createUserId, dto);

      const { id, done, text, userId } = newTodo;
      expect(typeof id).toBe('string');
      expect(done).toBe(false);
      expect(text).toBe(dto.text);
      expect(userId).toBe(createUserId);
    });

    it('Should Internal Server Error Exception When Save Error', async () => {
      const errorMessage = faker.lorem.sentence();
      save.mockRejectedValue({ message: errorMessage });

      try {
        await todoService.createTodo(createUserId, dto);
      } catch (error) {
        const { message } = error;
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(message).toBe(errorMessage);
      }
    });
  });
});
