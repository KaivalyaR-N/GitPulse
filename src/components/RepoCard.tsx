import React from 'react';
import { GitHubRepo } from '../types';
import { Star, GitFork, Circle } from 'lucide-react';
import { format } from 'date-fns';

interface RepoCardProps {
  repo: GitHubRepo;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Rust: '#dea584',
  Go: '#00ADD8',
  Ruby: '#701516',
};

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="repo-card flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-github-accent group-hover:underline truncate text-lg">
          {repo.name}
        </h3>
      </div>
      
      <p className="text-sm text-github-muted mb-4 line-clamp-2 flex-grow">
        {repo.description || 'No description provided.'}
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        {repo.language && (
          <div className="flex items-center gap-1.5 text-xs">
            <Circle 
              size={10} 
              fill={LANGUAGE_COLORS[repo.language] || '#8b949e'} 
              color={LANGUAGE_COLORS[repo.language] || '#8b949e'} 
            />
            <span>{repo.language}</span>
          </div>
        )}
        
        <div className="stat-badge">
          <Star size={14} />
          {repo.stargazers_count}
        </div>
        
        <div className="stat-badge">
          <GitFork size={14} />
          {repo.forks_count}
        </div>
        
        <span className="text-[10px] text-github-muted ml-auto">
          Updated {format(new Date(repo.updated_at), 'MMM d')}
        </span>
      </div>
    </a>
  );
};
