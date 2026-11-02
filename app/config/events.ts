export type PhaseKey = 'GM1' | 'GM2' | 'PL1' | 'PL2'
export type Range = { start: string; end: string } // ISO推奨（JST +09:00）

export const PHASES: Partial<Record<PhaseKey, Range>> = {
  GM1: { start: '2027-01-16T00:00:00+09:00', end: '2027-02-14T23:59:59+09:00' },
  PL1: { start: '2027-02-23T00:00:00+09:00', end: '2027-03-22T23:59:59+09:00' },
}

// 表示順の既定（重複時の並び順に使う）
export const PHASE_ORDER: PhaseKey[] = ['GM1', 'GM2', 'PL1', 'PL2']
