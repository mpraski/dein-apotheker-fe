import { Store, DispatchOptions } from 'vuex'

type message = [string, any?, DispatchOptions?]

export class Queue<T> {
  private timerID: number;
  private queuedActions: Array<message>;

  private static readonly defaultInterval: number = 300;

  constructor(
    private store: Store<T>,
    private interval: number = Queue.defaultInterval
  ) {
    this.queuedActions = []
    this.timerID = -1
  }

  public dispatch(type: string, payload?: any, options?: DispatchOptions) {
    this.queuedActions.push([type, payload, options])
    this.stop()
    this.timerID = setInterval(this.deliver.bind(this), this.interval)
  }

  public stop() {
    if (this.timerID === -1) return

    clearInterval(this.timerID)
  }

  private deliver() {
    if (this.queuedActions.length > 0) {
      const [type, payload, options] = this.queuedActions.shift()!
      this.store.dispatch(type, payload, options)
    }
  }
}
