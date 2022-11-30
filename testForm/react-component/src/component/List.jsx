import React from "react";
import { getAllPersonsFetch } from "../component/API/useFetchPerson";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons : []
        };
    }

    componentDidMount() { // se charge au premier chargement de la page puis apres ca ne charge plus
        getAllPersonsFetch().then((persons) => {
            persons.forEach(person => {
                this.state.persons.push(person);
            });
        });
    }

    render() {
        return (
            <div>
                {console.log(this.state.persons)}
                <h1>{this.props.title}</h1>
                {this.state.persons.map(person => {return <p>{person.id}</p>})}
                <div>
                    <button>Back</button>
                </div>
            </div>
        ); 
    } 
}

export default List;