import {Component} from 'react'
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

class TechEra extends Component {
  state = {
    coursesList: [],
    initial: 'INITIAL',
  }
  componentDidMount() {
    this.getCourses()
  }

  foramttedData = data => ({
    id: data.id,
    logoUrl: data.logo_url,
    name: data.name,
  })

  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)
    const fetchedData = await response.json()

    if (response.ok) {
      const updatedData = fetchedData.courses.map(each =>
        this.foramttedData(each),
      )

      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
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

  renderCoursesDetailsView = () => {
    const {coursesList} = this.state
    console.log(coursesList)
    return (
      <Ul>
        {coursesList.map(each => (
          <TechEraItems coursesDetailsList={each} key={each.id} />
        ))}
      </Ul>
    )
  }
  renderAllCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <MainContainer>{this.renderAllCourses()}</MainContainer>
      </>
    )
  }
}

export default TechEra
