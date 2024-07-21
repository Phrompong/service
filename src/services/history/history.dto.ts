import { ApiProperty } from '@nestjs/swagger';

export class HistoryDTO {
  @ApiProperty({ type: 'string', required: true })
  value: string;
}
