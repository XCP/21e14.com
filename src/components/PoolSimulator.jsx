'use client'

import { useState } from 'react'

// XCP-69 pool at launch: the reserved supply slice paired with the raised XCP.
const TOKEN_RESERVE = 31_000_000
const XCP_RESERVE = 6_900
const FEE = 0.005 // 0.5% on XCP pairs
const XCP_USD = 1.54

const CIRCULATING = 69_000_000 // minted to the 69+ participants; 31M sits in the pool

const K = TOKEN_RESERVE * XCP_RESERVE
const OPEN_PRICE = XCP_RESERVE / TOKEN_RESERVE
const POOL_USD = XCP_RESERVE * XCP_USD // ~$10.6k of XCP on the quote side
// You cannot sell tokens that don't exist. Everything minted, valued at the
// opening price, is the real ceiling on sell pressure — about $23.6k.
const CIRCULATING_USD = CIRCULATING * OPEN_PRICE * XCP_USD

// The two directions have genuinely different ceilings. Sell pressure is capped
// by reality — you cannot sell tokens that were never minted — while buy pressure
// has no supply constraint, so it runs much further.
const MAX_SELL = Math.round(CIRCULATING_USD / 50) * 50
const MAX_BUY = 100_000

// Travel is quadratic so the common case ($16–$600) keeps real resolution while
// a whale-sized order is still reachable at the end of the track.
const TICKS = 100
const span = (pos) => (pos >= 0 ? MAX_BUY : MAX_SELL)
const toUsd = (pos) =>
  Math.sign(pos) *
  Math.round(((Math.abs(pos) / TICKS) ** 2 * span(pos)) / 5) *
  5
const toPos = (usd) =>
  Math.sign(usd) * Math.round(TICKS * Math.sqrt(Math.abs(usd) / span(usd)))

const VIZ_CSS = `
.viz-root { --series-xcp:#2a78d6; --series-token:#eb6834; }
@media (prefers-color-scheme: dark) {
  :root:where(:not([data-theme=light])) .viz-root { --series-xcp:#3987e5; --series-token:#d95926; }
}
:root[data-theme=dark] .viz-root { --series-xcp:#3987e5; --series-token:#d95926; }
`

// Reserve bars share one scale: the track spans 0–200% of each side's opening
// depth, so a reserve that GROWS is visible instead of pinned at full width.
const BAR_SPAN = 200

/**
 * The protocol's own swap, transcribed from counterparty-core
 * `lib/ledger/markets.py::compute_pool_output`:
 *   out = in·(1−fee)·reserve_out / (reserve_in + in·(1−fee))
 * with XCP_POOL_FEE_BPS = 50 (0.5% on XCP pairs).
 */
function poolOutput(reserveIn, reserveOut, input) {
  if (input <= 0) return 0
  const withFee = input * (1 - FEE)
  return (withFee * reserveOut) / (reserveIn + withFee)
}

const fmt = (n, d = 0) =>
  n.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  })

/**
 * Walks the constant-product curve. `usd` is what the trader brings, valued at
 * the pool's OPENING price — XCP when buying, tokens when selling. Valuing the
 * sell side at the opening price keeps it symmetric with the buy side and, more
 * importantly, well-defined at any size: you can always sell more tokens in, you
 * just get less and less XCP back. Parameterising by "XCP extracted" instead
 * would diverge as the ask approached the reserve.
 */
