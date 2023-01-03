import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'


const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [petUsers, setPetUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId


    const getUser = async () => {
        try {
            const response = await axios.get('https://animaldatingapp-pawster-server.herokuapp.com/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const getPetUsers = async () => {
        try {
            const response = await axios.get('https://animaldatingapp-pawster-server.herokuapp.com/pet-users', {
                params: {pet: user?.pet_interest}
            
            })
            setPetUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
        
    }, [])

    useEffect(() => {
        if (user) {
            getPetUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('https://animaldatingapp-pawster-server.herokuapp.com/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }


    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredPetUsers = petUsers?.filter(petUser => !matchedUserIds.includes(petUser.user_id))


    console.log('filteredPetUsers ', filteredPetUsers)
    return (
        <>
            {user &&
            <div className="dashboard">
                <ChatContainer user={user}/>
                <div className="swipe-container">
                    <div className="card-container">

                        {filteredPetUsers?.map((petUser) =>
                            <TinderCard
                                className="swipe"
                                key={petUser.user_id}
                                onSwipe={(dir) => swiped(dir, petUser.user_id)}
                                onCardLeftScreen={() => outOfFrame(petUser.first_name)}>
                                <div
                                    style={{backgroundImage: "url(" + petUser.url + ")"}}
                                    className="card">
                                    <h3>{petUser.first_name}</h3>
                                </div>
                            </TinderCard>
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
export default Dashboard
