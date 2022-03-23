import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'text', name: 'user_id' })
  userId: string;
}
