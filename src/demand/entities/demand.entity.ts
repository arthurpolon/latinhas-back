import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Demand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPlan: number;

  @Column({
    type: 'date',
  })
  date: string;

  @Column()
  status: 'planning' | 'in_progress' | 'completed';

  @Column({
    nullable: true,
  })
  description?: string;

  @CreateDateColumn()
  created_at: string;
}
