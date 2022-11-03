import albumsReducer from "./albumsReducer";
import albumReducer from "./albumReducer";
import artistReducer from "./artistReducer";
import artistTrackListReducer, {
  ArtistTrackListStateType,
} from "./artistTrackListReducer";
import searchReducer, { SearchStateType } from "./searchReducer";
import {
  ArtistType,
  AlbumType,
  TrackType,
  TopChartType,
  PlaylistType,
} from "../types/deezerData";

export type StateType = {
  album?: AlbumType;
  albums?: Array<AlbumType>;
  artist?: ArtistType;
  playlist?: PlaylistType;
  track?: TrackType;
  previousTracks?: Array<TrackType>;
  nextTrack?: TrackType;
  artistTrackList?: ArtistTrackListStateType;
  topChart?: TopChartType;
  searchResults?: SearchStateType;
};

export const initialState: StateType = {};

export const reducer: (state: any, action: any) => any = (state, action) => {
  return {
    album: albumReducer(state.album, action),
    albums: albumsReducer(state.albums, action),
    artist: artistReducer(state.artist, action),
    artistTrackList: artistTrackListReducer(state.artistTrackList, action),
    searchResults: searchReducer(state.search, action),
  };
};
