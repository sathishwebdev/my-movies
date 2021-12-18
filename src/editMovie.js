import React,{useContext, useEffect, useState} from 'react'
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material';
import { useHistory, useParams } from 'react-router';
import './App.css'
import { BASE_URL, context } from './App';


const Button = mui.Button , TextField = mui.TextField ;

function EditMovie() { 
  const {editId} = useParams()
  let {movies, setMovies} = useContext(context)
  const [movie, setMovie] = useState()
  const [formData, setFormData] = useState({
    name : '',
    poster: '',
    summary: '',
    category :'',
    genre :[''],
    releaseDate :'',
    watchOn :{link:'', name:''},
    trailer :'',
    counts :{likes:0, disLikes:0}
  })
  useEffect(()=>{
    fetch(`https://6188a6b1d0821900178d742d.mockapi.io/movies/${editId}`).then(data=> data.json()).then(data=>{
      setMovie(data)
      setFormData(data)
    } )
  },[])
  
  let history = useHistory()    
  
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
        
        const handleTrailer = (e)=> {
            e.preventDefault()
            setFormData( {...formData, trailer: e.target.value})}
      
      const handleSubmit = (e) => {
      e.preventDefault();
        movies[editId-1] = {...formData}
        setMovies(movies)

        fetch(`${BASE_URL}/movies/${editId}`, {
          method : "PUT",
          body: JSON.stringify(formData),
          headers: {"Content-Type":"application/json"}

        })
     
        setFormData({
          name : '',
          poster: '',
          summary: '',
          category :'',
          genre :[''],
          releaseDate :'',
          watchOn :{link:'', name:''},
          trailer :'',
          counts :{likes:0, disLikes:0}
        })
        alert("successfully edited")
        history.push('/')
      }
      
        return(<div className="" style={{textAlign:"left", color:"whitesmoke"}} id="newMovie">
      
       <h2 style={{width: '100%'}}> 
         <mui.IconButton
         onClick={()=>history.push('/')}
         ><Icons.ArrowBackIos/>
         </mui.IconButton>
          {movie? movie.name : ''} </h2>
         <div className="movieCon-in-detail" style={{alignItems:"center", height:"80vh"}}>  
         
          <div className="content">
              <img src={movie? movie.poster: ''} alt={movie? movie.name : ''} title={movie? movie.name : ''} className="contentImg" />
          </div>
         <div className="TextField" >
             <TextField
              label="Movie Name"
              variant="outlined"
              value = {formData.name}
              defaultValue = {formData.name}
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
              defaultValue = {formData.Poster}
              onChange={handlePoster}
              required />
             
                     <TextField
              label="Trailer Link"
              variant="outlined"
              type="url"
              className="inputs"
              margin="normal"
              name="trailer"
              id="trailer"
              placeholder="Trailer"
              value = {formData.trailer}
              defaultValue = {formData.trailer}
              onChange={handleTrailer}
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
              defaultValue={formData.summary}
              id="summary"
              placeholder="summary"
              onChange={handleSummary} />
                     
                     <div style={{display:"flex"}}> 
                     <Button
              margin="normal"
              variant="outlined"
              type = 'submit'
              color="error"
              sx={{margin:"1%"}}
              onClick={()=>{history.push('/')}}
               >Cancel</Button>
              <Button
              margin="normal"
              variant="contained"
              sx={{margin:"1%"}}
              type = 'submit'
              onClick={handleSubmit}
               >Save</Button>
                     </div>
         </div>

           </div>
        </div>)
      }
      

      export default EditMovie