import { Events } from 'src/modules/events/entities/event.entity';
import { PlayerEnumType } from 'src/enums';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { Challenges } from '../../challenges/entities/challenge.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_players')
export class Players {
  @PrimaryGeneratedColumn('uuid')
  @Index('id_player_index', { unique: true })
  id?: string;

  @Column({ nullable: true })
  cellphone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  ranking: string;

  @Column()
  rankingPosition: number;

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
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at?: Date;

  @Column({ type: 'timestamp', default: null })
  deleted_at?: Date;

  @ManyToMany(() => Categories, (categories) => categories.players)
  categories: Array<Categories>;

  @ManyToMany(() => Events, (events) => events.players)
  events: Array<Events>;

  @OneToMany(() => Challenges, (challenge) => challenge.requester)
  @JoinColumn({ name: 'requesterId' })
  challenger: Array<Challenges>;

  @ManyToOne(() => Challenges, (challenge) => challenge.challenged)
  @JoinColumn({ name: 'challengedId' })
  challengers: Challenges;
}
