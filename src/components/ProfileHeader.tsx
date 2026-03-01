import React from 'react';
import { GitHubUser } from '../types';
import { MapPin, Link as LinkIcon, Users, Building, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ProfileHeaderProps {
  user: GitHubUser;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
      <img 
        src={user.avatar_url} 
        alt={user.login} 
        className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-github-border shadow-lg"
        referrerPolicy="no-referrer"
      />
      
      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{user.name || user.login}</h1>
          <p className="text-xl text-github-accent font-mono">@{user.login}</p>
        </div>
        
        {user.bio && <p className="text-lg leading-relaxed max-w-2xl">{user.bio}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-github-muted">
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {user.location}
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-2">
              <LinkIcon size={16} /> 
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-github-accent transition-colors">
                {user.blog}
              </a>
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-2">
              <Building size={16} /> {user.company}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={16} /> Joined {format(new Date(user.created_at), 'MMM yyyy')}
          </div>
        </div>
        
        <div className="flex gap-6 pt-2">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-github-accent" />
            <span className="font-bold text-white">{user.followers}</span>
            <span className="text-github-muted">followers</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-github-accent" />
            <span className="font-bold text-white">{user.following}</span>
            <span className="text-github-muted">following</span>
          </div>
        </div>
      </div>
    </div>
  );
};
