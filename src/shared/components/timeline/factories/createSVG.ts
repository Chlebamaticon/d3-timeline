import * as d3 from 'd3';
import { TimelineConfiguration } from '../interfaces';

export const createSVG = (
  parent: d3.Selection<any, any, any, any>,
  configuration: TimelineConfiguration
) => {
  const { rootClass, aspectRatio } = configuration;

  const render = () => parent
    .append('svg')
    .attr('class', `${rootClass}__container`)
    .attr('viewBox', `0 0 ${1024} ${1024 / aspectRatio}`);

  return [ render ];
};
