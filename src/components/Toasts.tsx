import { useApp } from '../context/AppContext'

export function Toasts() {
  const { toasts } = useApp()
  if (!toasts.length) return null
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.text}
        </div>
      ))}
    </div>
  )
}
