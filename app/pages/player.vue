<template>
  <v-container class="py-10">
    <TextMainTitle title="参加卓一覧" />
    <p class="mt-4 mb-6 text-body-1">
      PL番号と参加卓をご確認ください。ご不明な点はお問い合わせフォームまたは公式X(旧Twitter)にてご連絡ください。
    </p>

    <!-- Discord誘導（上部） -->
    <v-card variant="tonal" color="primary" rounded="lg" class="mb-6 pt-2 pb-4 px-4">
      <div class="d-flex flex-column align-center text-center">
        <div class="text-body-1 font-weight-bold mb-2">参加者向けDiscordサーバーへのご参加をお願いします</div>
        <div class="text-body-2 mb-4">
          応募いただいた方は、連絡・情報共有のため公式Discordサーバーへご参加ください。
        </div>
        <v-btn
          href="https://discord.gg/v4Dwz6Px7"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          variant="elevated"
        >
          Discordサーバーに参加する
        </v-btn>
      </div>
    </v-card>

    <!-- 検索 -->
    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      label="PL番号・PL名で検索"
      variant="outlined"
      density="compact"
      clearable
      hide-details
      class="mb-4"
      style="max-width: 360px"
    />

    <!-- デスクトップ: テーブル表示 -->
    <div class="table-wrapper d-none d-md-block">
      <div class="table-scroll-container">
        <v-data-table
          :items="filteredPlayers"
          :headers="headers"
          hide-default-footer
          density="compact"
          :items-per-page="-1"
        >
          <template #headers="{ columns }">
            <tr>
              <th v-for="column in columns" :key="column.key">
                <div class="d-flex align-center justify-center font-weight-bold">
                  <span>{{ column.title }}</span>
                </div>
              </th>
            </tr>
          </template>

          <template #item="{ item }">
            <tr>
              <td class="text-center pl-num-col">{{ item.pl_number }}</td>
              <td class="pl-name-col">{{ item.pl_name }}</td>
              <td class="session-col">
                <template v-if="item.day1">
                  <span class="table-id-badge mr-1">{{ item.day1.table_id }}</span>
                  {{ item.day1.session_name }}
                </template>
                <span v-else class="text-medium-emphasis">―</span>
              </td>
              <td class="session-col">
                <template v-if="item.day2">
                  <span class="table-id-badge mr-1">{{ item.day2.table_id }}</span>
                  {{ item.day2.session_name }}
                </template>
                <span v-else class="text-medium-emphasis">―</span>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>

    <!-- モバイル: カード表示 -->
    <div class="d-md-none">
      <v-card
        v-for="item in filteredPlayers"
        :key="item.pl_number"
        variant="outlined"
        class="mb-3"
        rounded="lg"
      >
        <v-card-title class="player-card-header d-flex align-center ga-2 py-2 px-3">
          <span class="pl-num-chip">{{ item.pl_number }}</span>
          <span class="text-body-1 font-weight-bold">{{ item.pl_name }}</span>
        </v-card-title>
        <v-divider />
        <v-card-text class="py-2 px-3">
          <div class="d-flex flex-column ga-2">
            <div>
              <div class="day-label mb-1">1日目</div>
              <template v-if="item.day1">
                <span class="table-id-badge mr-1">{{ item.day1.table_id }}</span>
                <span class="text-body-2">{{ item.day1.session_name }}</span>
              </template>
              <span v-else class="text-medium-emphasis text-body-2">参加なし</span>
            </div>
            <v-divider />
            <div>
              <div class="day-label mb-1">2日目</div>
              <template v-if="item.day2">
                <span class="table-id-badge mr-1">{{ item.day2.table_id }}</span>
                <span class="text-body-2">{{ item.day2.session_name }}</span>
              </template>
              <span v-else class="text-medium-emphasis text-body-2">参加なし</span>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <p v-if="filteredPlayers.length === 0" class="text-center text-medium-emphasis mt-4">
        該当するPLが見つかりません
      </p>
    </div>

    <!-- Discord誘導 -->
    <v-card variant="tonal" color="primary" rounded="lg" class="mt-8 pt-2 pb-4 px-4">
      <div class="d-flex flex-column align-center text-center">
        <div class="text-body-1 font-weight-bold mb-2">参加者向けDiscordサーバーへのご参加をお願いします</div>
        <div class="text-body-2 mb-4">
          応募いただいた方は、連絡・情報共有のため公式Discordサーバーへご参加ください。
        </div>
        <v-btn
          href="https://discord.gg/v4Dwz6Px7"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          variant="elevated"
        >
          Discordサーバーに参加する
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
useSiteMeta({
  title: '参加卓一覧',
  description: 'DAC東北の参加卓一覧。PL番号・PL名と1日目・2日目の参加卓をご確認いただけます。',
  keywords: 'DAC東北,参加卓一覧,PL,プレイヤー,卓'
})

