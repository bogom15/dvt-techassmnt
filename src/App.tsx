import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "antd/lib/layout";
import { StateContext, DispatchContext } from "../src/context/context";
import { reducer, initialState } from "./reducers";
import Homepage from "./pages/Homepage/HomePage";
import Header from "./components/Header/Header";
import "./App.less";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Router>
            <Layout>
              <Header />
              <Layout.Content className="site-layout">
                <div className="site-layout-background">
                  <Routes>
                    <Route path="/artists/:id"></Route>

                    <Route path="/search">{/* <Search /> */}</Route>
                    <Route path="/" element={<Homepage />}></Route>
                  </Routes>
                </div>
              </Layout.Content>
            </Layout>
          </Router>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
};

export default App;
