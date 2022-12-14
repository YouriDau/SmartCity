import React from "react";
import { addReviewFetch } from "../component/API/useFetchReview";
import { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const ReviewForm = (props) => {
    const [inputReview, setInputReview] = useState("");

    const handlePressAdd = (event) => {
        event.preventDefault();
        addReviewFetch(inputReview)
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

    
    return (
        <div>
            <h1>{props.title}</h1>
            <form>
                <div>
                    <br/>
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
                    <button style={{backgroundColor:'grey'}}>Cancel</button>
                </div>
            </form>
        </div>
        
    );
    
}

export default ReviewForm;