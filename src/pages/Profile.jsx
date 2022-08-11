import React from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangedDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData
  const navigate = useNavigate()

  const onLogout = (e) => {
    auth.signOut()
    navigate('/')
  }
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update name/email
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        //update in firestore
        const useRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(useRef, {
          name,
        })
        // toast.success('SuccessFully Updated.', {
        //   position: 'top-center',
        //   autoClose: 1000,
        // })
      }
    } catch (error) {
      toast.error('Could Not update profile details', { autoClose: 2000 })
    }
  }
  const onChnage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <>
      <div className='profile'>
        <header className='profileHeader'>
          <p className='pageHeader'>My Profile</p>
          <button type='button' className='logOut' onClick={onLogout}>
            Logout
          </button>
        </header>
        <main>
          <div className='profileDetailsHeader'>
            <p className='profileDetailsText'>Personal Details</p>
            <p
              className='changePersonalDetails'
              onClick={() => {
                changeDetails && onSubmit()
                setChangedDetails((prevState) => !prevState)
              }}
            >
              {changeDetails ? 'Done' : 'Change'}
            </p>
          </div>
          <div className='profileCard'>
            <form>
              <input
                type='text'
                id='name'
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChnage}
              />
              <input
                type='text'
                id='email'
                className={
                  !changeDetails ? 'profileEmail' : 'profileEmailActive'
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChnage}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export default Profile
