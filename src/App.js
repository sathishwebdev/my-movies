// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import movieData from './movies.json' 
import * as mui from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import * as Icons from '@mui/icons-material';

const Button = mui.Button , TextField = mui.TextField ;
var temp = ['1'] // helps us to detect and show selected data
function App() {
const [movies, setMovies] = useState(movieData)

const [movie, setMovie] = useState(movies.filter(data=>data.id === '1'))
      
    
   const getById = (id) =>{

    temp[1] = temp[0] 
    temp[0] = id
    setMovie(movies.filter(data=>data.id === id))
    const preSelectedEle = document.getElementById(temp[1])
    const currentSelection = document.getElementById(temp[0])
   
    //style for pre-selected - to unselect
    preSelectedEle.style.border = "none"
    preSelectedEle.style.backgroundColor= "transparent"
    preSelectedEle.style.boxShadow="none"
    preSelectedEle.style.padding = "2px"
    // style for selected  
    currentSelection.style.border = "1px grey solid"
    currentSelection.style.borderRadius="5%"
    currentSelection.style.backgroundColor="gray"
    currentSelection.style.boxShadow="black 1px 2px 15px"
    currentSelection.style.padding = "6px"
  
  }
   
 //add movie (temperary)

 function AddMovie(){
  
  const [formData, setFormData] = useState({
    name : '',
    poster: '',
    summary: '',
    id :11,
    category :'',
    genre :[''],
    releaseDate :'',
    watchOn :{link:'', name:''},
    trailer :'',
    counts :{likes:0, disLikes:0}
  })


//form handlers

const handleMovieName = (e)=> {
  e.preventDefault();
  setFormData({...formData,name: e.target.value})
  }

const handlePoster =(e)=> {
  e.preventDefault()
  setFormData( {...formData, poster: e.target.value})
  }  

const handleSummary = (e)=> {
  e.preventDefault()
  setFormData( {...formData, summary: e.target.value})}


const handleSubmit = (e) => {
e.preventDefault();
  setMovies([...movies, formData]);

  setFormData({
    name : '',
    poster: '',
    summary: '',
    id :formData.id + 1,
    category :'',
    genre :[''],
    releaseDate :'',
    watchOn :{link:'', name:''},
    trailer :'',
    counts :{likes:0, disLikes:0}
  })
}

// const Input = styled(TextField)({
  
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: 'white',
//     },
//     '&:hover fieldset': {
//       borderColor: '#10a3ce',
//     },
    
//   },
// });


  return(<div id="newMovie">
 
   <div className="TextField">  <h2 style={{width: '100%'}}>Add New Movie   <span style={{float:"right"}}>  <Button variant="contained" href="#movieList"><TopIcon /> Movie List</Button></span></h2>
   <TextField 
    label="Movie Name" 
    variant="outlined" 
    value = {formData.name}
    type="text" 
    margin="normal"
    className="inputs"
    name="Movie name" 
    id="MovieName" 
    placeholder = 'Movie Name' 
    onChange={handleMovieName}
    required/>
    
    <TextField 
    label="Poster Link" 
    variant="outlined" 
    type="url"
     className="inputs" 
    margin="normal"
    name="poster" 
    id="poster" 
    placeholder="Poster" 
    value = {formData.poster} 
    onChange={handlePoster}
    required />

    <TextField 
    label="Summary" 
    variant="outlined" 
     className="inputs"
    rows={4}
    margin="normal"
    multiline
    value = {formData.summary} 
    name="summary" 
    id="summary" 
    placeholder="summary" 
    onChange={handleSummary} />
  
    <Button 
    margin="normal"
    variant="outlined"
    type = 'submit'
    onClick={handleSubmit}
     >Submit</Button>
     </div>
  </div>)
}

  return (
    <div id="movieList" style={{textAlign: 'center',color: 'white'}}>
      <h1>My Movies   
   <span style={{float:"right"}}><Button variant="contained" href="#newMovie"> <AddIcon /> Add movie</Button></span></h1>
      {/* Showing Movie List */}
      <div className="App">
        <div  className="App-header">
          {
           movies.map(({id, name, poster})=>(
            <div key={name} id={id} className="movieList">
              <div className="posterCon" >
                <button style={{padding:"0", border: 'none'}} onClick = {()=>getById(id)}>  
                <img src={poster} className="poster" alt={name} title={name} />
                </button> 
              </div>
              <p className="name">{name}</p>
            </div>
          ))}
        </div>
      </div>
      

      {/* showing Movie details */}
      {
        movie.map(({id,name, poster,trailer, category, watchOn, summary, releaseDate, genre, counts})=>(
        <div key={id}>
          <h1 className="name">{name}</h1>
          <div  className="movieCon ">
           
            
            <div className="container">
            <a className="App-link" href={watchOn.link} target="_blank" rel="noopener noreferrer" >
                <img src={poster} className="contentImg" alt={name} title={name} /> </a>
            {/* video   <iframe  src={`${trailer}?controls=1&autoplay=1&mute=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="video"></iframe>*/} 
            </div> 
            
            <div className="content "> 
               
              <Counter likes = {counts.likes} dislikes = {counts.disLikes} />
              <p> <a href={`https:youtu.be/${trailer.split("/")[trailer.split("/").length-1]}`} className="App-link"> Watch Trailer  </a></p>
              <p> category :  {category} </p>
              <p> Release Date : {releaseDate} </p>
              <p> Genre : {genre.join(", ")}</p>
              {/* <details><summary> Description </summary> <p >{summary}</p></details>  */}
              <p> Description : {summary} </p>
              <p> Watch On <a className="App-link" href={watchOn.link} target="_blank" rel="noopener noreferrer" > {watchOn.name} </a></p>
            </div>
          </div>
        </div>
      ))}
      <AddMovie />
    </div>
  );
}

// Like and Dislike button

const Counter = ({likes, dislikes}) =>{
  const [like, setLike] = useState(likes);
  const [disLike, setDisLike]= useState(dislikes);
  const [status, setStatus] = useState(''); 
const LikeCount = () => {

  document.getElementById('likeBtn').disabled = true
  setStatus('liked')
  setLike(like + 1)
  disLike === 0 ? setDisLike(0)
:  setDisLike(disLike - 1)

document.getElementById('disLikeBtn').disabled = false

}

const DisLikeCount = () =>{

  document.getElementById('disLikeBtn').disabled = true
  setStatus('disliked')
  setDisLike(disLike + 1)
  like === 0 ? setLike(0)
:  setLike(like - 1)

document.getElementById('likeBtn').disabled = false
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



export default App;
