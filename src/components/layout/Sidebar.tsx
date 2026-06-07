import { Cloud, Search } from 'lucide-react';
import { useNews } from '../../hooks/useNews';
import { Link } from 'react-router-dom';

export function WeatherWidget() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border-l-4 border-red-600 rounded-lg p-5 text-white mb-8 shadow-md">
      <h3 className="font-semibold uppercase tracking-wider text-xs mb-4 opacity-90 flex items-center gap-2">
        <Cloud className="w-4 h-4" /> स्थानीय मौसम
      </h3>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-light">32°</div>
          <div className="text-sm opacity-90">आंशिक बादल</div>
        </div>
        <div className="text-right text-sm opacity-90">
          <div>नई दिल्ली</div>
          <div>H: 35° L: 28°</div>
        </div>
      </div>
    </div>
  );
}

export function RecentPosts() {
  const { posts } = useNews();
  const recent = posts?.slice(0, 4) || [];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-black uppercase tracking-wider border-b-2 border-red-600 pb-2 mb-4 flex items-center">
        <span className="w-2 h-5 bg-red-600 mr-2 block"></span>
        ताज़ा ख़बरें
      </h3>
      <div className="space-y-4">
        {recent.map((post, i) => (
          <div key={post.id} className="flex gap-3 items-start group border-b border-gray-100 pb-3 last:border-0">
            <span className="bg-black text-white font-black text-sm w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 rounded-sm">{i + 1}</span>
            <Link to={`/article/${post.slug}`} className="group-hover:text-red-600 transition-colors font-bold text-gray-900 leading-snug">
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdSlot() {
  return (
    <div className="relative bg-gray-50 border border-gray-200 rounded-lg min-h-[250px] flex flex-col items-center justify-center text-gray-400 text-sm mb-8 overflow-hidden">
      <div className="absolute top-0 right-0 bg-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-bl">Ad</div>
      <span className="uppercase tracking-wider font-semibold mb-2">विज्ञापन (Google Ads)</span>
      <span className="text-xs text-center px-4">
        यहाँ अपना Google AdSense कोड डालें।<br />
        (Insert AdSense script/ins tag here)
      </span>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <WeatherWidget />
      <RecentPosts />
      <AdSlot />
      
      <div className="mb-8">
        <h3 className="text-lg font-bold border-b-2 border-gray-900 pb-2 mb-4">खोजें</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="ख़बरें खोजें..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </aside>
  );
}
