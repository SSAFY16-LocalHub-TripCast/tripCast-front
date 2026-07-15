import { ref, onMounted } from 'vue'
import { fetchPosts } from '@/services/api'

export function useBoardPosts({ skip = 0, limit = 10 } = {}) {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchPosts(skip, limit)
      posts.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  onMounted(loadPosts)

  return { posts, loading, error, loadPosts }
}
