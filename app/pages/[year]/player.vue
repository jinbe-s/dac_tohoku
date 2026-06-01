<template>
  <v-container class="py-10">
    <v-card variant="tonal" color="primary" rounded="lg" class="mb-6 py-4 px-4">
      <div class="d-flex flex-column align-center text-center">
        <div class="text-body-1 font-weight-bold">{{ year }}年に実施した際の内容です</div>
      </div>
    </v-card>

    <TextMainTitle title="参加卓一覧" />
    <p class="mt-4 mb-6 text-body-1">
      PL番号と参加卓をご確認ください。
    </p>

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
              <th v-for="column in columns" :key="column.key ?? ''">
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
  </v-container>
</template>

<script lang="ts" setup>
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

const route = useRoute()
const year = route.params.year as string

const { data } = await useFetch<PlayerEntry[]>(`/data/players_${year}.json`, {
  server: false,
  default: () => [] as PlayerEntry[],
  key: `players_${year}`
})

const players = computed(() => data.value ?? [])

const search = ref('')

const filteredPlayers = computed(() => {
  if (!search.value) return players.value
  const q = search.value.toLowerCase()
  return players.value.filter(
    p => p.pl_number.toLowerCase().includes(q) || p.pl_name.toLowerCase().includes(q)
  )
})

const headers = [
  { title: 'PL番号', key: 'pl_number' },
  { title: 'PL名(HN)', key: 'pl_name' },
  { title: '1日目参加卓', key: 'day1' },
  { title: '2日目参加卓', key: 'day2' },
]

useSiteMeta({
  title: `${year}年 参加卓一覧`,
  description: `DAC東北 ${year}年の参加卓一覧。PL番号・PL名と1日目・2日目の参加卓。`,
  keywords: `DAC東北,${year},参加卓一覧,PL,プレイヤー,卓`
})
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
