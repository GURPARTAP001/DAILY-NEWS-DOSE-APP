import React from 'react'
import spinner from './spinner.gif'

// converting the class base component to the function base component
// export class loading extends Component {
  const loading=()=>{

  
    return (
      <div className='text-center my-3'>
        {/* we have to enclose the src in the {} as it is hte the component */}
        <img src={spinner} alt="loading" />
      </div>
    )
  }


export default loading
