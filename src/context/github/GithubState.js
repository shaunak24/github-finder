import { useReducer } from 'react';
import GithubReducer from './githubReducer';
import GithubContext from './githubContext';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    repos: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/search/users?q=${text}
      &client_id=${githubClientId}
      &client_secret=${githubClientSecret}`
    );
    const data = await res.json();
    dispatch({ type: SEARCH_USERS, payload: data.items });
  };

  // Get User data
  const getUser = async (username) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/users/${username}
      ?client_id=${githubClientId}
      &client_secret=${githubClientSecret}`
    );
    const data = await res.json();
    dispatch({ type: GET_USER, payload: data });
  };

  // Get User Repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc
      &client_id=${githubClientId}
      &client_secret=${githubClientSecret}`
    );
    const data = await res.json();
    dispatch({ type: GET_REPOS, payload: data });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUserRepos,
        getUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
