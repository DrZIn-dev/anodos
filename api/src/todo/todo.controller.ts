import { Controller, UseGuards } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators/http';
import { UserId } from 'src/pkg/decorator/user-id.decorator';
import { AuthGuard } from 'src/pkg/guard/auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  createTodo(@UserId() userId: string, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(userId, createTodoDto);
  }
}
