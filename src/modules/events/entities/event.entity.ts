import { EventEnumType } from 'src/enums';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { Players } from 'src/modules/players/entities/player.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_events')
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: EventEnumType, default: EventEnumType.OPENNED })
  active: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  deletedAt?: Date;

  @ManyToOne(() => Categories, (categories) => categories.events)
  @JoinTable()
  categories: Categories;

  @ManyToOne(() => Players, (player) => player.categories)
  @JoinTable()
  players: Players;
}
