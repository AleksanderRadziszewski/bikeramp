import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stats-month')
export class StatsMonth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column()
  total_distance: number;

  @Column()
  avg_ride: number;

  @Column()
  avg_price: number;
}
