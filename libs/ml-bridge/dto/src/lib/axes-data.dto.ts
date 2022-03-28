import { AxesData } from '@fitly/shared/meta';
import { ApiProperty } from '@nestjs/swagger';

export class AxesDataDTO extends AxesData {
  @ApiProperty({
    type: Number,
    description: 'X Axis data',
  })
  override x!: number;

  @ApiProperty({
    type: Number,
    description: 'Y Axis data',
  })
  override y!: number;

  @ApiProperty({
    type: Number,
    description: 'Z Axis data',
  })
  override z!: number;
}
