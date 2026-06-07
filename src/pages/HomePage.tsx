import { useNews } from '../hooks/useNews';
import NewsCard from '../components/ui/NewsCard';
import Sidebar from '../components/layout/Sidebar';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  const { posts } = useNews({ featured: true });
  const featuredPost = posts?.[0];

  if (!featuredPost) return <div className="h-96 bg-gray-100 animate-pulse rounded-lg mb-8" />;

  return (
    <div className="mb-10">
      <NewsCard post={featuredPost} variant="large" />
    </div>
  );
}

function NewsGrid() {
  const { posts } = useNews();
  const restPosts = posts?.slice(1, 7) || [];

  if (restPosts.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-2 border-b-4 border-red-600 tracking-tight pb-2 inline-block pr-6">
        बड़ी ख़बरें
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restPosts.map(post => (
          <NewsCard key={post.id} post={post} variant="medium" />
        ))}
      </div>
    </div>
  );
}

function TrendingTags() {
  const tags = ['टेक', 'राजनीति', 'ग्लोबल वार्मिंग', 'शेयर बाजार', 'क्रिकेट'];
  
  return (
    <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-gray-200">
      <span className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
        <Tag className="w-4 h-4" /> ट्रेंडिंग
      </span>
      {tags.map(tag => (
        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">
          #{tag}
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 min-w-0">
        <TrendingTags />
        <HeroSection />
        <NewsGrid />
      </div>
      <Sidebar />
    </div>
  );
}
