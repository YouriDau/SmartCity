import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { deleteToiletFetch } from "../../component/API/useFetchToilet";
import {useParams} from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

const DeleteToilet = (props) => {
  const id = parseInt(props.params.id);
 
  const handlePressDelete = (event) => {
    event.preventDefault();
    deleteToiletFetch(id).then((status) => {
      console.log(status);
    })
  }

  
  return (
    <div>
      <Header />
      <DeleteForm
        title={"Delete toilet"}
        text={"Do you really want to delete the toilet ?"}
        handlePressDelete={(event) => {handlePressDelete(event)}}
      />
    </div>
  );
  
}

export default withParams(DeleteToilet);
