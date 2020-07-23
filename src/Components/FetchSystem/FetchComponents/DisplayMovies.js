import React from 'react';
import star from '../../../img/star.png';
import noPic from '../../../img/noPic.png';
import DisplaySelectedMovie from './DisplaySelectedMovie';
import Loading from '../../Loading/Loading';

class DisplayMovies extends React.Component{
    constructor(){
        super()
        this.state={
            clicked: false,
            fetched: false,
            isLoading: false,
            res: "",
        }
    }
    clickHelper=()=>{
        this.props.clickHandler(this.props.movieRes.id)
    }
    clickHandlerBack=()=>{

        this.setState({
            clicked: false,
            fetched: false,
            isLoading: false,
            res: "",
        },this.props.clickHandlerBack())
            
    }

    fetchForSelected=()=>{
           this.setState(prev=>{
            return{
                isLoading: true,
                clicked: true,
                fetched: true
            }
        })
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movieRes.id}?api_key=c090a68df17adba8e6b159071454407b`)
        .then(res=>{
            if(res.ok) return res.json();
            throw new Error(res.status)
        })
        .then(res=>{
            this.setState(prev=>{
                return{
                    isLoading: false,
                    res: res
                }
            })
        })
        .catch(err=>console.log("Error: " + err))
    }


    render(){
        if( this.props.movieRes.className==="selec" && !this.state.clicked ) this.fetchForSelected();

        const movieImgSrc = `https://image.tmdb.org/t/p/w500/${this.props.movieRes.poster_path}` 
        let item;
        if(this.props.movieRes.poster_path === null){
            item = <div onClick={this.clickHelper}><img src={noPic} alt="movie poster noPic"/></div>
        }else{
            item = <div onClick={this.clickHelper}><img src={movieImgSrc} alt="movie poster"/></div>
        }
        return(
            <div className={this.props.movieRes.className}>
                {item}
                <div>
                    <h2 onClick={this.clickHelper}>{this.props.movieRes.title}</h2>
                    <p>{this.props.movieRes.release_date}</p>
                    <span><p>{this.props.movieRes.vote_average}</p><img src={star} alt="vote"/></span>
                </div>
                {this.state.fetched && (this.state.isLoading ? <Loading /> : <DisplaySelectedMovie res={this.state.res} clickHandlerBack={this.clickHandlerBack}/>) }
            </div>
        )
    }
}

export default DisplayMovies