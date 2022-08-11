import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trip_post')
export class TripPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_address: string;

  @Column()
  destination_address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ default: 0, type: 'float' })
  price: number;

  @Column({ default: 0, type: 'float' })
  distance: number;

  @Column({ default: 0, type: 'float' })
  duration: number;
}
