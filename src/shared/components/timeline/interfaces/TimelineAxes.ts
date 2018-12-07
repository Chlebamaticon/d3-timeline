import { Axis } from 'd3-axis';
import { ScaleTime, ScaleLinear } from 'd3-scale';

export interface TimelineAxes {
  x?: Axis<ScaleTime<number, number>>;
  y?: Axis<ScaleLinear<number, number>>;
}