import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
  return (
    <>
      <div className='explore'>
        <header>
          <p className='pageHeader'>
            <main>
              {/* Slider*/}
              <p className='exploreCateogryHeading'>Categories</p>
              <div className='exploreCategories'>
                <Link to='/category/rent'>
                  <img
                    src={rentCategoryImage}
                    alt='rent'
                    className='exploreCategoryImg'
                  />
                  <p className='exploreCategoryName'>Places for rent</p>
                </Link>
                <Link to='/category/sale'>
                  <img
                    src={sellCategoryImage}
                    alt='sell'
                    className='exploreCategoryImg'
                  />
                  <p className='exploreCategoryName'>Places for sale</p>
                </Link>
              </div>
            </main>
          </p>
        </header>
      </div>
    </>
  )
}

export default Explore
