import { Controller } from '@nestjs/common';
import { AdapterStagingService } from '../services/adapter-staging.service';

@Controller()
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}
}
