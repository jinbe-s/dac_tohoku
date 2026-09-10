/**
 * 開催回ごとのイベント情報（Single Source of Truth）
 *
 * トップページの開催情報カードと、スタッフ/過去の開催ページのアーカイブ欄が
 * どちらもここを参照する。開催が終わった回の情報を残しつつ、二重管理を避けるためのもの。
 *
 * 次回の開催情報を公開するときは
 *   1. EDITIONS に新しい回を status: 'upcoming' で追加
 *   2. DISPLAY_EDITION を新しい回に変更
 *   3. 終了した回を ARCHIVED_EDITIONS の先頭に追加
 * の3点で切り替わる。トップページの終了バナーは status から自動で出し分けられるため、
 * 別途フラグを消して回る必要はない。
 */

export type EditionKey = '2026'

export type EditionFee = {
  title: string
  price: string
  text?: string
}

export type EventEdition = {
  key: EditionKey
  year: number
  /** 'DAC東北 2026' */
  name: string
  /** 開催が終わっているか。トップページの終了バナーの出し分けに使う */
  status: 'upcoming' | 'closed'
  /** 開催日時（表示用） */
  dateText: string
  /** 開場・開会式などの補足（表示用） */
  dateSubText: string
  venue: {
    name: string
    /** 部屋名。会場名と改行して並べて表示する */
    room: string
    /** 表示用の住所 */
    address: string
    /** 以下は構造化データ用に分解したもの */
    postalCode: string
    region: string
    locality: string
    street: string
  }
  /** アクセス（表示用） */
  accessText: string
  /** 参加費の1行サマリ（表示用） */
  feeText: string
  /** 参加費カード用 */
  fees: EditionFee[]
  /** 過去の開催のアーカイブページのパス（app/pages/[year]/index.vue） */
  sessionsPath: string
  /**
   * 開催実績。開催後は変わらない事実なので、会場や日程と同じく固定値で持つ。
   * 卓一覧JSONの取得可否に関わらず表示できるようにする狙いもある。
   */
  stats: {
    /** 卓数。public/data/sessions_<年>.json の件数 */
    sessionCount: number
    /** DM/GM人数。同JSONの dm_name を重複除去した数（複数卓を担当した人は1人と数える） */
    gmCount: number
    /**
     * 参加プレイヤー実人数。public/data/sessions_<年>.json の players を重複除去した数。
     * 申込後のキャンセルが発生するため、名簿(players_<年>.json)ではなく
     * 実際に卓へ着いた players 側を正とする。「（キャンセル）」付きは除外する。
     */
    playerCount: number
    /** 参加プレイヤー延べ人数。同 players の総数（両日参加は2件と数える。キャンセル除く） */
    playerEntryCount: number
  }
  /** 構造化データ用の開始・終了日時（ISO / JST） */
  startDate: string
  endDate: string
  description: string
}

const edition2026: EventEdition = {
  key: '2026',
  year: 2026,
  name: 'DAC東北 2026',
  status: 'closed',
  dateText: '2026年5月30日(土)・5月31日(日) 10:00〜19:00',
  dateSubText: '開場 9:30／開会式 10:00／閉会式 18:30',
  venue: {
    name: '東京エレクトロンホール宮城',
    room: '会議室棟 601・602会議室',
    address: '宮城県仙台市青葉区国分町3-3-7',
    postalCode: '980-0803',
    region: '宮城県',
    locality: '仙台市青葉区',
    street: '国分町3-3-7'
  },
  accessText: '仙台市営地下鉄南北線「勾当台公園駅」下車\n（「公園出口2」より徒歩5分）',
  feeText: 'DM・GM参加 ¥0 ／ 一般 ¥1,000 ／ 学生 ¥500',
  fees: [
    { title: 'GM/DM参加', price: '0', text: 'イベント参加費は不要' },
    { title: 'PL一般参加', price: '1,000', text: '当日受付で支払い' },
    { title: 'PL学生参加', price: '500', text: '要学生証提示' }
  ],
  sessionsPath: '/2026',
  // sessions_2026.json 由来: 24卓 / dm_name 21種 / players 有効 延べ105・実80
  // 実80名の内訳は PL番号あり79名 + 番号なし1名（うどん）。
  // うどんはスタッフだが空席にプレイヤーとして入ったため、参加人数に含めている。
  // そのため参加卓一覧(79行)とは1名ぶん数が異なる。
  // 名簿 players_2026.json の有効79名と PL番号は完全に一致している。
  stats: {
    sessionCount: 24,
    gmCount: 21,
    playerCount: 80,
    playerEntryCount: 105
  },
  startDate: '2026-05-30T10:00:00+09:00',
  endDate: '2026-05-31T18:20:00+09:00',
  description:
    '宮城県仙台市で開催する、D20システムを楽しむTRPGコンベンション「DAC東北」。D&D、Pathfinderなどのシステムで様々なセッションをお楽しみいただけます。'
}

export const EDITIONS: Record<EditionKey, EventEdition> = {
  '2026': edition2026
}

/** トップページが表示している開催回 */
export const DISPLAY_EDITION: EditionKey = '2026'

/** 過去の開催として掲載する回（新しい順） */
export const ARCHIVED_EDITIONS: EditionKey[] = ['2026']

export const getEdition = (key: EditionKey): EventEdition => EDITIONS[key]
