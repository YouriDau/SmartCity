import * as React from 'react';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div id="header">
                <p>Pose ta crotte</p>
                <div id="btnsHeader">
                    <button id="btnHeader1">maps</button>
                    <button id="btnHeader2">home</button>
                </div>
            </div>
        );
    }
}

export default Header;