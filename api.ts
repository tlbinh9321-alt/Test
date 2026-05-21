const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api';

export const fetchPosts = async (filters: { category?: string; grade?: string; featured?: boolean } = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.grade) params.append('grade', filters.grade);
    if (filters.featured) params.append('featured', 'true');

    const res = await fetch(`${API_URL}/posts?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const fetchPostBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${API_URL}/posts/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch post detail');
    return await res.json();
  } catch (error) {
    console.error('Error fetching post detail:', error);
    return null;
  }
};

export const fetchMapPins = async (filters: { grade?: string; category?: string; period?: string } = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.grade) params.append('grade', filters.grade);
    if (filters.category) params.append('category', filters.category);
    if (filters.period) params.append('period', filters.period);

    const res = await fetch(`${API_URL}/map/pins?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch map pins');
    return await res.json();
  } catch (error) {
    console.error('Error fetching map pins:', error);
    return [];
  }
};

export const fetchMapMemories = async () => {
  try {
    const res = await fetch(`${API_URL}/map/memories`);
    if (!res.ok) throw new Error('Failed to fetch map memories');
    return await res.json();
  } catch (error) {
    console.error('Error fetching map memories:', error);
    return [];
  }
};

export const fetchStats = async () => {
  try {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
};
