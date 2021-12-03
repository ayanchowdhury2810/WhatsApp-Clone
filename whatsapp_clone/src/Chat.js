import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import './Chat.css'
import axios from './axios'

function Chat({ name, messages }) {

    const [input, setInput] = useState("");
    // const [rooms, setRooms] = useState([]);
    const sendMessage = async(e) =>{
        e.preventDefault();
    //     console.log('You typed ', input);
        await axios.post('/messages/new',{
            message: input,
            name:'Ayan',
            timestamp:new Date().toUTCString(),
            received: true
        })

        setInput('');
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src='https://avatars.dicebear.com/api/adventurer/man.svg'/>

                <div className='chat_headerInfo'>
                    <h3>Room Name</h3>
                    <p>Last seen {new Date().toUTCString()}</p>
                </div>

                <div className='chat_headerRight'>
                <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
            {messages.map((message)=>(
                <p className={`chat_message ${message.received && "chat_reciever"}`}>
                    <span className='chat_name'>{message.name}</span>
                        {message.message}
                    <span className='chat_timestamp'>{message.timestamp}</span>
                </p>

            ))}
                
                {/* <p className='chat_message chat_reciever'>
                    <span className='chat_name'>Ayan</span>
                        Message
                    <span className='chat_timestamp'>{new Date().toUTCString()}</span>
                </p>

                <p className='chat_message'>
                    <span className='chat_name'>Ayan</span>
                        Message
                    <span className='chat_timestamp'>{new Date().toUTCString()}</span>
                </p> */}
            </div>

            <div className='chat_footer'>
                <IconButton>
                    <InsertEmoticon/>
                </IconButton>
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Type a message' type='text'/>
                    <button onClick={sendMessage} type='submit'>Send a Message</button>
                </form>
                <IconButton>
                    <Mic/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
