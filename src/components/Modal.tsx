import { useEffect, useState, type ReactNode } from 'react'
import { useApp } from '../context/AppContext'
import { formatAmt, getFarm, TOKEN } from '../data/farms'

export function ModalHost() {
  const {
    modal,
    closeModal,
    positions,
    stake,
    unstake,
    harvest,
    claimToken,
    delegateTo,
    vestedMigrated,
    busy,
  } = useApp()

  if (!modal) return null

  if (modal.kind === 'stake' || modal.kind === 'unstake') {
    const farm = getFarm(modal.farmId)
    const pos = positions[modal.farmId]
    const max = modal.kind === 'stake' ? pos.walletLp : pos.staked
    return (
      <AmountModal
        title={modal.kind === 'stake' ? `Stake ${farm.lpSymbol}` : `Unstake ${farm.lpSymbol}`}
        label={modal.kind === 'stake' ? 'Wallet LP' : 'Staked LP'}
        max={max}
        confirmLabel={modal.kind === 'stake' ? 'Stake' : 'Unstake'}
        busy={busy}
        onClose={closeModal}
        onConfirm={(n) =>
          modal.kind === 'stake' ? stake(modal.farmId, n) : unstake(modal.farmId, n)
        }
      />
    )
  }

  if (modal.kind === 'harvest') {
    const farm = getFarm(modal.farmId)
    const earned = positions[modal.farmId].earned
    return (
      <Sheet title="Harvest" onClose={closeModal}>
        <p className="modal-copy">
          Harvest {formatAmt(earned)} {TOKEN} from {farm.name}.
        </p>
        <div className="modal-actions">
          <button className="btn ghost" type="button" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn primary"
            type="button"
            disabled={busy || earned === 0}
            onClick={() => harvest(modal.farmId)}
          >
            {busy ? 'Confirming...' : 'Harvest'}
          </button>
        </div>
      </Sheet>
    )
  }

  if (modal.kind === 'claim') {
    return (
      <Sheet title={`Claim ${TOKEN}`} onClose={closeModal}>
        <p className="modal-copy">
          Claim {formatAmt(vestedMigrated)} vested {TOKEN} into your wallet.
        </p>
        <div className="modal-actions">
          <button className="btn ghost" type="button" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn primary"
            type="button"
            disabled={busy || vestedMigrated === 0}
            onClick={claimToken}
          >
            {busy ? 'Confirming...' : `Claim ${TOKEN}`}
          </button>
        </div>
      </Sheet>
    )
  }

  if (modal.kind === 'delegate') {
    return (
      <DelegateModal busy={busy} onClose={closeModal} onConfirm={delegateTo} />
    )
  }

  if (modal.kind === 'vote') {
    return (
      <Sheet title={modal.title} onClose={closeModal}>
        <p className="modal-copy">
          This demo records a local For vote.
        </p>
        <div className="modal-actions">
          <button className="btn ghost" type="button" onClick={closeModal}>
            Against
          </button>
          <button
            className="btn primary"
            type="button"
            onClick={() => {
              closeModal()
            }}
          >
            Vote For
          </button>
        </div>
      </Sheet>
    )
  }

  return null
}

function Sheet({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="sheet-title">{title}</h2>
        {children}
      </div>
    </div>
  )
}

function AmountModal({
  title,
  label,
  max,
  confirmLabel,
  busy,
  onClose,
  onConfirm,
}: {
  title: string
  label: string
  max: number
  confirmLabel: string
  busy: boolean
  onClose: () => void
  onConfirm: (n: number) => void
}) {
  const [value, setValue] = useState('')
  const n = Number(value)
  const valid = Number.isFinite(n) && n > 0 && n <= max + 1e-9

  return (
    <Sheet title={title} onClose={onClose}>
      <div className="field">
        <div className="field-row">
          <label htmlFor="amt">{label}</label>
          <span>
            {formatAmt(max)} available
          </span>
        </div>
        <div className="amount-box">
          <input
            id="amt"
            inputMode="decimal"
            placeholder="0.00"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ''))}
          />
          <button type="button" className="max-btn" onClick={() => setValue(String(max))}>
            Max
          </button>
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn ghost" type="button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn primary"
          type="button"
          disabled={!valid || busy}
          onClick={() => onConfirm(n)}
        >
          {busy ? 'Confirming...' : confirmLabel}
        </button>
      </div>
    </Sheet>
  )
}

function DelegateModal({
  busy,
  onClose,
  onConfirm,
}: {
  busy: boolean
  onClose: () => void
  onConfirm: (addr: string) => void
}) {
  const [addr, setAddr] = useState('')
  const ok = /^0x[a-fA-F0-9]{40}$/.test(addr)

  return (
    <Sheet title="Delegate votes" onClose={onClose}>
      <div className="field">
        <label htmlFor="del">Delegate address</label>
        <input
          id="del"
          className="text-input"
          placeholder="0x..."
          value={addr}
          onChange={(e) => setAddr(e.target.value.trim())}
        />
      </div>
      <div className="modal-actions">
        <button className="btn ghost" type="button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn primary"
          type="button"
          disabled={!ok || busy}
          onClick={() => onConfirm(addr)}
        >
          {busy ? 'Confirming...' : 'Delegate'}
        </button>
      </div>
    </Sheet>
  )
}
