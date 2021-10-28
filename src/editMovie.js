import React,{useState} from 'react'
import * as mui from '@mui/material'
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import { useParams } from 'react-router';
import './App.css'

const Button = mui.Button , TextField = mui.TextField ;

function EditMovie(props) { 
    const {editId} = useParams()
       const [movies, setMovies] = [props.movies, props.setMovies]
        const [formData, setFormData] = useState(movies.filter(data=> data.id=== editId))
      
      
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
        setMovies([...movies, formData]);
      
        setFormData({
          name : '',
          poster: '',
          summary: '',
          id :movies.length,
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
      
      
        return(<div className="Splash" style={{textAlign:"center"}} id="newMovie">
       
         <div className="TextField App-header">  <h2 style={{width: '100%'}}> Edit a Movie  </h2>
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
          label="Trailer Link" 
          variant="outlined" 
          type="url"
          className="inputs" 
          margin="normal"
          name="trailer" 
          id="trailer" 
          placeholder="Trailer" 
          value = {formData.trailer} 
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
      

      export default EditMovie