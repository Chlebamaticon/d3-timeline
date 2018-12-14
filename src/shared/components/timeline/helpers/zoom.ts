import { ScaleTime } from 'd3-scale';
import { CountableTimeInterval } from 'd3-time';

export const getBoundaryScale = (origin: ScaleTime<any, any>, unit: CountableTimeInterval, offset: number) => {
  const domain = origin.domain();
  const first = unit.offset(new Date(), 0);
  const last = unit.offset(new Date(), offset);

  return (+domain[1] - +domain[0]) / (+last - +first);
};