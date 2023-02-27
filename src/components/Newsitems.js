import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Newsitems extends Component {


    render() {
        let { title, description, imageurl, url, author, date, source } = this.props
        return (
            <div >
                {/* here we are using the card to display the various news inside the news components */}

                <div className="card text-center" >
                    <img src={imageurl} style={{ height: '30vh' }} className="card-img-top" alt="..." />
                    <div className="card-body" style={{ height: '33vh' }}>
                        <h5 className="card-title">{title}...</h5>
                        {/* below is the tag that is present on the top of the newsitems */}
                        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-primary" style={{ left: '88%', zIndex: '1' }}>{source}
                        </span>
                        <p className="card-text">{description}...</p>
                        {/* to show the date in the human readable formate we are using the above method */}
                        <p className="card-text"><small className="text-muted">By:{author ? author : 'Unknown'} on {new Date(date).toDateString()}</small></p>
                        <a href={url} target='_blank' className="btn btn-info my-1">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitems
