import React from 'react';
import loupe from "../../../img/searchLoupe.png";
import deleteBtn from '../../../img/deleteButton.png';

function SearchForm(props){
    return(
        <header className={props.className}>
            <div>
                <form onSubmit={props.movieFetch}>
                    <label>
                    <img src={loupe} alt="loupe"/>
                    <input placeholder="Search movies..." name="movieName" onChange={props.movieHandler} value={props.movie} type="text" />
                    </label>
                </form>
                <img onClick={props.deleteCurrentSearch}  src={deleteBtn} alt="deleteButton"/>
            </div>
        </header>
    )
}


export default SearchForm