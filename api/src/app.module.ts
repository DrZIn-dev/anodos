import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot(), TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
