import * as React from 'react';
import { Timeline } from '@shared/components/timeline/Timeline';

import { dataset } from '@assets/data';

export class App extends React.Component {
  private container: React.RefObject<HTMLDivElement> = React.createRef();
  private timeline!: Timeline;

  componentDidMount() {
    const { current: container } = this.container;

    if ( !container )
      return;

    this.timeline = new Timeline({
      container
    });

    this.timeline.build(dataset);

    this.timeline.brush$.subscribe(console.debug);
    this.timeline.zoom$.subscribe(console.debug);


    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    if (!this.timeline)
      return;

    this.timeline.fit();
  }

  render() {
    return (
      <div className="app">
        <div className="app__container" ref={this.container} />
      </div>
    );
  }
}
