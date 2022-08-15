import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trip')
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_address: string;

  @Column()
  destination_address: string;

  @Column({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column({ default: 0, type: 'float' })
  price: number;

  @Column({ default: 0, type: 'float' })
  distance: number;

  @Column({ default: 0, type: 'float' })
  duration: number;

  @Column({ default: 0, type: 'float' })
  price_ride: number;
}
