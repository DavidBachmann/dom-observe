import React from 'react'
import Observer, { scrollY } from '../src'

export const name = 'Scroll Counter'

export const Example = () =>
  <div style={{ height: 3000 }}>
    <div style={{ position: 'fixed', top: 15, right: 15 }}>
      <Observer value={scrollY()}>
        {scrollY => `Scrolled ${scrollY}px`}
      </Observer>
    </div>
  </div>
