import { useNavigate } from 'react-router-dom'
import turnip from '../assets/turnip.png'
import turnipPale from '../assets/turnip-pale.png'
import gift from '../assets/gift.png'
import butterfly from '../assets/butterfly.png'
import { useApp } from '../context/AppContext'
import { formatAmt, TOKEN, TOKEN_V2 } from '../data/farms'

export function User() {
  const navigate = useNavigate()
  const { tokenBal, tokenV2, vestedDelegator, vestedMigrated, openModal, connected } =
    useApp()

  return (
    <section className="user-page">
      <img src={turnip} alt="" className="hero-mark" />
      <h1>Your Page</h1>
      <p className="lede">Everything you have on turnip!</p>

      <div className="balances">
        <div className="bal">
          <img src={turnip} alt="" />
          <div>
            <div className="stat-val">{formatAmt(tokenBal)}</div>
            <p>{TOKEN} balance</p>
          </div>
        </div>
        <div className="bal">
          <img src={turnipPale} alt="" />
          <div>
            <div className="stat-val">{formatAmt(tokenV2)}</div>
            <p>{TOKEN_V2} balance</p>
          </div>
        </div>
      </div>

      <hr className="hairline" />

      <div className="balances">
        <div className="bal">
          <img src={gift} alt="" />
          <div>
            <div className="stat-val">{formatAmt(vestedDelegator)}</div>
            <p>Vested {TOKEN} (Delegator)</p>
          </div>
        </div>
        <div className="bal">
          <img src={butterfly} alt="" />
          <div>
            <div className="stat-val">{formatAmt(vestedMigrated)}</div>
            <p>Vested {TOKEN} (Migrated)</p>
          </div>
        </div>
      </div>

      <div className="user-actions">
        <div className="user-actions-left">
          <button type="button" className="btn ghost" onClick={() => navigate('/govern')}>
            Vote
          </button>
          <button
            type="button"
            className="btn ghost"
            disabled={!connected}
            onClick={() => openModal({ kind: 'delegate' })}
          >
            Delegate
          </button>
        </div>
        <button
          type="button"
          className="btn ghost"
          disabled={!connected}
          onClick={() => openModal({ kind: 'claim' })}
        >
          Claim {TOKEN}
        </button>
      </div>
    </section>
  )
}
