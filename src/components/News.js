// as we not now converting the class bse component to the function base component so wewill use the useEffect hook instead of the copmonentgetmount thus import it

import React, {useEffect,useState } from 'react'
// import PropTypes from 'prop-types'
import Newsitems from './Newsitems'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'//this is for the infinite scroll bar




const News=(props)=>{
    
    const [articles,setArticles]=useState([])
    const [load,setLoad]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)
    // document.title = `${this.capitlizeText(props.category)}-News-Monkey`

    // below is the function that capatalize the first letter of the word
   const capitlizeText = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    


    const updateNews=async()=> {
        props.setprogress(0)//updating the progress
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoad(true)  
        props.setprogress(30)//updating the progress
        let data = await fetch(url)
        let parsedata = await data.json()
        props.setprogress(60)//updating 

        setArticles(parsedata.articles)
        setTotalResults(parsedata.totalResults)
        setLoad(false)
        props.setprogress(100)//updating the progress
    }

    // it give us the functionality of the componentgetmount
    useEffect(()=>{
        updateNews();
    },[])

    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
        setLoad(true)  
        let data = await fetch(url)
        let parsedata = await data.json()
        console.log(parsedata)
        setArticles(articles.concat(parsedata.articles))
        setLoad(false)
        setTotalResults(parsedata.totalResults)
        setPage(page+1)

    };

    
        return (
            <>
                <h2 className='text-center' style={{marginTop:'60px'}}>News-Monkey : Top {capitlizeText(props.category)} Headlines</h2>
                {/* the below syntex means that when the loading is false don't show the spinner */}
                {load && <Loading />}


                {/* the below is the syntex for the infinite scroll bar */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    // the hasMore will get false when the articles.length is == to the totalResults
                    hasMore={articles.length !== totalResults}
                    // as our loading component is the Loading so we will use the Loading component
                    loader={<Loading />}
                >
                    {/* To disable the the scroll bar that we are getting at the end of the page we will enclose the classname=row inside the other div with the classNamae container */}
                    <div className="container">

                        <div className="row">
                            
                            {articles.map((element) => {
                               
                                return <div className="col-md-4 my-3" key={element.url} >
                                    <Newsitems title={element.title ? element.title.slice(0, 35) : ""} description={element.description ? element.description.slice(0, 30) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.AyFiPMxkptU0wUk9QbHijwHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>



            </>
        )
    }


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,// here the default value of the prop country is string 
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
