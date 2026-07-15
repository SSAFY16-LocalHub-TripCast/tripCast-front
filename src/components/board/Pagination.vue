<template>
  <div class="pagination">
    <button :disabled="page <= 1" @click="changePage(page - 1)">&laquo;</button>

    <button v-if="page > 1" @click="changePage(page - 1)">{{ page - 1 }}</button>
    <button class="current">{{ page }}</button>
    <button v-if="hasNext" @click="changePage(page + 1)">{{ page + 1 }}</button>

    <button :disabled="!hasNext" @click="changePage(page + 1)">&raquo;</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  hasNext: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change-page'])

const changePage = (value) => {
  emit('change-page', value)
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
  flex-wrap: wrap;
}
.pagination button {
  min-width: 42px;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #334155;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}
.pagination button.current {
  background: #0f766e;
  color: #fff;
  border-color: #0f766e;
}
</style>
