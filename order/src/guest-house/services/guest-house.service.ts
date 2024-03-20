import { Injectable } from '@nestjs/common';
import { IGuestHouseService } from '../interfaces/guest-house.interface';

@Injectable()
export class GuestHouseService implements IGuestHouseService {}
