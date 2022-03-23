import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './pkg/config/database.config';
import { TodoEntity } from './pkg/entity/todo/todo.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: async (dbConfig: ConfigType<typeof databaseConfig>) => {
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          entities: [TodoEntity],
          autoLoadEntities: true,
          synchronize: dbConfig.sync,
          dropSchema: dbConfig.drop,
          logging: dbConfig.logging,
        };
      },
      inject: [databaseConfig.KEY],
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
