import React from 'react';
import RepoItem from './RepoItem';

function Repos({ repos }) {
  return (
    <div className='card'>
      {repos.map((repo) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </div>
  );
}

export default Repos;
