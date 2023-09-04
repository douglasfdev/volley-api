import { Events } from 'src/modules/events/entities/event.entity';
import { PlayerEnumType } from 'src/enums';
import { Categories } from 'src/modules/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_players')
export class Players {
  @PrimaryGeneratedColumn('uuid')
  @Index('id_player_index', { unique: true })
  id?: string;

  @Column({ nullable: true })
  cellphone?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  ranking?: string;

  @Column({ nullable: true })
  rankingPosition?: number;

  @Column({ nullable: true })
  pictureUrlPlayer?: string;

  @Column({
    type: 'enum',
    enum: PlayerEnumType,
    default: PlayerEnumType.ACTIVE,
  })
  status?: number;

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

  @ManyToMany(() => Categories, (categories) => categories.players)
  categories: Array<Categories>;

  @ManyToMany(() => Events, (events) => events.players)
  events: Array<Events>;
}
