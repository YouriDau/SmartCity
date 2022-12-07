import React from "react";
import {Link} from 'react-router-dom';
//import { getAllPersonsFetch } from "../component/API/useFetchPerson";
//import UpdateUser from "../screen/account/UpdateUser";
//import DeleteUser from "../screen/account/DeleteUser";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          <table>
            {this.props.tab.map((item) => {
              return (
                <div class="list">
                     {`${this.props.name} ${item[this.props.parameter]}`} 
                  
                    <Link to={"/" + this.props.linkSeeMore + "/" + item.id}>
                        <button class="btnList">see more</button>
                    </Link>
                    <Link to={"/" + this.props.linkDelete + "/" + item.id}>
                        <button class="btnList">delete</button>
                    </Link>
                    
                </div>
              );
            })}
          </table>
        </div>

        <div>
          <button>Back</button> 
        </div>
      </div>
    );
  }
}

export default List;
