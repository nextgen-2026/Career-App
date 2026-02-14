import React, { useRef } from 'react';
import { AIResponse, UserData } from '../types';

interface ResultsProps {
  data: AIResponse;
  userData: UserData;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ data, userData, onReset }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const textContent = `
AI LIFE DECISION SIMULATOR - PERSONAL ROADMAP
Prepared for: ${userData.name}
Role: ${userData.type || 'Student'}
Goal: ${userData.goal}
Generated on: ${new Date().toLocaleDateString()}
------------------------------------------------------------

MOTIVATIONAL QUOTE
"${data.motivationalQuote}"

------------------------------------------------------------
CAREER ANALYSIS
${data.careerSummary}

------------------------------------------------------------
YOUR ROADMAP

${data.roadmap.map((step, i) => `[STEP ${i + 1}] ${step.title} (${step.timeline})
> ${step.description}
> Resources: ${step.resources.map(r => `${r.name} (${r.url})`).join(', ') || 'None listed'}
`).join('\n')}

------------------------------------------------------------
WEEKLY STUDY PLAN

${data.weeklySchedule.map(item => `• ${item.day}: ${item.task} [${item.focusArea}]`).join('\n')}

------------------------------------------------------------
Good luck on your journey!
`.trim();

    const element = document.createElement("a");
    const file = new Blob([textContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${userData.name.replace(/\s+/g, '_')}_Roadmap.txt`;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm print:hidden">
        <div>
          <h2 className="text-3xl font-bold text-white">Hello, {userData.name} 👋</h2>
          <p className="text-gray-400 mt-1">Here is your blueprint for success.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors shadow-lg shadow-brand-600/20"
            title="Save as PDF via Print Dialog"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save PDF
          </button>
          
          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors border border-white/10"
            title="Download simple text file"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save as Text
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div ref={printRef} className="space-y-8">
        {/* Quote Section */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-accent-600/20 to-brand-600/20 border border-white/10 text-center overflow-hidden print:border-gray-300">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-accent-500 to-brand-500 print:hidden"></div>
          <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed print:text-black">
            "{data.motivationalQuote}"
          </p>
        </div>

        {/* Summary */}
        <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 print:bg-white print:border-gray-300">
            <h3 className="text-lg font-semibold text-brand-400 mb-2 print:text-blue-600">Career Analysis</h3>
            <p className="text-gray-300 leading-relaxed print:text-black">{data.careerSummary}</p>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 print:text-black">
            <span className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-sm print:hidden">📍</span>
            Your Personalized Roadmap
          </h3>
          
          <div className="relative border-l-2 border-white/10 ml-4 space-y-8 pl-8 py-2 print:border-l-2 print:border-gray-300">
            {data.roadmap.map((step, index) => (
              <div key={index} className="relative group break-inside-avoid">
                {/* Timeline Dot */}
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-900 border-2 border-brand-500 group-hover:bg-brand-500 transition-colors print:bg-white print:border-black"></span>
                
                <div className="p-6 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 border border-white/5 transition-all print:bg-white print:border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="text-xl font-bold text-white print:text-black">{step.title}</h4>
                    <span className="px-3 py-1 text-xs font-semibold bg-brand-500/20 text-brand-300 rounded-full w-fit print:bg-gray-100 print:text-black print:border print:border-gray-300">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 print:text-black">{step.description}</p>
                  
                  {step.resources.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider print:text-gray-600">Recommended Resources:</p>
                      <ul className="flex flex-wrap gap-2">
                        {step.resources.map((res, rIndex) => (
                          <li key={rIndex}>
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-accent-500/20 text-accent-300 hover:text-accent-200 text-sm transition-colors border border-white/5 hover:border-accent-500/50 print:bg-white print:text-blue-600 print:underline print:border-0 print:p-0"
                            >
                              <span>🔗 {res.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="space-y-6 break-inside-avoid">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 print:text-black">
            <span className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center text-sm print:hidden">📅</span>
            Weekly Study Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.weeklySchedule.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-gray-800/40 border border-white/5 break-inside-avoid print:bg-white print:border-gray-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white print:text-black">{item.day}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300 print:bg-gray-100 print:text-black">{item.focusArea}</span>
                </div>
                <p className="text-sm text-gray-300 print:text-black">{item.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center print:hidden">
        <h4 className="text-gray-400 mb-4">Was this roadmap helpful?</h4>
        <div className="flex justify-center gap-4">
          <button className="p-3 rounded-full bg-white/5 hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>
          <button className="p-3 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};