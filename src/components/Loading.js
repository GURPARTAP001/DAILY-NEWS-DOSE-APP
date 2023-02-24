import React, { Component } from 'react'
import spinner from './spinner.gif'

export class loading extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        {/* we have to enclose the src in the {} as it is hte the component */}
        <img src={spinner} alt="loading" />
      </div>
    )
  }
}

export default loading
