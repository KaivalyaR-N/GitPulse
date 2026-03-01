import React, { useState, useEffect, useCallback } from 'react';
import { Search, Github, Loader2, AlertCircle, Terminal, Code2, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { githubService } from './services/githubService';
import { geminiService } from './services/geminiService';
import { GitHubUser, GitHubRepo } from './types';
import { ProfileHeader } from './components/ProfileHeader';
import { RepoCard } from './components/RepoCard';
import { LanguageChart } from './components/LanguageChart';
import { AIAnalysis } from './components/AIAnalysis';

export default function App() {
  const [username, setUsername] = useState('KaivalyaR-N');
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<{ name: string; value: number }[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (targetUser: string) => {
    setLoading(true);
    setError(null);
    setAiAnalysis(null);
    
    try {
      const userData = await githubService.getUser(targetUser);
      const repoData = await githubService.getRepos(targetUser);
      const langData = await githubService.getLanguageStats(targetUser, repoData);
      
      setUser(userData);
      setRepos(repoData);
      setLanguages(langData);
      
      // Trigger AI analysis after data is loaded
      setAiLoading(true);
      const analysis = await geminiService.analyzeProfile(userData, repoData);
      setAiAnalysis(analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub data');
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(username);
  }, [fetchData, username]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setUsername(searchInput.trim());
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header / Search */}
      <header className="sticky top-0 z-50 bg-github-dark/80 backdrop-blur-md border-b border-github-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setUsername('KaivalyaR-N')}>
            <Github className="text-white" size={32} />
            <span className="text-2xl font-bold text-white tracking-tight">GitPulse</span>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-github-muted" size={18} />
            <input
              type="text"
              placeholder="Search GitHub username..."
              className="w-full bg-github-card border border-github-border rounded-lg py-2 pl-10 pr-4 text-github-text focus:outline-none focus:border-github-accent transition-all"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <Loader2 className="animate-spin text-github-accent" size={48} />
              <p className="text-github-muted font-mono animate-pulse">Scanning the pulse of GitHub...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 gap-4 text-center"
            >
              <AlertCircle className="text-red-500" size={64} />
              <h2 className="text-2xl font-bold text-white">Oops! {error}</h2>
              <p className="text-github-muted">Please check the username and try again.</p>
              <button 
                onClick={() => setUsername('KaivalyaR-N')}
                className="mt-4 px-6 py-2 bg-github-accent text-white rounded-lg hover:bg-github-accent/80 transition-all font-bold"
              >
                Back to KaivalyaR-N
              </button>
            </motion.div>
          ) : user && (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Profile Overview */}
              <ProfileHeader user={user} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & AI */}
                <div className="lg:col-span-1 space-y-8">
                  <LanguageChart data={languages} />
                  <AIAnalysis analysis={aiAnalysis} loading={aiLoading} />
                  
                  {/* Quick Stats Card */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-bold mb-4 text-white">Repository Pulse</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-github-muted">
                          <Terminal size={16} />
                          <span>Total Repos</span>
                        </div>
                        <span className="font-bold text-white">{user.public_repos}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-github-muted">
                          <Code2 size={16} />
                          <span>Primary Language</span>
                        </div>
                        <span className="font-bold text-github-accent">{languages[0]?.name || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-github-muted">
                          <LayoutGrid size={16} />
                          <span>Showcased</span>
                        </div>
                        <span className="font-bold text-white">{repos.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Repositories */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      Recent Repositories
                      <span className="text-sm font-normal text-github-muted bg-github-border px-2 py-0.5 rounded-full">
                        {repos.length}
                      </span>
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.slice(0, 12).map((repo) => (
                      <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                      >
                        <RepoCard repo={repo} />
                      </motion.div>
                    ))}
                  </div>
                  
                  {repos.length > 12 && (
                    <div className="text-center pt-4">
                      <a 
                        href={`https://github.com/${user.login}?tab=repositories`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-github-accent hover:underline font-bold"
                      >
                        View all repositories on GitHub →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-github-border text-center text-github-muted text-sm">
        <p>© {new Date().getFullYear()} copyright reserved KaivalyaS-N • GitPulse</p>
      </footer>
    </div>
  );
}
