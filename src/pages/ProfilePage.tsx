import { useState } from 'react';
import { User, Mail, Shield, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'kyc'>('details');
  const [kycStatus, setKycStatus] = useState<'pending' | 'submitted' | 'verified'>('pending');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKycStatus('submitted');
    setTimeout(() => {
      setKycStatus('verified');
    }, 2500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 min-w-0">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mt-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                {isLoginMode ? 'लॉग इन करें' : 'खाता बनाएं'}
              </h2>
              <p className="text-gray-500 font-medium">
                {isLoginMode ? 'अपने खाते में वापस स्वागत है' : 'समदरी न्यूज़ परिवार में शामिल हों'}
              </p>
            </div>

            <form onSubmit={handleAuth}>
              {!isLoginMode && (
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">पूरा नाम</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input type="text" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all" placeholder="आपका नाम" />
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">ईमेल</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="email" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all" placeholder="user@example.com" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">पासवर्ड</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="password" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all" placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors mb-4 shadow-md leading-relaxed">
                {isLoginMode ? 'लॉग इन' : 'साइन अप'}
              </button>
            </form>

            <div className="text-center">
              <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-red-600 font-bold hover:underline">
                {isLoginMode ? 'नया खाता बनाएं? साइन अप करें' : 'पहले से खाता है? लॉग इन करें'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b-8 border-red-600 pb-2 inline-block pr-8 mt-2">
              <h1 className="text-4xl font-black uppercase text-gray-900 flex items-center gap-3">
                <User className="w-10 h-10 text-red-600" /> मेरी प्रोफाइल
              </h1>
            </div>

            <div className="flex gap-4 mb-8">
              <button onClick={() => setActiveTab('details')} className={`px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'details' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>प्रोफाइल जानकारी</button>
              <button onClick={() => setActiveTab('kyc')} className={`px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'kyc' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>KYC सत्यापन (KYC)</button>
            </div>

            {activeTab === 'details' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-black mb-6 border-b border-gray-100 pb-4">व्यक्तिगत जानकारी</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">पूरा नाम</label>
                    <div className="text-lg font-medium text-gray-900">अमित कुमार</div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">ईमेल</label>
                    <div className="text-lg font-medium text-gray-900">amit.kumar@example.com</div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">फोन नंबर</label>
                    <div className="text-lg font-medium text-gray-900">+91 98765 43210</div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">खाता प्रकार</label>
                    <div className="text-lg font-medium text-gray-900 flex items-center gap-2">
                       रीडर <span className="text-yellow-600 text-sm bg-yellow-50 px-2 py-0.5 rounded-full font-bold border border-yellow-200">अर्निंग इनेबल्ड</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="text-red-600 font-bold hover:underline" onClick={() => setIsLoggedIn(false)}>लॉग आउट करें (Logout)</button>
                </div>
              </div>
            )}

            {activeTab === 'kyc' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start mb-6 border-b border-gray-100 pb-4 gap-4">
                  <div>
                    <h3 className="text-2xl font-black">KYC सत्यापन (KYC Verification)</h3>
                    <p className="text-gray-500 font-medium mt-1">अपने रिवॉर्ड्स और पैसे निकालने के लिए KYC पूरा करें।</p>
                  </div>
                  {kycStatus === 'verified' && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-green-200">
                      <CheckCircle className="w-5 h-5" /> सत्यापित (Verified)
                    </div>
                  )}
                  {kycStatus === 'pending' && (
                    <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-yellow-200">
                      <AlertCircle className="w-5 h-5" /> सत्यापन लंबित (Pending)
                    </div>
                  )}
                  {kycStatus === 'submitted' && (
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-blue-200">
                       समीक्षाधीन
                    </div>
                  )}
                </div>

                {kycStatus === 'pending' ? (
                  <form onSubmit={handleKycSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">दस्तावेज़ का प्रकार</label>
                      <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-red-600">
                        <option>आधार कार्ड (Aadhar Card)</option>
                        <option>पैन कार्ड (PAN Card)</option>
                        <option>वोटर आईडी (Voter ID)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">दस्तावेज़ संख्या (ID Number)</label>
                      <input type="text" required placeholder="उदा. 1234 5678 9012" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-red-600" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">दस्तावेज़ की तस्वीर अपलोड करें</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-sm font-bold text-gray-600">तस्वीर चुनने के लिए क्लिक करें</p>
                        <p className="text-xs text-gray-400 mt-1">JPEG, PNG फाइलें (Max 5MB)</p>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                      KYC दस्तावेज़ सबमिट करें
                    </button>
                  </form>
                ) : (
                  <div className="py-8 text-center">
                    {kycStatus === 'submitted' ? (
                      <div>
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">दस्तावेज़ समीक्षाधीन हैं</h4>
                        <p className="text-gray-500">हम आपके दस्तावेज़ों की जांच कर रहे हैं। इसमें कुछ समय लग सकता है।</p>
                      </div>
                    ) : (
                      <div>
                        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                        <h4 className="text-2xl font-black text-gray-900 mb-2">KYC सफलतापूर्वक सत्यापित</h4>
                        <p className="text-gray-500 font-medium">आपका खाता पूरी तरह सत्यापित है। अब आप आसानी से अपने पॉइंट्स निकाल सकते हैं।</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  );
}
