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

type SortOption = {
  code: string;
  name: string;
};

type Option = {
  value: string;
  label: string;
};

type SignUp = {
  name: string;
  email: string;
  password: string;
};

type Login = {
  email: string;
  password: string;
};

type UserFormValues = {
  name?: string;
  email: string;
  password: string;
};

type FieldInput = {
  name: string;
  placeholder?: string;
  label?: string;
  touched?: boolean;
  error?: string | undefined;
};

type Field = FieldInput & {
  onBlur: () => void;
  onFocus: () => void;
  value: any;
};

type TextInput = React.InputHTMLAttributes<HTMLInputElement> & {
  field: Field;
  label?: string;
  touched?: boolean;
  error?: string | undefined;
};

type SelectField = FieldInput & {
  isMulti?: boolean;
  options: Option[];
  name?: string;
  form?: Form;
};

type Form = FormikProps<{ [key: string]: any }>;

type InputController = FieldInput & {
  control: 'textInput' | 'select';
  options?: Option[];
  isMulti?: boolean;
  type?: string;
  touched?: boolean;
  error?: string | undefined;
};
