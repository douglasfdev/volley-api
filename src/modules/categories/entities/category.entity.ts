import { Players } from 'src/modules/players/entities/player.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Events } from '../../events/entities/event.entity';
import { CategoryEnumType } from 'src/enums';

@Entity('tb_category')
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  @Index('id_category_index', { unique: true })
  id?: string;

  @Column()
  @Index('name_category_index', { unique: true })
  category: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: CategoryEnumType,
    default: CategoryEnumType.INACTIVE,
  })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at?: Date;

  @Column({ type: 'timestamp', default: null })
  deleted_at?: Date;

  @ManyToMany(() => Events, (event) => event.categories)
  events: Array<Events>;

  @ManyToMany(() => Players, (player) => player.categories)
  @JoinTable()
  players: Array<Players>;
}
