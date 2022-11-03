import React, { useEffect, useContext, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import { StateContext, DispatchContext } from "../../context/context";
import Artist from "../../components/Artist/Artist";
import { StateType } from "../../reducers";
import Spin from "../../components/Spin/Spin";
import { ArtistType } from "../../types/deezerData";

const Homepage = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext);
  const state = useContext<StateType>(StateContext);
  const [index, setIndex] = useState<number>(0);

  const loadMore = async () => {
    const resp = await (
      await fetchJsonp(
        `https://api.deezer.com/chart?index=${index}&limit=20&output=jsonp`
      )
    ).json();
    const data = await resp;
    dispatch({
      type: "TOP_CHART",
      payload: data,
    });
    setIndex(index + 20);
  };

  const onSlideChange = (currentSlide: number, nextSlide: number) => {
    if (nextSlide < currentSlide) {
      loadMore();
    }
  };

  useEffect(() => {
    if (!state.topChart) {
      loadMore();
    }
  }, []);

  return state.topChart ? (
    <div className="Homepage" data-testid="homepage">
      <Artist />
    </div>
  ) : (
    <Spin />
  );
};

export default Homepage;
