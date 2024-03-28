import { ApiProperty } from '@nestjs/swagger';

export class WebhookHeaderReqDto {
  @ApiProperty({ required: true })
  'x-wc-webhook-topic': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-source': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-signature': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-id': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-event': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-delivery-id': string;

  @ApiProperty({ required: true })
  'x-readl-ip': string;

  @ApiProperty({ required: true })
  'x-forwarded-server': string;

  @ApiProperty({ required: true })
  'x-forwarded-proto': string;

  @ApiProperty({ required: true })
  'x-forwarded-host': string;

  @ApiProperty({ required: true })
  'x-forwarded-for': string;
}
