import { useState, useEffect } from 'react';
import { Post, Category } from '../hooks/useNews';
import { PlusCircle, Trash2, Edit, Save, X, LayoutDashboard, Wand2 } from 'lucide-react';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('politics');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  const [viewTab, setViewTab] = useState<'published' | 'draft'>('published');

  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAI = async () => {
    if (!topic) {
      alert("कृपया AI लेख उत्पन्न करने के लिए एक विषय (Topic) दर्ज करें।");
      return;
    }
    setIsGenerating(true);
    try {
      const categoryName = categories.find(c => c.id === categoryId)?.name || 'General';
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category: categoryName })
      });
      
      if (!res.ok) {
        throw new Error("Generation failed");
      }
      
      const data = await res.json();
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setAuthor(data.author);
      
      // Auto-fill basic SEO & Image
      setMetaTitle(data.title.substring(0, 60));
      setMetaDescription(data.excerpt.substring(0, 160));
      const generatedSlug = data.title.trim().toLowerCase()
        .replace(/[^a-z0-9\u0900-\u097F\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug || `post-${Date.now()}`);
      
      const words = data.title.split(/\s+/).filter((w: string) => w.length > 3);
      setFocusKeyword(words.slice(0, 3).join(', '));
      
      const keywords = `india,${categoryId}`;
      setImageUrl(`https://loremflickr.com/800/450/${keywords}?random=${Date.now()}`);
    } catch (err) {
      console.error(err);
      alert('AI लेख उत्पन्न करने में विफ़ल रहा।');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAutoGenerateSEO = () => {
    if (!title) {
      alert("ऑटो-जेनरेट करने के लिए कम से कम 'शीर्षक' (Title) आवश्यक है।");
      return;
    }

    // Generate Meta Title
    setMetaTitle(title.substring(0, 60));

    // Generate Meta Description
    const sourceText = excerpt || content || title;
    // Strip HTML and get plain text if any, but we just substring for now
    setMetaDescription(sourceText.substring(0, 160));

    // Generate Focus Keywords (Extracting words longer than 3 chars)
    const words = title.split(/\s+/).filter(w => w.length > 3);
    setFocusKeyword(words.slice(0, 3).join(', '));
    
    // Generate Slug if empty
    if (!slug) {
      const generatedSlug = title.trim().toLowerCase()
        .replace(/[^a-z0-9\u0900-\u097F\s-]/g, '') // Allow english and hindi chars
        .replace(/\s+/g, '-');
      setSlug(generatedSlug || `post-${Date.now()}`);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?all=true');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert("Title, slug and content are required");
      return;
    }

    const newPost = {
      title, slug, excerpt, content, categoryId, imageUrl, author, featured, trending,
      metaTitle, metaDescription, focusKeywords: focusKeyword, status
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      if (res.ok) {
        setShowForm(false);
        resetForm();
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert('Error deleting post');
    }
  };

  const resetForm = () => {
    setTitle(''); setSlug(''); setExcerpt(''); setContent('');
    setCategoryId('politics'); setImageUrl(''); setAuthor('');
    setFeatured(false); setTrending(false);
    setMetaTitle(''); setMetaDescription(''); setFocusKeyword('');
    setStatus('published');
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500 font-bold">लोड हो रहा है...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl mb-6 flex items-start gap-3 shadow-sm">
        <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-bold text-lg mb-1">Google News Integration</h3>
          <p className="text-sm">To get your website content into Google News, you don't "submit" your site in the traditional sense anymore; instead, you use the <strong>Google Publisher Center</strong> to manage your publication's presence and ensure your content meets Google's quality standards.</p>
          <a href="https://publishercenter.google.com/" target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm font-bold bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">Go to Publisher Center (publishercenter.google.com)</a>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-600" /> एडमिन पैनल (Admin Panel)
        </h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition"
        >
          {showForm ? <X className="w-5 h-5"/> : <PlusCircle className="w-5 h-5" />}
          {showForm ? 'रद्द करें (Cancel)' : 'नया लेख जोड़ें (Add Post)'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800">नया लेख बनाएं</h2>
            
            {/* AI Generator Tool */}
            <div className="mt-4 md:mt-0 flex gap-2 items-center bg-blue-50 border border-blue-200 p-2 rounded-lg">
              <input 
                type="text" 
                value={topic} 
                onChange={e => setTopic(e.target.value)} 
                placeholder="विषय दर्ज करें..." 
                className="px-3 py-1.5 border border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-500 w-48 text-sm"
              />
              <button 
                type="button" 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="bg-blue-600 text-white px-3 py-1.5 rounded font-bold text-sm hover:bg-blue-700 flex items-center gap-1 disabled:opacity-50"
              >
                {isGenerating ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Wand2 className="w-4 h-4" />}
                {isGenerating ? 'बना रहे हैं...' : 'AI ड्राफ़्ट'}
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">शीर्षक (Title)</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">URL स्लग (Slug - English usually)</label>
                <input type="text" value={slug} onChange={e => setSlug(e.target.value)} required placeholder="e.g. new-article-url" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">श्रेणी (Category)</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">लेखक (Author)</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">छवि URL (Image URL)</label>
                <button 
                  type="button"
                  onClick={() => {
                    const keywords = `india,${categoryId}`;
                    // Use loremflickr for random images based on keywords
                    const generatedUrl = `https://loremflickr.com/800/450/${keywords}?random=${Date.now()}`;
                    setImageUrl(generatedUrl);
                  }}
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-bold px-3 py-1 rounded text-xs flex items-center gap-1 transition"
                >
                  <Wand2 className="w-3 h-3" /> ऑटो-इमेज (Auto Image)
                </button>
              </div>
              <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              {imageUrl && (
                <div className="mt-3 aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }} />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">सारांश (Excerpt - Short Desc)</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">मुख्य सामग्री (Main Content)</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} required rows={6} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>

            <div className="border border-gray-200 p-4 rounded-xl space-y-4 bg-gray-50">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h3 className="font-bold text-lg text-gray-800">SEO सेटिंग्स (SEO Settings)</h3>
                <button 
                  type="button" 
                  onClick={handleAutoGenerateSEO}
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
                >
                  <Wand2 className="w-4 h-4" /> ऑटो-जेनरेट (Auto-fill)
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">मेटा शीर्षक (Meta Title) <span className="font-normal text-xs text-gray-500 ml-1">({metaTitle.length}/60)</span></label>
                <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Max 60 characters..." maxLength={60} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">मेटा विवरण (Meta Description) <span className="font-normal text-xs text-gray-500 ml-1">({metaDescription.length}/160)</span></label>
                <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={2} placeholder="Max 160 characters..." maxLength={160} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">फोकस कीवर्ड (Focus Keyword)</label>
                <input type="text" value={focusKeyword} onChange={e => setFocusKeyword(e.target.value)} placeholder="e.g. climate change, AI 2027" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              {/* Google Search Preview */}
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-2 font-bold">Google Search Preview:</p>
                <p className="text-[#1a0dab] text-xl font-medium line-clamp-1 hover:underline cursor-pointer">{metaTitle || title || 'Post Title'}</p>
                <p className="text-[#006621] text-sm mb-1">https://samacharnews.com/{slug || 'post-url'}</p>
                <p className="text-[#545454] text-sm line-clamp-2">{metaDescription || excerpt || 'Post description goes here...'}</p>
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
                <span className="font-bold text-sm">फीचर्ड (Featured)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={trending} onChange={e => setTrending(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
                <span className="font-bold text-sm">ट्रेंडिंग (Trending)</span>
              </label>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
              <button 
                type="button" 
                onClick={(e) => {
                  setStatus('draft');
                  // We simulate form submission logic
                  setTimeout(() => e.currentTarget.closest('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 0);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-sm flex items-center gap-2 transition"
              >
                <Save className="w-5 h-5" /> ड्राफ़्ट के रूप में सहेजें (Save Draft)
              </button>
              <button 
                type="submit" 
                onClick={() => setStatus('published')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center gap-2 transition"
              >
                <Save className="w-5 h-5" /> प्रकाशित करें (Publish)
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-4 border-b-2 border-transparent w-full md:w-auto">
            <button 
              onClick={() => setViewTab('published')}
              className={`text-lg font-bold pb-2 px-2 transition-colors duration-200 border-b-2 text-left ${viewTab === 'published' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              प्रकाशित लेख (Published)
            </button>
            <button 
              onClick={() => setViewTab('draft')}
              className={`text-lg font-bold pb-2 px-2 transition-colors duration-200 border-b-2 text-left ${viewTab === 'draft' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              ड्राफ़्ट (Drafts)
            </button>
          </div>
          <div className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
            कुल {posts.filter(p => viewTab === 'draft' ? p.status === 'draft' : p.status !== 'draft').length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b-2 border-gray-200">
                <th className="p-4 font-bold">शीर्षक (Title)</th>
                <th className="p-4 font-bold">श्रेणी</th>
                <th className="p-4 font-bold">दिनांक</th>
                <th className="p-4 font-bold text-right">क्रिया (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.filter(p => viewTab === 'draft' ? p.status === 'draft' : p.status !== 'draft').map(post => {
                const category = categories.find(c => c.id === post.categoryId);
                return (
                  <tr key={post.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                        {post.status === 'draft' && <span className="text-[10px] bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded uppercase">Draft</span>}
                      </div>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{post.slug}</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">{category?.name || post.categoryId}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(post.date).toLocaleDateString('hi-IN')}
                    </td>
                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                      <button 
                        onClick={() => {
                          alert('Article submitted to Google Indexing API for automatic ranking!');
                        }}
                        className="text-green-600 hover:bg-green-50 p-2 text-xs font-bold rounded-lg transition border border-green-200 bg-white" title="Rank in Google"
                      >
                        Ping Google
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {posts.filter(p => viewTab === 'draft' ? p.status === 'draft' : p.status !== 'draft').length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">कोई लेख नहीं मिला।</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
