import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Newsitems extends Component {
   

    render() {
        let {title, description,imageurl,url}=this.props
        return (
            <div>
            {/* here we are using the card to display the various news inside the news components */}
                <div className="card" style={{width: "18rem"}}>
                    <img src={imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={url} target='_blank' className="btn btn-info">Read more</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitems
