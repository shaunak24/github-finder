import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Search = ({
  showClearBtn,
  clearUsers,
  searchUsers,
  showAlert,
}) => {
  const [text, setText] = useState('');

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
