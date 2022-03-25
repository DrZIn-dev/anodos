import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/pkg/entity/todo/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

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
}
