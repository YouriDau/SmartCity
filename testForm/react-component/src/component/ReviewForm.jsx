import React from "react";
import { addReviewFetch } from "../component/API/useFetchReview";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

const ReviewForm = (props) => {
    const toiletId = parseInt(props.params.id);
    const [inputReview, setInputReview] = useState("");
    const [note, setNote] = useState(0);
    const navigate = useNavigate();

    const handlePressAdd = (event) => {
        console.log(note);
        event.preventDefault();
        addReviewFetch(note, inputReview, toiletId)
        .then((status) => {
            switch (status) {
                case 201:
                  console.log("Insert Réussi!");
                  break;
                default:
                  console.log(`Error ${status}`);
              }
        }) 
        .catch((error) => {
            console.error("AddReviewFetchError", error);
          });
    }

    const handlePressUpdate = (event) => {
        event.preventDefault();
        console.log("Update review");
    }

    const handlePressCancel = (event) => {
        navigate("/maps");
    }
    
    return (
        <div>
            <h1>{props.title}</h1>
            <form>
                <div>
                    <label>Rate the toilet : </label>
                    <select name="note" onChange={(event) => setNote(event.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div>
                    <br/>
                    <label>Tell us why :</label>
                    <textarea
                        onChange={(event) => {
                            setInputReview(inputReview);
                        }} 
                    />
                </div>
                <div>
                    <button
                        onClick={(event) =>
                            props.isUpdate 
                                ? handlePressUpdate(event)
                                : handlePressAdd(event)
                        }
                    >
                        {props.titleButton}
                    </button>
                    <button style={{backgroundColor:'grey'}} onClick={(event) => handlePressCancel(event)}>Cancel</button>
                </div>
            </form>
        </div>
        
    );
}

export default withParams(ReviewForm);