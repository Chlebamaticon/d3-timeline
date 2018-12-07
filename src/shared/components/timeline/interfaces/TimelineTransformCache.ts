import { ZoomTransform } from 'd3-zoom';
import { BrushSelection } from 'd3-brush';

export interface TimelineTransformCache {
  zoom?: ZoomTransform;
  selection?: BrushSelection;
}