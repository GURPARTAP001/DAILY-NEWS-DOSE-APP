import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Newsitems from './Newsitems'

export class News extends Component {
    
  
    //in the react the constructor works only if the object of that class is created,so inside the constructor we will always declare the super() to avoid the error 
    constructor() {
        super()
        // here we are creating a usestate so that each time the newsitem material can get updated
        this.state = {
            articles: [],
            loading :false,
            page:1,
            totalResults:0
        }
    }
    //To disable the next button when the news articles get over we will use the pagesize(it is the amount of the article we want to put on a page) using the pagesize and the totalresult we will calculate the no. of pages we can have thus disable the next button when that no. get exceed

    //now to update the newsitem on its own we use componentdidmount here we are fetching the data from the news api directly and using it in the componentdidmount  
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=f21e7a9f6a6849679adaef56fc4be6df&page=1"
        let data=  await fetch(url)
        let parsedata=await data.json()
        console.log(parsedata)
        this.setState({articles:parsedata.articles,totalarticle:parsedata.totalResults})
    }

    handlenext= async ()=>{
        
       
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=f21e7a9f6a6849679adaef56fc4be6df&page=${this.state.page +1}`
            let data=  await fetch(url)
            let parsedata=await data.json()
            this.setState({
                page :this.state.page+1,//here we are updating the page no. by incrementing it when the next button is pressed
                articles :parsedata.articles
            })
        
        }

    handleprev= async()=>{
        console.log("previous")
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=f21e7a9f6a6849679adaef56fc4be6df&page=${this.state.page -1}`
        let data=  await fetch(url)
        let parsedata=await data.json()
        this.setState({
            page :this.state.page-1,//here we are updating the page no. by incrementing it when the next button is pressed
            articles :parsedata.articles
        })

    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>News-Monkey : Top Headlines</h1>
                <div className="row">
                    {/* now we want to alterate the newsitems with the different news so we will use the 
                    this.state.map(()=>{}) here the map is the ioorder method it takes the arrow function in it*/}
                    {this.state.articles.map((element) => {
                        //in this method we have to give the specific distinction to every newsitem for which we ill return the distinction inside the arrow function inside the .map
                        return <div className="col-md-4 my-3" key={element.url} >
                            {/* so that each newsitem is of the same size we will use the slice method inside the title and description */}
                            <Newsitems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage?element.urlToImage:"https://th.bing.com/th/id/OIP.AyFiPMxkptU0wUk9QbHijwHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"} url={element.url} />
                        </div>
                    })}
                </div>
                {/* here we are adding the next and the previous button so that we can move to the next or the previous page of the website */}
                <div className="container d-flex justify-content-between" >
                    {/* we are disabling the previous button if the page no. is less then the 1 */}
                <button disabled={this.state.page<=1}type="button" onClick={this.handleprev} className="btn btn-secondary">Previous &larr;</button>
                <button type="button" 
               onClick={this.handlenext} 
              disabled={this.state.page+1>Math.ceil(this.state.totalarticle/20)} className="btn btn-secondary">Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News
