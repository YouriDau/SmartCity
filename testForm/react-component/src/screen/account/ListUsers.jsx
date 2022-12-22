import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import { getAllPersonsFetch } from "../../component/API/useFetchPerson";
import { useState } from "react";
import { useEffect } from "react";

const ListUsers = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getAllPersonsFetch().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <Header />
      <List
        title={"List of users"}
        tab={persons}
        name={"user"}
        parameter={"id"}
        linkSeeMore={`updateUser`}
        linkDelete={`deleteUser`}
        linkUpdate={`updateUserPassword`}
        linkBack={"/usersPanel"}
        isUsersList={true}
      />
    </div>
  );
};

export default ListUsers;
