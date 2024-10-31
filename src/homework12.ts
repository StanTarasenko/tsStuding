interface Movie {
  title: string;
  releaseYear: number;
  rating: number;
  awards: string[];
}
  
interface Category {
  name: string;
  movies: Movie[];
}

enum GridFilterTypeEnum {
  MATCH = "MATCH",
  RANGE = "RANGE",
  VALUE_SET = "VALUE_SET"  
}

type MatchFilter<T> = {
  type: GridFilterTypeEnum.MATCH;
  filter: Extract<T, string | number>;
};
  

type RangeFilter<T> = {
  type: GridFilterTypeEnum.RANGE;
  filter: Extract<T, string | number>;
  filterTo: Extract<T, string | number>;
};
  

type ValueSetFilter<T> = {
  type: GridFilterTypeEnum.VALUE_SET;
  values: T[];
};

type GridFilter<T> = MatchFilter<T> | RangeFilter<T> | ValueSetFilter<T>;

interface MovieFilters {
  title?: MatchFilter<string>;
  releaseYear?: RangeFilter<number>;
  rating?: RangeFilter<number>;
  oscar?: ValueSetFilter<boolean>;
}
  
interface CategoryFilters {
  name?: MatchFilter<string>;
}

interface FilterState<TFilters> {
  filters: TFilters;
  searchValue?: string;
}

interface FilterableList<TFilters> {
  filterState: FilterState<TFilters>;
  applySearchValue(value: string): void;
  applyFiltersValue(filters: TFilters): void;
}

class MovieList implements FilterableList<MovieFilters> {
  filterState: FilterState<MovieFilters> = {
    filters: {},
    searchValue: ""
  };

  movies: Movie[] = [];

  applySearchValue(value: string): void {
    this.filterState.searchValue = value;
  }

  applyFiltersValue(filters: MovieFilters): Movie[] {
    this.filterState.filters = filters;
    let filteredMovies = this.movies;

    if (filters.title ) {
      filteredMovies = this.filterByTitle(filteredMovies, filters.title);
    }

    if (filters.releaseYear) {
      filteredMovies = this.filterByReleaseYear(filteredMovies, filters.releaseYear);
    }

    if (filters.rating) {
      filteredMovies = this.filterByRating(filteredMovies, filters.rating);
    }

    if (filters.oscar) {
      filteredMovies = this.filterByOscar(filteredMovies, filters.oscar);
    }

    return filteredMovies;
  }

  private filterByTitle(movies: Movie[], filter: MatchFilter<string>): Movie[] {
    return movies.filter(movie =>
      movie.title.includes(filter.filter)
    );
  }

  private filterByReleaseYear(movies: Movie[], filter: RangeFilter<number>): Movie[] {
    return movies.filter(movie =>
      movie.releaseYear >= filter.filter && movie.releaseYear <= filter.filterTo
    );
  }

  private filterByRating(movies: Movie[], filter: RangeFilter<number>): Movie[] {
    return movies.filter(movie =>
      movie.rating >= filter.filter && movie.rating <= filter.filterTo
    );
  }

  private filterByOscar(movies: Movie[], filter: ValueSetFilter<boolean>): Movie[] {
    return movies.filter(movie =>
      filter.values.includes(true) === movie.awards.includes("Oscar")
    );
  }
}
  
class CategoryList implements FilterableList<CategoryFilters> {
  filterState: FilterState<CategoryFilters> = {
    filters: {},
    searchValue: ""
  };

  categories: Category[] = [];

  applySearchValue(value: string): void {
    this.filterState.searchValue = value;
  }

  applyFiltersValue(filters: CategoryFilters): Category[] {
    this.filterState.filters = filters;
    let filteredCategories = this.categories;

    if (filters.name) {
      filteredCategories = this.filterByName(filteredCategories, filters.name);
    }

    return filteredCategories;
  }
  private filterByName(categories: Category[], filter: MatchFilter<string>): Category[] {
    return categories.filter(category =>
      category.name.includes(filter.filter)
    );
  }
}