function trade(usd) {
  if (usd === 0) {
    return {
      token: TOKEN_RESERVE,
      xcp: XCP_RESERVE,
      price: OPEN_PRICE,
      slippage: 0,
      out: 0,
      valueOut: 0,
    }
  }

  if (usd > 0) {
    const xcpIn = usd / XCP_USD
    const tokensOut = poolOutput(XCP_RESERVE, TOKEN_RESERVE, xcpIn)
    const newXcp = XCP_RESERVE + xcpIn * (1 - FEE)
    const newToken = TOKEN_RESERVE - tokensOut
    const effective = xcpIn / tokensOut
    return {
      token: newToken,
      xcp: XCP_RESERVE + xcpIn,
      price: newXcp / newToken,
      slippage: (effective - OPEN_PRICE) / OPEN_PRICE,
      out: tokensOut,
      valueOut: tokensOut * OPEN_PRICE * XCP_USD,
    }
  }

  const tokensIn = Math.min(-usd / XCP_USD / OPEN_PRICE, CIRCULATING)
  const xcpOut = poolOutput(TOKEN_RESERVE, XCP_RESERVE, tokensIn)
  const newToken = TOKEN_RESERVE + tokensIn * (1 - FEE)
  const newXcp = XCP_RESERVE - xcpOut
  const effective = xcpOut / tokensIn
  return {
    token: TOKEN_RESERVE + tokensIn,
    xcp: newXcp,
    price: newXcp / newToken,
    slippage: (OPEN_PRICE - effective) / OPEN_PRICE,
    out: xcpOut,
    valueOut: xcpOut * XCP_USD,
  }
}

// Status palette — reserved, never reused for a series. Always icon + label.
const band = (s) =>
  s < 0.02
    ? { hex: '#0ca30c', icon: '●', label: 'negligible' }
    : s < 0.05
      ? { hex: '#fab219', icon: '▲', label: 'noticeable' }
      : s < 0.15
        ? { hex: '#ec835a', icon: '▲▲', label: 'expensive' }
        : { hex: '#d03b3b', icon: '■', label: 'punishing' }

const PRESETS = [
  { usd: 16, label: '$16', note: '25th pct' },
  { usd: 56, label: '$56', note: 'median buyer' },
  { usd: 184, label: '$184', note: '75th pct' },
  { usd: 590, label: '$590', note: '90th pct' },
  { usd: -MAX_SELL, label: 'dump it all', note: 'the entire float' },
  { usd: MAX_BUY, label: '$100k', note: 'whale bid' },
]

