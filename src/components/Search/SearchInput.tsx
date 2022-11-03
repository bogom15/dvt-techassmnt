import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { searchApi } from "../../helpers/search";
import { DispatchContext, StateContext } from "../../context/context";
import "./SearchInput.less";
import { StateType } from "../../reducers";

function SearchInput() {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext);
  const state = useContext<StateType>(StateContext);
  const [loading, setLoading] = useState<boolean>(false);

  const search = async (value: string) => {
    if (value !== "") {
      setLoading(true);
      const data = await searchApi(value);
      dispatch({
        type: "SEARCH",
        payload: { ...data, value: value || state.searchResults?.value },
      });
      setLoading(false);
    }
  };

  return (
    <Link to="/search" className="SearchInput">
      <Input.Search
        placeholder="Search"
        size="large"
        allowClear
        bordered={false}
        loading={loading}
        onSearch={search}
        style={{ width: "100%" }}
      />
    </Link>
  );
}

export default SearchInput;
