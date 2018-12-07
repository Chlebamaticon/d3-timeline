import { Selection } from 'd3-selection';
import { Axis, axisBottom } from 'd3-axis';
import { ScaleTime, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { TimelineConfiguration, Data } from '../interfaces';
import { parseDate } from '../helpers';

export interface AxisXDependencies {
  dataset: Data[];
}

export const createAxisX = (
  parent: Selection<any, any, any, any>, 
  configuration: TimelineConfiguration,
  dependencies: AxisXDependencies
): [ ScaleTime<any, any>, ScaleTime<any, any>, Axis<any>, () => Selection<any, any, any, any> ] => {
  const { dataset } = dependencies;
  const { aspectRatio, rootClass, spacing } = configuration;
  const scale = scaleTime().range([spacing, 1024 - spacing]);
  const scalable = scaleTime().range(scale.range());
  const axis = axisBottom(scale);
  
  // @ts-ignore
  scale.domain( extent(dataset, d => parseDate(d.timestamp)) );
  scalable.domain(scale.domain());

  const render = () => parent
    .append('g')
    .attr('class', `${ rootClass }__axis ${ rootClass }__axis--x`)
    .attr('transform', `translate(0, ${1024 / aspectRatio})`)
    .call(axis);

  return [ scale, scalable, axis, render ];
};
