<template>
  <div class="table-wrapper" :class="class">
    <template v-if="items.length === 0">
      <p class="text-center text-body-1 font-weight-bold">予定されているセッションはありません</p>
    </template>
    <v-data-table
      v-else
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
            >
              {{ item.session_name }}
            </NuxtLink>
          </td>
          <td :style="{ 'width': '180px' }">{{ item.dm_name }}</td>
          <td :style="{ 'width': '70px' }">{{ item.system_name_short }}</td>
          <td :style="{ 'width': '80px' }">{{ item.session_lv }}</td>
          <td :style="{ 'width': '80px' }">{{ item.session_number }}</td>
        </tr>
      </template>
    </v-data-table>
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
  :deep(table) {
    border-collapse: collapse;
    border: 1px solid rgb(var(--v-theme-divider));
    border-radius: 8px;
  }

  :deep(table thead th) {
    background-color: rgb(var(--v-theme-primary));
    border: 1px solid rgb(var(--v-theme-divider));
    color: rgb(var(--v-theme-on-primary));
    font-weight: bold;
    height: 30px;
    padding: 0 4px !important;
  }

  :deep(table tbody td) {
    border: 1px solid rgb(var(--v-theme-divider));
  }

  :deep(.v-data-table-header__content) {
    justify-content: center;
  }
}
</style>
