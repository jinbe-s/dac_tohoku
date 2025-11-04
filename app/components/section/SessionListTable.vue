<template>
  <div class="table-wrapper" :class="class">
    <template v-if="items.length === 0">
      <p
        class="text-center text-body-1 font-weight-bold"
        v-text="'予定されているセッションはありません'"
      />
    </template>
    <!-- モバイル用: 横スクロール可能なコンテナ -->
    <div class="table-scroll-container">
      <v-data-table
        v-if="items.length > 0"
        :items="items"
        :headers="headers"
        hide-default-footer
        density="compact"
      >
      <template v-slot:headers="{ columns }">
        <tr>
          <template v-for="column in columns" :key="column.key">
            <th>
              <div class="d-flex align-center justify-center font-weight-bold">
                <span v-text="column.title" />
              </div>
            </th>
          </template>
        </tr>
      </template>
      <template v-slot:item="{ item }">
        <tr class="text-no-wrap">
          <td
            :style="{
              'text-align': 'center',
              'width': '60px',
            }"
            v-text="item.table_id"
          ></td>
          <td>
            <NuxtLink
              :to="{ hash: `#${item.table_id}` }"
              class="text-decoration-none"
              :style="{ color: 'rgb(var(--v-theme-primary))' }"
              v-text="item.session_name"
            />
          </td>
          <td :style="{ 'width': '180px' }" v-text="item.dm_name" />
          <td :style="{ 'width': '70px' }" v-text="item.system_name_short" />
          <td :style="{ 'width': '80px' }" v-text="item.session_lv" />
          <td :style="{ 'width': '80px' }" v-text="item.session_number" />
        </tr>
      </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SessionListResponse } from '~/composables/useSessionList'

type SessionListProps = {
  items: SessionListResponse[]
  class?: string
}
const props = withDefaults(defineProps<SessionListProps>(), {
  class: ''
})

const headers = [
  { title: '卓番号', key: 'table_id' },
  { title: 'タイトル', key: 'session_name' },
  { title: 'DM/GM', key: 'dm_name' },
  { title: 'システム', key: 'system_name_short', sortable: true },
  { title: 'Lv', key: 'session_lv', sortable: true },
  { title: '人数', key: 'session_number' },
]
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;

  .table-scroll-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; // iOS用のスムーズスクロール

    // モバイルでスクロール可能なことを示唆
    @media (max-width: 959px) {
      border: 1px solid rgb(var(--v-theme-divider));
      border-radius: 8px;
    }
  }

  :deep(table) {
    border-collapse: collapse;
    border: 1px solid rgb(var(--v-theme-divider));
    border-radius: 8px;
    min-width: 600px; // モバイルで横スクロール
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
    padding: 8px 4px !important;
  }

  :deep(.v-data-table-header__content) {
    justify-content: center;
  }
}
</style>
