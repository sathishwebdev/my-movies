import React,{useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router'
import {BackBtn} from './App'
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material';
import {Link} from 'react-router-dom'
import {Counter} from './App'
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Button = mui.Button
function MovieDetail({movies}) {
    const [show, setShow] = useState(false)
    const {movieId} = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState(movies.filter(movie=>movie.id===movieId))

    useEffect(() => {
        setMovie(movies.filter(movie=>movie.id===movieId))
      }, [movieId])

    const [{id,name, poster,trailer, category, watchOn, summary, releaseDate, genre, counts}] = movie

    return (
        <div className="App" >
            <h2 style={{margin: '1px', padding:'0px', textAlign:"left"}} ><BackBtn/>{name}</h2>
            {/* video   */}
            <iframe width="100%" height = "600px"  src={`${trailer}?controls=1&autoplay=0`} title={`${name}'s Trailer'`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>

        <div  key={id}>
          <h1 className="name">{name}</h1>
          <div  className="movieCon-in-detail "> 
            <div className="container">
            <Link className="App-link" to={`./${id}`}>
                <img src={poster} className="contentImg" alt={name} title={name} />
            </Link>
            
            </div> 
            
            <div className="content "> 
               
              <Counter id={id} movies = {movies} stat={counts.status} likes = {counts.likes} dislikes = {counts.disLikes} />

              <p> <a href={`https:youtu.be/${trailer.split("/")[trailer.split("/").length-1]}`} className="App-link"> Watch Trailer  </a></p>
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
            </div>
            <div  className="App-header-in-detail" style={{flexDirection:"column"}}>
          {
           movies.map(({id, name, poster,category,summary})=>(
            <div key={name} id={id}  >
                   <Accordion sx={{width:"100%", backgroundColor: "transparent", color:"whitesmoke", border:"none", margin:"0px", boxShadow:"none"}}>
        <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{color:"whitesmoke"}} />}
        >
          <Typography sx={{ width: '100%', flexShrink: 0, border:"none",  }}><div className="movieList-in-detail"><div className="posterCon-in-detail" >
                <Link to ={`./${id}`}>  
                <img src={poster} className="poster-in-detail" alt={name} title={name} />
                </Link> 
              </div>
              <div>
              <p>{name}</p>
              <p style={{color:"grey"}}>{category}</p>
              </div></div>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {summary}
          </Typography>
        </AccordionDetails>
      </Accordion>
              </div>
              
          ))}
        </div>
          </div>
        </div>
    
        </div>
    )
}

export default MovieDetail
