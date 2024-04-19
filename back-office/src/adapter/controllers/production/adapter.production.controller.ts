import { Controller } from '@nestjs/common';
import { AdapterProductionService } from '../../services/production/adapter.production.service';

@Controller()
export class AdapterProductionController {
  constructor(private readonly adapterService: AdapterProductionService) {}
}
