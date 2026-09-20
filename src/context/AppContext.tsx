import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { FARMS, type FarmId } from '../data/farms'

export const MOCK_ADDRESS = '0x1111111111111111111111111111111111111111'

export type Toast = { id: number; text: string }

export type FarmPosition = {
  approved: boolean
  staked: number
  earned: number
  walletLp: number
}

type Positions = Record<FarmId, FarmPosition>

type Theme = 'light' | 'dark'

type Modal =
  | { kind: 'stake'; farmId: FarmId }
  | { kind: 'unstake'; farmId: FarmId }
  | { kind: 'harvest'; farmId: FarmId }
  | { kind: 'delegate' }
  | { kind: 'claim' }
  | { kind: 'vote'; title: string }
  | null

type AppCtx = {
  theme: Theme
  toggleTheme: () => void
  connected: boolean
  address: string
  connect: () => void
  disconnect: () => void
  positions: Positions
  tokenBal: number
  tokenV2: number
  vestedDelegator: number
  vestedMigrated: number
  delegatedTo: string | null
  approve: (id: FarmId) => void
  stake: (id: FarmId, amount: number) => void
  unstake: (id: FarmId, amount: number) => void
  harvest: (id: FarmId) => void
  claimToken: () => void
  delegateTo: (addr: string) => void
  bannerHidden: Record<string, boolean>
  hideBanner: (id: string) => void
  toasts: Toast[]
  pushToast: (text: string) => void
  modal: Modal
  openModal: (m: Modal) => void
  closeModal: () => void
  busy: boolean
}

const AppContext = createContext<AppCtx | null>(null)

function emptyPositions(): Positions {
  return Object.fromEntries(
    FARMS.map((f) => [
      f.id,
      { approved: false, staked: 0, earned: 0, walletLp: 12.48 },
    ]),
  ) as Positions
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme-pref')
    return saved === 'dark' ? 'dark' : 'light'
  })
  const [connected, setConnected] = useState(false)
  const [positions, setPositions] = useState<Positions>(emptyPositions)
  const [tokenBal, setTokenBal] = useState(0)
  const [tokenV2] = useState(0)
  const [vestedDelegator] = useState(0)
  const [vestedMigrated, setVestedMigrated] = useState(0)
  const [delegatedTo, setDelegatedTo] = useState<string | null>(null)
  const [bannerHidden, setBannerHidden] = useState<Record<string, boolean>>({})
  const [toasts, setToasts] = useState<Toast[]>([])
  const [modal, setModal] = useState<Modal>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme-pref', theme)
  }, [theme])

  useEffect(() => {
    const t = window.setInterval(() => {
      setPositions((prev) => {
        let changed = false
        const next = { ...prev }
        for (const id of Object.keys(next) as FarmId[]) {
          if (next[id].staked > 0) {
            changed = true
            next[id] = {
              ...next[id],
              earned: next[id].earned + next[id].staked * 0.00008,
            }
          }
        }
        return changed ? next : prev
      })
    }, 2500)
    return () => window.clearInterval(t)
  }, [])

  const pushToast = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, text }])
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 2800)
  }, [])

  const runTx = useCallback(
    async (label: string, fn: () => void) => {
      setBusy(true)
      await new Promise((r) => setTimeout(r, 700))
      fn()
      setBusy(false)
      setModal(null)
      pushToast(label)
    },
    [pushToast],
  )

  const value = useMemo<AppCtx>(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
      connected,
      address: MOCK_ADDRESS,
      connect: () => {
        setConnected(true)
        pushToast('Wallet connected')
      },
      disconnect: () => {
        setConnected(false)
        pushToast('Wallet disconnected')
      },
      positions,
      tokenBal,
      tokenV2,
      vestedDelegator,
      vestedMigrated,
      delegatedTo,
      approve: (id) => {
        void runTx('Staking approved', () => {
          setPositions((p) => ({ ...p, [id]: { ...p[id], approved: true } }))
        })
      },
      stake: (id, amount) => {
        void runTx(`Staked ${amount.toFixed(4)} LP`, () => {
          setPositions((p) => {
            const cur = p[id]
            const amt = Math.min(amount, cur.walletLp)
            return {
              ...p,
              [id]: {
                ...cur,
                staked: cur.staked + amt,
                walletLp: cur.walletLp - amt,
              },
            }
          })
        })
      },
      unstake: (id, amount) => {
        void runTx(`Unstaked ${amount.toFixed(4)} LP`, () => {
          setPositions((p) => {
            const cur = p[id]
            const amt = Math.min(amount, cur.staked)
            return {
              ...p,
              [id]: {
                ...cur,
                staked: cur.staked - amt,
                walletLp: cur.walletLp + amt,
              },
            }
          })
        })
      },
      harvest: (id) => {
        void runTx('Harvested Turnip', () => {
          setPositions((p) => {
            const earned = p[id].earned
            setTokenBal((y) => y + earned)
            return { ...p, [id]: { ...p[id], earned: 0 } }
          })
        })
      },
      claimToken: () => {
        void runTx('Claimed vested Turnip', () => {
          setTokenBal((y) => y + vestedMigrated)
          setVestedMigrated(0)
        })
      },
      delegateTo: (addr) => {
        void runTx('Votes delegated', () => setDelegatedTo(addr))
      },
      bannerHidden,
      hideBanner: (id) => setBannerHidden((b) => ({ ...b, [id]: true })),
      toasts,
      pushToast,
      modal,
      openModal: setModal,
      closeModal: () => setModal(null),
      busy,
    }),
    [
      theme,
      connected,
      positions,
      tokenBal,
      tokenV2,
      vestedDelegator,
      vestedMigrated,
      delegatedTo,
      bannerHidden,
      toasts,
      modal,
      busy,
      pushToast,
      runTx,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
