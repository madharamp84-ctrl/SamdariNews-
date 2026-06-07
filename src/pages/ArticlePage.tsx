import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post } from '../hooks/useNews';
import Sidebar from '../components/layout/Sidebar';
import CategoryBadge from '../components/ui/CategoryBadge';
import { Facebook, Twitter, Linkedin, Share2, ArrowLeft, Check } from 'lucide-react';
import { format } from 'date-fns';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center text-gray-500">लेख लोड हो रहा है...</div>;
  }

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">लेख नहीं मिला</h2>
        <Link to="/" className="text-red-600 font-bold hover:underline">होम पर लौटें</Link>
      </div>
    );
  }

  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy • h:mm a');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.metaTitle || post.title,
    "description": post.metaDescription || post.excerpt,
    "image": [
      post.imageUrl
    ],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": [{
      "@type": "Person",
      "name": post.author
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Samachar News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://samacharnews.com/logo.png"
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex-1 min-w-0">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> वापस लौटें
        </Link>
        
        <article>
          <header className="mb-8">
            <CategoryBadge categoryId={post.categoryId} className="mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 font-medium mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-y border-gray-200 gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-3 border border-red-200">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{post.author}</div>
                  <div className="text-xs text-gray-500">{formattedDate}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleShare}
                  title="लिंक कॉपी करें"
                  className="relative w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-red-600 transition-colors ml-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                  {copied && (
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap animate-in fade-in zoom-in duration-200 z-10">
                      लिंक कॉपी हो गया
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          <figure className="mb-10">
            <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg shadow-sm" />
            <figcaption className="text-sm text-gray-500 mt-3 text-center">
              चित्र: फाइल फोटो / Unsplash
            </figcaption>
          </figure>

          <div className="max-w-none text-gray-800 text-lg">
            <p className="text-xl text-gray-700 mb-6 font-medium">
              विशेषज्ञों और विश्लेषकों का मानना है कि यह घटना इस क्षेत्र में दूरगामी बदलाव ला सकती है और भविष्य की रणनीतियों को प्रभावित कर सकती है।
            </p>
            <p className="mb-6">
              {post.content} दुनिया भर में इसकी चर्चा हो रही है। इस निर्णय से जुड़े सभी पहलुओं का विश्लेषण किया जा रहा है और आम जनता भी इसके प्रभावों को करीब से महसूस कर सकेगी।
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">मुख्य बातें</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>पिछले एक दशक में यह पहला महत्वपूर्ण विकास है।</li>
              <li>हितधारक इस क्षेत्र में बड़े पैमाने पर विकास की उम्मीद कर रहे हैं।</li>
              <li>नियामक निकाय स्थिति पर करीब से नजर रख रहे हैं।</li>
            </ul>
            <p className="mb-6">
              तमाम दावों और अपेक्षाओं के बीच यह स्पष्ट है कि आगे का रास्ता चुनौतियों से भरा हो सकता है लेकिन इसके साथ ही नए अवसरों के दरवाजे भी खुलेंगे।
            </p>
            <blockquote className="border-l-[6px] border-red-600 pl-5 italic text-2xl my-10 text-gray-900 bg-gray-50 py-6 font-bold pr-4">
              "यह सिर्फ एक क्षणिक रुझान नहीं है। यह एक बुनियादी बदलाव है जो यह तय करेगा कि हम अगले पचास वर्षों तक कैसे काम करेंगे।"
              <footer className="text-sm text-gray-500 font-medium not-italic mt-2">— प्रमुख विश्लेषक, ग्लोबल थिंक टैंक</footer>
            </blockquote>
            <p>
              आगे बढ़ते हुए, मुख्य ध्यान इसके स्थायी कार्यान्वयन पर होगा। जैसे-जैसे अधिक जानकारी उपलब्ध होगी, हम इस विकासशील कहानी पर अपने कवरेज को अपडेट करना जारी रखेंगे। हमारे साथ जुड़े रहें।
            </p>
          </div>
        </article>
      </div>
      <Sidebar />
    </div>
  );
}
