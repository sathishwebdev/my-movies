// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import movieData from './movies.json' 
import * as mui from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import * as Icons from '@mui/icons-material';
import AddMovie from './addMovie';
import MovieDetail from './movieDetail';
// import {Link} from 'react-router-dom'
import { Route, Switch, useHistory } from 'react-router'
import NotExists from './notExists';
import { Link } from 'react-router-dom';
import EditMovie from './editMovie';
// import Splash from './splash'

const Button = mui.Button;
var temp = ['1'] // helps us to detect and show selected data

function App(){
  const [movies, setMovies] = useState(movieData)


  return(<div>
    <Switch>
      <Route exact path = '/' children={<MovieList movies={movies} setMovies={setMovies}  />}></Route>
        {/* <Route path="/movies" children={}></Route> */}
      <Route exact path='/movie/:movieId' >
        <MovieDetail movies = {movies} />
      </Route>
      <Route exact path = '/edit/:editId'>
        <EditMovie movies = {movies} setMovies = {setMovies} />
      </Route>
      <Route path="**" >
       <NotExists />
      </Route>
    </Switch>
</div>)
}


function MovieList({movies, setMovies}) {

const [show, setShow] = useState(false)
const [movie, setMovie] = useState(null)
    



   
 //add movie (temperary)

  return (
    <div id="movieList" style={{textAlign: 'center',color: 'white'}}>
      <h1>My Movies   
   <span style={{float:"right"}}><Button variant="contained" href="#newMovie"> <AddIcon /> Add movie</Button></span></h1>
      {/* Showing Movie List */}
      <div className="App">
        <div  className="App-header">
          {
           movies.map(({id,name,poster})=>(
      
            <div key={name} id={id} className="movieList">
              <div className="posterCon" >
                <button style={{padding:"0", border: 'none'}} onClick = {()=>updateById({id , movie, setMovie, movies})}>  
                <img src={poster} className="poster" alt={name} title={name} />
                </button> 
              </div>
              <p className="name">{name}</p>
            </div>
          ))}
        </div>
      </div>
      

      {/* showing Movie details */}
     {movie === null? <div><h3>Select a Movie to show Details </h3></div> :  <div>
        {
        movie.map(({id,name, poster,trailer, category, watchOn, summary, releaseDate, genre, counts})=>(
        <div key={id}>
          <h1 className="name">{name}</h1>
          <div  className="movieCon ">
           
            
            <div className="container">
            <Link className="App-link" to={`/movie/${id}`}>
                <img src={poster} className="contentImg" alt={name} title="Click to watch Trailer" /> </Link>
            {/* video   <iframe  src={`${trailer}?controls=1&autoplay=1&mute=1`} title={`${name}'s Trailer'`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="video"></iframe> */}
            </div> 
            
            <div className="content "> 
               
              <Counter id={id} movies = {movies} stat={counts.status} likes = {counts.likes} dislikes = {counts.disLikes} />

              {/* <p> <a href={`https:youtu.be/${trailer.split("/")[trailer.split("/").length-1]}`} className="App-link"> Watch Trailer  </a></p> */}
              <p> <Link className="App-link" to={"/movie/"+id} > <Icons.Info/> </Link></p>
              <p> category :  {category} </p>
              <p> Release Date : {releaseDate} </p>
              <p> Genre : {genre.join(", ")}</p>
              {/* <details><summary> Description </summary> <p >{summary}</p></details>  */}
              <p> Description : {!show ? <span>{summary.substring(0, 50)}... 
              <Button 
              variant = "text"
              sx={{color:"#61dafb"}}
              onClick = {(e)=>setShow(true)}
              >
               <Icons.KeyboardArrowDown /> Read More</Button> </span> : <span>{summary} 
                <Button
                variant="text"
                color = "warning"
                onClick = {(e)=>setShow(false) }
                >
               <TopIcon/> Read Less</Button></span> } </p>
              <p> Watch On <a className="App-link" href={watchOn.link} target="_blank" rel="noopener noreferrer" > {watchOn.name} </a></p>
              <Button
              variant="text"
              color='error'
              onClick={(e)=>{
                e.preventDefault();
              
              alert( name + 'deleted')
              // let updatedId = id+1
              // updateById({ id: id=== movies.length ? id-1 : id+1 , movie, setMovie, movies})  
              setMovies(movies.filter(data=> data.id !== id))
              setMovie(movies.filter(data => data.id === (id === movies.length? "1" : id+1)))
              }}
              >
              <Icons.Delete/>  Delete
              </Button>

             <Link  to={`/edit/${id}`}><Button
              color="info"
              variant="text"
              >
               <Icons.Edit/> Edit 
              </Button></Link>
            </div>
          </div>
        </div>
      ))}
      </div>}
      <AddMovie movies = {movies} setMovies = {setMovies}/>
    </div>
  );
}


