import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { shortAddress } from '../data/farms'
import turnip from '../assets/turnip.png'
import sun from '../assets/sun.png'

const MORE_LINKS = [
  { href: '#source', label: 'Source' },
  { href: '#board', label: 'Board' },
  { href: '#social', label: 'Social' },
  { href: '#chat', label: 'Chat' },
  { href: '#journal', label: 'Journal' },
  { href: '#forum', label: 'Forum' },
  { href: '#docs', label: 'Docs' },
]

export function Header() {
  const { theme, toggleTheme, connected, address, connect, disconnect } = useApp()
  const [moreOpen, setMoreOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const walletRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    setMoreOpen(false)
    setWalletOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (moreRef.current && !moreRef.current.contains(t)) setMoreOpen(false)
      if (walletRef.current && !walletRef.current.contains(t)) setWalletOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <header className="topbar">
      <NavLink to="/" className="brand">
        <img src={turnip} alt="" className="brand-mark" />
        <span>Turnip</span>
      </NavLink>

      <nav className="nav" aria-label="Primary">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/redemption">Redemption</NavLink>
        <NavLink to="/govern">Govern</NavLink>
        <NavLink to="/user">User</NavLink>
        <div className="more" ref={moreRef}>
          <button
            type="button"
            className={moreOpen ? 'more-btn open' : 'more-btn'}
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((v) => !v)}
          >
            More
          </button>
          {moreOpen && (
            <div className="dropdown" role="menu">
              {MORE_LINKS.map((l) => (
                <a key={l.href} href={l.href} role="menuitem">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="top-actions">
        <button
          type="button"
          className="icon-pill"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <img src={sun} alt="" />
          ) : (
            <MoonIcon />
          )}
        </button>

        <div className="wallet-wrap" ref={walletRef}>
          {connected ? (
            <>
              <button
                type="button"
                className="wallet-pill"
                onClick={() => setWalletOpen((v) => !v)}
              >
                <span className="identicon" aria-hidden />
                {shortAddress(address)}
              </button>
              {walletOpen && (
                <div className="dropdown wallet-drop">
                  <button type="button" onClick={disconnect}>
                    Disconnect
                  </button>
                </div>
              )}
            </>
          ) : (
            <button type="button" className="wallet-pill connect" onClick={connect}>
              Connect
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        fill="currentColor"
        d="M15.2 2.1a.8.8 0 0 1 .9 1.2A8.7 8.7 0 1 0 20.7 16a.8.8 0 0 1 1.3.8A10.3 10.3 0 1 1 14.4 2.2c.3 0 .6 0 .8-.1z"
      />
    </svg>
  )
}
