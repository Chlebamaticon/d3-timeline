import { Selection } from 'd3-selection';
import { TimelineConfiguration } from '../interfaces';

export const createWrapper = (
  parent: Selection<any, any, any, any>,
  configuration: TimelineConfiguration
): [ () => Selection<any, any, any, any> ] => {
  const { rootClass } = configuration;

  const render = () => parent
    .append('div')
    .attr('class', `${rootClass}`)
    .attr(
      'style',
      'width: 100%; height: 100%; display: flex; align-items: center;'
    );

  return [ render ];
};
