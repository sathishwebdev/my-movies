import React,{useContext} from 'react'
import * as mui from '@mui/material'
import TopIcon from '@mui/icons-material/KeyboardArrowUp';
import {Formik} from 'formik';
import { context } from './App';


const Button = mui.Button , TextField = mui.TextField ;

function AddMovie() { 
      
      let {movies} = useContext(context)
  console.log(movies)
      const postData = (data) =>{
        console.log(data)
        fetch("https://6188a6b1d0821900178d742d.mockapi.io/movies", {
          method : "POST",
          body: JSON.stringify(data),
          headers: {"Content-Type":"application/json"}

        }).then(response =>response.json()).then(response => console.log(response))
      }

      //form handlers
    
    
      
        return(<div id="newMovie" style={{maxWidth:"800px", marginLeft:"auto", marginRight:"auto"}}>
       
         {!movies? '' : <div className="TextField"> 
          <h2 style={{width: '100%'}}>
            Add New Movie 
            <span style={{float:"right"}}> 
              <Button 
                variant="contained"
                href="#movieList">
                <TopIcon /> Movie List
              </Button>
            </span>
          </h2>
          <Formik
          initialValues={{
            id: movies.length ,
            name : '',
            poster: '',
            summary: '',
            category :'',
            genre :[''],
            releaseDate :'',
            watchOn :{link:'', name:''},
            trailer :'',
            counts :{likes:0, disLikes:0, status:''}
          }}
          onSubmit={(values, {setSubmitting, resetForm})=>{
            postData(values)
            setSubmitting(false);
            resetForm()
          }}
          >
           { ({values,handleChange, handleBlur, handleSubmit})=> (
           <form>
             <TextField
                label="Movie Name"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value = {values.name}
                type="text"
                margin="normal"
                inputMode="text"
                className="inputs"
                name="Movie name"
                id="MovieName"
                placeholder = 'Movie Name'
                required/>
             
                <TextField
                label="Poster Link"
                variant="outlined"
                type="url"
                inputMode="url"
                className="inputs"
                margin="normal"
                name="poster"
                id="poster"
                placeholder="Poster"
                onChange={handleChange}
                onBlur={handleBlur}
                value = {values.poster}
                
                required />

              <TextField
                label="Trailer Link"
                variant="outlined"
                type="url"
                inputMode="url"
                className="inputs"
                margin="normal"
                name="trailer"
                id="trailer"
                placeholder="Trailer"
                onChange={handleChange}
                onBlur={handleBlur}
                value = {values.trailer}
                
                required />

                <TextField
                label="Summary"
                variant="outlined"
                color="info"
                className="inputs"
                rows={4}
                margin="normal"
                multiline
                onChange={handleChange}
                onBlur={handleBlur}
                value = {values.summary}
                name="summary"
                id="summary"
                placeholder="summary" />
                
                <br/>
             
                <Button
                variant="outlined"
                type = 'submit'
                onClick={handleSubmit}
                sx={{margin:"3%"}}
                >
                  Submit
                </Button>
           </form>
)}  
        </Formik>
           </div>}
        </div>)
      }
      

export default AddMovie
