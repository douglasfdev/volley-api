import { EventEnumType } from 'src/enums';
import { Categories } from 'src/modules/categories/entities/category.entity';
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

@Entity('tb_events')
export class Events {
  @PrimaryGeneratedColumn('uuid')
  @Index('id_events_index', { unique: true })
  id?: string;

  @Column({ type: 'varchar' })
  @Index('name_events_index', { unique: true })
  name: string;

  @Column({ type: 'enum', enum: EventEnumType, default: EventEnumType.OPENNED })
  active: number;

  @Column({ type: 'varchar' })
  operation: string;

  @Column({ type: 'integer' })
  value: number;

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
  updatedAt?: Date;

  @Column({ type: 'timestamp', default: null })
  deletedAt?: Date;

  @ManyToMany(() => Categories, (categorires) => categorires.events)
  @JoinTable()
  categories: Array<Categories>;

  @ManyToMany(() => Players, (players) => players.events)
  @JoinTable()
  players: Array<Players>;
}
