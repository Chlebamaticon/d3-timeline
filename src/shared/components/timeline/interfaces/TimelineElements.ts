import { Selection } from 'd3';

export interface TimelineElements {
  axes?: Selection<any, any, any, any>;
  axisX?: Selection<any, any, any, any>;
  axisY?: Selection<any, any, any, any>;
  svg?: Selection<any, any, any, any>;
  wrapper?: Selection<any, any, any, any>;
  controls?: Selection<any, any, any, any>;
  zoomBrush?: Selection<any, any, any, any>;
  chart?: Selection<any, any, any, any>;
  line?: Selection<any, any, any, any>;
}
