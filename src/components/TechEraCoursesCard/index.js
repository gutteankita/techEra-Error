import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import {MainContainer, Ul} from './styledcomponents'
import TechEraItems from '../TechEraItems'
import Navbar from '../Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEraCoursesCard extends Component {
  state = {
    courses: [],
    apiStatus: apiStatusConstants.initial, // Initialize as 'INITIAL'
  }

  componentDidMount() {
    this.getCourses()
  }

  formattedData = data => ({
    id: data.id,
    logoUrl: data.logo_url,
    name: data.name,
  })

  getCourses = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = `https://apis.ccbp.in/te/courses/${id}`

    try {
      const response = await fetch(url)
      const fetchedData = await response.json()

      if (response.ok) {
        const updatedData = fetchedData.course.map(each =>
          this.formattedData(each),
        )
        this.setState({
          courses: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching course details:', error)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderCardView = () => {
    const {courses} = this.state

    if (courses.length === 0) {
      return null
    }

    const {description, name, imageUrl} = courses[0]

    return (
      <div className="itemDetails">
        <div>
          <img src={imageUrl} alt={name} />
        </div>
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCardView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderCourses()}</>
  }
}

export default TechEraCoursesCard
