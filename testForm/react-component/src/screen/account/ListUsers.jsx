import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import { getAllPersonsFetch } from "../../component/API/useFetchPerson";
import { useState } from "react";
import { useEffect } from "react";
import SearchBarUser from "../../component/SearchBarUser";

const ListUsers = (props) => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState(persons);

  useEffect(() => {
    getAllPersonsFetch().then((persons) => {
      setPersons(persons);
    });
  }, []);

  useEffect(() => {
    if(props !== prevProps) {
      setPersonsToShow(persons);
    }
  }, [persons]);

  const changeValuesToShow = (userName) => {
    const usersToShow = persons;
    const afterFiltering = usersToShow.filter(user => {
      return user.pseudo.includes(userName);
    });
    setPersonsToShow(afterFiltering);
  }

  return (
    <div>
      <Header />
      <SearchBarUser callback={(searchValue) => changeValuesToShow(searchValue)}/>
      <List
        title={"List of users"}
        tab={personsToShow}
        name={"user"}
        parameter={"id"}
        linkSeeMore={`updateUser`}
        linkDelete={`deleteUser`}
        linkUpdate={`updateUserPassword`}
        linkBack={"/userChoices"}
        isUsersList={true}
      />
    </div>
  );
};

export default ListUsers;
