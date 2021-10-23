// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import movies from './movies.json' 
var temp = ['1']
function App() {
const [movie, setMovie] = useState(movies.filter(data=>data.id === '1'))
      
    
   const getById = (id) =>{setMovie(movies.filter(data=>data.id === id))
   temp[1] = temp[0] 
    temp[0] = id
    console.log(temp)
      document.getElementById(temp[1]).style.border = "none";
      document.getElementById(temp[1]).style.backgroundColor= "transparent"
      document.getElementById(temp[1]).style.boxShadow="none"
      document.getElementById(temp[1]).style.padding = "2px"
    document.getElementById(id).style.border = "1px grey solid"
    document.getElementById(id).style.borderRadius="5%"
    document.getElementById(id).style.backgroundColor="gray"
    document.getElementById(id).style.boxShadow="black 1px 2px 15px"
    document.getElementById(id).style.padding = "6px"
  
  }
   
 
  return (
    <div style={{textAlign: 'center',color: 'white'}}> <h1>My Movies</h1><div className="App"><div  className="App-header">
    
     {
       movies.map(({id, name, poster, category, watchOn, summary, releaseDate, genre})=>(
        
        <div key={name} id={id} className="movieList">
        <div className="posterCon" ><button 
         style={{padding:"0", border: 'none'}}
          
         onClick = {()=>getById(id)}
        >  <img src={poster} className="poster" alt={name} title={name} /> </button>  </div><p className="name">{name}</p>
      
   
      </div>
       ))
     }
    </div></div>
  {  movie.map(({id,name, poster,trailer, category, watchOn, summary, releaseDate, genre})=>(
    <div key={id}>
    
    <h1 className="name">{name}</h1>
    
     <div  className="movieCon ">
    
 
       <div className="content "> 
        <a className="App-link" href={watchOn.link} target="_blank" rel="noopener noreferrer" >  <img src={poster} className="contentImg" alt={name} title={name} /> </a> 
        <p> <a href={`https:youtu.be/${trailer.split("/")[trailer.split("/").length-1]}`} className="App-link"> Watch Trailer  </a></p>
        <p> category :  {category} </p>
        <p> Release Date : {releaseDate} </p>
        <p> Genre : {genre.join(", ")}</p>
        <p> Description : {summary}</p>
        <p> Watch On <a className="App-link" href={watchOn.link} target="_blank" rel="noopener noreferrer" > {watchOn.name} </a></p>
        </div>
        {/* video */}
        <div className="container">
     <iframe  src={`${trailer}?controls=1&autoplay=1&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="video"></iframe> 
     </div>
      
       
        </div>  </div>
  ))}
    </div>
  );
}

export default App;
