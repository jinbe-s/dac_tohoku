export type Pl2Session = {
  table_id: string
  session_name: string
  dm_name: string
}

export const PL2_SESSIONS: Pl2Session[] = [
  { table_id: 'B-02', session_name: 'あなのなかにいる', dm_name: 'D16' },
  { table_id: 'B-06', session_name: 'Ever since in the watchtower', dm_name: 'ボルゾイ' },
  { table_id: 'B-08', session_name: '我、カニスの名においてこれを鋳造する。汝ら罪なし。', dm_name: 'めがねハロ' },
  { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)', dm_name: 'Fighter-KOU' },
]

export const PL2_TABLE_IDS: string[] = PL2_SESSIONS.map(s => s.table_id)
