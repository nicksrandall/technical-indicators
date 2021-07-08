import Window from '../core/window';
import type { WindowArgs } from '../core/window';

export default class SMA {
  period: number;
  window: Window<number>;
  current: number;
  isNew: boolean;
  constructor(
    period: number,
    window: Window<number> = new Window(period),
    current: number = 0.0,
    isNew: boolean = true,
  ) {
    this.period = period;
    this.window = window;
    this.current = current;
    this.isNew = isNew;
  }
  next(value: number): number {
    if (this.isNew) {
      this.isNew = false;
      this.current = value;
      this.window.init(value);
    } else {
      const prev = this.window.push(value);
      this.current += (value - prev) / this.period;
    }
    return this.current;
  }
  toJSON() {
    return {
      $type: 'finance.tr.MA',
      period: this.period,
      window: this.window,
      current: this.current,
      isNew: this.isNew,
    };
  }
  static from({
    period,
    window,
    current,
    isNew,
  }: {
    period: number;
    window: WindowArgs<number>;
    current: number;
    isNew: boolean;
  }): EMA {
    return new MA(period, Window.from(window), current, isNew);
  }
}
