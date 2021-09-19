import logo from './logo.svg';
import './App.css';
import React from 'react';


function Movie (props) {
    return (
        <li key={props.key}>
            <h2>{props.name}</h2>
            <ul>
             {props.genres.map((genre, key) => React.createElement('li', { key }, genre))}
            </ul>
        </li>
    );
}

function MovieList ({ filterText, genreSelected, movies }) {
    const filterField = (filedName, needle) => obj => obj[filedName].indexOf(needle) !== -1;

    let predictates = [];

    if (filterText) {
        predictates.push(filterField('name', filterText));
    }
    if (genreSelected !== 'All') {
        predictates.push(filterField('genres', genreSelected));
    }
    const rows = predictates.length > 0 ?
        movies.filter(movie => predictates.every((predictate) => predictate(movie))) : movies;
    
    return (
      <ul>
        {rows.map((row) => <Movie key={row.id} name={ row.name } genres={ row.genres } />)}
      </ul>
    );
}

function GenreInput (props) {
    return (
        <label>
            <input type="radio" key={props.key} value={props.label}  checked={ props.checked ?  'checked' : ''} />
            {props.label}
        </label>
    );
}

function SearchBar(props) {

    const handleSearch = e => props.onSearch(e.target.value);

    const handleFilterGenre = e => props.onFilterGenre(e.target.value);

    return (
      <form>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search Movie..."
          value={props.filterText} />
        <div onChange={handleFilterGenre}>
            {props.genres.map(genre => <GenreInput key={genre} label={genre} checked={genre === props.genreSelected} />)}
        </div>
      </form>
    );
}
class FilterableMovielList extends React.Component {
    ganreAll = 'All';
    constructor(props) {
        super(props); 
        this.state = {
            filterText: '',
            genreSelected: this.ganreAll
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilterGenre = this.handleFilterGenre.bind(this);
    }

    handleSearch(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleFilterGenre(genre) {
        this.setState({
            genreSelected: genre
        });
    }

    render() {
        const genres = new Set([this.ganreAll]);
        this.props.movies.forEach(movie => movie.genres.forEach(genres.add.bind(genres)));
        return (
            <div>
            <SearchBar
                genres={Array.from(genres)}
                filterText={this.state.filterText}
                genreSelected={this.state.genreSelected}
                onSearch={this.handleSearch}
                onFilterGenre={this.handleFilterGenre}
            />
            <MovieList
                movies={this.props.movies}
                filterText={this.state.filterText}
                genreSelected={this.state.genreSelected}
            />
            </div>
        );
    }
}
const MOVIES = [
    { id: 1, name: 'Green Mile', genres: ['Drama', 'Fantasy']},
    { id: 2, name: 'Revolutionary Road', genres: ['Drama']},
    { id: 3, name: 'Forest Gump', genres: ['Drama', 'Melodrama']},
    { id: 4, name: 'Shutter Island', genres: ['Thriller', 'Drama', 'Detective']},
    { id: 5, name: 'Revolver', genres: ['Drama', 'Thriller', 'Detective']},
    { id: 6, name: 'Catch me if you can', genres: ['Drama', 'Comedy']}
];
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <FilterableMovielList movies={MOVIES}/>
      </header>
    </div>
  );
}

export default App;
