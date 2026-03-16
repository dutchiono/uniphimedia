export interface CommunityPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  createdAt: string
  status: 'draft' | 'review' | 'published'
}

// Intentionally empty until real community content is created.
export const newsPosts: CommunityPost[] = []
export const blogPosts: CommunityPost[] = []
