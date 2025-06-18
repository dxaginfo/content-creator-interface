# Content Creator Interface

A React web application that generates content in various writing styles based on writer templates.

## Features

- Style selection interface
- Content prompt input
- Generated content display
- Export options
- History tracking

## Writing Styles Available

- **Super Writer GPT (Tim Ferriss Style)** - Clear, concise writing with tactical advice and personal anecdotes
- **Super Writer GPT (Tim Ferriss Style) + James Clear (20%)** - Tim Ferriss style with James Clear's emphasis on habits and systems
- **Insight Writer GPT (Shane Parrish Style)** - Mental models and deep analytical thinking
- **Brutally Honest GPT (Mark Manson Style)** - No-nonsense approach with direct, sometimes profane language
- **Idea Curator GPT (David Perell Style)** - Connection of ideas across domains with storytelling elements

## Technical Implementation

- Frontend: React with TypeScript
- UI Components: shadcn-ui
- Styling: Tailwind CSS
- Build Tool: Vite

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The app can be deployed via Lovable:

1. Build the application:
   ```bash
   npm run build
   ```
2. Use the Share -> Publish option in Lovable

## Testing Checklist

- [ ] Style selection functionality
- [ ] Content generation for each style
- [ ] Responsive design
- [ ] Error handling
- [ ] Export functionality