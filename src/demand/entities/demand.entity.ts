import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Demand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPlan: number;

  @Column({
    type: 'date',
  })
  periodStart: string;

  @Column({
    type: 'date',
  })
  periodEnd: string;

  @Column()
  status: 'planning' | 'in_progress' | 'completed';

  @Column()
  description?: string;
}
