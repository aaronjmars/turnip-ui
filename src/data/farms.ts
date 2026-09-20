import sushi from '../assets/sushi.png'
import turtle from '../assets/turtle.png'
import snail from '../assets/snail.png'
import duck from '../assets/duck.png'
import gorilla from '../assets/gorilla.png'
import squid from '../assets/squid.png'

export const TOKEN = 'Turnip'
export const TOKEN_V2 = 'Turnip v2'

export type FarmId =
  | 'picnic-roll'
  | 'garden-turtle'
  | 'herb-snail'
  | 'roast-duck'
  | 'grove-gorilla'
  | 'broth-squid'

export type Farm = {
  id: FarmId
  name: string
  icon: string
  deposit: string
  earn: string
  apy: string
  farmSubtitle: string
  notice: string
  stakeLabel: string
  rewardLabel: string
  lpSymbol: string
  tvl: string
  apr: string
}

export const FARMS: Farm[] = [
  {
    id: 'picnic-roll',
    name: 'Picnic Roll',
    icon: sushi,
    deposit: 'Deposit Turnip LP',
    earn: `Earn ${TOKEN}`,
    apy: '1,888.13%',
    farmSubtitle: `Stake Turnip LP tokens and grow ${TOKEN}`,
    notice: `Deposit Turnip LP and come back here to stake!`,
    stakeLabel: 'Staked Turnip LP Tokens',
    rewardLabel: `Unharvested ${TOKEN}`,
    lpSymbol: 'Turnip LP',
    tvl: '$4,281,902',
    apr: '1,888.13%',
  },
  {
    id: 'garden-turtle',
    name: 'Garden Turtle',
    icon: turtle,
    deposit: 'Deposit Garden LP',
    earn: `Earn ${TOKEN}`,
    apy: '599.10%',
    farmSubtitle: `Stake Garden LP tokens and grow ${TOKEN}`,
    notice: 'Deposit Garden LP and come back here to stake!',
    stakeLabel: 'Staked Garden LP Tokens',
    rewardLabel: `Unharvested ${TOKEN}`,
    lpSymbol: 'Garden LP',
    tvl: '$1,902,441',
    apr: '599.10%',
  },
  {
    id: 'herb-snail',
    name: 'Herb Snail',
    icon: snail,
    deposit: 'Deposit Herb LP',
    earn: `Earn ${TOKEN}`,
    apy: '654.98%',
    farmSubtitle: `Stake Herb LP tokens and grow ${TOKEN}`,
    notice: 'Deposit Herb LP and come back here to stake!',
    stakeLabel: 'Staked Herb LP Tokens',
    rewardLabel: `Unharvested ${TOKEN}`,
    lpSymbol: 'Herb LP',
    tvl: '$2,118,774',
    apr: '654.98%',
  },
  {
    id: 'roast-duck',
    name: 'Roast Duck',
    icon: duck,
    deposit: 'Deposit Roast LP',
    earn: `Earn ${TOKEN}`,
    apy: '904.05%',
    farmSubtitle: `Stake Roast LP tokens and grow ${TOKEN}`,
    notice: 'Deposit Roast LP and come back here to stake!',
    stakeLabel: 'Staked Roast LP Tokens',
    rewardLabel: `Unharvested ${TOKEN}`,
    lpSymbol: 'Roast LP',
    tvl: '$1,447,330',
    apr: '904.05%',
  },
  {
    id: 'grove-gorilla',
    name: 'Grove Gorilla',
    icon: gorilla,
    deposit: 'Deposit Grove LP',
    earn: `Earn ${TOKEN}`,
    apy: '1,265.79%',
    farmSubtitle: `Stake Grove LP tokens and grow ${TOKEN}`,
    notice: 'Deposit Grove LP and come back here to stake!',
    stakeLabel: 'Staked Grove LP Tokens',
    rewardLabel: `Unharvested ${TOKEN}`,
    lpSymbol: 'Grove LP',
    tvl: '$882,109',
    apr: '1,265.79%',
  },
  {
    id: 'broth-squid',
    name: 'Broth Squid',
    icon: squid,
    deposit: 'Deposit Broth LP',
    earn: `Earn ${TOKEN}`,
    apy: '2,699.62%',
    farmSubtitle: `Stake Broth LP tokens and grow ${TOKEN}`,
    notice: 'Deposit Broth LP and come back here to stake!',
    stakeLabel: 'Staked Broth LP Tokens',
    rewardLabel: `Unharvested ${TOKEN}`,
    lpSymbol: 'Broth LP',
    tvl: '$640,228',
    apr: '2,699.62%',
  },
]

export function getFarm(id: string | undefined): Farm {
  return FARMS.find((f) => f.id === id) ?? FARMS[0]
}

export function formatAmt(n: number, digits = 4): string {
  if (!Number.isFinite(n) || n === 0) return '--'
  return n.toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: Math.min(2, digits),
  })
}

export function shortAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4).toUpperCase()}`
}
