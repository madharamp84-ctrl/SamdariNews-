import { Link } from 'react-router-dom';
import { Post } from '../../hooks/useNews';
import CategoryBadge from './CategoryBadge';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  post: Post;
  variant?: 'large' | 'medium' | 'small' | 'list';
}

export default function NewsCard({ post, variant = 'medium' }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.date), { addSuffix: true });

  if (variant === 'list') {
    return (
      <div className="flex gap-4 group">
        <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded relative">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex flex-col justify-center">
          <CategoryBadge categoryId={post.categoryId} className="mb-2 w-fit" />
          <Link to={`/article/${post.slug}`} className="group-hover:text-red-600 transition-colors">
            <h3 className="text-lg font-black text-gray-900 leading-snug line-clamp-2">{post.title}</h3>
          </Link>
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`relative overflow-hidden ${variant === 'large' ? 'aspect-video' : 'aspect-[4/3]'}`}>
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <CategoryBadge categoryId={post.categoryId} />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/article/${post.slug}`} className="group-hover:text-red-600 transition-colors">
          <h3 className={`font-black text-gray-900 leading-tight mb-2 ${variant === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
            {post.title}
          </h3>
        </Link>
        {variant === 'large' && (
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-50">
          <span className="font-medium text-gray-700">{post.author}</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
