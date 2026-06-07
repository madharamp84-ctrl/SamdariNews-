import { useState } from 'react';
import { Coins, CheckCircle, ArrowRight, Gift, Smartphone, X, Target, Users, Copy, Flame } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

export default function EarnPage() {
  const [points, setPoints] = useState(150);
  const [totalEarnedToday, setTotalEarnedToday] = useState(10);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [streakDays, setStreakDays] = useState(3);
  const [isDailyClaimed, setIsDailyClaimed] = useState(false);

  const [taskList, setTaskList] = useState([
    { id: 1, title: 'दैनिक चेक-इन (Daily Check-in)', desc: 'हर दिन ऐप खोलकर 10 पॉइंट्स कमाएं।', points: 10, completed: true },
    { id: 2, title: '5 समाचार लेख पढ़ें', desc: 'आज की ताज़ा ख़बरों के 5 लेख पढ़ें।', points: 50, completed: false },
    { id: 3, title: '1 लेख दोस्तों के साथ साझा करें', desc: 'व्हाट्सएप (WhatsApp) या फेसबुक पर ख़बर शेयर करें।', points: 20, completed: false },
    { id: 4, title: 'वीडियो विज्ञापन (Ads) देखें', desc: '30 सेकंड का प्रायोजित विज्ञापन देखें।', points: 15, completed: false },
    { id: 5, title: 'प्रोफाइल पूरा करें', desc: 'अपने खाते की जानकारी अपडेट करें।', points: 100, completed: false },
  ]);

  const handleClaim = (taskId: number, taskPoints: number, completed: boolean) => {
    if (!completed) {
      setTaskList(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
      setPoints(p => p + taskPoints);
      setTotalEarnedToday(curr => curr + taskPoints);
      
      setToastMessage(`बधाई हो! आपने ${taskPoints} पॉइंट्स कमाए हैं।`);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  };

  const handleDailyClaim = () => {
    if (!isDailyClaimed) {
      setIsDailyClaimed(true);
      setStreakDays(prev => prev + 1);
      const bonus = streakDays + 1 === 7 ? 100 : 20;
      setPoints(p => p + bonus);
      setTotalEarnedToday(curr => curr + bonus);
      
      setToastMessage(`बधाई हो! दैनिक लॉगिन बोनस से ${bonus} पॉइंट्स मिले। लगातार ${streakDays + 1} दिन!`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleWithdrawClick = () => {
    if (points < 100) {
      alert('पैसे निकालने के लिए न्यूनतम 100 पॉइंट्स आवश्यक हैं।');
      return;
    }
    setIsWithdrawModalOpen(true);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId) return;
    alert(`आपकी विथड्रॉवल रिक्वेस्ट सफलतापूर्वक दर्ज हो गई है! ₹${(points / 10).toFixed(2)} आपके खाते में 24 घंटे के भीतर भेज दिए जाएंगे।`);
    setPoints(0);
    setUpiId('');
    setIsWithdrawModalOpen(false);
  };

  const dailyGoal = 200;
  const progressPercentage = Math.min((totalEarnedToday / dailyGoal) * 100, 100);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 min-w-0 relative">
        <div className="mb-6 border-b-8 border-yellow-500 pb-2 inline-block pr-8 mt-2">
          <h1 className="text-4xl font-black uppercase text-gray-900 flex items-center gap-3">
            <Gift className="w-10 h-10 text-yellow-500" /> रिवॉर्ड्स और कमाएँ
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 mb-8 font-medium">छोटे कार्य (Tasks) पूरे करें, ख़बरें पढ़ें, और शानदार इनाम जीतें।</p>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-4 border-yellow-300">
          <div>
            <h2 className="text-xl font-bold mb-2 opacity-90">आपके कुल पॉइंट्स (Your Balance)</h2>
            <div className="text-6xl font-black flex items-center gap-3 drop-shadow-md">
              <Coins size={48} className="text-yellow-100" />
              {points}
            </div>
            <p className="mt-2 text-yellow-100 font-medium">10 पॉइंट्स = ₹1</p>
          </div>
          <button onClick={handleWithdrawClick} className="w-full md:w-auto bg-white text-yellow-700 font-black px-8 py-4 rounded-full hover:bg-yellow-50 transition shadow-xl hover:scale-105 active:scale-95 text-lg flex items-center justify-center gap-2">
            <Smartphone className="w-6 h-6" /> पैसे निकालें (Withdraw)
          </button>
        </div>

        {/* Daily Streak Tracker */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl font-black text-orange-900 mb-2 flex items-center justify-center md:justify-start gap-2">
                <Flame className="w-6 h-6 text-orange-500 fill-orange-500" /> लगातार लॉगिन बोनस (Daily Streak)
              </h3>
              <p className="text-orange-800 font-medium max-w-xl mx-auto md:mx-0">
                हर दिन ऐप खोलें और पॉइंट्स कमाएं। लगातार आते रहें और 7वें दिन बड़ा बोनस जीतें! 
              </p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar pt-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isPast = day <= streakDays;
                const isToday = day === streakDays + 1;
                
                return (
                  <div key={day} className={`flex flex-col items-center justify-center min-w-[75px] p-3 rounded-lg border-2 transition-all ${isPast ? 'bg-orange-500 border-orange-600 text-white shadow-inner' : isToday && !isDailyClaimed ? 'bg-white border-orange-500 shadow-md transform scale-105 ring-2 ring-orange-200 ring-offset-1' : 'bg-orange-50/50 border-orange-200 text-orange-400'}`}>
                    <span className="text-xs font-bold mb-1 opacity-90">दिन {day}</span>
                    <div className={`p-2 rounded-full mb-1 ${isPast ? 'bg-white/20' : isToday && !isDailyClaimed ? 'bg-orange-100' : 'bg-orange-100/50'}`}>
                      {isPast ? <CheckCircle size={20} className="text-white" /> : <Coins size={20} className={isToday && !isDailyClaimed ? 'text-orange-500' : 'text-orange-300'} />}
                    </div>
                    <span className="font-bold text-sm">+{day === 7 ? '100' : '20'}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {!isDailyClaimed && streakDays < 7 && (
            <div className="mt-8 flex justify-center flex-col md:flex-row items-center gap-4 relative z-10 w-full animate-in fade-in slide-in-from-top-4 duration-500">
              <button 
                onClick={handleDailyClaim}
                className="bg-orange-600 text-white font-black px-10 py-4 rounded-full hover:bg-orange-700 transition-all shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-2 text-lg animate-pulse"
              >
                <Gift className="w-6 h-6" /> आज का बोनस ({streakDays + 1 === 7 ? '100' : '20'} पॉइंट्स) पाएं
              </button>
            </div>
          )}
        </div>

        {/* Daily Goal Tracker */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center justify-center md:justify-start gap-2">
              <Target className="w-6 h-6 text-yellow-500" /> दैनिक कमाई का लक्ष्य
            </h3>
            <p className="text-gray-500 font-medium">आज के लक्ष्य को पूरा करें और अतिरिक्त बोनस जीतें!</p>
            <div className="mt-3 flex items-end justify-center md:justify-start gap-2 border-b-2 border-gray-100 pb-1">
              <span className="text-3xl font-black text-yellow-600">{totalEarnedToday}</span>
              <span className="text-gray-400 font-bold mb-1">/ {dailyGoal} पॉइंट्स</span>
            </div>
          </div>
          
          <div className="relative w-32 h-32 shrink-0">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-gray-100" strokeWidth="12" fill="none" />
              <circle 
                cx="50" cy="50" r="40" 
                className="stroke-yellow-500 transition-all duration-1000 ease-out" 
                strokeWidth="12" 
                fill="none" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * progressPercentage) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-800 leading-none">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>

        {/* Refer a Friend Tracker */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 -right-6 p-4 opacity-10 pointer-events-none transform -rotate-12">
            <Users className="w-32 h-32 text-blue-900" />
          </div>
          <div className="relative z-10 w-full md:w-auto flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-blue-900 mb-2 flex items-center justify-center md:justify-start gap-2">
              <Users className="w-6 h-6 text-blue-600" /> दोस्तों को आमंत्रित करें (Refer & Earn)
            </h3>
            <p className="text-blue-800 font-medium mb-5 max-w-2xl">
              अपने दोस्तों को समदरी न्यूज़ ऐप पर आमंत्रित करें। जब आपका दोस्त आपके लिंक से साइन अप करेगा, तो आपको और आपके दोस्त दोनों को <span className="font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-0.5 rounded text-sm shadow-sm inline-flex items-center gap-1"><Coins size={14} className="text-yellow-600" /> 50 पॉइंट्स</span> मिलेंगे!
            </p>
            <div className="flex flex-col sm:flex-row bg-white rounded-lg border border-blue-200 overflow-hidden shadow-sm max-w-md mx-auto md:mx-0">
              <div className="px-4 py-3 bg-gray-50 flex-1 font-mono text-gray-700 font-bold tracking-wider select-all text-center sm:text-left text-lg">
                SAMNEWS50
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('SAMNEWS50');
                  setToastMessage('रेफरल कोड कॉपी हो गया!');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="bg-blue-600 text-white font-bold px-6 py-3 hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" /> कॉपी
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-gray-900">दैनिक कार्य (Daily Tasks)</h3>
              <p className="text-gray-500 font-medium mt-1">आज के कार्य पूरे करें और एक्स्ट्रा पॉइंट्स कमाएं।</p>
            </div>
            <div className="text-sm font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
              {taskList.filter(t => t.completed).length} / {taskList.length} पूर्ण
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {taskList.map(task => (
              <div key={task.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`p-4 rounded-full shrink-0 ${task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle size={28} className={task.completed ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                    <h4 className={`font-black text-xl ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.title}</h4>
                    <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600 font-medium'}`}>{task.desc}</p>
                    <span className={`inline-flex items-center gap-1 mt-2 text-sm font-bold px-2.5 py-0.5 rounded-full ${task.completed ? 'bg-green-50 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      <Coins size={14} /> +{task.points} पॉइंट्स
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleClaim(task.id, task.points, task.completed)}
                  disabled={task.completed}
                  className={`px-6 py-3 rounded-lg font-black shrink-0 flex items-center justify-center gap-2 transition-all ${
                    task.completed 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {task.completed ? 'क्लेम किया' : 'पूरा करें (Start)'}
                  {!task.completed && <ArrowRight size={18} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Modal */}
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-yellow-500 p-6 text-white flex justify-between items-center">
                <h3 className="text-2xl font-black flex items-center gap-2">
                  <Smartphone className="w-6 h-6" /> पैसे निकालें
                </h3>
                <button onClick={() => setIsWithdrawModalOpen(false)} className="text-yellow-100 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex justify-between items-center text-yellow-800">
                  <span className="font-bold">निकासी योग्य राशि:</span>
                  <span className="text-2xl font-black text-yellow-600">₹{(points / 10).toFixed(2)}</span>
                </div>
                
                <form onSubmit={handleWithdrawSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">अपनी UPI ID दर्ज करें</label>
                    <input 
                      type="text" 
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all font-medium" 
                      placeholder="उदाहरण: 9876543210@upi" 
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsWithdrawModalOpen(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                      रद्द करें
                    </button>
                    <button 
                      type="submit"
                      disabled={!upiId}
                      className="flex-1 bg-yellow-500 text-white py-3.5 rounded-xl font-bold hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
                      सबमिट करें
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <CheckCircle className="w-6 h-6 text-green-200" />
            {toastMessage}
          </div>
        )}

      </div>
      <Sidebar />
    </div>
  );
}
