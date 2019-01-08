import { Selection } from 'd3-selection';

export interface OnInit {
  init(...args: any[]): void;
  __onInit(): void;
}

export interface OnUpdate {
  update(...args: any[]): void;
  __onUpdate(): void;
}

export abstract class TimelineMember {

  constructor(
    protected readonly parent: Selection<any, any, any, any>
  ) {}

  public abstract init(...args: any[]): void;
}