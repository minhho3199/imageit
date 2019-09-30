//This code is from the react-reactions package by caseandberg on github.com
//See https://github.com/casesandberg/react-reactions
import React from 'react'

export const active = Component => {
  return class Active extends React.Component {
    state = { active: false }
    handleMouseDown = () => this.setState({ active: true })
    handleMouseUp = () => this.setState({ active: false })

    render() {
      return (
        <div onMouseDown={ this.handleMouseDown } onMouseUp={ this.handleMouseUp }>
          <Component { ...this.props } { ...this.state } />
        </div>
      )
    }
  }
}

export default active