// update movie by id

export const updateById = ({id, movie, setMovie, movies}) =>{

  temp[1] = temp[0] 
  temp[0] = id
  setMovie(movies.filter(data=>data.id === id))
  // const preSelectedEle = document.getElementById(temp[1])
  // const currentSelection = document.getElementById(temp[0])
 
  // //style for pre-selected - to unselect
  // preSelectedEle.style.border = "none"
  // preSelectedEle.style.backgroundColor= "transparent"
  // preSelectedEle.style.boxShadow="none"
  // preSelectedEle.style.padding = "2px"
  // // style for selected  
  // currentSelection.style.border = "1px grey solid"
  // currentSelection.style.borderRadius="5%"
  // currentSelection.style.backgroundColor="gray"
  // currentSelection.style.boxShadow="black 1px 2px 15px"
  // currentSelection.style.padding = "6px"

}





// Like and Dislike button

export const Counter = ({likes, dislikes, id, movies, stat}) =>{
  const [like, setLike] = useState(likes);
  const [disLike, setDisLike]= useState(dislikes);
  const [status, setStatus] = useState(stat); 
  
const LikeCount = () => {

  document.getElementById('likeBtn').disabled = true
  setStatus('liked')
  setLike(like + 1)
  status === 'disliked'? setDisLike(disLike-1) : setDisLike(disLike)
  movies[id-1]={...movies[id-1], counts :{likes: like+1, disLikes : status === 'disliked'? disLike-1 : disLike , status: 'liked'}}
  console.log(movies[id-1].counts)
}

const DisLikeCount = () =>{

  document.getElementById('disLikeBtn').disabled = true
  setStatus('disliked')
  setDisLike(disLike + 1)
  status ==='liked'? setLike(like-1) : setLike(like)
  movies[id-1]={...movies[id-1], counts :{likes: status === 'liked'? like-1 : like, disLikes : disLike+1, status: 'disliked'}}
  console.log(movies[id-1].counts)
}

  return <div>
  {/* 
  state - current scenario - current data
   */}
    <mui.IconButton 
    style={{fontSize:"30px"}}
    onClick={LikeCount}
    disabled={status === 'liked' ? true : false}
    id="likeBtn" >
    <mui.Badge 
    badgeContent={like} 
    color="primary"
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}>
    {status === 'liked' ? <Icons.ThumbUp /> : <Icons.ThumbUpOffAlt />}  
    </mui.Badge> 
    </mui.IconButton>
    
    <mui.IconButton 
    style={{fontSize:"30px"}}
    onClick={DisLikeCount}
    id="disLikeBtn" 
    disabled={status === 'disliked'? true : false}> 
    <mui.Badge 
    badgeContent={disLike} 
    color="error"
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
    >
    { status === 'disliked' ? <Icons.ThumbDown /> :<Icons.ThumbDownOffAlt /> } 
    </mui.Badge> </mui.IconButton>
  
  </div>
}

export const BackBtn = () =>{
  let history = useHistory()
  return <mui.IconButton onClick={()=>history.goBack()} ><Icons.ArrowBackIos/> </mui.IconButton> }

export const HomeBtn = () =>{
  let history = useHistory()
  return <mui.IconButton onClick={()=>history.push('/')} ><Icons.Home/> </mui.IconButton> }  

export default App;
