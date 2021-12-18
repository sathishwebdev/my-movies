import React, { useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import * as mui from "@mui/material";
import Button from "@mui/material/Button";
import "./App.css";
import { Counter, deleteMovie, getMovies } from "./App";
import { useHistory } from "react-router";
import { context } from "./App";

function AllMovies() {
  const { movies, setMovies } = useContext(context);
  let history = useHistory();

  return (
    <div style={{ padding: "2%" }}>
      <div className="splash" style={{ justifyContent: "normal" }}>
        <div
          className="App-header-in-detail"
          style={{ maxWidth: "600px", width: "auto" }}
        >
          {movies
            ? movies.map(
                ({ name, poster, category, summary, watchOn, counts, id }) => (
                  <div key={name} id={id}>
                    <Accordion
                      sx={{ border: "none", margin: "0px", boxShadow: "none" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ margin: "0px" }} />}
                      >
                        <Typography component="div" sx={{ width: "100%", border: "none" }}>
                          
                              <div className="movieList-in-detail">
                                <div className="posterCon-in-detail">
                                 <Link
                              className="App-link"
                              to={`/movie/${id}/#${id}`}
                            > <img
                                    src={poster}
                                    className="poster-in-detail"
                                    alt={name}
                                    title={name}
                                  />
                            </Link>
                                </div>                                
                                    <div>
                                      <p>{name}
                                      <span>
                                        <mui.IconButton
                                          className="App-link"
                                          onClick={() =>
                                            history.push("/movie/" + id)
                                          }
                                          color="info"
                                        >
                                          <Icons.Info />
                                        </mui.IconButton>
                                      </span>                        
                                      <span style={{ color: "grey" }}>{category}</span> </p>
                                    </div>
                                 </div>
                              
                            <Counter
                              id={id}
                              movies={movies}
                              stat={counts.status}
                              likes={counts.likes}
                              dislikes={counts.disLikes}
                              setMovies={setMovies}
                            />
                          
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component="div" >
                          
                            <p>
                              Watch On
                              <span>
                                <a
                                  className="App-link"
                                  href={watchOn.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {watchOn.name}
                                </a>
                              </span>
                            </p>
                            <p>{summary}</p>
                            <p>
                              Watch On
                              <span>
                                <a
                                  className="App-link"
                                  href={watchOn.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {watchOn.name}
                                </a>
                              </span>
                            </p>
                            <Button
                              variant="text"
                              color="error"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteMovie(id);
                                alert("deleted");
                                getMovies(setMovies);
                              }}
                            >
                              <Icons.Delete /> Delete
                            </Button>
                            <Link className="App-link" to={`/edit/${id}`}>
                              <Button color="info" variant="text">
                                <Icons.Edit /> Edit
                              </Button>
                            </Link>
                          
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )
              )
            : <div className="loader"></div>}
        </div>
      </div>
    </div>
  );
}

export default AllMovies;
