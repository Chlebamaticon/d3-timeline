import { ScaleTime, ScaleLinear } from 'd3-scale';
import { Selection } from 'd3-selection';
import { ZoomBehavior, zoom } from 'd3-zoom';

import { TimelineConfiguration, TimelineView } from './interfaces';
import { TimelineMember, OnInit, OnUpdate } from './TimelineMember';
import { getBoundaryScale, calculateScaleWidth, calculateScaleHeight } from './helpers';
import { timeWeek } from 'd3-time';
import { brushX, BrushBehavior } from 'd3-brush';

interface TimelineControlsConfiguration<T> extends TimelineConfiguration<T> {
  view: TimelineView;
}

interface TimelineControlsElements {
  zoom?: Selection<SVGGElement, any, SVGElement, any>;
  brush?: Selection<SVGGElement, any, SVGElement, any>;
}

export class TimelineControls<T>
  extends TimelineMember 
  implements OnInit, OnUpdate {
  
  public elements: TimelineControlsElements = {};
  public zoom!: ZoomBehavior<any, any>;
  public brush!: BrushBehavior<any>;

  private scaleX!: ScaleTime<any, any>;
  private scaleY!: ScaleLinear<any, any>;

  constructor(
    parent: Selection<SVGSVGElement, any, null, null>,
    private configuration: TimelineControlsConfiguration<T>
  ) {
    super(parent);
  }

  public init(
    scaleX: ScaleTime<any, any>,
    scaleY: ScaleLinear<any, any>
  ): void {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    
    this.__onInit();
  }

  public update(selection: Range[] = this.scaleX.range()): void {
    this.__onUpdate();
  }

  __createZoom() {
    const { 
      hide = {}, 
      rootClass, 
      spacing,
      view
    } = this.configuration;

    this.zoom = zoom()
      .scaleExtent([ 1, getBoundaryScale(this.scaleX, timeWeek, 2) ])
      .translateExtent([
        [ hide.axisY ? 0 : spacing, 0 ], 
        [ view.width , calculateScaleHeight(this.scaleY, this.configuration) ]
      ])
      .extent([
        [ hide.axisY ? 0 : spacing, 0 ], 
        [ view.width , calculateScaleHeight(this.scaleY, this.configuration) ]
      ]);

    this.elements.zoom = this.parent
      .append('g')
      .attr('class', `${ rootClass }__zoom`)
      .attr('style', 'pointer-events: all; fill: none;')
      .attr('x', 0)
      .attr('y', 0)
      .call(this.zoom);
  }

  __createBrush() {
    const { hide = {}, rootClass, spacing, view } = this.configuration;

    this.brush = brushX()
      .extent([
        [ hide.axisY ? 0 : spacing , 0 ], 
        [ view.width , calculateScaleHeight(this.scaleY, this.configuration) ]
      ]);

    if ( !this.elements.zoom )
      throw new Error(`${ this.constructor.name }#__createBrush; Zoom element is undefined`);

    this.elements.brush = this.elements.zoom
      .append('g')
      .attr('class', `${ rootClass }__brush`)
      .call(this.brush)
      .call(this.brush.move, this.scaleX.range());
  }

  __onInit(): void {
    this.__createZoom();
    this.__createBrush();
  }

  __onUpdate(): void {
    const { hide = {}, view, spacing } = this.configuration;

    this.zoom
      .translateExtent([
        [ hide.axisY ? 0 : spacing, 0 ],
        [ calculateScaleWidth(this.scaleX, this.configuration), view.height ]
      ])
      .extent([
        [ hide.axisY ? 0 : spacing, 0 ],
        [ calculateScaleWidth(this.scaleX, this.configuration), view.height ]
      ]);

    this.brush
      .extent([
        [ hide.axisY ? 0 : spacing, 0 ],
        [ calculateScaleWidth(this.scaleX, this.configuration), calculateScaleHeight(this.scaleY, this.configuration) ]
      ]);

    if ( this.elements.zoom )
      this.elements.zoom.call(this.zoom);

    if ( this.elements.brush ) {
      this.elements.brush
        .call(this.brush)
        .call(this.brush.move, this.scaleX.range());
    }
  }
  
}