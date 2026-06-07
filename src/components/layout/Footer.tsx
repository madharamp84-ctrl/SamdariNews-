import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 mt-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center mb-4">
            <div className="flex items-center transform -skew-x-[10deg]">
              <span className="bg-red-600 text-white px-2 py-0.5 text-3xl font-black tracking-tighter shadow-[2px_2px_0px_rgba(0,0,0,1)]">समदरी</span>
              <span className="bg-white text-black px-2 py-0.5 text-3xl font-black tracking-tighter shadow-[2px_2px_0px_rgba(0,0,0,1)]">न्यूज़</span>
            </div>
          </Link>
          <p className="text-sm mt-4 max-w-sm text-gray-400">
            सच्ची, ताज़ा और प्रभावशाली ख़बरें सीधे आप तक। समदरी न्यूज़ के साथ दुनिया भर की ताज़ा घटनाओं से अपडेट रहें।
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold uppercase tracking-wider mb-4">अनुभाग</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/politics" className="hover:text-white transition-colors">राजनीति</Link></li>
            <li><Link to="/category/technology" className="hover:text-white transition-colors">टेक्नोलॉजी</Link></li>
            <li><Link to="/category/sports" className="hover:text-white transition-colors">खेल</Link></li>
            <li><Link to="/category/entertainment" className="hover:text-white transition-colors">मनोरंजन</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold uppercase tracking-wider mb-4">कंपनी</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">हमारे बारे में</a></li>
            <li><a href="#" className="hover:text-white transition-colors">संपर्क करें</a></li>
            <li><a href="#" className="hover:text-white transition-colors">गोपनीयता नीति</a></li>
            <li><a href="#" className="hover:text-white transition-colors">सेवा की शर्तें</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} समदरी न्यूज़. सर्वाधिकार सुरक्षित।
      </div>
    </footer>
  );
}
