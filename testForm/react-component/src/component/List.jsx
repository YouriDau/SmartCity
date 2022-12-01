import React from "react";
import { getAllPersonsFetch } from "../component/API/useFetchPerson";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    // se charge au premier chargement de la page puis apres ca ne charge plus
    getAllPersonsFetch().then((persons) => {
      this.setState({ persons: persons });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          <table>
            {console.log(this.state.persons)}
            {this.state.persons.map((person) => {
              return (
                <ul>
                  <li>{person.id}</li>
                  <li>{person.pseudo}</li>
                  <li>{person.firstName}</li>
                  <li>{person.lastName}</li>
                  <li>{person.password}</li>
                </ul>
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
