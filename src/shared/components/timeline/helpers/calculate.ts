import { ScaleContinuousNumeric, ScaleTime } from 'd3-scale';
import { TimelineConfiguration } from '../interfaces';
import { shouldRenderAxisY } from './shouldRender';

export function calculateScaleWidth<T>(
  scale: ScaleContinuousNumeric<number, any> | ScaleTime<number, any>, 
  configuration: TimelineConfiguration<T>
): number {
  const { spacing } = configuration;
  const [ from, to ] = scale.range();
  
  return (
    (to - from)
    + (shouldRenderAxisY(configuration) ? spacing : 0 )
  );
}

export function calculateScaleHeight<T>(
  scale: ScaleContinuousNumeric<number, any> | ScaleTime<number, any>,
  configuration: TimelineConfiguration<T>
): number {
  const { hide: { axisX = false } = {}, spacing } = configuration;
  const [ from, to ] = scale.range();

  return (
    (from - to)
    + (( axisX && (typeof axisX === 'object' && axisX.daily) ) ? spacing : 0)
  );
}