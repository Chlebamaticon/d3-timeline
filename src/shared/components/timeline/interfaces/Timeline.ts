import { Axis } from 'd3-axis';
import { Selection } from 'd3-selection';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { BrushBehavior, D3BrushEvent } from 'd3-brush';
import { ZoomBehavior, D3ZoomEvent, ZoomTransform } from 'd3-zoom';
import { Data } from './Data';

export interface TimelineConfiguration<T> {
  container: HTMLElement;
  rootClass: string;
  aspectRatio: number; // width / height
  minHeight?: number;
  maxHeight?: number;
  spacing: number;

  ySelector: (d: T) => number;
  xSelector: (d: T) => string;

  hide?: {
    axisX?: {
      yearly?: boolean,
      monthly?: boolean,
      weekly?: boolean,
      daily?: boolean
    } | boolean,
    axisY?: boolean
  };
}

export interface TimelineParameters<T> extends Partial<TimelineConfiguration<T>> {
  container: HTMLElement;
}

export interface TimelineAxes {
  x?: AxisX<any>;
  y?: Axis<ScaleLinear<number, number>>;
}

export interface TimelineControls {
  zoom?: ZoomBehavior<any, Data>;
  brush?: BrushBehavior<Data>;
}

export interface TimelineElements {
  axes?: Selection<any, any, any, any>;
  axisX?: AxisXElements;
  axisY?: Selection<any, any, any, any>;
  svg?: Selection<any, any, any, any>;
  wrapper?: Selection<any, any, any, any>;
  controls?: Selection<any, any, any, any>;
  zoom?: Selection<any, any, any, any>;
  brush?: Selection<any, any, any, any>;
  chart?: Selection<any, any, any, any>;
  line?: Selection<any, any, any, any>;
}

export type TimelineEventType = 'brush' | 'zoom';

export interface TimelineEvent<T = any, E extends TimelineEventType = TimelineEventType> {
  type: E;
  selection: [ T, T ];
  originalEvent: D3ZoomEvent<any, T> | D3BrushEvent<T>;
}

export interface TimelineScales {
  x?: ScaleTime<number, number>;
  y?: ScaleLinear<number, number>;
  scalableX?: ScaleTime<number, number>;
}

export interface TimelineSize {
  width: number;
  height: number;

  innerWidth: number;
  innerHeight: number;
}

export interface TimelineTransformCache {
  zoom?: ZoomTransform;
  selection?: [ number, number ];
}

export interface TimelineView {
  width: number;
  height: number;
}

export interface AxisX<T = any> {
  yearly: Axis<T>;
  monthly: Axis<T>;
  weekly: Axis<T>;
  daily: Axis<T>;
}

export interface AxisXElements {
  root: Selection<SVGGElement, any, any, any>;
  yearly: Selection<SVGGElement, Data[], SVGElement, any>;
  monthly: Selection<SVGGElement, Data[], SVGElement, any>;
  weekly: Selection<SVGGElement, Data[], SVGElement, any>;
  daily: Selection<SVGGElement, Data[], SVGElement, any>;
}
