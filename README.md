# AI Movie Poster Generator

![image](https://github.com/user-attachments/assets/76ea66f6-2f1c-405a-8bd7-64d84d22ac08)

A modern web application that generates unique movie posters using OpenAI's DALL-E AI models. Transform your favorite movies into artistic masterpieces with different art styles.

## Features

- 🎨 Generate AI-powered movie posters
- 🎯 Multiple art styles to choose from
- 🤖 Support for both DALL-E 2 and DALL-E 3 models
- 🔒 Secure API key management
- 📱 Responsive design
- 💾 Download generated posters
- 🔄 Share functionality (Web Share API)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- OpenAI API
- Sonner for toast notifications

## Prerequisites

- Node.js (v16 or higher)
- OpenAI API key

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/film-fusion-ai.git
cd film-fusion-ai
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:

```bash
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click "Enter API Key" and input your OpenAI API key
2. Enter a movie title
3. Select an art style from the dropdown
4. Choose your preferred AI model (DALL-E 2 or DALL-E 3)
5. Click "Generate Poster"
6. Once generated, you can:
   - Download the poster
   - Share it (if your browser supports Web Share API)

## Available Art Styles

- Minimalist
- Watercolor
- Pop Art
- Cyberpunk
- Art Nouveau
- Vaporwave
- Steampunk
- Film Noir

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for their DALL-E API
- shadcn/ui for the beautiful component library
- The open-source community for various tools and libraries

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
