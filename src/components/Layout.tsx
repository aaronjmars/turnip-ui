import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
