import { Subject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { select, event } from 'd3-selection';
import { line as lineShape } from 'd3-shape';

import {
  Data,
  TimelineAxes,
  TimelineConfiguration,
  TimelineElements,
  TimelineEvent,
  TimelineParameters,
  TimelineScales,
  TimelineTransformCache,
  TimelineShapes,
  TimelineEventType,
} from './interfaces';

import { 
  createAxisX, 
  createAxisY,
  createSVG, 
  createWrapper,
  createZoomBrush,
  createClipPath,
  createLine
} from './factories';

import {
  parseDate, isArray
} from './helpers';

import { TimelineControls } from './interfaces/TimelineControls';
import { extent, max } from 'd3-array';
import { findData } from './helpers/findData';

export class Timeline {
  static readonly CLIP_ID = 'shape-clip';

  protected axes: TimelineAxes = {};
  protected controls: TimelineControls = {};
  protected elements: TimelineElements = {};
  protected scales: TimelineScales = {};
  protected shapes: TimelineShapes = {};
  protected transform: TimelineTransformCache = {};

  public dataset: Data[] = [];
  public readonly zoom$: Observable<TimelineEvent>;
  public readonly brush$: Observable<TimelineEvent>;

  private readonly configuration: TimelineConfiguration;
  private readonly subject: Subject< TimelineEvent > = new Subject();

  constructor(configuration: TimelineParameters) {
    this.configuration = {
      spacing: 32,
      rootClass: 'timeline',
      aspectRatio: 2 / 1,
      ...configuration
    };

    this.zoom$ = this.subject.pipe(
      filter(predicate => predicate.type === 'zoom')
    );

    this.brush$ = this.subject.pipe(
      filter(predicate => predicate.type === 'brush')
    );
  }

  public build(dataset: Data[] = this.dataset): void {
    this.dataset = dataset;

    this.createContainers()
        .fit()
        .createDefs()
        .createAxes()
        .createChart()
        .createControls()
        .createListeners();
  }

  public rebuild(): void {
    const { wrapper } = this.elements;
    console.debug('rebuild!');

    if ( !wrapper )
      return;

    wrapper.remove();
    this.build();
  }

  public update(dataset: Data[] = this.dataset): void {
    const { x: scaleX, y: scaleY, scalableX } = this.scales;

    if ( !scaleX )
      throw new Error('Timeline#update: scaleX is undefined');

    if ( !scalableX )
      throw new Error('Timeline#update: scalableX is undefined');

    if ( !scaleY )
      throw new Error('Timeline#update: scaleY is undefined');

    this.dataset = dataset;

    scaleX.domain(
        // @ts-ignore
        extent(
          dataset, 
          d => parseDate(d.timestamp)
        )
    );
    scalableX.domain(scaleX.domain());

    scaleY.domain([
      0,
      // @ts-ignore
      max(dataset, d => d.count)
    ]);

    return this.rebuild();
  }

  public fit(): this {
    const { svg } = this.elements;
    const { container, aspectRatio } = this.configuration;

    if (!svg)
      return this;

    svg
      .attr('width', `${container.clientWidth}px`)
      .attr('height', `${container.clientWidth / aspectRatio}px`);

    return this;
  }

  private createContainers(): this {
    const { container } = this.configuration;

    const [ wrapperElement ] = createWrapper(select(container), this.configuration);
    this.elements.wrapper = wrapperElement();
    
    const [ svgElement ] = createSVG(this.elements.wrapper, this.configuration);
    this.elements.svg = svgElement();

    return this;
  }

  private createDefs(): this {
    const { svg } = this.elements;

    if ( svg ) {
      const [ renderClipPath ] = createClipPath(svg, this.configuration, { id: Timeline.CLIP_ID });

      renderClipPath();
    }

    return this;
  }

  private createAxes() {
    const dataset = this.dataset;
    const { svg } = this.elements;
    const { rootClass, spacing } = this.configuration;

    if ( !svg )
      throw new Error('Timeline#createControls: svg does not exist');

    const axes = svg
      .append('g')
      .attr('class', `${ rootClass }__axes`)
      .attr('transform', `translate(${ spacing }, ${ -spacing })`);

    const [ 
      scaleX, scalableX, axisX, renderAxisX 
    ] = createAxisX(axes, this.configuration, { dataset });

    const [ 
      scaleY, axisY, renderAxisY 
    ] = createAxisY(axes, this.configuration, { dataset });    

    this.scales = {
      x: scaleX,
      y: scaleY,
      scalableX
    };

    this.axes = {
      x: axisX,
      y: axisY
    };

    this.elements.axes = axes;
    this.elements.axisX = renderAxisX();
    this.elements.axisY = renderAxisY();

    return this;
  }

  private createChart(): this {
    const dataset = this.dataset;
    const { svg } = this.elements;
    const { x: scaleX, y: scaleY } = this.scales;
    const { rootClass } = this.configuration;

    if ( !svg )
      throw new Error('Timeline#createControls: svg does not exist');

    if ( !scaleX )
      throw new Error('Timeline#createChart: scaleX is undefined');

    if ( !scaleY )
      throw new Error('Timeline#createChart: scaleY is undefined');

    const chart = svg
      .append('g')
      .attr('class', `${ rootClass }__chart`)
      .attr('transform', `translate(0, 0)`);

    this.shapes = {
      line: lineShape<Data>()
        // @ts-ignore
        .x(d => scaleX(parseDate(d.timestamp)))
        .y(d => scaleY(d.count))
    };

    const [ renderLine ] = createLine(chart, this.configuration, {
      clipId: Timeline.CLIP_ID,
      shape: this.shapes.line,
      dataset
    });

    this.elements.chart = chart;
    this.elements.line = renderLine();

    return this;
  }

  private createControls(): this {
    const { svg } = this.elements;
    const { x: scaleX } = this.scales;
    const { rootClass } = this.configuration;

    if ( !svg )
      throw new Error('Timeline#createControls: svg does not exist');

    if ( !scaleX )
      throw new Error('Timeline#createControls: scaleX is undefined');

    const controls = svg
      .append('g')
      .attr('class', `${ rootClass }__controls`)
      .attr('transform', `translate(0, 0)`);

    controls.on('wheel', console.debug);
    
    const [ brush, zoom, renderZoomBrush ] = createZoomBrush(controls, scaleX, this.configuration);

    this.controls = { zoom, brush };
    this.elements.controls = controls;
    this.elements.zoomBrush = renderZoomBrush();

    return this;
  }

  private createListeners() {
    const { zoom, brush } = this.controls;

    if ( zoom )
      zoom.on('zoom', this.onZoom);

    if ( brush )
      brush.on('brush', this.onBrush);
  }

  private onBrush = () => {
    const dataset = this.dataset;
    const { x: scaleX, scalableX } = this.scales;

    if ( !scalableX || !scaleX )
      return;

    const selection = (this.transform.selection = event.selection || scalableX.range());

    if ( isArray(selection) ) {
      const [ start, end ] = selection;

      if ( !(isArray(start) || isArray(end)) ) {
        const from = scaleX.invert(start);
        const to = scaleX.invert(end);

        this.next({
          type: 'brush',
          selection: [
            dataset.find(findData(dataset, from)) || dataset[0],
            dataset.find(findData(dataset, to)) || dataset[dataset.length - 1]
          ],
          originalEvent: { ...event }
        });
      }
    }
  }

  private onZoom = () => {
    const dataset = this.dataset;
    const zoom = (this.transform.zoom = event.transform);

    const { x: axisX } = this.axes;
    const { line, axisX: axisXElement } = this.elements;
    const { selection } = this.transform;
    const { x: scaleX, scalableX } = this.scales;
    const { line: path } = this.shapes;

    if ( !line || !scaleX || !path || !axisXElement || !axisX )
      return;

    scaleX.domain(zoom.rescaleX(scalableX).domain());
    line.attr('d', path);
    axisXElement.call(axisX);

    if ( Array.isArray(selection) || !selection ) {
      const [ start, end ] = selection || zoom.rescaleX(scalableX).domain();

      if ( !(Array.isArray(start) || Array.isArray(end)) ) {
        const from = selection ? scaleX.invert(start) : start;
        const to = selection ? scaleX.invert(end) : end;

        this.next({
          type: 'zoom',
          selection: [
            dataset.find(findData(dataset, from)) || dataset[0],
            dataset.find(findData(dataset, to)) || dataset[dataset.length - 1]
          ],
          originalEvent: { ...event }
        });
      }
    }
  }

  private next(timelineEvent: TimelineEvent ) {
    this.subject.next(timelineEvent);
  }

}
