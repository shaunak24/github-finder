import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';

export const Search = ({ showAlert }) => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);
  const { searchUsers, clearUsers, users } = githubContext;

  const onSubmit = (e) => {
    e.preventDefault();
    if (text !== '') {
      searchUsers(text);
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
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
