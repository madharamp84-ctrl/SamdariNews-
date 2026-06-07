import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useNews';
import { Menu, Search, User, Gift, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const categories = useCategories();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center ml-2 md:ml-0">
              <div className="flex items-center transform -skew-x-[10deg]">
                <span className="bg-red-600 text-white px-2 py-0.5 text-2xl font-black tracking-tighter shadow-[2px_2px_0px_rgba(0,0,0,1)]">समदरी</span>
                <span className="bg-black text-white px-2 py-0.5 text-2xl font-black tracking-tighter shadow-[2px_2px_0px_rgba(0,0,0,1)]">न्यूज़</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 font-bold hover:text-red-600 transition-colors uppercase tracking-wide">होम</Link>
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className="text-gray-800 font-bold hover:text-red-600 transition-colors uppercase text-sm tracking-widest border-b-2 border-transparent hover:border-red-600"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/earn" className="bg-yellow-400 text-yellow-900 border border-yellow-500 hover:bg-yellow-500 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-colors text-sm shadow-sm mr-2 sm:mr-0">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">कमाएँ</span>
            </Link>
            <button className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/profile" className="text-gray-500 hover:text-gray-900 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/admin" title="Admin Panel" className="text-gray-500 hover:text-blue-600 transition-colors">
              <ShieldAlert className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-black text-gray-900 hover:bg-gray-50 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>होम</Link>
            <Link to="/earn" className="block px-3 py-2 text-base font-black text-yellow-600 hover:bg-yellow-50 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5" /> कमाएँ और रिवॉर्ड्स
              </div>
            </Link>
            <Link to="/admin" className="block px-3 py-2 text-base font-black text-blue-600 hover:bg-blue-50 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> एडमिन पैनल
              </div>
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className="block px-3 py-2 text-base font-bold text-gray-700 hover:bg-red-50 hover:text-red-700 uppercase tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
