import { useEffect, useMemo, useState } from "react"

type LogoMarkProps = {
  className?: string
  alt?: string
  src?: string
}

export function LogoMark({
  className,
  alt = "Monster Pizza",
  src = "/brand/logo-mark.png",
}: LogoMarkProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null)

  const cacheKey = useMemo(() => `logo_mark_processed:v5:${src}`, [src])

  useEffect(() => {
    const cached = window.sessionStorage.getItem(cacheKey)
    if (cached) {
      setProcessedSrc(cached)
      return
    }

    let cancelled = false

    const img = new Image()
    img.src = src

    img.onload = () => {
      if (cancelled) return

      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        setProcessedSrc(null)
        return
      }

      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const lumaThreshold = 170
      const neutralDelta = 80

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b

        const isNearNeutral = max - min <= neutralDelta

        if (isNearNeutral && luma >= lumaThreshold) {
          data[i + 3] = 0
        }
      }

      // Extra cleanup: remove light/neutral pixels close to the edges (thin line artifacts).
      const edgeMargin = 10
      const edgeLumaThreshold = 120
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const isEdge =
            x < edgeMargin ||
            y < edgeMargin ||
            x >= canvas.width - edgeMargin ||
            y >= canvas.height - edgeMargin

          if (!isEdge) continue

          const idx = (y * canvas.width + x) * 4
          const a = data[idx + 3]
          if (a === 0) continue

          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]

          const max = Math.max(r, g, b)
          const min = Math.min(r, g, b)
          const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
          const isNearNeutral = max - min <= neutralDelta

          if (isNearNeutral && luma >= edgeLumaThreshold) {
            data[idx + 3] = 0
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Auto-crop to non-transparent content to remove any remaining edge artifacts.
      const croppedData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = croppedData.data

      let minX = canvas.width
      let minY = canvas.height
      let maxX = -1
      let maxY = -1

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4
          const a = d[idx + 3]
          // Ignore very faint pixels so thin artifacts don't affect the crop.
          if (a > 60) {
            if (x < minX) minX = x
            if (y < minY) minY = y
            if (x > maxX) maxX = x
            if (y > maxY) maxY = y
          }
        }
      }

      if (maxX >= 0 && maxY >= 0) {
        const pad = 2
        minX = Math.max(0, minX - pad)
        minY = Math.max(0, minY - pad)
        maxX = Math.min(canvas.width - 1, maxX + pad)
        maxY = Math.min(canvas.height - 1, maxY + pad)

        const w = maxX - minX + 1
        const h = maxY - minY + 1

        const outCanvas = document.createElement("canvas")
        outCanvas.width = w
        outCanvas.height = h
        const outCtx = outCanvas.getContext("2d")

        if (outCtx) {
          outCtx.putImageData(ctx.getImageData(minX, minY, w, h), 0, 0)
          const out = outCanvas.toDataURL("image/png")
          window.sessionStorage.setItem(cacheKey, out)
          setProcessedSrc(out)
          return
        }
      }

      const out = canvas.toDataURL("image/png")
      window.sessionStorage.setItem(cacheKey, out)
      setProcessedSrc(out)
    }

    img.onerror = () => {
      if (cancelled) return
      setProcessedSrc(null)
    }

    return () => {
      cancelled = true
    }
  }, [cacheKey, src])

  return (
    <img
      src={processedSrc ?? src}
      alt={alt}
      className={className}
      style={processedSrc ? undefined : { mixBlendMode: "multiply" }}
      loading="eager"
    />
  )
}
