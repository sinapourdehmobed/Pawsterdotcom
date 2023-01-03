import React from 'react'

import ChatHeader from '../components/ChatHeader'
import MatchesDisplay from '../components/MatchesDisplay'
import ChatDisplay from '../components/ChatDisplay'
import { useState } from 'react'

const ChatContainer = ({user}) => {
   const [ clickedUser, setClickedUser ] = useState(null)

   return (
        <div className = "chat-container">
        <ChatHeader user={user}/>
            <div>
                <button className = "option" onClick={() => setClickedUser(null)}> Matches</button>
                <button className = "option" disabled={!clickedUser}>Chat</button>
            </div>
            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
        </div>
    )
}

export default ChatContainer