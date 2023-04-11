import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Newsitems from './Newsitems'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'//this is for the infinite scroll bar

export class News extends Component {
    // these are the default props 
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,// here the default value of the prop country is string 
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    // below is the function that capatalize the first letter of the word
    capitlizeText = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    //in the react the constructor works only if the object of that class is created,so inside the constructor we will always declare the super() to avoid the error 
    constructor(props) {
        super(props)
        // here we are creating a usestate so that each time the newsitem material can get updated
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitlizeText(this.props.category)}-News-Monkey`
    }
    //To disable the next button when the news articles get over we will use the pagesize(it is the amount of the article we want to put on a page) using the pagesize and the totalresult we will calculate the no. of pages we can have thus disable the next button when that no. get exceed

    //now to update the newsitem on its own we use componentdidmount here we are fetching the data from the news api directly and using it in the componentdidmount  


    async componentDidMount() {
        this.props.setprogress(0)//updating the progress
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })//here as the we are fetching the data from the apip so for the moment 
        this.props.setprogress(30)//updating the progress
        let data = await fetch(url)
        let parsedata = await data.json()
        this.props.setprogress(60)//updating the progress
        console.log(parsedata)
        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })
        this.props.setprogress(100)//updating the progress
    }


    // The below is the fetchmore funcion which will fetch the more data for the infinite scroll
    fetchMoreData = async () => {
        // this.setState({page:this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })//here as the we are fetching the data from the apip so for the moment 
        let data = await fetch(url)
        let parsedata = await data.json()
        console.log(parsedata)
        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            loading: false,
            // through the below line of code we are getting the no. of total results that we are getting from the api into the variable totalResults
            totalResults: parsedata.totalResults,
            // loading: false,we don't need loading here as the infinitescroll has its own loading component 
            page: this.state.page + 1
        })

    };

    render() {
        return (
            <>
                <h2 className='text-center'>News-Monkey : Top {this.capitlizeText(this.props.category)} Headlines</h2>
                {/* the below syntex means that when the loading is false don't show the spinner */}
                {this.state.loading && <Loading />}


                {/* the below is the syntex for the infinite scroll bar */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    // the hasMore will get false when the articles.length is == to the totalResults
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    // as our loading component is the Loading so we will use the Loading component
                    loader={<Loading />}
                >
                    {/* To disable the the scroll bar that we are getting at the end of the page we will enclose the classname=row inside the other div with the classNamae container */}
                    <div className="container">

                        <div className="row">
                            {/* now we want to alterate the newsitems with the different news so we will use the 
                    this.state.map(()=>{}) here the map is the ioorder method it takes the arrow function in it*/}
                            {/* we also want that when we are loading all the data present on the page should get erased so !this.state.loading as when the data is being fetched the loading=true and at that time we want no data on the page so we will use the && as if the first cond'n is false the next statement (.map) will not get evaluate */}
                            {/* {!this.state.loading && this.state.articles.map((element) => { we are removing this line because of the infinite scroll*/}
                            {this.state.articles.map((element) => {
                                //in this method we have to give the specific distinction to every newsitem for which we will return the distinction inside the arrow function inside the .map
                                return <div className="col-md-4 my-3" key={element.url} >
                                    {/* so that each newsitem is of the same size we will use the slice method inside the title and description */}
                                    <Newsitems title={element.title ? element.title.slice(0, 35) : ""} description={element.description ? element.description.slice(0, 30) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.AyFiPMxkptU0wUk9QbHijwHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>



            </>
        )
    }
}

export default News
