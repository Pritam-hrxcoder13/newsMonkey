import React from 'react'

const Newsitem=(props)=>{
        let{title,description,imgUrl,newsUrl,author,date,source} =props;
        return (
        <div>
            <div className="card my-3">
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zindex:'1'}}>{source}</span>
                <img src={!imgUrl?"https://www.deccanherald.com/sites/dh/files/articleimages/2022/07/10/nasa-reuters-1-1125423-1657451423.jpg":imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
        )

}

export default Newsitem
