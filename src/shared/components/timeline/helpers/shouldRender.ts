import { TimelineConfiguration } from '../interfaces';

export function shouldRenderAxisX<T = any>(configuration: TimelineConfiguration<T>): boolean {
  const { 
    hide: { axisX = false } = {} 
  } = configuration;

  if ( typeof axisX === 'boolean' )
    return axisX;
  
  return (
    !(axisX.yearly)
    && !(axisX.monthly)
    && !(axisX.weekly)
    && !(axisX.daily)
  );
}

export function shouldRenderAxisY<T = any>(configuration: TimelineConfiguration<T>): boolean {
  const {
    hide: { axisY = false } = {}
  } = configuration;

  return axisY;
}