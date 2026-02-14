import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { Loading } from './components/Loading';
import { Results } from './components/Results';
import { AppState, StudentType, UserData, AIResponse } from './types';
import { generateCareerRoadmap } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    type: null,
    skills: '',
    goal: ''
  });
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);

  const handleStart = () => {
    setAppState(AppState.SELECTION);
  };

  const handleTypeSelect = (type: StudentType) => {
    setUserData(prev => ({ ...prev, type }));
    setAppState(AppState.INPUT_FORM);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const data = await generateCareerRoadmap(userData);
      setResult(data);
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your API Key configuration in Vercel.");
      setAppState(AppState.INPUT_FORM);
    }
  };

  const resetApp = () => {
    setUserData({ name: '', type: null, skills: '', goal: '' });
    setResult(null);
    setAppState(AppState.WELCOME);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-gray-900 to-gray-900"></div>
         <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <header className="flex justify-between items-center mb-12">
          <Logo className="w-10 h-10" />
        </header>

        <main className="flex-grow flex flex-col justify-center">
          {appState === AppState.WELCOME && (
            <div className="text-center space-y-8 animate-fade-in max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-100 to-brand-500">
                Design Your Future<br />With AI
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                The ultimate decision simulator for Indian students. 
                Whether you are in school or college, we map out your path to success using advanced AI.
              </p>
              
              <button
                onClick={handleStart}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-brand-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600 hover:bg-brand-500 transform hover:scale-105"
              >
                Start Your Journey
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute -inset-3 rounded-full bg-brand-400/20 group-hover:bg-brand-400/30 blur-lg transition-all duration-200" />
              </button>
            </div>
          )}

          {appState === AppState.SELECTION && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full animate-fade-in">
              {[StudentType.SCHOOL, StudentType.COLLEGE].map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-500/50 hover:bg-white/10 transition-all duration-300 text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-600/0 to-brand-600/0 group-hover:to-brand-600/10 rounded-3xl transition-all" />
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{type === StudentType.SCHOOL ? '🎒' : '🎓'}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{type}</h3>
                    <p className="text-gray-400">
                      {type === StudentType.SCHOOL 
                        ? "Exploring streams, boards, and early career foundations." 
                        : "Focusing on specialization, internships, and placements."}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {appState === AppState.INPUT_FORM && (
            <div className="max-w-xl mx-auto w-full animate-fade-in">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">
                <button 
                  onClick={() => setAppState(AppState.SELECTION)}
                  className="mb-6 text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  ← Back
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Tell us about yourself</h2>
                
                {error && (
                   <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
                     <strong>Error:</strong> {error}
                   </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Interests & Skills</label>
                    <textarea
                      name="skills"
                      required
                      value={userData.skills}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                      placeholder="e.g. Coding, Cricket, Mathematics, Public Speaking..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Ultimate Goal</label>
                    <input
                      type="text"
                      name="goal"
                      required
                      value={userData.goal}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. Become a Software Engineer at Google"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/20 transition-all transform hover:scale-[1.02]"
                  >
                    Generate Roadmap
                  </button>
                </form>
              </div>
            </div>
          )}

          {appState === AppState.LOADING && <Loading />}

          {appState === AppState.RESULTS && result && (
            <Results data={result} userData={userData} onReset={resetApp} />
          )}
        </main>
        
        <footer className="mt-12 text-center text-gray-600 text-sm pb-8 border-t border-white/5 pt-8">
          <p className="mb-4">© {new Date().getFullYear()} AI Life Decision Simulator. Built for India's Future.</p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-xs uppercase tracking-widest">Rate your experience</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setUserRating(star)}
                  className={`text-2xl transition-all transform hover:scale-110 ${star <= userRating ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500/50'}`}
                >
                  ★
                </button>
              ))}
            </div>
            {userRating > 0 && <span className="text-brand-400 text-xs animate-fade-in">Thank you for your feedback!</span>}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;