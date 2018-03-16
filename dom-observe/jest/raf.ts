const timeouts = new Map<() => void, number>()

const mockRaf = callback => {
  timeouts.set(
    callback,
    setTimeout(() => {
      timeouts.delete(callback)
      callback()
    })
  )
}

(mockRaf as any).flush = () => {
  for (const [callback, timeout] of timeouts) {
    callback()
    clearTimeout(timeout)
  }
  timeouts.clear()
}

declare let global : any
global.requestAnimationFrame = mockRaf
