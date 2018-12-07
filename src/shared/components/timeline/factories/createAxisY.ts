import { Selection } from 'd3-selection';
import { TimelineConfiguration, Data } from '../interfaces';
import { Axis, axisLeft } from 'd3-axis';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export interface AxisYDependencies {
  dataset: Data[];
}

export const createAxisY = (
  parent: Selection<any, any, any, any>, 
  configuration: TimelineConfiguration,
  dependencies: AxisYDependencies
): [ ScaleLinear<any, any>, Axis<any>, () => Selection<any, any, any, any> ] => {
  const { dataset } = dependencies;
  const { aspectRatio, rootClass, spacing } = configuration;
  const scale = scaleLinear().range([(1024 / aspectRatio) - spacing, 0]);
  const axis = axisLeft(scale);

  scale.domain([
    0,
    // @ts-ignore
    max(dataset, d => d.count)
  ]);

  const render = () => parent
    .append('g')
    .attr('class', `${ rootClass }__axis ${ rootClass }__axis--y`)
    .attr('transform', `translate(${ spacing }, ${ spacing })`)
    .call(axis);

  return [ scale, axis, render ];
};
