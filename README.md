# Movie App

## Overview

Movie App is a responsive React app that lets users browse, search, and filter movies. It features a clean, intuitive interface for discovering popular titles, filtering by genre, and viewing detailed movie information.
Although it was a small project, I was excited to work on it. It allowed me to practice real-world state management with Zustand, API integration, and responsive UI design using Tailwind CSS while creating a user-friendly interface aligned with my passion.

## Features

- **Browse popular movies**: View trending and popular movies on the homepage
- **Search functionality**: Find movies by title with debounced search
- **Genre filtering**: Filter movies by specific genres
- **Detailed movie information**: View comprehensive details about each movie, including:
  - Release date, runtime, and status
  - User ratings
  - Budget and revenue information
  - Production companies
  - Overview and tagline
- **Responsive design**: Optimized for all devices from mobile to desktop
- **Pagination**: Navigate through multiple pages of results
- **Error handling**: Comprehensive error boundaries and informative error pages

## Tech Stack

- **React**: Front-end library for building user interfaces
- **TypeScript**: For type safety and better developer experience
- **Zustand**: Lightweight state management
- **React Router**: For navigation and routing
- **Axios**: For making HTTP requests
- **Tailwind CSS**: For styling and responsive design

## Architecture

The application follows a clean, component-based architecture with:

- **Components**: Reusable UI components with clear separation of concerns
- **Pages**: Page-level components for different routes
- **Services**: API communication layer
- **Hooks**: Custom hooks for shared functionality
- **Store**: Centralized state management using Zustand
- **Types**: TypeScript interfaces for type safety
- **Utils**: Utility functions for common operations

## Technical Decisions

### State Management with Zustand

I chose Zustand over Redux or Context API for state management because:

- **Simplicity**: Requires less boilerplate code
- **Performance**: Minimizes re-renders with fine-grained subscriptions
- **TypeScript Integration**: Excellent TypeScript support
- **Size**: Lightweight bundle size (~2KB)

### Debounced Search

The search functionality uses a custom debounce hook to prevent excessive API calls as the user types:

```typescript
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}
```

### Reusable Input Components

I developed reusable form input components (Input.tsx, Select.tsx) that maintain both local and global state for better user experience:

```tsx
// Example usage of the Input component
<Input
  value={inputValue}
  onValueChange={setInputValue}
  placeholder="Search for movies..."
  ariaLabel="Search movies"
  onSubmit={handleSearch}
/>
```

### Error Handling

Comprehensive error handling with:

- **Error boundaries**: Catch JavaScript errors anywhere in the component tree
- **Loading states**: Provide feedback during data fetching
- **Error states**: Display meaningful error messages
- **Not-found states**: Handle missing resources gracefully

## Trade-offs

### Zustand vs Redux/Context API

- **Decision**: Chose Zustand for state management
- **Trade-off**: Simpler API and smaller bundle size vs. Redux's more established ecosystem
- **Benefit**: Less boilerplate, better performance with fine-grained subscriptions, and excellent TypeScript support

### Custom Hooks vs Component-Based Logic

- **Decision**: Created custom hooks like useDebounce for shared functionality
- **Trade-off**: Additional abstraction layer vs. direct implementation in components
- **Benefit**: Improved code reuse, separation of concerns, and testability

### Error Boundaries vs Traditional Try-Catch

- **Decision**: Implemented React Error Boundaries throughout the application
- **Trade-off**: More component structure vs. simpler error handling
- **Benefit**: Better user experience with graceful degradation and component isolation when errors occur

### Image Loading Strategy

- **Decision**: Used responsive images with fallback placeholders
- **Trade-off**: Better user experience but could increase initial load time
- **Improvement possibility**: Implement lazy loading and progressive image loading

### API Key Management

- **Decision**: Used environment variables for API key storage
- **Trade-off**: Simple to implement but requires environment configuration
- **Security note**: For production, a proper backend proxy would be more secure

## Usage Examples

### Basic Movie Search

```tsx
import React from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/movie/MovieList";
import useMovieStore from "../store/useMovieStore";

const SearchExample = () => {
  const { searchQuery } = useMovieStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-tertiary mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
      </h1>
      <SearchBar />
      <MovieList />
    </div>
  );
};
```

### Filtering Movies by Genre

```tsx
import React from "react";
import Select from "./common/Select";
import useMovieStore from "../store/useMovieStore";

const GenreFilterExample = () => {
  const { genres, selectedGenre, setSelectedGenre } = useMovieStore();

  const handleGenreChange = (value: string) => {
    const genreId = value ? parseInt(value, 10) : null;
    setSelectedGenre(genreId);
  };

  const genreOptions = genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));

  return (
    <div className="w-full md:w-1/3">
      <Select
        value={selectedGenre?.toString() || ""}
        onValueChange={handleGenreChange}
        options={genreOptions}
        placeholder="All Genres"
        ariaLabel="Filter by genre"
      />
    </div>
  );
};
```

### Viewing Movie Details

```tsx
import React, { useEffect } from "react";
import useMovieStore from "../store/useMovieStore";
import MovieDetailsContent from "../components/movie/MovieDetailsContent";

const MovieDetailsExample = ({ movieId }) => {
  const { getMovieDetails, movieDetails, isLoading, error } = useMovieStore();

  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movieDetails) return <div>Movie not found</div>;

  return <MovieDetailsContent movieDetails={movieDetails} />;
};
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   REACT_APP_BASE_URL=https://api.themoviedb.org/3
   REACT_APP_API_KEY= YOUSSEF_api_key_ // You need to register at The Movie Database (TMDB) to get your own API key.
   REACT_APP_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```
4. Start the development server:
   ```
   npm start
   ```

## Future Improvements

1. **Authentication**: Add user accounts for favorites and watchlists
2. **UI-Improvment** : Include a theme component to preserve themes even as the project scales up.
3. **Localization**: Add support for multiple languages
4. **Advanced Caching**: Implement sophisticated caching strategies to reduce API calls
5. **Performance Optimization**:
   - Implement code splitting for larger bundles
   - Add virtualization for long lists
   - Optimize image loading with next-gen formats
6. **Testing Improvements**:
   - Increase test coverage with more unit and integration tests
   - Add end-to-end tests
7. **Accessibility Enhancements**:
   - Perform comprehensive accessibility audit
   - Improve keyboard navigation
   - Enhance screen reader support

## Contributing

Contributions are welcome! Please submit a Pull Request, and i look forward to your feedback. Thank you for the opportunity.
