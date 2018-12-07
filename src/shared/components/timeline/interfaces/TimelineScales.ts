import { ScaleTime, ScaleLinear } from 'd3-scale';

export interface TimelineScales {
  x?: ScaleTime<number, number>;
  y?: ScaleLinear<number, number>;
  scalableX?: ScaleTime<number, number>;
}