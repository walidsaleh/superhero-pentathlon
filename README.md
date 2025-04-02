# Superhero Pentathlon

A Vue 3 application for managing superheroes and running a pentathlon competition. This project allows users to create custom superheroes with unique attributes and pit them against each other in a five-event pentathlon to determine the ultimate champion.

## Features

### Superhero Management
- Create, edit, and delete superheroes
- Upload and crop hero images (128x128px)
- Manage hero attributes (Agility, Strength, Weight, Endurance, Charisma)
- Responsive design for mobile and desktop
- Dark/Light theme support
- Multi-language support (English and Spanish)

### Pentathlon Competition
- Select 3 superheroes to compete
- 5 events with unique scoring systems based on superhero attributes:
  1. **Wall Climbing** - Tests agility and strength
  2. **Joke Telling** - Tests charisma
  3. **Villain Shot** - Tests precision and strength
  4. **200km Race** - Tests endurance and agility
  5. **Cat Rescue** - Tests all attributes in a balanced way
- Real-time scoring and rankings
- Animated podium for winners
- Detailed event results

## Technology Stack
- **Frontend Framework**: Vue 3 with Composition API
- **Type Safety**: TypeScript
- **Styling**: TailwindCSS for utility-first styling
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Vue's Reactivity API with Pinia
- **Routing**: Vue Router
- **Internationalization**: Vue I18n
- **Icons**: Heroicons

## Project Setup

1. Install dependencies:
```sh
npm install
```

2. Start development server:
```sh
npm run dev
```

3. Build for production:
```sh
npm run build
```

## Development

### Type Checking
```sh
npm run type-check
```

### Linting
```sh
npm run lint
```

### Format Code
```sh
npm run format
```

### Testing (Coming Soon)

The testing suite for this project is currently under development. Future implementations will include:

- Unit tests for components and utilities
- Integration tests for superhero management
- End-to-end tests for the pentathlon competition flow

## Project Structure

```
superhero-pentathlon/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project assets (images, fonts)
│   ├── components/      # Reusable Vue components
│   ├── composables/     # Composition API functions
│   ├── i18n/            # Internationalization files
│   ├── router/          # Vue Router configuration
│   ├── services/        # API and data services
│   ├── stores/          # Pinia stores
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
└── package.json         # Project dependencies
```

## Design Decisions

- **Component Structure**: Focused on reusability and composition
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Accessibility**: ARIA attributes and keyboard navigation
- **Performance**: Optimized rendering with Vue's reactivity system
- **Type Safety**: Strong typing with TypeScript to prevent runtime errors

## Future Enhancements

- Additional superhero attributes and events
- Tournament mode with multiple rounds
- User accounts and saved competitions
- More detailed statistics and analytics
- Expanded internationalization support
