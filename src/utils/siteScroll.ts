/**
 * Native document scrolling with a gently damped destination.
 * Touch input and reduced-motion preferences keep the browser's native behavior.
 */
export function initializeSiteScroll() {
  const root = document.documentElement
  if (root.dataset.siteScroll) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const finePointer = window.matchMedia('(any-pointer: fine)')
  const wheelDamping = 280
  const keyboardDamping = 100
  let frame = 0
  let position = window.scrollY
  let destination = window.scrollY
  let lastWritten = window.scrollY
  let direction = 0
  let lastFrame = 0
  let damping = wheelDamping

  const scrollLimit = () =>
    Math.max(0, (document.scrollingElement?.scrollHeight ?? 0) - window.innerHeight)

  function cancel() {
    window.cancelAnimationFrame(frame)
    frame = 0
    direction = 0
    position = destination = lastWritten = window.scrollY
    delete root.dataset.siteScrollRunning
  }

  function updatePreference() {
    cancel()
    root.dataset.siteScroll = reducedMotion.matches || !finePointer.matches ? 'native' : 'smooth'
  }

  function blocked() {
    if (root.dataset.siteScroll !== 'smooth' || document.hidden || document.querySelector('dialog[open]')) {
      return true
    }

    const locked = (element: HTMLElement) =>
      ['hidden', 'clip'].includes(window.getComputedStyle(element).overflowY)

    return locked(root) || locked(document.body)
  }

  function usesNativeScroll(event: Event) {
    for (const node of event.composedPath()) {
      if (!(node instanceof HTMLElement) || node === root || node === document.body) continue

      if (
        node.matches(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), video, audio, iframe, object, embed, [data-scroll-native]',
        )
      ) {
        return true
      }

      const style = window.getComputedStyle(node)
      if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1) {
        return true
      }
    }

    return false
  }

  function render(now: number) {
    frame = 0

    if (blocked() || Math.abs(window.scrollY - lastWritten) > 2) {
      cancel()
      return
    }

    const maximum = scrollLimit()
    destination = Math.max(0, Math.min(maximum, destination))
    const elapsed = Math.max(0, now - lastFrame)
    lastFrame = now
    position += (destination - position) * (1 - Math.exp(-elapsed / damping))

    const settled = Math.abs(destination - position) < 0.5
    if (settled) position = destination
    position = Math.max(0, Math.min(maximum, position))

    window.scrollTo({ top: position, left: window.scrollX, behavior: 'instant' })
    lastWritten = window.scrollY

    if (
      settled ||
      (position <= 0 && direction < 0) ||
      (position >= maximum && direction > 0)
    ) {
      cancel()
    } else {
      frame = window.requestAnimationFrame(render)
    }
  }

  function enqueue(distance: number, response = wheelDamping) {
    if (!Number.isFinite(distance) || !distance) return false

    const nextDirection = Math.sign(distance)
    if (direction && direction !== nextDirection) cancel()
    if (
      (window.scrollY <= 0 && distance < 0) ||
      (window.scrollY >= scrollLimit() && distance > 0)
    ) {
      cancel()
      return false
    }

    if (!frame) {
      position = destination = lastWritten = window.scrollY
      lastFrame = performance.now()
    }

    direction = nextDirection
    damping = response
    destination = Math.max(0, Math.min(scrollLimit(), destination + distance))
    root.dataset.siteScrollRunning = 'true'
    if (!frame) frame = window.requestAnimationFrame(render)
    return true
  }

  window.addEventListener(
    'wheel',
    (event) => {
      if (
        event.defaultPrevented ||
        !event.cancelable ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        blocked() ||
        usesNativeScroll(event) ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        cancel()
        return
      }

      const pixels =
        event.deltaY *
        (event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 40
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1)

      if (enqueue(pixels)) event.preventDefault()
    },
    { passive: false },
  )

  window.addEventListener('keydown', (event) => {
    if (
      event.defaultPrevented ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      blocked() ||
      usesNativeScroll(event)
    ) {
      cancel()
      return
    }

    const target = event.target instanceof Element ? event.target : null
    if (
      target?.closest(
        'button, a, [role="button"], [role="slider"], [role="tab"], [role="listbox"], [role="menu"]',
      )
    ) {
      cancel()
      return
    }

    const distances: Record<string, number> = {
      ArrowDown: 50,
      ArrowUp: -50,
      PageDown: window.innerHeight * 0.9,
      PageUp: -window.innerHeight * 0.9,
      ' ': window.innerHeight * (event.shiftKey ? -0.9 : 0.9),
      Home: -window.scrollY,
      End: scrollLimit() - window.scrollY,
    }

    if (!Object.hasOwn(distances, event.key) || (event.shiftKey && event.key !== ' ')) {
      cancel()
      return
    }

    if (event.key === 'Home' || event.key === 'End') cancel()
    if (enqueue(distances[event.key], keyboardDamping)) event.preventDefault()
  })

  document.addEventListener('pointerdown', cancel, { capture: true, passive: true })
  document.addEventListener('touchstart', cancel, { capture: true, passive: true })
  document.addEventListener('click', cancel, { capture: true, passive: true })

  for (const eventName of [
    'blur',
    'pagehide',
    'pageshow',
    'hashchange',
    'popstate',
    'resize',
    'massage:scroll-cancel',
  ]) {
    window.addEventListener(eventName, cancel)
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancel()
  })
  reducedMotion.addEventListener('change', updatePreference)
  finePointer.addEventListener('change', updatePreference)
  updatePreference()
}
