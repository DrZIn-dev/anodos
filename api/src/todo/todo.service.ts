import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/pkg/entity/todo/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoPaginationDto } from './dto/get-todo-pagination.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(userId: string, createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create();
    newTodo.text = createTodoDto.text;
    newTodo.done = false;
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

  async updateTodoById(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException('todo_not_found');

    if (updateTodoDto?.text) todo.text = updateTodoDto.text;
    if (updateTodoDto?.done) todo.done = updateTodoDto.done;
    await this.todoRepository.save(todo);
    return true;
  }

  async deleteTodoById(id: string) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException('todo_not_found');

    await this.todoRepository.softRemove(todo);
    return true;
  }
}
