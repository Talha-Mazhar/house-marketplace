import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  //form data contains all fields data in application like input fields {represents object}
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  //to use email/pasword anywhere in our app we need to de-structure them from formData
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    //() parenthesis shows we can return an object
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      //getting auth
      const auth = getAuth()

      //registering user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      //getting actual user
      const user = userCredential.user

      //updating fields
      updateProfile(auth.currentUser, { displayName: name })

      const formDataCopy = { ...formData }
      //don't save the password to db
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      //update db and add our user to user's collection
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      //redirecting to home page
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              className='nameInput'
              placeholder='Name'
              id='name'
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => {
                  setShowPassword((prevState) => !prevState)
                }}
              />
            </div>
            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button type='submit' className='signUpButton'>
                <ArrowRightIcon file='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          {/*Google OAuth*/}
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp
