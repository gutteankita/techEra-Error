import {Component} from 'react'

import {NavSection, Img} from './styledcomponents'

class Navbar extends Component {
  render() {
    return (
      <NavSection>
        <Img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </NavSection>
    )
  }
}

export default Navbar
