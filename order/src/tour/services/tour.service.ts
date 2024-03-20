import { Injectable } from '@nestjs/common';
import { ITourService } from '../interfaces/tour.interface';

@Injectable()
export class TourService implements ITourService {}
