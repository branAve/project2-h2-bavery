import * as React from 'react';

import { Button } from './Button';
import { Socket } from './Socket';

export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'numbers': [],
            'users_list': [],
            'user_count': 0
            };
    }

    componentDidMount() {
        Socket.on('all numbers', (data) => {
            this.setState({
                'numbers': data['numbers'],
            });
        });
        Socket.on('user list', (data) => {
            this.setState({
                'users_list': data['users'],
            });
        });
        Socket.on('user count', (data) => {
            this.setState({
                'user_count': data['count']
            });
        });
       
    }

    render() {
        let numbers = this.state.numbers.map(
            (n, index) => <li key= {index}>
                <img src= {n.picture} alt="Avatar" class="resize" />
                {n.name}: {n.message}
            </li>
        );
        
        let userList = this.state.user_list.map(
            (i, index) => <li key= {index}>
                {i.name}
            </li>
        );
        
        return (
            <div>
                <h1 className="heading">Random Chat!</h1>
                <div
                    className="fb-login-button" 
                    data-max-rows="1" 
                    data-size="medium"
                    data-show-faces="false"
                    data-auto-logout-link="true">
                </div>
                <div
                    className="g-signin2"
                    data-theme="dark">
                </div>
                <div className="container">
                    <h4>Users: {this.state.user_count}</h4>
                    <div className="userList">
                        <div className="list">
                            <ul>{userList}</ul>
                        </div>
                    </div>
                    <div className="inputBox">
                        <div className="chatBox">
                            <ul>{numbers}</ul>
                        </div>
                        <div className="input">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
