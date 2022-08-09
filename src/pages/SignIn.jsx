import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  //form data contains all fields data in application like input fields {represents object}
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  //to use email/pasword anywhere in our app we need to de-structure them from formData
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    //() parenthesis shows we can return an object
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form>
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
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password?
            </Link>
            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button type='submit' className='signInButton'>
                <ArrowRightIcon file='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          {/*Google OAuth*/}
          <Link to='/sign-up' className='registerLink'>
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignIn
