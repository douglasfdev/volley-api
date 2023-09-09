import { Players } from 'src/modules/players/entities/player.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_challenge')
export class Challenges {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'date' })
  challengeDateTime: Date;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: 'date', nullable: true })
  solicitationDateTime?: Date;

  @Column({ type: 'date', nullable: true })
  responseDateTime?: Date;

  @ManyToOne(() => Players, (player) => player.challenger)
  requester: Players;

  @OneToMany(() => Players, (player) => player.challengers)
  challenged: Array<Players>;
}
