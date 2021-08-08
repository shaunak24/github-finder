import React, { Component } from 'react'
import UserItem from './UserItem';

export class Users extends Component {
    state = {
        users: [
            {
                id: 1,
                login: 'shaunak24',
                avatar_url: 'https://avatars.githubusercontent.com/u/36746155?v=4',
                html_url: 'https://github.com/shaunak24'
            },
            {
                id: 2,
                login: 'shaunak24',
                avatar_url: 'https://avatars.githubusercontent.com/u/36746155?v=4',
                html_url: 'https://github.com/shaunak24'
            },
            {
                id: 4,
                login: 'shaunak24',
                avatar_url: 'https://avatars.githubusercontent.com/u/36746155?v=4',
                html_url: 'https://github.com/shaunak24'
            }
        ]
    };

    render() {
        return (
            <div style={userStyle}>
                {this.state.users.map(user => 
                    <UserItem key={user.id} user={user} />
                )}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
