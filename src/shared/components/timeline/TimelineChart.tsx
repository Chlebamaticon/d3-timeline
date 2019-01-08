import { Selection } from 'd3-selection';

import { TimelineMember, OnInit, OnUpdate } from './TimelineMember';
import { TimelineConfiguration, TimelineView } from './interfaces';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { parseDate, toISO } from './helpers';
import { timeDay } from 'd3-time';
import { extent } from 'd3-array';
import { calculateScaleWidth, calculateScaleHeight } from './helpers';

interface TimelineChartConfiguration<T = any> extends TimelineConfiguration<T> {
  view: TimelineView;
}

export class TimelineChart<T = any> 
  extends TimelineMember
  implements OnInit, OnUpdate {
  static CLIP_ID: string = 'clip';

  public defs!: Selection<SVGGElement, any, SVGElement, any>;
  public chart!: Selection<SVGGElement, any, SVGElement, any>;
  public path!: Selection<SVGPathElement, T[], SVGElement, any>;

  private scaleX!: ScaleTime<any, any>;
  private scaleY!: ScaleLinear<any, any>;
  private dataset!: T[];

  static line<T>(
    scaleX: ScaleTime<any, any>, 
    scaleY: ScaleLinear<any, any>, 
    configuration: TimelineChartConfiguration<T>
  ) { 
    return (datum: T[]) => {
      const { 
        hide = {}, 
        spacing, 
        xSelector, 
        ySelector 
      } = configuration;
      const [
        firstDay = new Date(), 
        lastDay = new Date()
      ] = extent(datum, d => parseDate(xSelector(d)) );
    
      const days = timeDay.count(firstDay, lastDay);
      const cache = datum
        .reduce((acc, data: T) => {
          const key = xSelector(data);
          const value = ySelector(data);
          
          return { 
            ...acc, [ key ]: value
          };
        },      {});
    
      const height = calculateScaleHeight(scaleY, configuration);
      let path = ``;
      let last = { x: spacing, y: height };
    
      const getTimestamp = offset => timeDay.offset(firstDay, offset);
      const getCount = (timestamp) => cache[ toISO(timestamp) ] || 0;
    
      for (
        let offset = 0, timestamp = getTimestamp(offset), count = getCount(timestamp);
        offset <= days;
        timestamp = getTimestamp(++offset), count = getCount(timestamp)
      ) {
        const x = scaleX(+(parseDate( toISO(timestamp) ) || 0));
        const y = scaleY(count);
    
        if ( !path )
          path += `M${ hide.axisY ? 0 : spacing },${ height }L${ x },${ y }`;
    
        path += `L${ x },${ y }`;
        last = { x, y };
      }
    
      path += `L${ last.x },${ height }`;
    
      return path;
    };
  }
  
  constructor(
    parent: Selection<SVGSVGElement, any, null, null>,
    private configuration: TimelineChartConfiguration
  ) {
    super(parent);
  }

  public init(
    scaleX: ScaleTime<any, any>, 
    scaleY: ScaleLinear<any, any>,
    dataset: T[]
  ): void {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.dataset = dataset;

    this.__onInit();
  }
  public update(): void {
    this.__onUpdate();
  }

  __createChart(): void {
    const { rootClass } = this.configuration;
    
    this.chart = this.parent
      .append('g')
      .attr('class', `${ rootClass }__chart`);

    this.path = this.chart
      .append('path')
      .datum(this.dataset)
      .attr('style', `clip-path: url(#${ TimelineChart.CLIP_ID })`)
      .attr('transform', `translate(0, 0)`)
      .attr('class', `${ rootClass }__shape ${ rootClass }__shape--line`)
      .attr('d', TimelineChart.line(this.scaleX, this.scaleY, this.configuration));
  }

  __createDefs(): void {
    const { hide = {}, view, spacing } = this.configuration;

    this.defs = this.parent
      .append('defs');

    this.defs
      .append('clipPath')
      .attr('id', TimelineChart.CLIP_ID)
      .append('rect')
      .attr('height', calculateScaleHeight(this.scaleY, this.configuration))
      .attr('width', calculateScaleWidth(this.scaleX, this.configuration))
      .attr('transform', `translate(${ hide.axisY ? 0 : spacing }, 0)`);
  }

  __onInit(): void {
    this.__createDefs();
    this.__createChart();
  }

  __onUpdate(): void {
    this.defs
      .select('clipPath > rect')
      .attr('width', calculateScaleWidth(this.scaleX, this.configuration));

    this.path
      .datum(this.dataset)
      .attr('d', TimelineChart.line(this.scaleX, this.scaleY, this.configuration));
  }

}