type SessionInfo = {
  table_id: string
  session_name: string
}

type PlayerEntry = {
  pl_number: string
  pl_name: string
  day1: SessionInfo | null
  day2: SessionInfo | null
}

// 参加者データ
const players: PlayerEntry[] = [
  { pl_number: 'PL-1',  pl_name: '繭',          day1: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' },                                      day2: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' } },
  { pl_number: 'PL-2',  pl_name: 'うにバター',   day1: null,                                                                                                       day2: { table_id: 'B-07', session_name: 'ＰＵＩＰＵＩモルカーレーシング～裏切りのバルターズゲート～' } },
  { pl_number: 'PL-3',  pl_name: 'カトー',       day1: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' },                                day2: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' } },
  { pl_number: 'PL-4',  pl_name: 'ヒカミソ',     day1: null,                                                                                                       day2: { table_id: 'B-03', session_name: 'D&D三国志「ドキッ！丸ごと虎牢関 女だらけの董卓討伐」' } },
  { pl_number: 'PL-5',  pl_name: 'ケイン',       day1: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' },                                      day2: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' } },
  { pl_number: 'PL-6',  pl_name: 'さくら',       day1: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' },                                day2: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' } },
  { pl_number: 'PL-7',  pl_name: 'メモリン',     day1: { table_id: 'A-08', session_name: '南海の死闘' },                                                           day2: { table_id: 'B-05', session_name: '5e「呪われしミストバロウ」' } },
  { pl_number: 'PL-8',  pl_name: 'ねこひろ',     day1: { table_id: 'A-05', session_name: "Queen's Blades" },                                                      day2: { table_id: 'B-10', session_name: '大白羽山の大迷宮' } },
  { pl_number: 'PL-9',  pl_name: 'シャオ',       day1: { table_id: 'A-03', session_name: '鰐神の涙（Dungeon #209掲載）' },                                          day2: null },
  { pl_number: 'PL-10', pl_name: 'いしざわ',     day1: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' },                                      day2: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' } },
  { pl_number: 'PL-11', pl_name: 'せきせいたろう', day1: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' },                                        day2: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' } },
  { pl_number: 'PL-12', pl_name: 'Mayuuta',     day1: { table_id: 'A-03', session_name: '鰐神の涙（Dungeon #209掲載）' },                                          day2: { table_id: 'B-01', session_name: "モンスターハンター × D&D『竜を蝕む毒』" } },
  { pl_number: 'PL-13', pl_name: 'え～じ',       day1: null,                                                                                                       day2: { table_id: 'B-03', session_name: 'D&D三国志「ドキッ！丸ごと虎牢関 女だらけの董卓討伐」' } },
  { pl_number: 'PL-14', pl_name: 'ATグンソー',   day1: { table_id: 'A-03', session_name: '鰐神の涙（Dungeon #209掲載）' },                                          day2: null },
  { pl_number: 'PL-15', pl_name: 'からくり',     day1: { table_id: 'A-04', session_name: 'D&D三国志「長坂坡異聞」' },                                               day2: { table_id: 'B-10', session_name: '大白羽山の大迷宮' } },
  { pl_number: 'PL-16', pl_name: 'Ange',        day1: { table_id: 'A-08', session_name: '南海の死闘' },                                                           day2: { table_id: 'B-04', session_name: 'ファルコヴニア奇譚' } },
  { pl_number: 'PL-17', pl_name: 'たつみ',       day1: { table_id: 'A-06', session_name: 'Historica Arcanum: Empires of the Silk Road' },                         day2: null },
  { pl_number: 'PL-18', pl_name: 'ほりび',       day1: null,                                                                                                       day2: { table_id: 'B-03', session_name: 'D&D三国志「ドキッ！丸ごと虎牢関 女だらけの董卓討伐」' } },
  { pl_number: 'PL-19', pl_name: 'ルイーズ',     day1: { table_id: 'A-06', session_name: 'Historica Arcanum: Empires of the Silk Road' },                         day2: { table_id: 'B-07', session_name: 'ＰＵＩＰＵＩモルカーレーシング～裏切りのバルターズゲート～' } },
  { pl_number: 'PL-20', pl_name: 'ZoE',         day1: { table_id: 'A-09', session_name: '探偵！ファイトスクープ  天空の片道切符編' },                                day2: null },
  { pl_number: 'PL-21', pl_name: 'すずき',       day1: { table_id: 'A-02', session_name: 'DRIVE A LIVE' },                                                        day2: { table_id: 'B-08', session_name: '我、カニスの名においてこれを鋳造する。汝ら罪なし。' } },
  { pl_number: 'PL-22', pl_name: 'シュン',       day1: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' },                                        day2: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' } },
  { pl_number: 'PL-23', pl_name: '342号',        day1: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' },                                      day2: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' } },
  { pl_number: 'PL-24', pl_name: 'だーす',       day1: { table_id: 'A-02', session_name: 'DRIVE A LIVE' },                                                        day2: { table_id: 'B-07', session_name: 'ＰＵＩＰＵＩモルカーレーシング～裏切りのバルターズゲート～' } },
  { pl_number: 'PL-25', pl_name: 'ムー',         day1: null,                                                                                                       day2: { table_id: 'B-09', session_name: 'ドッカン！？　関所の危険物！' } },
  { pl_number: 'PL-26', pl_name: 'Shin',        day1: { table_id: 'A-01', session_name: '「蒼き隼」号の殺人' },                                                    day2: { table_id: 'B-04', session_name: 'ファルコヴニア奇譚' } },
  { pl_number: 'PL-27', pl_name: 'りょう。',     day1: { table_id: 'A-10', session_name: 'Abomination Vaults Adventure Path#1「ゴーントライトの遺跡」' },           day2: { table_id: 'B-09', session_name: 'ドッカン！？　関所の危険物！' } },
  { pl_number: 'PL-28', pl_name: '唐島米津',     day1: { table_id: 'A-10', session_name: 'Abomination Vaults Adventure Path#1「ゴーントライトの遺跡」' },           day2: { table_id: 'B-04', session_name: 'ファルコヴニア奇譚' } },
  { pl_number: 'PL-29', pl_name: 'そば',         day1: { table_id: 'W-01', session_name: 'カリムシャン' },                                                         day2: { table_id: 'W-01', session_name: 'カリムシャン' } },
  { pl_number: 'PL-30', pl_name: 'えぴせんたこ', day1: { table_id: 'A-01', session_name: '「蒼き隼」号の殺人' },                                                    day2: { table_id: 'B-02', session_name: 'あなのなかにいる' } },
  { pl_number: 'PL-31', pl_name: '梅太郎',       day1: { table_id: 'A-01', session_name: '「蒼き隼」号の殺人' },                                                    day2: { table_id: 'B-04', session_name: 'ファルコヴニア奇譚' } },
  { pl_number: 'PL-32', pl_name: 'あずまや',     day1: { table_id: 'A-06', session_name: 'Historica Arcanum: Empires of the Silk Road' },                         day2: null },
  { pl_number: 'PL-33', pl_name: 'スタル',       day1: { table_id: 'A-08', session_name: '南海の死闘' },                                                           day2: { table_id: 'B-10', session_name: '大白羽山の大迷宮' } },
  { pl_number: 'PL-34', pl_name: 'めがねハロ',   day1: { table_id: 'A-09', session_name: '探偵！ファイトスクープ  天空の片道切符編' },                                day2: null },
  { pl_number: 'PL-35', pl_name: 'プラズマ星人', day1: { table_id: 'W-01', session_name: 'カリムシャン' },                                                         day2: { table_id: 'W-01', session_name: 'カリムシャン' } },
  { pl_number: 'PL-36', pl_name: 'つぼちゃん',   day1: null,                                                                                                       day2: { table_id: 'B-01', session_name: "モンスターハンター × D&D『竜を蝕む毒』" } },
  { pl_number: 'PL-37', pl_name: 'あつし',       day1: { table_id: 'A-07', session_name: '雪山の宝物' },                                                           day2: null },
  { pl_number: 'PL-38', pl_name: 'あずま',       day1: { table_id: 'A-04', session_name: 'D&D三国志「長坂坡異聞」' },                                               day2: null },
  { pl_number: 'PL-39', pl_name: 'ケイ',         day1: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' },                                day2: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' } },
  { pl_number: 'PL-40', pl_name: 'いらずん',     day1: { table_id: 'A-08', session_name: '南海の死闘' },                                                           day2: { table_id: 'B-07', session_name: 'ＰＵＩＰＵＩモルカーレーシング～裏切りのバルターズゲート～' } },
  { pl_number: 'PL-41', pl_name: 'シェーリ',     day1: { table_id: 'W-01', session_name: 'カリムシャン' },                                                         day2: { table_id: 'W-01', session_name: 'カリムシャン' } },
  { pl_number: 'PL-42', pl_name: 'kai',         day1: { table_id: 'A-09', session_name: '探偵！ファイトスクープ  天空の片道切符編' },                                day2: { table_id: 'B-09', session_name: 'ドッカン！？　関所の危険物！' } },
  { pl_number: 'PL-43', pl_name: 'もぶ',         day1: null,                                                                                                       day2: { table_id: 'B-02', session_name: 'あなのなかにいる' } },
  { pl_number: 'PL-44', pl_name: 'のの',         day1: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' },                                        day2: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' } },
  { pl_number: 'PL-45', pl_name: 'Wpeke',       day1: { table_id: 'A-10', session_name: 'Abomination Vaults Adventure Path#1「ゴーントライトの遺跡」' },           day2: null },
  { pl_number: 'PL-46', pl_name: 'ルライト',     day1: null,                                                                                                       day2: { table_id: 'B-01', session_name: "モンスターハンター × D&D『竜を蝕む毒』" } },
  { pl_number: 'PL-47', pl_name: 'おもちや',     day1: { table_id: 'A-06', session_name: 'Historica Arcanum: Empires of the Silk Road' },                         day2: { table_id: 'B-02', session_name: 'あなのなかにいる' } },
  { pl_number: 'PL-48', pl_name: '花城 花鶏',    day1: { table_id: 'A-07', session_name: '雪山の宝物' },                                                           day2: null },
  { pl_number: 'PL-49', pl_name: 'そんびん',     day1: { table_id: 'A-10', session_name: 'Abomination Vaults Adventure Path#1「ゴーントライトの遺跡」' },           day2: { table_id: 'B-06', session_name: 'Ever since  in the watchtower' } },
  { pl_number: 'PL-50', pl_name: 'ヨナ',         day1: { table_id: 'A-08', session_name: '南海の死闘' },                                                           day2: null },
  { pl_number: 'PL-51', pl_name: 'GRIM',        day1: { table_id: 'W-01', session_name: 'カリムシャン' },                                                         day2: { table_id: 'W-01', session_name: 'カリムシャン' } },
  { pl_number: 'PL-52', pl_name: '連休',         day1: { table_id: 'A-07', session_name: '雪山の宝物' },                                                           day2: null },
  { pl_number: 'PL-53', pl_name: 'おおぬま',     day1: { table_id: 'A-02', session_name: 'DRIVE A LIVE' },                                                        day2: { table_id: 'B-08', session_name: '我、カニスの名においてこれを鋳造する。汝ら罪なし。' } },
  { pl_number: 'PL-54', pl_name: 'SHOW',        day1: { table_id: 'W-01', session_name: 'カリムシャン' },                                                         day2: { table_id: 'W-01', session_name: 'カリムシャン' } },
  { pl_number: 'PL-55', pl_name: 'ゆい',         day1: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' },                                        day2: { table_id: 'W-02', session_name: '竜たちの島　～ストームレック～' } },
  { pl_number: 'PL-56', pl_name: 'クマゾウ',     day1: { table_id: 'A-05', session_name: "Queen's Blades" },                                                      day2: { table_id: 'B-01', session_name: "モンスターハンター × D&D『竜を蝕む毒』" } },
  { pl_number: 'PL-57', pl_name: 'kazuki',      day1: { table_id: 'A-04', session_name: 'D&D三国志「長坂坡異聞」' },                                               day2: { table_id: 'B-08', session_name: '我、カニスの名においてこれを鋳造する。汝ら罪なし。' } },
  { pl_number: 'PL-58', pl_name: 'samia',       day1: { table_id: 'A-07', session_name: '雪山の宝物' },                                                           day2: { table_id: 'B-10', session_name: '大白羽山の大迷宮' } },
  { pl_number: 'PL-59', pl_name: 'りゅうく',     day1: null,                                                                                                       day2: { table_id: 'B-09', session_name: 'ドッカン！？　関所の危険物！' } },
  { pl_number: 'PL-60', pl_name: 'タムちゃん',   day1: { table_id: 'A-01', session_name: '「蒼き隼」号の殺人' },                                                    day2: null },
  { pl_number: 'PL-61', pl_name: 'ゆきちゃ',     day1: null,                                                                                                       day2: { table_id: 'B-10', session_name: '大白羽山の大迷宮' } },
  { pl_number: 'PL-62', pl_name: 'Scarecrow',   day1: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' },                                day2: { table_id: 'W-04', session_name: 'ネヴァーウィンターを覆う嵐、再び(改ニ)' } },
  { pl_number: 'PL-63', pl_name: 'ふじたま',     day1: { table_id: 'A-02', session_name: 'DRIVE A LIVE' },                                                        day2: { table_id: 'B-07', session_name: 'ＰＵＩＰＵＩモルカーレーシング～裏切りのバルターズゲート～' } },
  { pl_number: 'PL-64', pl_name: 'Hirosuke',    day1: null,                                                                                                       day2: { table_id: 'B-06', session_name: 'Ever since  in the watchtower' } },
  { pl_number: 'PL-65', pl_name: 'zaratora',    day1: null,                                                                                                       day2: { table_id: 'B-05', session_name: '5e「呪われしミストバロウ」' } },
  { pl_number: 'PL-66', pl_name: 'ミトキ',       day1: { table_id: 'A-08', session_name: '南海の死闘' },                                                           day2: null },
  { pl_number: 'PL-67', pl_name: 'あらむ',       day1: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' },                                      day2: { table_id: 'W-03', session_name: 'いずれ「災厄」へと至る道 ver.THK' } },
  { pl_number: 'PL-68', pl_name: '綿鍋',         day1: { table_id: 'A-05', session_name: "Queen's Blades" },                                                      day2: { table_id: 'B-08', session_name: '我、カニスの名においてこれを鋳造する。汝ら罪なし。' } },
  { pl_number: 'PL-69', pl_name: 'ちょめ',       day1: { table_id: 'A-09', session_name: '探偵！ファイトスクープ  天空の片道切符編' },                                day2: null },
  { pl_number: 'PL-70', pl_name: '月狐',         day1: { table_id: 'A-09', session_name: '探偵！ファイトスクープ  天空の片道切符編' },                                day2: null },
  { pl_number: 'PL-71', pl_name: 'IRO',         day1: { table_id: 'W-01', session_name: 'カリムシャン' },                                                         day2: { table_id: 'W-01', session_name: 'カリムシャン' } },
  { pl_number: 'PL-72', pl_name: 'へんくま',     day1: { table_id: 'A-10', session_name: 'Abomination Vaults Adventure Path#1「ゴーントライトの遺跡」' },           day2: null },
  { pl_number: 'PL-73', pl_name: 'あぶらげゅば', day1: { table_id: 'A-01', session_name: '「蒼き隼」号の殺人' },                                                    day2: { table_id: 'B-05', session_name: '5e「呪われしミストバロウ」' } },
  { pl_number: 'PL-74', pl_name: 'Oz',          day1: { table_id: 'A-03', session_name: '鰐神の涙（Dungeon #209掲載）' },                                          day2: { table_id: 'B-05', session_name: '5e「呪われしミストバロウ」' } },
  { pl_number: 'PL-75', pl_name: '羊毛マトン',   day1: { table_id: 'A-01', session_name: '「蒼き隼」号の殺人' },                                                    day2: null },
]

const search = ref('')

const filteredPlayers = computed(() => {
  if (!search.value) return players
  const q = search.value.toLowerCase()
  return players.filter(
    p => p.pl_number.toLowerCase().includes(q) || p.pl_name.toLowerCase().includes(q)
  )
})

const headers = [
  { title: 'PL番号', key: 'pl_number' },
  { title: 'PL名(HN)', key: 'pl_name' },
  { title: '1日目参加卓', key: 'day1' },
  { title: '2日目参加卓', key: 'day2' },
]
</script>

<style scoped lang="scss">
.table-wrapper {
  width: 100%;

  .table-scroll-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    @media (max-width: 959px) {
      border: 1px solid rgb(var(--v-theme-divider));
      border-radius: 8px;
    }
  }

  :deep(table) {
    border-collapse: collapse;
    border: 1px solid rgb(var(--v-theme-divider));
    border-radius: 8px;
    min-width: 600px;
  }

  :deep(table thead th) {
    background-color: rgb(var(--v-theme-primary));
    border: 1px solid rgb(var(--v-theme-divider));
    color: rgb(var(--v-theme-on-primary));
    font-weight: bold;
    height: 30px;
    padding: 0 4px !important;
    white-space: nowrap;
  }

  :deep(table tbody td) {
    border: 1px solid rgb(var(--v-theme-divider));
    padding: 8px 8px !important;
  }

  :deep(.v-data-table-header__content) {
    justify-content: center;
  }
}

.pl-num-col {
  width: 80px;
  text-align: center;
}

.pl-name-col {
  width: 160px;
}

.session-col {
  min-width: 200px;
}

.table-id-badge {
  display: inline-block;
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-size: 0.75rem;
  font-weight: bold;
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.player-card-header {
  background-color: rgb(var(--v-theme-primary) / 0.08);
}

.pl-num-chip {
  display: inline-block;
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 99px;
  white-space: nowrap;
}

.day-label {
  font-size: 0.7rem;
  font-weight: bold;
  color: rgb(var(--v-theme-primary));
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
