import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css'

function SidebarChat({ name, addNewChat}) {

    const [seed, setSeed] = useState("");

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

    const createChat = () =>{
        const roomName = prompt("Please enter name for chat room");
        if(roomName){
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}/>
                <div className='sidebarChat_info'>
                    <h2>{name}</h2>
                    <p>Last seen {new Date().toUTCString()}</p>
                </div>
            </div>
    ) :(
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
