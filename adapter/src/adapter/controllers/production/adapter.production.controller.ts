import { Controller } from '@nestjs/common';
import { AdapterProductionService } from 'src/adapter/services/production/adapter.production.service';

@Controller()
export class AdapterProductionController {
  constructor(private readonly service: AdapterProductionService) {}
}
