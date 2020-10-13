import { Store, CommitOptions } from 'vuex'

type message = [string, any?, CommitOptions?]

export class Queue<T> {
  private timerID: number;
  private queuedCommits: Array<message>;

  private static readonly defaultInterval: number = 800;

  constructor(
    private store: Store<T>,
    private interval: number = Queue.defaultInterval
  ) {
    this.queuedCommits = []
    this.timerID = setInterval(this.deliver.bind(this), this.interval)
  }

  public commit(type: string, payload?: any, options?: CommitOptions) {
    this.queuedCommits.push([type, payload, options])
    this.stop()
    this.timerID = setInterval(this.deliver.bind(this), this.interval)
  }

  public stop() {
    clearInterval(this.timerID)
  }

  private deliver() {
    if (this.queuedCommits.length > 0) {
      const [type, payload, options] = this.queuedCommits.shift()!
      this.store.commit(type, payload, options)
    }
  }
}
