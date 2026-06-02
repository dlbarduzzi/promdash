import { useRef, useState } from "react"

function useCopyClipboard(text: string, timeout = 2000) {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const clipboardRef = useRef<HTMLDivElement>(null)

  function onMouseEnter() {
    if (!copied) {
      setHovered(() => true)
    }
  }

  function onMouseLeave() {
    setHovered(() => false)
  }

  function onCopied() {
    setCopied(() => true)
    setHovered(() => false)

    if (clipboardRef.current) {
      navigator.clipboard.writeText(text)
    }

    setTimeout(() => {
      setCopied(() => false)
    }, timeout)
  }

  return {
    copied,
    hovered,
    onCopied,
    setCopied,
    setHovered,
    onMouseEnter,
    onMouseLeave,
    clipboardRef,
  }
}

export { useCopyClipboard }
