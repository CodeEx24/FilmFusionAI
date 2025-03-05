import { useState, type FormEvent, type ChangeEvent } from 'react';
import OpenAI from 'openai';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Download, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { aiModels, artStyles } from '@/const/DATA';
import { toast } from 'sonner';

// Type definitions
interface FormData {
  movieTitle: string;
  artStyle: string;
  model: string;
}

interface GeneratedImage {
  url: string;
}

export default function PosterGenerator() {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    movieTitle: '',
    artStyle: '',
    model: 'dall-e-3',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string): void => {
    setFormData((prev) => ({
      ...prev,
      artStyle: value,
    }));
  };

  const handleApiKeyChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setApiKey(e.target.value);
  };

  const handleModelChange = (value: string): void => {
    setFormData((prev) => ({
      ...prev,
      model: value,
    }));
  };

  const getOpenAIInstance = () => {
    return new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!apiKey) {
      toast('❌ Error', {
        description: 'Please enter your OpenAI API key first',
      });

      return;
    }
    setLoading(true);

    const prompt = `An imaginative poster inspired by the movie "${formData.movieTitle.trim()}" rendered in the ${
      formData.artStyle
    } art style`;

    try {
      const openai = getOpenAIInstance();
      const response = await openai.images.generate({
        model: formData.model,
        prompt,
      });

      const generatedImage = response.data[0] as GeneratedImage;
      setImageUrl(generatedImage.url);
      toast('✅ Success', {
        description: 'Poster generated successfully!',
      });
    } catch (err) {
      toast('❌ Error', {
        description: 'Sorry, an error occurred while generating the poster.',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${formData.movieTitle
      .replace(/\s+/g, '-')
      .toLowerCase()}-poster.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!imageUrl || !navigator.share) return;

    try {
      await navigator.share({
        title: `AI Movie Poster: ${formData.movieTitle}`,
        text: `Check out this AI-generated movie poster for "${formData.movieTitle}" in ${formData.artStyle} style!`,
        url: imageUrl,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
          AI Movie Poster Generator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your favorite movies into unique artistic posters using AI.
          Simply enter a movie title and choose an art style to create something
          amazing.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4">
              {apiKey ? 'Update API Key' : 'Enter API Key'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>OpenAI API Key</DialogTitle>
              <DialogDescription>
                Enter your OpenAI API key to use the poster generator. Your key
                will be stored locally and never sent to our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="sk-..."
                  className="w-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Don't have an API key? Get one from{' '}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  OpenAI's website
                </a>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create Your Poster</CardTitle>
            <CardDescription>
              Fill in the details below to generate your custom movie poster
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="poster-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="movieTitle">Movie Title</Label>
                <Input
                  type="text"
                  id="movieTitle"
                  value={formData.movieTitle}
                  onChange={handleInputChange}
                  placeholder="Enter a movie title"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artStyle">Art Style</Label>
                <Select
                  value={formData.artStyle}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an art style" />
                  </SelectTrigger>
                  <SelectContent>
                    {artStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Select
                  value={formData.model}
                  onValueChange={handleModelChange}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              form="poster-form"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Poster'
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Your Poster</CardTitle>
            <CardDescription>
              {imageUrl
                ? `Generated poster for "${formData.movieTitle}" in ${formData.artStyle} style`
                : 'Your generated poster will appear here'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-center text-muted-foreground">
                  Creating your masterpiece...
                </p>
              </div>
            )}

            {imageUrl && !loading && (
              <div className="flex flex-col items-center">
                <div className="relative group overflow-hidden rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <img
                    src={imageUrl || '/placeholder.svg'}
                    alt={`Generated movie poster for ${formData.movieTitle}`}
                    className="size-80 h-auto rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            )}

            {!imageUrl && !loading && (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
                <div className="w-32 h-48 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl text-muted-foreground/30">?</span>
                </div>
                <p>Fill out the form to generate your poster</p>
              </div>
            )}
          </CardContent>
          {imageUrl && !loading && (
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
