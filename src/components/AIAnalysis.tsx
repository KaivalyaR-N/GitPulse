import React from 'react';
import { Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface AIAnalysisProps {
  analysis: {
    title: string;
    summary: string;
    strengths: string[];
    suggestion: string;
  } | null;
  loading: boolean;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysis, loading }) => {
  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 w-48 bg-github-border rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-github-border rounded"></div>
          <div className="h-4 w-3/4 bg-github-border rounded"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-l-4 border-l-github-accent"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-github-accent" size={24} />
        <h3 className="text-xl font-bold text-white">AI Profile Insights</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-github-accent font-mono text-sm uppercase tracking-wider mb-1">Developer Persona</h4>
          <p className="text-2xl font-bold text-white mb-2">{analysis.title}</p>
          <p className="text-github-text leading-relaxed">{analysis.summary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-github-muted text-xs uppercase tracking-widest mb-3">Key Strengths</h4>
            <ul className="space-y-2">
              {analysis.strengths.map((strength, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-github-accent" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-github-accent/5 p-4 rounded-lg border border-github-accent/20">
            <div className="flex items-center gap-2 mb-2 text-github-accent">
              <Lightbulb size={18} />
              <span className="text-sm font-bold">Pro Tip</span>
            </div>
            <p className="text-sm italic text-github-text">
              "{analysis.suggestion}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
