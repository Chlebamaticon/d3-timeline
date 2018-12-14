import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/operators';
import { max, min } from 'd3-array';
import { scaleTime, ScaleTime, ScaleLinear, scaleLinear } from 'd3-scale';
import { Selection, select, event } from 'd3-selection';
import { timeDay } from 'd3-time';

import { 
  TimelineSize, 
  TimelineView, 
  TimelineScales, 
  TimelineTransformCache, 
  TimelineEvent, 
  TimelineConfiguration,
  TimelineParameters
} from './interfaces';
import { parseDate, toISO } from './helpers';
import { TimelineAxes } from './TimelineAxes';
import { TimelineChart } from './TimelineChart';
import { TimelineControls } from './TimelineControls';

export class Timeline<T = any> {
  protected size!: TimelineSize;
  protected view!: TimelineView;
  protected scales: TimelineScales = {};
  protected transform: TimelineTransformCache = {};

  public axes!: TimelineAxes<T>;
  public chart!: TimelineChart<T>;
  public controls!: TimelineControls<T>;

  public dataset!: T[];
  public readonly brush$: Observable< TimelineEvent<T> >;

  private scaleX!: ScaleTime<any, any>;
  private scalableX!: ScaleTime<any, any>;
  private scaleY!: ScaleLinear<any, any>;
  private wrapper!: Selection<HTMLDivElement, any, any, any>;
  private svg!: Selection<SVGSVGElement, any, any, any>;
  private readonly configuration: TimelineConfiguration<T>;
  private readonly subject: Subject< TimelineEvent<T> > = new Subject();

  constructor(configuration: TimelineParameters<T>) {
    this.configuration = {
      xSelector: (d: any) => d.timestamp,
      ySelector: (d: any) => d.count,
      spacing: 32,
      rootClass: 'timeline',
      aspectRatio: 2 / 1,
      ...configuration
    };

    this.brush$ = this.subject.pipe(
      filter(predicate => predicate.type === 'brush')
    );
  }

  public build(dataset: T[]): void {
    this
      .fit()
      .init(dataset)
      .createListeners();
  }

  public fit(): this {
    const { aspectRatio, container, rootClass, spacing, hide = {} } = this.configuration;

    this.size = {
      width: container.clientWidth,
      height: container.clientWidth / aspectRatio,
      innerWidth: container.clientWidth - (spacing * 2),
      innerHeight: (container.clientWidth / aspectRatio) - (spacing * 2),
    };

    const { 
      minHeight = 0, 
      maxHeight = this.size.height
    } = this.configuration;

    this.view = {
      width: this.size.width,
      height: this.size.height > maxHeight 
        ? maxHeight : (this.size.height < minHeight)
          ? minHeight
          : this.size.height
    };

    if ( this.scaleX ) {
      this.scaleX.range([ hide.axisY ? 0 : spacing, this.view.width - 1 ]);
      this.scalableX.range( this.scaleX.range() );
    }

    if ( this.axes )
      this.axes.update();

    if ( this.chart )
      this.chart.update();

    if ( this.controls )
      this.controls.update();

    if ( this.svg )
      this.svg
          .attr('class', `${ rootClass }__svg`)
          .attr('style', `display: block; flex: 1 1 100%`)
          .attr('viewBox', `0 0 ${ this.view.width } ${ this.view.height }`);

    return this;
  }

  private init(dataset: T[]): this {
    const { container, rootClass } = this.configuration;
    const { width, height } = this.view;

    this.dataset = dataset;

    this.wrapper = select(container)
      .append('div')
      .attr('class', `${rootClass}`)
      .attr(
        'style',
        'width: 100%; height: 100%; display: flex; align-items: center;'
      );
    
    this.svg = this.wrapper
      .append('svg')
      .attr('class', `${ rootClass }__svg`)
      .attr('style', `display: block; flex: 1 1 100%`)
      .attr('viewBox', `0 0 ${ width } ${ height }`);

    this.createScales();

    const configuration = {
      view: this.view,
      ...this.configuration,
    };

    this.axes = new TimelineAxes(this.svg, configuration);
    this.chart = new TimelineChart(this.svg, configuration);
    this.controls = new TimelineControls(this.svg, configuration);

    this.chart.init(this.scalableX, this.scaleY, dataset);
    this.axes.init(this.scalableX, this.scaleY);
    this.controls.init(this.scalableX, this.scaleY);

    return this;
  }

  private createScales(): this {
    const {
      hide = {},
      spacing,
      xSelector
    } = this.configuration;

    let minX = min(this.dataset, d => parseDate(xSelector(d)));
    let maxX = max(this.dataset, d => parseDate(xSelector(d)));

    if ( !minX && !maxX ) {
      minX = timeDay.offset(new Date(), 0);
      maxX = timeDay.offset(new Date(), 1);
    } else {
      minX = timeDay.offset(minX!, -1);
      maxX = timeDay.offset(maxX!, 1);
    }

    this.scaleX = scaleTime()
      .range([ hide.axisY ? 0 : spacing, this.view.width - 1 ])
      // @ts-ignore
      .domain([ minX, maxX ]);

    this.scalableX = scaleTime()
      .range( this.scaleX.range() )
      .domain( this.scaleX.domain() );

    this.scaleY = scaleLinear()
      .range([
        this.view.height 
        - ( !(hide.axisX) || !(typeof hide.axisX === 'object' && hide.axisX.daily) ? spacing : 4), 
        0
      ])
      // @ts-ignore
      .domain([ 0, max(this.dataset, d => d.count )]);
  
    return this;
  }

  private createListeners() {
    const { zoom, brush } = this.controls;

    if ( zoom )
      zoom.on('zoom', this.onZoom);

    if ( brush )
      brush.on('end', this.onBrushend);
  }

  private onBrushend = () => {
    if ( !event.sourceEvent ) return;
    if ( !event.selection ) return;

    const { elements } = this.controls;

    if ( !elements.brush )
      return;

    const selection = event.selection.map(this.scalableX.invert);
    const rounded = selection.map(timeDay.round);

    if ( rounded[0] >= rounded[1] ) {
      rounded[0] = timeDay.floor(selection[0]);
      rounded[1] = timeDay.offset(rounded[1]);
    }

    this.transform.selection = rounded.map(this.scalableX);

    elements
      .brush
      .transition()
      .call(event.target.move, rounded.map(this.scalableX));

    this.next({
      type: 'brush',
      selection: [
        toISO(rounded[0]),
        toISO(rounded[1]),
      ],
      originalEvent: { ...event }
    });
  }

  private onZoom = () => {
    const zoom = event.transform;

    const { selection } = this.transform;
    const { brush, elements } = this.controls;
    
    this.scalableX.domain(zoom.rescaleX(this.scaleX).domain());
  
    this.axes.update();
    this.chart.update();

    if ( brush && elements.brush && selection )
      elements.brush.call(brush.move, selection);
  }

  private next(timelineEvent: TimelineEvent ) {
    this.subject.next(timelineEvent);
  }

}