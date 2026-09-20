import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import chef from '../assets/chef.png'
import { FARMS, type FarmId } from '../data/farms'

export function Dashboard() {
  const navigate = useNavigate()
  const [hover, setHover] = useState<FarmId | null>(null)
  const selected = hover ?? 'picnic-roll'

  return (
    <section className="dishes">
      <img src={chef} alt="Chef" className="chef" />
      <h1 className="script">Select Your Favorite Dishes</h1>
      <p className="lede">Earn Turnip tokens by staking LP Tokens.</p>

      <div className="dish-grid">
        {FARMS.map((farm) => {
          const on = farm.id === selected
          return (
            <article
              key={farm.id}
              className={on ? 'dish selected' : 'dish'}
              onMouseEnter={() => setHover(farm.id)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="dish-icon">
                <img src={farm.icon} alt="" />
              </div>
              <h2>{farm.name}</h2>
              <p>
                {farm.deposit}
                <br />
                {farm.earn}
              </p>
              <button type="button" className="select-btn" onClick={() => navigate(`/farm/${farm.id}`)}>
                Select
              </button>
              <div className="apy">
                <span>APY</span>
                <span>{farm.apy}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
