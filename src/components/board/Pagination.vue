<template>
  <div class="pagination">
    <button :disabled="page <= 1" @click="changePage(page - 1)">&laquo;</button>
    <button class="current">{{ page }}</button>
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
}
.pagination button {
  min-width: 42px;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  border-radius: 8px;
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}
.pagination button.current {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}
</style>
