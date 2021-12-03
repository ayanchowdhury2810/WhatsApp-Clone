import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react';
import axios from './axios';
// import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {

  const [messages, setMessages] = useState([]);

  // const [user, setUser] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  useEffect(()=>{
    axios.get('/messages/sync').then(response => {
      setMessages(response.data);
    })
  },[])

  useEffect(()=>{
    const pusher = new Pusher('fa6b7753282ce84fc46c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    // clean up function

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])

  // console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ):(
        <div className="app_body">
          <Sidebar/>
          <Chat messages={messages}/>
        </div>
      )}
    </div>
  );
}

export default App;
