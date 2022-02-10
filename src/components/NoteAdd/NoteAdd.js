import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./NoteAdd.css";

const NoteAdd = () => {

  const [show,setShow]=useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addNote = () => {
    if (title !== "" && description !== "") {
      firebase.database().ref("notebook").push({
        title: title,
        description: description,
      })
        .then(() => {
          window.location.reload()
        });
    }  
  };
  return (
    <>
      <div className="noteadd" id="modal_container">
        {
          show?<h1>Add a New Note</h1>:null
        }
        <div className="form-group">
          {
            show?<input
            type="text"
            className="noteadd-header"
            name="noteadd-header"
            placeholder="Note Title"
            value={title}
            onChange={(val) => handleTitleChange(val)}
          />:null
          }
        </div>
        <div className="form-group">
          {
            show?<textarea
            name="noteadd-description"
            className="noteadd-description"
            placeholder="Note Description"
            value={description}
            onChange={(val) => handleDescriptionChange(val)}
          ></textarea>:null
          }
        </div>
        <div className="noteadd-button">
          {
            show?<button className="btn" onClick={() => addNote()}>Save</button>:null
          }
        </div>
      </div>
      <div class="button_container">
        <button type="button" class="button" id="open" onClick={()=>setShow(!show)}>
           <span class="button_text">+</span>
        </button>
    </div>
    </>
  );
};

export default NoteAdd;
