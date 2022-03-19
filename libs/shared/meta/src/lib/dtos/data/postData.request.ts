import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from '../../enums';

export class Axis {
  @ApiProperty({
    type: Number,
    description: 'Oś X',
  })
  x!: number;

  @ApiProperty({
    type: Number,
    description: 'Oś Y',
  })
  y!: number;

  @ApiProperty({
    type: Number,
    description: 'Oś Z',
  })
  z!: number;
}

export class SensorExtendedSample {
  @ApiProperty({
    type: Number,
    description: 'Wysokość',
  })
  altitude?: number;

  @ApiProperty({
    type: Number,
    description: 'Ciśnienie',
  })
  pressure?: number;

  @ApiProperty({
    type: Number,
    description: 'Luminancja',
  })
  illuminance?: number;
}

export class SensorBasicSample extends SensorExtendedSample {
  @ApiProperty({
    type: Axis,
    description: 'Przyspieszenie',
  })
  acceleration!: Axis;

  @ApiProperty({
    type: Axis,
    description: 'Prędkość kątowa',
  })
  angularVelocity!: Axis;

  @ApiProperty({
    type: Axis,
    description: 'Pole magnetyczne',
  })
  magneticField!: Axis;
}

export class ActivityTrackingMeta {
  @ApiProperty({
    enum: ActivityType,
    description: 'Typ aktywności',
  })
  type!: ActivityType;

  @ApiProperty({
    type: Date,
    description: 'Czas pobrania aktywności',
  })
  timestamp!: Date;

  @ApiProperty({
    type: Number,
    description: 'Wartość aktywności (np. liczba kroków, powtórzeń itd.)',
  })
  repeats!: number;
}

export class ActivityTrackingDTO {
  @ApiProperty({
    type: ActivityTrackingMeta,
    description: 'Dane śledzenia aktywności',
  })
  meta!: ActivityTrackingMeta;
  
  @ApiProperty({
    type: Date,
    description: 'Czas wykonywania aktywności',
  })
  interval!: Date;

  @ApiProperty({
    type: SensorBasicSample,
    description: 'Pomiary wykonywanej aktywności',
  })
  data!: SensorBasicSample[];
}