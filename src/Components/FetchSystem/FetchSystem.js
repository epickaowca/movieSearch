import React from 'react'
import SearchForm from './FetchComponents/SearchForm';
import DisplayMovies from './FetchComponents/DisplayMovies';
import Page from './FetchComponents/Page';
import Loading from '../Loading/Loading';

class FetchSystem extends React.Component{
    constructor(){
        super()
        this.state={
          movieName: "",
          fetched: false,
          movieFetched: "",
          totalPages: "",
          totalResults: "",
          currentPage: 1,
          displayPage: true,
          isLoading: false,
          headerClass: "",
        };
        this.key="c090a68df17adba8e6b159071454407b";
        this.imgSearch="https://image.tmdb.org/t/p/w500/";
        this.moviesDisplay="";
        this.movieItem=[];
    }

    deleteCurrentSearch=()=>{
        this.setState(()=>{
            return{
                movieName: ""
              }
          })
    }

    movieHandler=(e)=>{
        const {name,value}=e.target;
        this.setState(()=>{
          return{
              [name]: value,
              newSearch: false
            }
        })
    }

      
    movieFetch=(e)=>{
        if(this.state.movieName===""){
            alert("First fill search input");
            return;
        }else{
            if(e) {
                e.preventDefault()
                this.setState(prev=>{
                    return{
                        currentPage: 1
                    }
                })
            };
            this.setState(prev=>{
                return{
                    isLoading: true
                }
            })
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.key}&page=${this.state.currentPage}&query=${this.state.movieName}`)
            .then(res=>{
                if(res.ok) return res.json();
                throw new Error(res.status)
            })
            .then((data)=>{
                const {total_pages, total_results, results} = data
                this.setState(prev=>{
                    return{
                        totalPages: total_pages,
                        totalResults: total_results,
                        movieFetched: results,
                        fetched: true
                    }
                },
                ()=>{
                    const { movieFetched} = this.state
                    this.movieItem=[];
                    this.moviesDisplay = movieFetched.map(movie=><DisplayMovies  key={movie.id} clickHandlerBack={this.clickHandlerBack}  clickHandler={this.clickHandler} movieRes={movie} />);
                    this.setState(prev=>{return{
                        isLoading: false,
                        fetched: true,
                    }});
                }
                );
            })
            .catch(err=>console.log(`ERROR ${err}`))
        }
    }

    clickHandler=(id)=>{
        this.setState(prev=>{
            const updatedState = prev.movieFetched.map( item =>{
                item.id===id ? item.className = "selec" : item.className = "els"
                return item;
            })
            return{
                movieFetched: updatedState,
                displayPage: false,
                headerClass: "headerClass",
            }
        })
        this.moviesDisplay = this.state.movieFetched.map(movie=><DisplayMovies  key={movie.id} clickHandlerBack={this.clickHandlerBack} clickHandler={this.clickHandler} movieRes={movie} />);
    }

    clickHandlerBack=()=>{
        this.setState(prev=>{
            const updatedState = prev.movieFetched.map( item =>{
                item.className = ""; 
                return item;
            })
            return{
                movieFetched: updatedState,
                displayPage: true,
                headerClass: ""
            }
        })
        this.moviesDisplay = this.state.movieFetched.map(movie=><DisplayMovies  key={movie.id} clickHandlerBack={this.clickHandlerBack} clickHandler={this.clickHandler} movieRes={movie} />);
    }
    
    whichPage=(oper)=>{
        if(oper==="next"){
            this.setState(prev=>{
                if(prev.currentPage!==this.state.totalPages){
                    return{currentPage: prev.currentPage+1}
                }
            },this.movieFetch)
        }else if(oper==="previous"){
            this.setState(prev=>{
                if(prev.currentPage>1){
                    return{currentPage: prev.currentPage-1}
                }
            },this.movieFetch)
        }
    }

    
    
    render(){
        const { fetched, totalResults, isLoading, headerClass, movieName, displayPage, currentPage} = this.state
        const { movieFetch, movieHandler, moviesDisplay } = this
        return(
            <div>
                <SearchForm className={headerClass} movie={movieName} deleteCurrentSearch={this.deleteCurrentSearch} movieFetch={movieFetch} movieHandler={movieHandler} />
                <div className="movieList">
                    {fetched ? (isLoading ? <Loading /> : (totalResults===0 ? <h2>0 results</h2> : moviesDisplay)) : <h1>Waiting for search</h1>}
                </div>
                <div>
                    {fetched && totalResults!==0 && <Page display={displayPage} whichPage={this.whichPage} page={currentPage} />}
                </div>
            </div>
        )
    }
}


export default FetchSystem