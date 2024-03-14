import { Module } from '@nestjs/common';
import { AdapterService } from './services/adapter.service';

@Module({
  providers: [AdapterService],
})
export class AdapterModule {}
