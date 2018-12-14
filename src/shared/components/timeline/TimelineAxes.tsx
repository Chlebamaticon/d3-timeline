import { Axis, axisBottom, axisLeft } from 'd3-axis';
import { Selection, select } from 'd3-selection';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { timeDay, timeWeek, timeMonth, timeYear } from 'd3-time';
import { timeFormat } from 'd3-time-format';

import { TimelineMember, OnInit, OnUpdate } from './TimelineMember';
import { TimelineConfiguration, TimelineView } from './interfaces';
import { calculateScaleHeight, calculateScaleWidth } from './helpers';

type HorizontalRanges = 'yearly' | 'monthly' | 'weekly' | 'daily';
type VerticalRanges = 'count';

interface TimelineAxisConfiguration<T> extends TimelineConfiguration<T> {
  view: TimelineView;
}

export class TimelineAxes<T = any> 
  extends TimelineMember
  implements OnInit, OnUpdate {
  public root!: Selection<SVGGElement, any, SVGGElement, any>;
  
  public scaleX?: ScaleTime<any, any>;
  public scaleY?: ScaleLinear<any, any>;

  public axisX?: Record<HorizontalRanges , Axis<any>>;
  public elementsX?: {
    [K in HorizontalRanges | 'group']?: Selection<SVGGElement, T[], SVGGElement, any>
  };

  public axisY?: Record<VerticalRanges, Axis<any>>;
  public elementsY?: {
    [K in VerticalRanges | 'group']?: Selection<SVGGElement, T[], SVGGElement, any>
  };

  constructor(
    parent: Selection<SVGSVGElement, any, null, null>,
    private configuration: TimelineAxisConfiguration<T>
  ) {
    super(parent);
  }

  init(
    scaleX: ScaleTime<any, any>, 
    scaleY: ScaleLinear<any, any>
  ): void {
    this.scaleX = scaleX;
    this.scaleY = scaleY;

    this.__onInit();
  }

  update(): void {
    this.__onUpdate();
  }

  __createAxisX(): void {
    const {
      hide: { axisX = false } = {},
      rootClass
    } = this.configuration;

    if ( !this.scaleX )
      return;

    this.axisX = {
      yearly: axisBottom<Date>(this.scaleX)
        .ticks( timeYear.every(1) )
        .tickFormat(timeFormat('%Y')),
      monthly: axisBottom<Date>(this.scaleX)
        .tickFormat(timeFormat('%b')),
      weekly: axisBottom<Date>(this.scaleX)
        .tickFormat(() => ''),
      daily: axisBottom<Date>(this.scaleX)
        .tickFormat(timeFormat('%d')),
    };

    if ( typeof axisX === 'boolean' && axisX )
      return;

    const group = this.root
      .append('g')
      .attr('class', `${ rootClass }__axis ${ rootClass }__axis--x`)
      .attr('transform', `translate(0, 0)`);

    this.elementsX = { group };
    
    if ( !(axisX) || (!(typeof axisX === 'boolean') && !(axisX.yearly) ) ) {
      this.elementsX.yearly = group
        .append('g')
        .attr('class', `${ rootClass }__axis ${ rootClass }__axis--x ${ rootClass }__axis--yearly`)
        .call(this.axisX.yearly);
    }

    if ( !(axisX) || (!(typeof axisX === 'boolean') && !(axisX.monthly) ) ) {
      this.elementsX.monthly = group
        .append('g')
        .attr('class', `${ rootClass }__axis ${ rootClass }__axis--x ${ rootClass }__axis--monthly`)
        .call(this.axisX.monthly);
    }

    if ( !(axisX) || (!(typeof axisX === 'boolean') && !(axisX.weekly) ) ) {
      this.elementsX.weekly = group
        .append('g')
        .attr('class', `${ rootClass }__axis ${ rootClass }__axis--x ${ rootClass }__axis--weekly`)      
        .call(this.axisX.weekly);
    }

    if ( !(axisX) || (!(typeof axisX === 'boolean') && !(axisX.daily) ) ) {
      this.elementsX.daily = group
        .append('g')
        .attr('class', `${ rootClass }__axis ${ rootClass }__axis--x ${ rootClass }__axis--daily`)
        .attr('transform', `translate(0, ${ calculateScaleHeight(this.scaleY!, this.configuration) })`)
        .call(this.axisX.daily);
    }
  }

  __createAxisY(): void {
    const { 
      hide: { axisY = false } = {},
      rootClass, 
      spacing, 
    } = this.configuration;

    if ( !this.scaleY )
      return;

    this.axisY = {
      count: axisLeft(this.scaleY)
    };

    if ( typeof axisY === 'boolean' && axisY )
      return;

    const group = this.root
      .append('g')
      .attr('class', `${ rootClass }__axis ${ rootClass }__axis--y`)
      .attr('transform', `translate(${ axisY ? 0 : spacing }, 0)`);

    this.elementsY = {
      group,
      count: group
        .append('g')
        .attr('class', `${ rootClass }__axis ${ rootClass }__axis--y`)
        .attr('transform', `translate(0, 0)`)
        .call(this.axisY.count)
    };
  }

  __drawLines(): void {
    const { rootClass, spacing } = this.configuration;
    const height = calculateScaleHeight(this.scaleY!, this.configuration);
    if ( !this.elementsX || !this.elementsY )
      return;

    if ( this.elementsX.weekly ) {
      this.elementsX
        .weekly
        .select('.domain')
        .remove();

      this.elementsX
        .weekly
        .selectAll('.tick > line')
        .attr('y2', height)
        .attr('class', `${ rootClass }__axis-line ${ rootClass }__axis-line--weekly`);
    }

    if ( this.elementsX.monthly ) {
      this.elementsX
        .monthly
        .select('.domain')
        .remove();

      this.elementsX
        .monthly
        .selectAll('.tick > text')
        .attr('transform', (date, _, nodes) => {
          const element: any = nodes[0];

          if ( this.scaleX ) {
            const { width } = element.getBoundingClientRect();

            if ( this.scaleX(+date) + width > calculateScaleWidth(this.scaleX, this.configuration) )
              return `translate(${ -(width / 2) })`;
            else if ( (this.scaleX(+date) - spacing) - width < 0 )
              return `translate(${ width / 2 })`;
          }

          return '';
        });
    }

    if ( this.elementsX.yearly ) {
      this.elementsX
        .yearly
        .select('.domain')
        .remove();

      this.elementsX
        .yearly
        .selectAll('.tick > line')
        .attr('y2', height);

      this.elementsX
        .yearly
        .selectAll('.tick > text')
        .attr('y', height / 2)
        .attr('transform', (date, _, nodes) => {
          const element: any = nodes[0];

          if ( this.scaleX ) {
            const { width } = element.getBoundingClientRect();

            if ( this.scaleX(+date) + width > calculateScaleWidth(this.scaleX, this.configuration) )
              return `translate(${ -width })`;
            return `translate(${ width })`;
          }

          return '';
        });
    }
  }

  __call(): void {
    const axesX = this.axisX;
    const axesY = this.axisY;

    if ( !axesX || !axesY )
      return;

    Object
      .entries(axesX)
      .forEach(([ key, axis ]) => {
        if ( this.elementsX && this.elementsX[key] )
          this.elementsX[key].call(axis);
      });

    Object
      .entries(axesY)
      .forEach(([ key, axis ]) => {
        if ( this.elementsY && this.elementsY[key] )
          this.elementsY[key].call(axis);
      });
  }

  __onInit(): void {
    const { rootClass } = this.configuration;

    this.root = this.parent
      .append('g')
      .attr('class', `${ rootClass }__axes`);

    this.__createAxisX();
    this.__createAxisY();
    this.update();
  }

  __onUpdate(): void {
    if ( !this.scaleX || !this.axisX )
      return;

    const [ first, last ] = this.scaleX.domain();

    const days = timeDay.count(first, last);
    const weeks = timeWeek.count(first, last);
    const months = timeMonth.count(first, last);

    if ( months >= 24 )
      this.axisX.monthly.ticks(timeMonth.every(4));
    if ( months >= 18)
      this.axisX.monthly.ticks(timeMonth.every(3));
    else
      this.axisX.monthly.ticks(timeMonth.every(1));

    if ( weeks >= 52 )
      this.axisX.weekly.ticks(0);
    else
      this.axisX.weekly.ticks(timeWeek.every(1));

    if ( days >= 128 )
      this.axisX.daily.ticks(timeMonth.every(1));
    else if ( days >= 96 )
      this.axisX.daily.ticks(timeWeek.every(1));
    else
      this.axisX.daily.ticks(timeDay.every(1));

    this.__call();
    this.__drawLines();
  }

}