export function PoolSimulator() {
  // Dollars are the source of truth so preset buttons land exactly on the real
  // buyer percentiles; the slider position is derived from them.
  const [pressure, setPressure] = useState(0)
  const pos = toPos(pressure)
  const r = trade(pressure)

  const priceChange = (r.price - OPEN_PRICE) / OPEN_PRICE
  const status = band(Math.abs(r.slippage))
  const buying = pressure > 0

  const tokenPct = Math.min((r.token / TOKEN_RESERVE) * 100, BAR_SPAN)
  const xcpPct = Math.min((r.xcp / XCP_RESERVE) * 100, BAR_SPAN)

  return (
    <div className="viz-root my-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      {/* Inlined via dangerouslySetInnerHTML: React escapes quotes inside a JSX
          <style> child on the server but not the client, breaking hydration. */}
      <style dangerouslySetInnerHTML={{ __html: VIZ_CSS }} />

      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          The pool at launch
        </h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          31M tokens · 6,900 XCP · 0.5% fee
        </span>
      </div>
      <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
        Drag to push buy or sell pressure through it. The XCP side holds about $
        {fmt(POOL_USD)}; the {fmt(CIRCULATING / 1e6)}M tokens minted to
        participants are worth ${fmt(CIRCULATING_USD)} at the opening price, and
        that is the most that can ever be sold in.
      </p>

      {/* Hero: the price the pool is quoting */}
      <div className="mb-5 rounded-lg bg-zinc-50 p-4 text-center dark:bg-zinc-900/40">
        <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Pool price
        </div>
        <div className="mt-1 text-3xl font-bold tabular-nums text-zinc-900 dark:text-white">
          {r.price.toFixed(8)}{' '}
          <span className="text-base font-normal text-zinc-500 dark:text-zinc-400">
            XCP / token
          </span>
        </div>
        <div className="mt-1 text-sm tabular-nums text-zinc-600 dark:text-zinc-300">
          {priceChange >= 0 ? '+' : ''}
          {(priceChange * 100).toFixed(1)}% vs opening price
        </div>
      </div>

      {/* Reserves — categorical slots 1 & 2, direct-labeled so color never carries identity alone */}
      <div className="mb-5 space-y-3">
        {[
          {
            name: 'XCP reserve',
            color: 'var(--series-xcp)',
            pct: xcpPct,
            value: `${fmt(r.xcp)} XCP`,
          },
          {
            name: 'Token reserve',
            color: 'var(--series-token)',
            pct: tokenPct,
            value: `${fmt(r.token)} tokens`,
          },
        ].map((row) => (
          <div key={row.name}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: row.color }}
                />
                {row.name}
              </span>
              <span className="tabular-nums text-zinc-600 dark:text-zinc-400">
                {row.value}
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-700">
              <div
                className="h-full rounded-r-sm transition-all duration-150"
                style={{
                  width: `${(row.pct / BAR_SPAN) * 100}%`,
                  backgroundColor: row.color,
                }}
              />
              {/* opening-depth reference */}
              <div
                className="absolute inset-y-0 w-px bg-zinc-400 dark:bg-zinc-500"
                style={{ left: `${(100 / BAR_SPAN) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Hairline marks each reserve&rsquo;s opening depth.
        </p>
      </div>

      {/* What the trade actually did */}
      <div className="mb-5 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            You receive
          </div>
          <div className="mt-1 font-semibold tabular-nums text-zinc-900 dark:text-white">
            {pressure === 0
              ? '—'
              : buying
                ? `${fmt(r.out)} tokens`
                : `${fmt(r.out, 1)} XCP`}
          </div>
          {pressure !== 0 && (
            <div className="mt-0.5 text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              ≈ ${fmt(r.valueOut)} at the opening price
            </div>
          )}
        </div>
        <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Slippage + fee
          </div>
          <div
            className="mt-1 flex items-center gap-2 font-semibold tabular-nums"
            style={{ color: status.hex }}
          >
            <span aria-hidden="true">{status.icon}</span>
            <span>
              {pressure === 0 ? '—' : `${(r.slippage * 100).toFixed(1)}%`}
            </span>
          </div>
          {pressure !== 0 && (
            <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {status.label}
            </div>
          )}
        </div>
      </div>

      {/* Pressure slider */}
      <div className="flex items-center gap-3">
        <span className="w-14 text-right text-xs text-zinc-500 dark:text-zinc-400">
          sell all
        </span>
        <input
          type="range"
          min={-TICKS}
          max={TICKS}
          step={1}
          value={pos}
          onChange={(e) => setPressure(toUsd(parseInt(e.target.value, 10)))}
          className="flex-1"
          aria-label="Buy or sell pressure in US dollars"
        />
        <span className="w-14 text-xs text-zinc-500 dark:text-zinc-400">
          buy ${fmt(MAX_BUY / 1000)}k
        </span>
      </div>
      <div className="mt-2 text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {pressure === 0
          ? 'No pressure — the pool sits at its opening price'
          : `${buying ? 'Buying with' : 'Selling'} $${fmt(Math.abs(pressure))}`}
      </div>

      {/* Jump to the real buyer distribution */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.usd}
            type="button"
            onClick={() => setPressure(p.usd)}
            className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-400 dark:hover:text-white"
          >
            {p.label}{' '}
            <span className="text-zinc-400 dark:text-zinc-500">{p.note}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPressure(0)}
          className="rounded-md px-2.5 py-1 text-xs text-zinc-400 underline-offset-2 hover:underline dark:text-zinc-500"
        >
          reset
        </button>
      </div>

      <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        Push it all the way left: every token ever minted, dumped at once. The
        sellers collectively pull about $7,300 out of a $10,600 reserve, the
        price falls ~90%, and the pool is <em>still</em> quoting a bid with
        roughly 2,150 XCP left in it. That floor is the constant product, and it
        is why a locked pool can&rsquo;t be drained. Swap math is the
        protocol&rsquo;s own; dollar figures at ${XCP_USD}/XCP.
      </p>
    </div>
  )
}
