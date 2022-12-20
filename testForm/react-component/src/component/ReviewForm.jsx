import React from "react";
import { useContext } from "react";
import { addReviewFetch, updateReviewFetch } from "../component/API/useFetchReview";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

const ReviewForm = (props) => {
    const toiletId = parseInt(props.params.id); // fonctionne pas il faut aller chercher l'id de la toilette
    const id = parseInt(props.params.id);
    const [comment, setComment] = useState(props.currentReview?.comment || "");
    const [note, setNote] = useState(props.currentReview?.note || 1);
    const {token} = useContext(UserContext);
    const navigate = useNavigate();

    const handlePressAdd = (event) => {
        console.log(note);
        event.preventDefault();
        addReviewFetch(note, comment, toiletId)
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
        //console.log(comment);
        //console.log(note);
        //console.log(id);
        updateReviewFetch(token, id, note, comment).then((status) => {
            console.log(status);
            switch (status) {
                case 204:
                  console.log("Update Réussi!");
                  break;
                default:
                  console.log(`Error ${status}`);
              }
        });
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
                        defaultValue={props.isUpdate ? props.currentReview.comment : ""}
                        onChange={(event) => {
                            setComment(event.target.value);
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