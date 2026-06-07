import { useParams } from 'react-router-dom';
import { useNews, useCategories } from '../hooks/useNews';
import Sidebar from '../components/layout/Sidebar';
import NewsCard from '../components/ui/NewsCard';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { posts, loading } = useNews({ category: categoryId });
  const categories = useCategories();
  
  const category = categories.find(c => c.id === categoryId);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 min-w-0">
        <div className="mb-8 border-b-8 border-red-600 pb-2 inline-block pr-8 mt-2">
          <h1 className="text-4xl font-black uppercase text-gray-900">
            {category ? category.name : categoryId}
          </h1>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">लेख लोड हो रहे हैं...</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-gray-500">इस श्रेणी में कोई लेख नहीं मिला।</div>
        ) : (
          <div className="space-y-8">
            {/* Featured category post */}
            {posts[0] && (
              <div className="mb-12">
                <NewsCard post={posts[0]} variant="large" />
              </div>
            )}
            
            {/* List of other posts */}
            <div className="grid grid-cols-1 gap-8">
              {posts.slice(1).map(post => (
                <NewsCard key={post.id} post={post} variant="list" />
              ))}
            </div>
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  );
}
