import { ZoomBehavior } from 'd3-zoom';
import { BrushBehavior } from 'd3-brush';
import { Data } from './Data';

export interface TimelineControls {
  zoom?: ZoomBehavior<any, Data>;
  brush?: BrushBehavior<Data>;
}