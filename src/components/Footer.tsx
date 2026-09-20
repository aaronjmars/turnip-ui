const LINKS = [
  { href: '#source', label: 'Source' },
  { href: '#board', label: 'Board' },
  { href: '#social', label: 'Social' },
  { href: '#chat', label: 'Chat' },
  { href: '#journal', label: 'Journal' },
  { href: '#forum', label: 'Forum' },
  { href: '#docs', label: 'Docs' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      {LINKS.map((l) => (
        <a key={l.href} href={l.href}>
          {l.label}
        </a>
      ))}
    </footer>
  )
}
