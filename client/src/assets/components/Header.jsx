import React, {Component} from "react";
import userIcon from "../img/avatar.jpg"

class Header extends Component {

    state = {
        userName: 'Яковлев С.А.',
        userAvatar: userIcon,
        search: '',
    }

    // handleKey = (event) => {
    //     if (event.key === 'Enter') {
    //         this.props.searchHandler(this.state.search)
    //     }
    // }

    render () {

        const {userName, userAvatar} = this.state

        return(
            <div className="header row space-between">
                <input 
                    type="search"
                    id="search"
                    placeholder="Поиск"
                    value={this.state.search}
                    onChange={(e) => this.setState({search: e.target.value})}
                    onKeyDown={this.handleKey}
                />
                <div className="row btn-layout">
                    {userName ? userName : 'User'}
                    <div className="user-avatar row content-center">
                        {userAvatar ? <img src={userAvatar} alt="Аватар"/> : "?"}
                    </div>
                </div>
            </div>
        )

    }

}

export default Header