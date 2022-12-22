import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getToiletFetch } from "../../component/API/useFetchToilet";
import { useState } from "react";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const UpdateToilet = (props) => {
  const [toilet, setToilet] = useState(null);
  const id = parseInt(props.params.id);

  useEffect(() => {
    getToiletFetch(id)
      .then((toilet) => {
        setToilet(toilet);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      {toilet !== null && (
        <ToiletForm
          title={`Update the toilet ${id}`}
          titleButton={"Save"}
          isUpdate={true}
          toilet={toilet}
        />
      )}
    </div>
  );
};

export default withParams(UpdateToilet);
