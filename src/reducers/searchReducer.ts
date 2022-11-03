import { AlbumType, ArtistType } from "../types/deezerData";

export type SearchActionType = {
  type: string;
  payload: SearchStateType;
};

export type SearchStateType = {
  albums?: {
    data: Array<AlbumType>;
  };
  artists?: {
    data: Array<ArtistType>;
  };

  total?: number;
  next?: string;
  value?: string;
};

const searchReducer: (
  state: SearchStateType,
  action: SearchActionType
) => SearchStateType = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return Object.keys(action.payload).reduce((obj, key) => {
        return obj;
      }, {});
    default:
      return state;
  }
};

export default searchReducer;
