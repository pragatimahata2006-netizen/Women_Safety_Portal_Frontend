import React, { useState } from 'react';
import { 
  BookOpen, 
  Scale, 
  Siren, 
  Lock, 
  ShieldAlert, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Printer, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { safetyResources } from '../data/safetyResources';

const iconMap = {
  Scale,
  Siren,
  Lock,
  ShieldAlert
};

export const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState(safetyResources[0].id);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const activeCategoryData = safetyResources.find(c => c.id === selectedCategory) || safetyResources[0];

  const handleToggleArticle = (id) => {
    setExpandedArticle(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 border border-indigo-500/25 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider mb-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Knowledge & Legal Empowerment</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Safety Resources & Legal Rights Hub
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl font-medium">
            Verified guides on Zero FIR, constitutional safeguards, cyber defense checklists, crisis de-escalation, and situational self-defense.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="btn btn-outline text-xs sm:text-sm flex items-center gap-2 font-bold border-slate-700 shadow-sm"
        >
          <Printer className="w-4 h-4 text-indigo-400" />
          <span>Print / Save Safety Guide</span>
        </button>
      </div>

      {/* Category Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {safetyResources.map((cat) => {
          const Icon = iconMap[cat.icon] || BookOpen;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setExpandedArticle(null);
              }}
              className={`glass-panel p-5 text-left transition-all flex items-center gap-3.5 border shadow-md ${
                isSelected
                  ? "border-indigo-500 bg-indigo-950/50 shadow-indigo-900/20"
                  : "border-slate-700/60 hover:border-slate-600"
              }`}
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                style={{ 
                  backgroundColor: `${cat.color}25`, 
                  color: cat.color,
                  border: `1px solid ${cat.color}50`
                }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="truncate">
                <h4 className="font-extrabold text-sm sm:text-base text-white truncate">{cat.category}</h4>
                <span className="text-xs text-slate-400 font-bold">
                  {cat.articles.length} Guides Available
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Articles Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-white font-display">
            {activeCategoryData.category}
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            Click any guide to expand full legal text
          </span>
        </div>

        <div className="space-y-3.5">
          {activeCategoryData.articles.map((article) => {
            const isExpanded = expandedArticle === article.id;

            return (
              <div 
                key={article.id}
                className={`glass-panel overflow-hidden transition-all border shadow-md ${
                  isExpanded ? "border-indigo-500/80 bg-slate-900/95" : "border-slate-700/60 hover:border-slate-600"
                }`}
              >
                <div 
                  onClick={() => handleToggleArticle(article.id)}
                  className="p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-base sm:text-lg text-white font-display">
                      {article.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {article.summary}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-800/80 text-slate-300 shrink-0 border border-slate-700">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-800 space-y-4 animate-in fade-in">
                    <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans shadow-inner font-medium">
                      {article.content}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {article.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-[11px] font-black uppercase">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs text-emerald-400 font-extrabold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified Legal Citation</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
