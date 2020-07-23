import React from 'react';
import backArrow from '../../../img/backArrow.png';

function DisplaySelectedMovie(props){
    const categories = [];
    let i = 0
    props.res.genres.forEach(elem=>{
        categories.push(<p key={i}>{elem.name}</p>)
        i++;
    });
    return(
        <div>
            <button onClick={props.clickHandlerBack}><img src={backArrow} alt="Back button"/></button>
            <h1>{props.res.title}</h1>
            <p>{props.res.release_date==="" ? "release date undefinded" : props.res.release_date}</p>
            <span>{categories}</span>
                <p>Vote: {props.res.vote_average}</p>
            <span>
                <b>Home page: </b>
                <a href={props.res.homepage}>{props.res.homepage===null | props.res.homepage==="" ? "undefined": props.res.homepage}</a>
            </span>
            <b>description</b>
            <p>{props.res.overview}</p>
        </div>
    )
}

export default DisplaySelectedMovie