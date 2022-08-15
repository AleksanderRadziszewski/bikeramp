import { IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  id?: number;
  @IsNotEmpty()
  start_address: string;
  @IsNotEmpty()
  destination_address: string;
  date?: string;
  price: number;
  distance: number;
  duration: number;
  price_ride: number;
}

export class TripPostDto {
  id?: number;
  @IsNotEmpty()
  start_address: string;
  @IsNotEmpty()
  destination_address: string;
  price: number;
  date?: string;
  distance?: number;
  duration?: number;
  price_ride?: number;
}
