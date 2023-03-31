import { movies } from "../movies";

export const ADD_FAVORITES = "Favorilere Ekle";
export const SONRAKI_FILM = "Sonraki Film Ekle";
export const ONCEKI_FILM = "Önceki Film Ekle";
export const REMOVE_FAVORITES = "Favorilerden Kaldır";

export function addFavorites(id) {
    return { type: ADD_FAVORITES, payload: id }
}

export function removeFavorites(id) {
    return { type: REMOVE_FAVORITES, payload: id }
}

const initialState = {
    movies: movies,
    favorites: [],
    sira: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITES:
            let newFavItem = action.payload;
            let newMoviesList = state.movies.filter
                ((mov => mov.id !== action.payload.id));
            return {
                ...state,
                favorites: [...state.favorites, newFavItem],
                sira: state.sira === newMoviesList.length ? state.sira - 1 : state.sira,
                movies: newMoviesList,
            };

        case REMOVE_FAVORITES:
            let exFavItemId = action.payload;
            let exFavoriteMovieObj = state.favorites.find((ex) => ex.id === exFavItemId)
            let newFavList = state.favorites.filter
                ((fav) => fav.id !== exFavItemId);
            return {
                ...state,
                favorites: newFavList,
                movies: [...state.movies, exFavoriteMovieObj],
            };

        case SONRAKI_FILM:
            return {
                ...state,
                sira: state.sira + 1,
            }

        case ONCEKI_FILM:
            return {
                ...state,
                sira: state.sira - 1,
            }

        default:
            return state;
    }
}

export default reducer;
