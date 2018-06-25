/* 时间系统 */

/* 秒表 */
export class StopWatch {
  private startTime: number;
  private running: boolean;
  private elapsed: number;
  constructor() {
    this.startTime = 0;
    this.elapsed = 0;
    this.running = false;
  }

  /* 开始 */
  public start() {
    this.startTime = Date.now();
    this.running = true;
    this.elapsed = 0;
  }

  /* 停止 */
  public stop() {
    this.running = false;
    this.elapsed = Date.now() - this.startTime;
  }

  /* 获取流逝的时间 */
  public getElapsedTime() {
    return this.running ? Date.now() - this.startTime : this.elapsed;
  }

  /* 重置 */
  public reset() {
    this.startTime = Date.now();
    this.elapsed = 0;
  }

  /* 是否在运行 */
  public isRunning() {
    return this.running;
  }
}

/* 动画计时器 */
export class AnimationTimer extends StopWatch {
  duration: number;
  transducer: (percent: number) => number;
  constructor(duration = 1000, transducer = AnimationTimer.makeLinear()) {
    super();
    this.duration = duration;
    this.transducer = transducer;
  }

  /* 时间抽扭曲 */
  public getElapsedTime() {
    /* 实际流逝的时间 */
    let elapsed = super.getElapsedTime();
    let percentComplete = elapsed / this.duration;

    if (!this.isRunning()) {
      return 0;
    }
    return elapsed * (this.transducer(percentComplete) / percentComplete);
  }

  /* 判断是否过期 */
  public isExpired() {
    return this.getElapsedTime() > this.duration;
  }

  /* 线性 */
  static makeLinear() {
    return function(percentComplete) {
      return percentComplete;
    };
  }

  /* 淡入 */
  static makeEaseIn(strength = 1) {
    return function(percentComplete) {
      return Math.pow(percentComplete, strength * 2);
    };
  }

  /* 淡出 */
  static makeEaseOut(strength = 1) {
    return function(percentComplete) {
      return 1 - Math.pow(1 - percentComplete, strength * 2);
    };
  }

  /* 淡入淡出 */
  static makeEaseInOut() {
    return function(percentComplete) {
      return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI);
    };
  }

  /* 弹簧 */
  static makeElastic(passes = 3) {
    return function(percentComplete) {
      return (1 - Math.cos(percentComplete * Math.PI * passes)) * (1 - percentComplete) + percentComplete;
    };
  }

  /* 弹跳 */
  static makeBounce(bounces) {
    let fn = AnimationTimer.makeElastic(bounces);
    return function(percentComplete) {
      percentComplete = fn(percentComplete);
      return percentComplete <= 1 ? percentComplete : 2 - percentComplete;
    };
  }
}

/* 游戏时间系统 */
class TimeSystem {
  public startTime: number;
  public isPaused: boolean;
  public pausedStartTime: number;
  public transducer: (now: number) => number;
  public stopWatch: StopWatch;
  private calculateStartTime: number;
  constructor() {
    this.startTime = 0;
    this.isPaused = false;
    this.pausedStartTime = 0;
    this.calculateStartTime = 0;
    this.stopWatch = new StopWatch();
    this.transducer = (elapsed: number) => elapsed;
  }

  /* 启动时间系统 */
  public start() {
    this.startTime = Date.now();
    this.calculateStartTime = this.startTime;
    this.stopWatch.start();
  }

  /* 暂停 */
  public paused() {
    if (!this.isPaused) {
      this.pausedStartTime = Date.now();
      this.isPaused = true;
    }
  }

  /* 恢复 */
  public unPaused() {
    if (this.isPaused) {
      let pausedElapsed = Date.now() - this.pausedStartTime;
      this.isPaused = false;
      this.pausedStartTime = 0;
      this.calculateStartTime -= pausedElapsed;
    }
  }
  /* 获取经过的时间 */
  public getElapsed() {
    let { stopWatch, calculateStartTime, transducer } = this;
    if (!stopWatch.isRunning()) {
      return 0;
    }
    let elapsed = Date.now() - calculateStartTime;
    if (typeof transducer === 'function') {
      elapsed = transducer(elapsed);
    }
    return elapsed;
  }

  /* 修改时间流逝传感器 */
  public setTransducer(transducerFunction: (now: number) => number, duration?: number) {
    let { transducer } = this;
    this.transducer = transducerFunction;
    if (Number.isFinite(duration)) {
      setTimeout(() => (this.transducer = transducer), duration);
    }
  }

  static;
}

export default TimeSystem;
