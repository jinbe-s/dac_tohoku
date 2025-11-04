export type PhaseKey = 'GM1' | 'GM2' | 'PL1' | 'PL2'
export type Range = { start: string; end: string } // ISO推奨（JST +09:00）

export const PHASES: Partial<Record<PhaseKey, Range>> = {
  GM1: { start: '2025-11-05T00:00:00+09:00', end: '2026-02-18T23:59:59+09:00' },
  // MEMO: 変更
  // GM2: { start: '2026-03-08T00:00:00+09:00', end: '2026-03-21T23:59:59+09:00' },
  PL1: { start: '2026-03-08T00:00:00+09:00', end: '2026-03-29T23:59:59+09:00' },
	// PL2: { start: '2026-04-05T00:00:00+09:00', end: '2026-04-25T23:59:59+09:00' },
}

// 表示順の既定（重複時の並び順に使う）
export const PHASE_ORDER: PhaseKey[] = ['GM1', 'GM2', 'PL1', 'PL2']
