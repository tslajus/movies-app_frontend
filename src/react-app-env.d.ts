/// <reference types="react-scripts" />

type Movie = {
  id?: string;
  email?: string;
  movieId: number;
  title: string;
  releaseDate: string;
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
};

type Movies = {
  page: number;
  totalPages: number;
  movies: Movie[];
};

type MovieDetails = Movie & {
  budget: number;
  genres: Genre[];
  homepage: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  voteCount: number;
};

type Pagination = {
  currentPage: number;
  totalPageCount: number;
  siblingCount?: number;
};

type Button = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type Company = {
  originCountry: string;
  logoPath: string;
  id: number;
  name: string;
};

type Genre = {
  id: number;
  name: string;
};

type TextInput = {
  placeholder?: string;
  value?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type SelectField = {
  placeholder?: string;
  isMulti?: boolean;
  options: Option[];
};

type Option = {
  value: string;
  label: string;
};
