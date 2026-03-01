import { GitHubUser, GitHubRepo } from '../types';

const BASE_URL = 'https://api.github.com';

export const githubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  },

  async getRepos(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repositories');
    return response.json();
  },

  async getLanguageStats(username: string, repos: GitHubRepo[]) {
    const languages: Record<string, number> = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    return Object.entries(languages)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }
};
