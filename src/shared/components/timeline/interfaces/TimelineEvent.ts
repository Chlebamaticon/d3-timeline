import { D3BrushEvent } from 'd3-brush';
import { D3ZoomEvent } from 'd3-zoom';
import { Data } from './Data';

export type TimelineEventType = 'brush' | 'zoom';

export interface TimelineEvent<ET extends TimelineEventType = TimelineEventType> {
  type: ET;
  selection: [ Data, Data ];
  originalEvent: D3ZoomEvent<any, Data> | D3BrushEvent<Data>;
}