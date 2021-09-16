import { createContext, useState, useEffect, ReactNode} from 'react'
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieContextProps {
  genres: GenreResponseProps[] ;
  movies: MovieProps[] ;
  selectedGenre: GenreResponseProps ;
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
type MovieContextProviderProps = {
  children: ReactNode;
}

export const MovieContext = createContext({} as MovieContextProps);


export function MovieContextProvider(props: MovieContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

 

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MovieContext.Provider value={{genres, movies ,selectedGenre ,handleClickButton, selectedGenreId }} >
      {props.children}
    </MovieContext.Provider>
  );
}