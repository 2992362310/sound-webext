type Handler = (event?: any) => void

class Mitt {
  private events: Map<string, Handler[]> = new Map()

  on(type: string, handler: Handler) {
    if (!this.events.has(type)) {
      this.events.set(type, [])
    }
    this.events.get(type)!.push(handler)
  }

  off(type: string, handler: Handler) {
    const handlers = this.events.get(type)
    if (handlers) {
      this.events.set(
        type,
        handlers.filter(h => h !== handler),
      )
    }
  }

  emit(type: string, event?: any) {
    const handlers = this.events.get(type)
    if (handlers) {
      handlers.forEach(handler => handler(event))
    }
  }
}

const mitt = new Mitt()

export default mitt
