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
  awards?: ValueSetFilter<string>;
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

  applyFiltersValue(filters: MovieFilters): void {
    this.filterState.filters = filters;

    if (filters.title ) {
      this.movies = this.movies.filter(movie =>
        movie.title.includes(filters.title?.filter as string)
      );
    }
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

  applyFiltersValue(filters: CategoryFilters): void {
    this.filterState.filters = filters;

    if (filters.name) {
      this.categories = this.categories.filter(category =>
        category.name.includes(filters.name?.filter as string)
      );
    }
  }
}
