import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Navbar from "./components/Navbar";
import NoteAdd from "./components/NoteAdd";
import Notebook from "./components/Notebook";
import "./App.css";


const firebaseConfig = {
  apiKey: "AIzaSyAQeHqb2fqrlPAlYu-t6AbtF_9U2DC6kZY",
  authDomain: "notes-dad5a.firebaseapp.com",
  databaseURL: "https://notes-dad5a-default-rtdb.firebaseio.com",
  projectId: "notes-dad5a",
  storageBucket: "notes-dad5a.appspot.com",
  messagingSenderId: "518293295142",
  appId: "1:518293295142:web:43b53e00321edc70e5d6e7",
  measurementId: "G-BWPNC2LQDQ"
};
firebase.initializeApp(firebaseConfig);

function App() {
  const [noteBookData, setNoteBookData] = useState([]);

  const updateNotes = () => {
    firebase
      .database()
      .ref("notebook")
      .on("child_added", (snapshot) => {
        let note = {
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description,
        };
        let notebook = noteBookData;
        notebook.push(note);
        setNoteBookData([...noteBookData]);
      });

    firebase
      .database()
      .ref("notebook")
      .on("child_removed", (snapshot) => {
        let notebook = noteBookData;
        notebook = noteBookData.filter((note) => note.id !== snapshot.key);
        setNoteBookData(notebook);
      });
  };

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <><div className="app">
      <Navbar />
      <div className="note-section">
        <NoteAdd />
        <Notebook notebook={noteBookData} />
      </div>
    </div>
    </>
  );
}

export default App;
