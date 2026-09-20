import { useApp } from '../context/AppContext'
import { TOKEN } from '../data/farms'

const PROPOSALS = [
  {
    id: 'P-12',
    title: 'Renew Turnip pair incentives',
    status: 'Active',
    forPct: 72,
    ends: '2d 4h',
  },
  {
    id: 'P-11',
    title: 'Treasury diversification into seed',
    status: 'Active',
    forPct: 54,
    ends: '5d 11h',
  },
  {
    id: 'P-10',
    title: 'Sunset unused contributor allowances',
    status: 'Closed',
    forPct: 91,
    ends: 'Passed',
  },
]

export function Govern() {
  const { connected, openModal, pushToast } = useApp()

  return (
    <section className="sub-page">
      <h1>Govern</h1>
      <p className="lede">
        Vote on improvement proposals with your staked and vested {TOKEN}.
      </p>

      <div className="proposal-list">
        {PROPOSALS.map((p) => (
          <article key={p.id} className="proposal">
            <div className="proposal-top">
              <span className={p.status === 'Active' ? 'pill live' : 'pill'}>{p.status}</span>
              <span className="mono">{p.id}</span>
            </div>
            <h2>{p.title}</h2>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${p.forPct}%` }} />
            </div>
            <div className="proposal-meta">
              <span>{p.forPct}% For</span>
              <span>{p.ends}</span>
            </div>
            {p.status === 'Active' && (
              <button
                type="button"
                className="btn primary"
                disabled={!connected}
                onClick={() => {
                  openModal({ kind: 'vote', title: p.title })
                  pushToast(`Opened ${p.id}`)
                }}
              >
                Vote
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
