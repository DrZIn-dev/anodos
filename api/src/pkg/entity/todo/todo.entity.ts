import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'boolean' })
  done: boolean;

  @Index()
  @Column({ type: 'text', name: 'user_id' })
  userId: string;
}
