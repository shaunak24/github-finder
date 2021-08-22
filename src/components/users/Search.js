import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

export const Search = ({ showClearBtn, clearUsers, showAlert }) => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text !== '') {
      githubContext.searchUsers(text);
      setText('');
    } else {
      showAlert('Please Enter Something', 'light');
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          value={text}
          placeholder='Search User..'
          onChange={onChange}
        />
        <input type='submit' className='btn btn-dark btn-block' />
      </form>
      {showClearBtn && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  text: PropTypes.func,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
};

export default Search;
