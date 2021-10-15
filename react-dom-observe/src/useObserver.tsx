import { useRef, useEffect, useState, useCallback } from "react"
import BaseObserver from "dom-observe'"

type AnyHTMLElement = HTMLElementTagNameMap[keyof HTMLElementTagNameMap]

interface UseObserver {
  value: unknown
  context?: Record<string, unknown>
  onChange?: (state: unknown) => void
}

export const useObserver = ({ value, context = {}, onChange }: UseObserver) => {
  const [state, setState] = useState<unknown | null>(null)
  const ref = useRef<AnyHTMLElement | null>(null)
  const observer = useRef<BaseObserver | null>(null)

  const onValueChange = useCallback(
    (state) => {
      if (typeof onChange === "function") {
        onChange(state)
      }

      setState(state)
    },
    [state, onChange]
  )

  useEffect(() => {
    if (observer.current) {
      return
    }

    observer.current = new BaseObserver(value, {
      onChange: onValueChange,
      context: {
        rootElement: ref.current,
        ...context,
      },
    })

    return () => {
      observer.current = null
    }
  }, [observer, value, context])

  return [ref, state]
}
