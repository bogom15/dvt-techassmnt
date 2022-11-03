import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import Artist from "../Artist/Artist";
import { DispatchContext, StateContext } from "../../context/context";
import { searchApi } from "../../helpers/search";
import "./Search.less";
import { StateType } from "../../reducers";

function Search() {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext);
  const { searchResults } = useContext<StateType>(StateContext);
  const { state }: any = useLocation();

  useEffect(() => {
    if (state?.type !== "all") {
      searchApi(searchResults?.value, state?.type.slice(0, -1), 100).then(
        ({ data }) =>
          dispatch({
            type: "SEARCH",
            payload: { ...searchResults, [state?.type]: { data } },
          })
      );
    }
  }, [state?.type]);

  if (searchResults) {
    const types = Object.entries(searchResults).filter(([type]) =>
      ["artists"].includes(type)
    );

    const shouldShow = (type: string): boolean =>
      state === undefined || state?.type === "all" || state?.type === type;
    return (
      <section className="Search">
        {shouldShow("artists") && <Artist />}
      </section>
    );
  }

  return null;
}

export const Icon = () => (
  <RightOutlined style={{ fontSize: "14px", verticalAlign: "baseline" }} />
);

export default Search;
