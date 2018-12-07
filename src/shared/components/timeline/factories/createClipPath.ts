import { Selection } from 'd3';
import { TimelineConfiguration } from '../interfaces';

export interface ClipPathDependencies {
  id: string;
}

export const createClipPath = (
  parent: Selection<any, any, any, any>, 
  configuration: TimelineConfiguration,
  dependencies: ClipPathDependencies
): [ () => Selection<any, any, any, any> ] => {
  const { id } = dependencies;
  const { aspectRatio, spacing } = configuration;

  const render = () => parent
    .append('defs')
    .append('clipPath')
    .attr('id', id)
    .append('rect')
    .attr('height', (1024 / aspectRatio) - spacing)
    .attr('width', 1024 - spacing - spacing)
    .attr('transform', `translate(${ spacing }, 0)`);

  return [ render ];
};
