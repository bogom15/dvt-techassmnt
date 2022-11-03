import fetchJsonp from "fetch-jsonp";
import { TrackType } from "../types/deezerData";
const { DZ } = window;

type DispatchType = React.Dispatch<{ type: string; payload: any }>;

export const ARTIST_API = "https://api.deezer.com/artist/";

export const searchApi: (
  value?: string,
  type?: string,
  limit?: number
) => Promise<any> = async (value, type = "autocomplete", limit = 10) =>
  await (
    await fetchJsonp(
      `https://api.deezer.com/search/${type}?q=${value}&limit=${limit}&output=jsonp`
    )
  ).json();

export const searchArtistInfo = (
  tracks: Array<TrackType>,
  dispatch: DispatchType
): void => {
  searchArtist(dispatch, ARTIST_API + tracks[0].artist?.id);
};

const searchArtist = (dispatch: DispatchType, url: string) =>
  fetch(url, dispatch, "FIND_ARTIST");

export const searchAlbums = (dispatch: DispatchType, url: string) =>
  fetch(`${url}/albums`, dispatch, "ALBUMS", 100);

const fetch = (
  url: string,
  dispatch: DispatchType,
  type: string,
  limit?: number
) =>
  fetchJsonp(`${url}?output=jsonp${limit ? "&limit=" + limit : ""}`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type,
        payload: data,
      })
    );
