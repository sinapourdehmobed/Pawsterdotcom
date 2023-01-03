import Nav from '../components/Nav'
import { useState } from 'react'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        pet_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        show_pet: false,
        gender_identity:'',
        pet_identity: "",
        pet_interest: "",
        url: '',
        user_url:'',
        about: '',
        matches: []
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('https://animaldatingapp-pawster-server.herokuapp.com/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === "man"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>

                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>

                            <input
                                id="others-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="others"
                                onChange={handleChange}
                                checked={formData.gender_identity === "others"}
                            />
                            <label htmlFor="others-gender-identity">Others</label>

                        </div>

                        <label>Pet</label>
                        <div className="multiple-input-container">
                            <input
                                id="dog-pet-identity"
                                type="radio"
                                name="pet_identity"
                                value="dog"
                                onChange={handleChange}
                                checked={formData.pet_identity === "dog"}
                            />
                            <label htmlFor="dog-pet-identity">Dog</label>

                            <input
                                id="cat-pet-identity"
                                type="radio"
                                name="pet_identity"
                                value="cat"
                                onChange={handleChange}
                                checked={formData.pet_identity === "cat"}
                            />
                            <label htmlFor="cat-pet-identity">Cat</label>

                            <input
                                id="more-pet-identity"
                                type="radio"
                                name="pet_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.pet_identity === "more"}
                            />
                            <label htmlFor="more-pet-identity">others</label>
                        </div>

                        <label htmlFor="show-pet">Show pet on my Profile</label>

                        <input
                            id="show-pet"
                            type="checkbox"
                            name="show_pet"
                            onChange={handleChange}
                            checked={formData.show_pet}
                        />

                        <label>Show Me</label>

                        <div className="multiple-input-container">
                            <input
                                id="dog-pet-interest"
                                type="radio"
                                name="pet_interest"
                                value="dog"
                                onChange={handleChange}
                                checked={formData.pet_interest === "dog"}
                            />
                            <label htmlFor="dog-pet-interest">Dog</label>


                            <input
                                id="cat-pet-interest"
                                type="radio"
                                name="pet_interest"
                                value="cat"
                                onChange={handleChange}
                                checked={formData.pet_interest === "cat"}
                            />
                            <label htmlFor="cat-pet-interest">Cat</label>

                            <input
                                id="more-pet-interest"
                                type="radio"
                                name="pet_interest"
                                value="more"
                                onChange={handleChange}
                                checked={formData.pet_interest === "more"}
                            />
                            <label htmlFor="more-pet-interest">Others</label>

                        </div>

                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like long walks..."
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">pet Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="pet pic preview"/>}
                        </div>

                        <label htmlFor="user_url">Owner Profile</label>
                        <input
                            type="url"
                            name="user_url"
                            id="user_url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.user_url && <img src={formData.user_url} alt="pet pic preview"/>}
                        </div> 


                    </section>

                </form>
            </div>
        </>
    )
}

export default OnBoarding
