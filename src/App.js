// import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css';
import movies from './movies.json'
function App() {
const [movie, setMovie] = useState(movies.filter(data=>data.id === '1'))
      
    
   const getById = (id) =>setMovie(movies.filter(data=>data.id === id))
   
 
  return (
    <div style={{textAlign: 'center',color: 'white'}}> <h1>My Movies</h1><div className="App"><div  className="App-header">
    
     {
       movies.map(({id, name, poster, category, watchOn, summary, releaseDate, genre})=>(
        
        <div key={name} className="movieList">
        <div className="posterCon" ><button 
         style={{padding:"0", border: 'none', width:'100%'}}
          
         onClick = {()=>getById(id)}
        >  <img src={poster} className="poster" alt={name} title={name} /> </button>  </div><p className="name">{name}</p>
      
   
      </div>
       ))
     }
    </div></div>
  {  movie.map(({id,name, poster, category, watchOn, summary, releaseDate, genre})=>(
    <div key={id} className="movieCon"><a
          className="App-link"
          href={watchOn.link}
          target="_blank"
          rel="noopener noreferrer"
        >  <img src={poster} className="contentImg" alt={name} title={name} /> </a> 
       <div className="content"> <h2 className="name">{name}</h2>
        <p> category :  {category} </p>
        <p> Release Date : {releaseDate} </p>
        <p> Genre : {genre.join(", ")}</p>
        <p> Description : {summary}</p>
       <p> Watch On <a
          className="App-link"
          href={watchOn.link}
          target="_blank"
          rel="noopener noreferrer"
        >
         {watchOn.name}
        </a></p><br/></div>
        </div>
  ))}
    </div>
  );
}

export default App;
