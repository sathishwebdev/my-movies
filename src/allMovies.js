import React, { useContext } from 'react'
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom';
import * as Icons from '@mui/icons-material'
import * as mui from '@mui/material'
import Button from '@mui/material/Button';
import './App.css';
import { BackBtn, Counter, HomeBtn } from './App';
import {useHistory} from 'react-router'
import {context} from './App'

function AllMovies() {
  const {movies, setMovies} = useContext(context)
    let history = useHistory()
    
    return (
        <div><BackBtn/><HomeBtn />
          <div className="splash" style={{justifyContent:"normal"}}>
            
          
              <div  className="App-header-in-detail" style={{maxWidth:"600px", width:"auto"}}>
               {
                movies.map(({name, poster,category,summary,watchOn, counts},id)=>(
                 <div key={name}  id={id}  >
                <Accordion sx={{ color:"whitesmoke", border:"none", margin:"0px", boxShadow:"none"}}>
             <AccordionSummary 
                 expandIcon={<ExpandMoreIcon sx={{color:"whitesmoke", margin:"0px"}} />}
             >
               <Typography sx={{  width: '100%', flexShrink: 0, border:"none",  }}>
           <div><Link className="App-link" to ={`/movie/${id}/#${id}`}>
           <div className="movieList-in-detail"><div className="posterCon-in-detail" >
          
             <img src={poster} className="poster-in-detail" alt={name} title={name} />
          
           </div>
           <div>
           <p>{name}    <mui.IconButton
           className="App-link"
           onClick={()=> history.push("/movie/"+id)}
           color="info"
          > <Icons.Info/> </mui.IconButton></p>
           <p style={{color:"grey"}}>{category}</p>
           </div>
           </div></Link>
          <Counter id={id} movies = {movies} stat={counts.status} likes = {counts.likes} dislikes = {counts.disLikes} />
           </div>
                 </Typography>
             </AccordionSummary>
             <AccordionDetails>
               <Typography>
                <div>
            <p> Watch On <a className="App-link" href={watchOn.link} target="_blank" rel="noopener noreferrer" > {watchOn.name} </a></p>
            <p>{summary}</p>
            <p> Watch On <a className="App-link" href={watchOn.link} target="_blank" rel="noopener noreferrer" > {watchOn.name} </a></p>
                <Button
                variant="text"
                color='error'
                onClick={(e)=>{
                  e.preventDefault();
                console.log(movies.filter((data, index)=> index !== id))
                alert(` ${name} deleted`)
                setMovies(movies.filter((ele, index)=> id !== index))
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
               </Typography>
             </AccordionDetails>
           </Accordion>
           </div>
           
     ))}
   </div>
        </div></div>
    )
}

export default AllMovies
