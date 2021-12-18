// import logo from './logo.svg';
import React, {createContext, useContext, useEffect, useState} from 'react'
import './App.css';
import movieData from './movies.json' 
import * as mui from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import * as Icons from '@mui/icons-material';
import AddMovie from './addMovie';
import MovieDetail from './movieDetail';
// import {Link} from 'react-router-dom'
import { Route, Switch, useHistory, useLocation } from 'react-router'
import NotExists from './notExists';
import { Link } from 'react-router-dom';
import EditMovie from './editMovie';
import AllMovies from './allMovies';
// import Splash from './splash'
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import FormikForm from './formikForm';

export const BASE_URL = "https://6188a6b1d0821900178d742d.mockapi.io"

export const context = createContext(null)

const Button = mui.Button;
var temp = ['1'] // helps us to detect and show selected data
const getMovies = (setMovies)=>{
  fetch(`${BASE_URL}/movies`)
  .then(data=> data.json()).
  then(data=> {
    setMovies(data)
    console.log(movieData);

  })
}


const deleteMovie = (id) => {
  console.log(id);
  fetch(`${BASE_URL}/movies/${id}`, {
    method : "DELETE"
  })
}


function App(){
  
  const [movies, setMovies] = useState(null)
  const [mode, setMode] = useState(true)
  const history = useHistory()
  const location = useLocation()
  const darkTheme = createTheme({
    palette: {
      mode: mode?'dark':'light',
    },
  });

 
  useEffect( ()=>{getMovies(setMovies) },[])
  return(
    <ThemeProvider theme={darkTheme}>
      <mui.Paper style={{ minHeight:"100vh", paddingBottom:"6px"}} elevation={2}>
    <context.Provider value = {{movies: movies, setMovies: setMovies}}>
  <div>
    {/* nav bar */}
    <Box>
    <mui.AppBar color="warning" position="static" >
    <mui.Toolbar>
      {location.pathname === '/'? <span></span> : <BackBtn /> }
      <HomeBtn />
      <Button
      color="inherit"
      startIcon={<Icons.List/>}
      onClick={()=>history.push("/all")}
      >
      Movie List
      </Button>
     <Button color="inherit" href="/#newMovie"> <AddIcon /> Add movie</Button>
      <mui.IconButton
      onClick={()=>mode? setMode(false) : setMode(true)}
      color="inherit"
      sx={{marginLeft:"auto"}}
      >
        {mode? <Icons.DarkMode/> :<Icons.LightMode/> }
      </mui.IconButton>
    </mui.Toolbar>
    </mui.AppBar>
    </Box>

    {/* page */}
    <div >
      <Switch>
        <Route exact path = '/' children={<MovieList  />}></Route>
        <Route exact path = '/all'>
          <AllMovies />
        </Route>
        <Route exact path='/movie/:movieId' >
          <MovieDetail/>
        </Route>
        <Route exact path = '/edit/:editId'>
          <EditMovie  />
        </Route>
        <Route exact path = '/formik'>
          <FormikForm  />
        </Route>
        <Route path="**" >
         <NotExists />
        </Route>
      </Switch>
    </div>
</div>
</context.Provider>
</mui.Paper>
</ThemeProvider>
)}


function MovieList() {

const {movies, setMovies} = useContext(context)
const [show, setShow] = useState(false)
const [movie, setMovie] = useState(null)
let history = useHistory()
console.log(movie);
var HMovieList = []
let listNo = movies?( movies.length > 5 ? 4 : movies.length ): 0
for(let i = 0; i < listNo; i++){
  HMovieList.push(movies[i])
}

   
 //add movie (temperary)

  return (
    <div id="movieList" style={{textAlign: 'center'}}>
     <div className="App"> <h1>My Movies</h1>
      {/* Showing Movie List */}
      
        <div  className="App-header">
          {
         movies?
           HMovieList.map(({name,poster},id)=>(
      
            <div key={name} id={id} className="movieList">
              <div className="posterCon" >
                <button style={{padding:"0", border: 'none'}} onClick = {()=>updateById({id , movie, setMovie, movies})}>  
                <img src={poster} className="poster" alt={name} title={name} />
                </button> 
              </div>
              <p className="name">{name}</p>
            </div>
          )): <p></p>}

          <div className="movieList" style={{alignItems:'center'}}>
            <mui.IconButton
            onClick={()=>history.push('/all')}
            sx={{height:"100px", width:"100px"}}
            color='info'
            >
              <Icons.ArrowForwardIos/>
            </mui.IconButton>
            see all
          </div>
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
               
              <Counter id={id} movies = {movies} stat={counts.status} likes = {counts.likes} dislikes = {counts.disLikes} setMovies={setMovies} />
              {/* info button */}
               <mui.IconButton
               color="info" 
               onClick={()=>history.push("/movie/"+id)} >  <Icons.Info/> 
               </mui.IconButton>

               {/* contents  */}
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
              deleteMovie(id)
              alert("deleted")
              getMovies(setMovies)
              setMovie(null)
              }}
              >
              <Icons.Delete/>  Delete
              </Button>

             <Link className="App-link"  to={`/edit/${id}`}><Button
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
console.log(id)
  temp[1] = temp[0] 
  temp[0] = id
  setMovie([{...movies[id]}])
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

  console.log(movie)

}





// Like and Dislike button

export const Counter = ({likes, dislikes, id, movies, stat, setMovies}) =>{
  const [like, setLike] = useState(likes);
  const [disLike, setDisLike]= useState(dislikes);
  const [status, setStatus] = useState(stat); 
  let movie = movies.filter(movie=> movie.id === id)
const LikeCount = () => {

  document.getElementById('likeBtn').disabled = true
  setStatus('liked')
  setLike(like + 1)
  status === 'disliked'? setDisLike(disLike-1) : setDisLike(disLike)
  movie={...movie, counts :{likes: like+1, disLikes : status === 'disliked'? disLike-1 : disLike, status : ''}}
  fetch(`${BASE_URL}/movies/${id}`,{
    method : "PUT",
    body: JSON.stringify(movie),
    headers: {"Content-Type":"application/json"}
  })
  getMovies(setMovies)
}

const DisLikeCount = () =>{

  document.getElementById('disLikeBtn').disabled = true
  setStatus('disliked')
  setDisLike(disLike + 1)
  status ==='liked'? setLike(like-1) : setLike(like)
  movie={...movie, counts :{likes: status === 'liked'? like-1 : like, disLikes : disLike+1, status: 'disliked'}}
  
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
  return <mui.IconButton color="inherit" onClick={()=>history.goBack()} ><Icons.ArrowBackIos/> </mui.IconButton> }

export const HomeBtn = () =>{
  let history = useHistory()
  return <mui.IconButton color="inherit" onClick={()=>history.push('/')} ><Icons.Home /> </mui.IconButton> }  

export default App;
