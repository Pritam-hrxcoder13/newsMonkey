/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
    const[articles, setArticles]=useState([]);
    const[loading, setLoading ]=useState(true);
    
    const[page, setPage]=useState(1);
    const[totalResults, setTotalResult]=useState(0);
    const capiTalize=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    const updateNews=async()=>{
        props.setProgress(0);
        // `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fae5765aa7af47ac83694d2ec3a9d10c&page=${page}&pageSize=${props.pageSize}`;
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a305bb80f4f400fbcc201dacbe6f0f7&page=${page}&pageSize=${props.pageSize}`
        setLoading(true);
        let data = await fetch(url);
        let parsedata= await data.json();
        setArticles(parsedata.articles);
        setTotalResult(parsedata.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(()=>{
        document.title=`${capiTalize(props.category)}-NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
    },[])
    // const handlePrevclick=async()=>{
    //     setPage(page -1);
    //     updateNews()
    // }
    // const handleNextclick=async()=>{
    //     setPage(page + 1);
    //     updateNews()
    //     }
    const fetchMoreData = async() => {
        setPage(page + 1);
        const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2a305bb80f4f400fbcc201dacbe6f0f7&page=${page+1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedata= await data.json();
        setArticles(articles.concat(parsedata.articles));
        setTotalResult(parsedata.totalResults);
        setLoading(false)
        };
        return (
        <>
            <h2 className="text-center" style={{margin:'35px 0px', marginTop:'100px'}}>NewsMonkey- Top {capiTalize(props.category)} headlines</h2>
            {/* {loading&&<Spinner/>} */}
            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length!==totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
            <div className="row">
                {articles.map((element,index)=>{
                    return <div className="col-md-4" key={index}>
                    <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
                })}
            </div>
                </div>
                </InfiniteScroll>
        </>
        )
}
News.defaultProps = {
    country: "in",
    pageSize: 9,
    category:"general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}
export default News