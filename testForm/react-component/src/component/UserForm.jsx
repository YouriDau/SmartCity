import React from "react";
import { Link } from "react-router-dom";
import { addPersonFetch, updatePersonFetch } from "../component/API/useFetchPerson"; // dans l'objet useFetchPerson on prend addPersonFetch

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      inputPseudo: "",
      inputLastName: "",
      inputFirstName: "",
      inputPassword: "",
      inputEmail: "",
    };
  }

  async handlePressAdd(event) {
    event.preventDefault();
    addPersonFetch(
      this.state.inputPseudo,
      this.state.inputLastName,
      this.state.inputFirstName,
      this.state.inputEmail,
      this.state.inputPassword
    ).then((status) => {
      console.log(status);
      switch (status) {
        case 201:
          console.log("Insert Réussi!");
          break;
        default:
          console.log(`Error ${status}`);
      }
    });
  }

  async handlePressUpdate(event) {
    event.preventDefault();
    updatePersonFetch(
      this.state.inputPseudo,
      this.state.inputLastName,
      this.state.inputFirstName,
      this.state.inputEmail,
      this.state.inputPassword
    ).then((status) => {
      console.log(status);
      switch (status) {
        case 201:
          console.log("Update Réussi!");
          break;
        default:
          console.log(`Error ${status}`);
      }
    });
  }

  render() {
    return (
      <div class="form">
        <div class="content">
          <h1>{this.props.title}</h1>
          <form>
            <div class="divForm">
              <label class="lblForm">Pseudo</label>
              <br />
              <input
                type="text"
                defaultValue = {this.props.isUpdate ? this.props.currentUser.pseudo : ""}
                onChange={(event) => {
                  this.setState({ inputPseudo: event.target.value });
                }}
              />
            </div>
            <div class="divForm">
              <label>Last name</label>
              <br />
              <input
                type="text"
                defaultValue = {this.props.isUpdate ? this.props.currentUser.last_name : ""}
                onChange={(event) => {
                  this.setState({ inputLastName: event.target.value });
                }}
              />
            </div>
            <div class="divForm">
              <label>First name</label>
              <br />
              <input
                type="text"
                defaultValue = {this.props.isUpdate ? this.props.currentUser.first_name : ""}
                onChange={(event) => {
                  this.setState({ inputFirstName: event.target.value });
                }}
              />
            </div>
            {this.props.registration ? 
              <div class="divForm">
                <label>Password</label>
                <br />
                <input
                  type="password"
                  onChange={(event) => {
                    this.setState({ inputPassword: event.target.value });
                  }}
                />
              </div>
              :
              ""
            }
            
            <div class="divForm">
              <label>Email</label>
              <br />
              <input
                type="text"
                defaultValue = {this.props.isUpdate ? this.props.currentUser.email : ""}
                onChange={(event) => {
                  this.setState({ inputEmail: event.target.value });
                }}
              />
            </div>
            <div class="divForm">
              <button>Cancel</button>
              {/* <button onClick={(event) => this.props.handlePress(event)}><Link to={`/addToilet`}>{this.props.titleButton}</Link></button> */}
              {/* <Link to={`/addToilet`}><button onClick={(event) => (this.props.isUpdate?handlePressUpdate(event):this.handlePressAdd(event) )}>{this.props.titleButton}</button></Link> */}
              <button
                onClick={(event) =>
                  this.props.isUpdate
                    ? this.handlePressUpdate(event)
                    : this.handlePressAdd(event)
                }
              >
                {this.props.titleButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;
