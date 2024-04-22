import { Injectable } from '@nestjs/common';
import { IAdapterService } from '../../interfaces/adapter.interface';

@Injectable()
export class AdapterStagingService implements IAdapterService {}
