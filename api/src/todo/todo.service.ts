import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/pkg/entity/todo/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoPaginationDto } from './dto/get-todo-pagination.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(userId: string, createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create();
    newTodo.text = createTodoDto.text;
    newTodo.status = false;
    newTodo.userId = userId;

    await this.todoRepository.save(newTodo);
    return newTodo.id;
  }

  async getTodoPagination(userId: string, getTodoDto: GetTodoPaginationDto) {
    const todos = await this.todoRepository.find({
      where: { userId },
      skip: getTodoDto.skip,
      take: getTodoDto.limit,
    });

    return todos;
  }
}
