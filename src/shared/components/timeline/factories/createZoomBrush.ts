import { BrushBehavior, brushX } from 'd3-brush';
import { Selection } from 'd3-selection';
import { ScaleTime } from 'd3-scale';
import { zoom as Zoom, ZoomBehavior } from 'd3-zoom';

import { TimelineConfiguration } from '../interfaces';

export const createZoomBrush = (
  parent: Selection<any, any, any, any>,
  scale: ScaleTime<any, any>,
  configuration: TimelineConfiguration
): [ BrushBehavior<any>, ZoomBehavior<any, any>, () => Selection<any, any, any, any> ] => {
  const { aspectRatio, rootClass, spacing } = configuration;

  const zoom = Zoom()
    .scaleExtent([1, 31])
    .translateExtent([[spacing, 0], [ 1024 - spacing, 1024 / aspectRatio ]])
    .extent([[spacing, 0], [ 1024 - spacing, 1024 / aspectRatio ]]);

  const brush = brushX()
    .extent([[spacing, 0], [ 1024 - spacing, (1024 / aspectRatio) - spacing]]);

  const render = () => parent
    .append('g')
    .attr('class', `${ rootClass }__zoom`)
    .attr('style', 'pointer-events: all; fill: none;')
    .attr('x', 0)
    .attr('y', 0)
    // @ts-ignore
    .call(zoom)
    .append('g')
    .attr('transform', `translate(${ spacing })`)
    .attr('class', `${ rootClass }__brush`)
    .call(brush)
    .call(brush.move, scale.range());
    
  return [ brush, zoom, render ];
};
