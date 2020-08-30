import React, { Component } from "react";
import MovieCard from "../../component/MovieCard/MovieCard";
import Search from "../../component/Search/Search";
import axios from "axios";

class MovieSearch extends Component {
    state = {
        movieId: "tt1442449", // default imdb id (Spartacus)
        title: "",
        movie: {},
        searchResults: [],
        isSearching: false
    };

    componentDidMount() {
        this.loadMovie();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.movieId !== this.state.movieId) {
            this.loadMovie();
        }
    }

    timeout = null;

    loadMovie() {
        axios
            .get(
                `http://www.omdbapi.com/?i=tt3896198&apikey=8a34c550&i=${this.state.movieId}`
            )
            .then(response => {
                this.setState({ movie: response.data });
                console.log(this.state.movie);
            })
            .catch(error => {
                console.log("Opps!", error.message);
            });
    }

    searchMovie = event => {
        this.setState({ title: event.target.values, isSearching: false });
        this.timeout = setTimeout(() => {
            axios
                .get(
                    `http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${this.state.title}`
                )
                .then(response => {
                    if (response.data.Search) {
                        const movies = response.data.Search.slice(0, 5);
                        this.setState({ searchResults: movies });
                    }
                })
                .catch(error => {
                    console.log("Opps!", error.message);
                });
        }, 1000);
    };

    itemClicked = item => {
        this.setState({
            movieId: item.imdbID,
            isSearching: false,
            title: item.title
        });
    };

    render() {
        return (
            <div>
                <Search />
                <MovieCard  movie={this.state.movie}/>
            </div>
        );
    }
}

export default MovieSearch;
