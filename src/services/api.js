const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

const jsonHeaders = {
  'Content-Type': 'application/json',
}

async function parseResponse(res, fallbackMessage) {
  const contentType = res.headers.get('content-type') || ''

  if (!res.ok) {
    const errorData = contentType.includes('application/json')
      ? await res.json().catch(() => ({}))
      : {}
    throw new Error(errorData.detail || fallbackMessage)
  }

  if (res.status === 204) {
    return null
  }

  if (contentType.includes('application/json')) {
    return res.json()
  }

  return res.text()
}

export async function fetchPosts(skip = 0, limit = 10) {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) })
  const res = await fetch(`${API_BASE}/posts?${params}`)
  return parseResponse(res, 'Failed to fetch posts')
}

export async function fetchPost(postId) {
  const res = await fetch(`${API_BASE}/posts/${postId}`)
  return parseResponse(res, 'Failed to fetch post')
}

export async function verifyPassword(postId, password) {
  const res = await fetch(`${API_BASE}/posts/${postId}/verify-password`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ password }),
  })
  return parseResponse(res, 'Failed to verify password')
}

export async function createPost({ title, content, password }) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ title, content, password }),
  })
  return parseResponse(res, 'Failed to create post')
}

export async function updatePost(postId, { title, content, password }) {
  const body = {
    ...(title != null ? { title } : {}),
    ...(content != null ? { content } : {}),
    ...(password != null && password !== '' ? { password } : {}),
  }
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(body),
  })
  return parseResponse(res, 'Failed to update post')
}

export async function deletePost(postId, { password }) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'DELETE',
    headers: jsonHeaders,
    body: JSON.stringify({ password }),
  })
  return parseResponse(res, 'Failed to delete post')
}
