import { Injectable } from '@nestjs/common';
import { IAdapterService } from 'src/adapter/interfaces/adapter.interface';

@Injectable()
export class AdapterProductionService implements IAdapterService {}
