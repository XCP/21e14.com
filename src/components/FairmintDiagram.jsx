'use client'

import { useState } from 'react'

export function FillMeter({ standard = '69' }) {
  const config =
    standard === '420'
      ? {
          supply: '10M',
          softPct: 50,
          softLabel: '5M',
          hardLabel: '10M',
          minSoft: 50,
          minHard: 100,
          xcp: '1,000',
          mode: 'burned',
        }
      : standard === 'pool'
        ? {
            supply: '100M',
            softPct: 100,
            softLabel: '69M',
            hardLabel: '69M',
            minSoft: 69,
            minHard: 69,
            xcp: '6,900',
            mode: 'pooled',
          }
        : {
            supply: '100M',
            softPct: 69,
            softLabel: '69M',
            hardLabel: '100M',
            minSoft: 69,
            minHard: 100,
            xcp: '6,900',
            mode: 'pooled',
          }

  const [participants, setParticipants] = useState(0)
  const maxParticipants = config.minHard + 20
  const fillPct = Math.min((participants / config.minHard) * 100, 100)
  const softReached = participants >= config.minSoft
  const hardReached = participants >= config.minHard

  const fillColor = hardReached
    ? '#22c55e'
    : softReached
      ? '#3b82f6'
      : '#ef4444'

  const statusText = hardReached
    ? `MINTED OUT - ${config.xcp} XCP ${config.mode}`
    : softReached
      ? `SOFT CAP CLEARED - Will launch with ${config.mode} XCP`
      : `${config.minSoft - participants} more addresses needed for soft cap`

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {standard === 'pool' ? 'XCP-69' : `XCP-${standard}`} Launch Progress
        </h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {config.supply} supply, 1% max/address
        </span>
      </div>

      {/* The meter */}
      <div className="relative mb-2 h-12 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-700">
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-300 ease-out"
          style={{
            width: `${fillPct}%`,
            backgroundColor: fillColor,
            opacity: 0.8,
          }}
        />

        {/* Soft cap line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-yellow-500"
          style={{ left: `${config.softPct}%` }}
        >
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-yellow-600 dark:text-yellow-400">
            Soft Cap ({config.softPct}%)
          </span>
        </div>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-zinc-800 drop-shadow-sm dark:text-zinc-100">
            {participants} / {config.minHard} addresses ({fillPct.toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* Status */}
      <div
        className="mb-4 text-center text-sm font-medium"
        style={{ color: fillColor }}
      >
        {statusText}
      </div>

      {/* Slider */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">0</span>
        <input
          type="range"
          min="0"
          max={maxParticipants}
          value={participants}
          onChange={(e) => setParticipants(parseInt(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {maxParticipants}
        </span>
      </div>
      <p className="mt-1 text-center text-xs text-zinc-400">
        Drag to simulate participant count
      </p>
    </div>
  )
}

export function ForkDiagram({ standard = '69' }) {
  const config =
    standard === '420'
      ? { xcp: '1,000', mode: 'burned', fee: '$0.04', coverage: '$200' }
      : standard === 'pool'
        ? {
            xcp: '6,900',
            mode: 'pooled',
            fee: 'one tx fee',
            coverage: '100 XCP',
          }
        : { xcp: '6,900', mode: 'pooled', fee: '$0.04', coverage: '$1,380' }

  return (
    <div className="my-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      <h3 className="mb-6 text-center text-lg font-semibold text-zinc-900 dark:text-white">
        {standard === 'pool' ? 'XCP-69' : `XCP-${standard}`} Outcome Tree
      </h3>

      <div className="flex flex-col items-center">
        {/* Minting period */}
        <div className="rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 dark:border-zinc-600 dark:bg-zinc-700">
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            Minting Period Ends
          </span>
        </div>

        {/* Arrow down */}
        <div className="my-2 text-zinc-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        {/* Question */}
        <div className="rounded-lg border-2 border-amber-400 bg-amber-50 px-6 py-3 dark:border-amber-600 dark:bg-amber-900/30">
          <span className="font-medium text-amber-800 dark:text-amber-200">
            Soft cap reached?
          </span>
        </div>

        {/* Fork */}
        <div className="mt-4 grid w-full max-w-lg grid-cols-2 gap-6">
          {/* Fail path */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-lg font-bold text-red-500">NO</span>
            <div className="w-full rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-center font-semibold text-red-700 dark:text-red-400">
                REFUND
              </p>
              <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">
                All XCP returned
              </p>
              <p className="mt-1 text-center text-xs text-red-500 dark:text-red-500">
                Cost: {config.fee} miner fee
              </p>
            </div>
          </div>

          {/* Success path */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-lg font-bold text-green-500">YES</span>
            <div className="w-full rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
              <p className="text-center font-semibold text-green-700 dark:text-green-400">
                {config.mode === 'pooled' ? 'POOL CREATED' : 'TOKENS LIVE'}
              </p>
              <p className="mt-2 text-center text-sm text-green-600 dark:text-green-400">
                {config.xcp} XCP {config.mode}
              </p>
              {config.mode === 'pooled' && (
                <p className="mt-1 text-center text-xs text-green-500 dark:text-green-500">
                  Instant liquidity from block 1
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Insurance framing */}
        <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-700/50">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
            Cost if it fails: <strong>{config.fee}</strong>, to commit{' '}
            <strong>{config.coverage}</strong>
            <br />
          </p>
        </div>
      </div>
    </div>
  )
}
