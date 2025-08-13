export type GenresType = {
  id: number;
  name: string;
}

export type ProductionCompaniesType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export type ProductionCountriesType = {
  iso_3166_1: string;
  name: string;
}

export type SpokenLanguageType = {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type MovieDetailsType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: unknown;
  budget: number;
  genres: GenresType[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesType[];
  production_countries: ProductionCountriesType[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageType[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}