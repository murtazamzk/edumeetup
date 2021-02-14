import React, { createContext, useEffect, useReducer, useContext, useRef, useState } from "react";
import { initialState, reducer } from "./reducers";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { get } from './utils/api';
import { GET_USERS } from './utils/constants';

import AddUser from './components/addUser';
import SearchUser from './components/searchUser';

export const StoreContext = createContext(null);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    let data = await get('https://my.api.mockaroo.com/eduvanzmockusers.json?key=2d5e8cd0');
    dispatch({type: GET_USERS, payload: data});
    setLoading(false);
  }, [])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        {loading && <div className="loader-wrapper"><div className="loader">Loading...</div></div>}
        <div className="app">
          <header className="app-header">
            <div className="container">
              <h1>EduMeetup</h1>
              <ul>
                <li><Link to="/">Add User</Link></li>
                <li><Link to="/search">Search Users</Link></li>
                <li><Link to="/reports">Reports</Link></li>
              </ul>
            </div>
          </header>
          <section className="container">
            <Switch>
              <Route path="/reports">
                <AddUser />
              </Route>
              <Route path="/search">
                <SearchUser />
              </Route>
              <Route path="/">
                <AddUser setLoading={setLoading} />
              </Route>
            </Switch>
          </section>
        </div>
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
