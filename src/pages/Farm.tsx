import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import farmer from '../assets/farmer.png'
import seedling from '../assets/seedling.png'
import turnip from '../assets/turnip.png'
import droplet from '../assets/droplet.png'
import { useApp } from '../context/AppContext'
import { formatAmt, getFarm } from '../data/farms'

export function Farm() {
  const { id } = useParams()
  const farm = getFarm(id)
  const {
    connected,
    positions,
    approve,
    openModal,
    bannerHidden,
    hideBanner,
    busy,
  } = useApp()
  const pos = positions[farm.id]
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const t = window.setTimeout(() => setLoaded(true), 1400)
    return () => window.clearTimeout(t)
  }, [farm.id])

  const showBanner = !bannerHidden[farm.id]

  return (
    <section className="farm-page">
      <img src={farmer} alt="" className="farmer" />
      <h1>Farm</h1>
      <p className="lede">{farm.farmSubtitle}</p>

      {showBanner && (
        <div className="notice">
          <img src={droplet} alt="" className="notice-icon" />
          <p>{farm.notice}</p>
          <button type="button" className="liq-btn">
            Add Liquidity
          </button>
          <button
            type="button"
            className="icon-x"
            aria-label="Dismiss"
            onClick={() => hideBanner(farm.id)}
          >
            <XIcon />
          </button>
        </div>
      )}

      <div className="tvl-card">
        {loaded ? (
          <>
            <h2>{farm.tvl}</h2>
            <p>{farm.apr} APR</p>
          </>
        ) : (
          <>
            <h2>Loading TVL...</h2>
            <p>Loading APR...</p>
          </>
        )}
      </div>

      <div className="pair">
        <article className="stat-card">
          <img src={seedling} alt="" />
          <div className="stat-val">{formatAmt(pos.staked)}</div>
          <p>{farm.stakeLabel}</p>
          <div className="stat-actions">
            <button
              type="button"
              className="btn ghost"
              disabled={!connected}
              onClick={() => openModal({ kind: 'unstake', farmId: farm.id })}
            >
              Unstake
            </button>
            {pos.approved ? (
              <button
                type="button"
                className="btn primary"
                disabled={!connected || pos.walletLp === 0}
                onClick={() => openModal({ kind: 'stake', farmId: farm.id })}
              >
                Stake
              </button>
            ) : (
              <button
                type="button"
                className="btn primary"
                disabled={!connected || busy}
                onClick={() => approve(farm.id)}
              >
                {busy ? 'Approving...' : 'Approve staking'}
              </button>
            )}
          </div>
        </article>

        <article className="stat-card">
          <img src={turnip} alt="" />
          <div className="stat-val">{formatAmt(pos.earned)}</div>
          <p>{farm.rewardLabel}</p>
          <button
            type="button"
            className="btn ghost wide"
            disabled={!connected}
            onClick={() => openModal({ kind: 'harvest', farmId: farm.id })}
          >
            Harvest
          </button>
        </article>
      </div>
    </section>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      <path
        d="M3.2 3.2a.8.8 0 0 1 1.1 0L8 6.9l3.7-3.7a.8.8 0 0 1 1.1 1.1L9.1 8l3.7 3.7a.8.8 0 1 1-1.1 1.1L8 9.1l-3.7 3.7a.8.8 0 1 1-1.1-1.1L6.9 8 3.2 4.3a.8.8 0 0 1 0-1.1z"
        fill="currentColor"
      />
    </svg>
  )
}
