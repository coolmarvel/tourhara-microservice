import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';

@Controller({ path: 'product/attribute', version: VERSION_NEUTRAL })
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
}
