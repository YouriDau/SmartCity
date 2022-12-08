import React from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";

class MenuControle extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header />
                <h1>Controle panel</h1>
                <div id="menuControle">
                    <Link to={"/listUsers"} className="linkMenu">
                        <div class="divMenu">
                            <p>users</p>
                        </div>
                    </Link>
                    <Link className="linkMenu">
                        <div class="divMenu">
                            <p>reviews</p>
                        </div>
                    </Link>
                    <Link to={"/maps"} className="linkMenu">
                        <div class="divMenu">
                            <p>toilets</p>
                        </div>
                    </Link>
                    <Link to={"/listReports"} className="linkMenu">
                        <div class="divMenu">
                            <p>reports</p>
                        </div>
                    </Link>
                </div>
            </div>
            
        );
    }
}

export default MenuControle;