import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import TechEra from './components/TechEra'
import TechEraCoursesCard from './components/TechEraItems'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TechEra} />
        <Route exact path="/courses/:id" component={TechEraCoursesCard} />
      </Switch>
    )
  }
}

export default App
