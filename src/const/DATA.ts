import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

export const artStyles = [
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'pop art', label: 'Pop Art' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'art nouveau', label: 'Art Nouveau' },
  { value: 'vaporwave', label: 'Vaporwave' },
  { value: 'steampunk', label: 'Steampunk' },
  { value: 'noir', label: 'Film Noir' },
] as const;

export const aiModels = [
  { value: 'dall-e-3', label: 'DALL-E 3 (Better quality, slower)' },
  { value: 'dall-e-2', label: 'DALL-E 2 (Faster, lower quality)' },
] as const;
