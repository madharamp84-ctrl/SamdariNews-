import { useState, useEffect } from 'react';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  imageUrl: string;
  date: string;
  author: string;
  featured: boolean;
  trending: boolean;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string;
  status?: 'published' | 'draft';
}

export interface Category {
  id: string;
  name: string;
}

export function useNews(params?: { category?: string; featured?: boolean; trending?: boolean }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = '/api/posts';
    if (params) {
      const query = new URLSearchParams();
      if (params.category) query.append('category', params.category);
      if (params.featured) query.append('featured', 'true');
      if (params.trending) query.append('trending', 'true');
      if (query.toString()) url += `?${query.toString()}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, [params?.category, params?.featured, params?.trending]);

  return { posts, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return categories;
}
