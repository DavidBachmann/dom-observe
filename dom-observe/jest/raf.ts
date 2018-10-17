const timeouts = new Map<() => void, number>()

const mockRaf = callback => {
  timeouts.set(
    callback,
    setTimeout(() => {
      timeouts.delete(callback)
      callback()
    })
  )
  return 0
}

(mockRaf as any).flush = () => {
  for (const [callback, timeout] of timeouts) {
    callback()
    clearTimeout(timeout)
  }
  timeouts.clear()
}

window.requestAnimationFrame = mockRaf
