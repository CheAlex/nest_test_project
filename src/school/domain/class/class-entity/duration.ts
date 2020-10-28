import { Column } from 'typeorm';

export class Duration {
  @Column({ type: 'timestamp' })
  started: Date;

  @Column({ type: 'timestamp' })
  closed: Date;

  constructor(started: Date, closed: Date) {
    this.started = started;
    this.closed  = closed;
  }
}
