import { TimelineConfiguration } from './TimelineConfiguration';

export interface TimelineParameters extends Partial<TimelineConfiguration> {
  container: HTMLElement;
}
