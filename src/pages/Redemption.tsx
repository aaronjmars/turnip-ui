import { useState } from 'react'
import turnip from '../assets/turnip.png'
import turnipPale from '../assets/turnip-pale.png'
import { useApp } from '../context/AppContext'
import { formatAmt, TOKEN, TOKEN_V2 } from '../data/farms'

export function Redemption() {
  const { connected, tokenBal, pushToast, busy } = useApp()
  const [amount, setAmount] = useState('')
  const n = Number(amount)
  const valid = connected && Number.isFinite(n) && n > 0 && n <= tokenBal + 1e-9

  return (
    <section className="sub-page">
      <h1>Redemption</h1>
      <p className="lede">
        Migrate leftover {TOKEN} into {TOKEN_V2}. This demo records a local redeem.
      </p>

      <article className="redeem-card">
        <div className="redeem-row">
          <img src={turnip} alt="" />
          <span>From {TOKEN}</span>
          <strong>{formatAmt(tokenBal)}</strong>
        </div>
        <div className="field">
          <label htmlFor="red">Amount</label>
          <div className="amount-box">
            <input
              id="red"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            />
            <button
              type="button"
              className="max-btn"
              onClick={() => setAmount(String(tokenBal))}
              disabled={tokenBal === 0}
            >
              Max
            </button>
          </div>
        </div>
        <div className="redeem-row">
          <img src={turnipPale} alt="" />
          <span>To {TOKEN_V2}</span>
          <strong>{formatAmt(Number.isFinite(n) ? n : 0)}</strong>
        </div>
        <button
          type="button"
          className="btn primary wide"
          disabled={!valid || busy}
          onClick={() => pushToast(`Redeemed to ${TOKEN_V2}`)}
        >
          Redeem
        </button>
      </article>
    </section>
  )
}
