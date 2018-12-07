
import { Line } from 'd3-shape';
import { Selection } from 'd3-selection';

import { TimelineConfiguration, Data } from '../interfaces';

export interface LineDependencies {
  clipId: string;
  shape: Line<Data> | undefined;
  dataset: Data[];
}

export const createLine = (
  parent: Selection<any, any, any, any>,
  configuration: TimelineConfiguration,
  dependencies: LineDependencies
): [ () => Selection<any, any, any, any> ] => {
  const { clipId, shape, dataset } = dependencies;
  const { rootClass, spacing } = configuration;

  const render = () => {
    const element = parent
    .append('path')
    .datum(dataset)
    .attr('style', `clip-path: url(#${ clipId }); fill: none; stroke: blue;`)
    .attr('transform', `translate(${ spacing }, 0)`)
    .attr('class', `${ rootClass }__shape ${ rootClass }__shape--line`);
    
    if ( shape )
      element.attr('d', shape);

    return element;
  };

  return [ render ];
};
