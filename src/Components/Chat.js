import React, { useRef, useState } from 'react';
import './Chat.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUiiMYHSjKvILVNnbRSw1DEEJghXg6U_E",
  authDomain: "carpooling-c32b8.firebaseapp.com",
  projectId: "carpooling-c32b8",
  storageBucket: "carpooling-c32b8.appspot.com",
  messagingSenderId: "632492388215",
  appId: "1:632492388215:web:96c765facc0ae64fb03b72",
  measurementId: "G-4C0J51W76E"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function Chat() {
  const [user] = useAuthState(auth);

  return (
    <div className="fireApp">
      <header>
        <h1><span role="img" aria-label="Chat Icons">⚛️🔥💬</span></h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button className="firesign-in" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className="firesign-out" onClick={() => signOut(auth)}>
      Sign Out
    </button>
  );
}

function ChatRoom() {
  const navigate = useNavigate(); // Moved inside the component
  const dummy = useRef();
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form className="id1" onSubmit={sendMessage}>
        <input className="chatinput"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Send a message"
        />

        <button type="submit" disabled={!formValue}>Send</button>
        <button onClick={() => navigate("/login/CarPool/UserRide/AvailableDrivers/Payment")}>Finish</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://via.placeholder.com/150'} alt="Avatar" />
      <p>{text}</p>
    </div>
  );
}

export default Chat;
