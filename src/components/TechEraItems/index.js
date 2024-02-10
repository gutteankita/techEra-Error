import React, {Component} from 'react'
import {Li, Img, Name} from './styledcomponents'
import {Link} from 'react-router-dom'

class TechEraItems extends Component {
  render() {
    const {coursesDetailsList} = this.props

    // Check if coursesDetailsList is undefined or id is missing
    if (!coursesDetailsList || !coursesDetailsList.id) {
      return null // Return null if data is not available
    }

    const {id, logoUrl, name} = coursesDetailsList

    return (
      <Link to={`/courses/${id}`}>
        <Li>
          <Img src={logoUrl} />
          <Name>{name}</Name>
        </Li>
      </Link>
    )
  }
}

export default TechEraItems
