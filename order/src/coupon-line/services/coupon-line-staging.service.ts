import { Injectable } from '@nestjs/common';
import { ICouponeLineService } from '../interfaces/coupone-line.interface';

@Injectable()
export class CouponeLineStagingService implements ICouponeLineService {}
