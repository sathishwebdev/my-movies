import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import * as mui from "@mui/material";
import * as Icons from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Counter } from "./App";
import TopIcon from "@mui/icons-material/KeyboardArrowUp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { context } from "./App";

const Button = mui.Button;
function MovieDetail() {
  const { movies, setMovies } = useContext(context);
  const [show, setShow] = useState(false);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetch(`https://6188a6b1d0821900178d742d.mockapi.io/movies/${movieId}`)
      .then((data) => data.json())
      .then((data) => {
        setMovie([data]);
      });
  }, [movieId]);

  const [
    {
      id,
      name,
      poster,
      trailer,
      category,
      watchOn,
      summary,
      releaseDate,
      genre,
      counts,
    },
  ] =
    movie !== null
      ? movie
      : [
          {
            id: "",
            name: "",
            poster: "",
            trailer: "",
            category: "",
            watchOn: { link: "", name: "" },
            summary: "",
            releaseDate: "",
            genre: "",
            counts: { likes: 0, disLikes: 0, status: "" },
          },
        ];

  return (
    <div>
      {movie !== null && movies !== null ? (
        <div id={id} className="App">
          {/* video   */}
          <iframe
            width="100%"
            height="400px"
            src={`${trailer}?controls=1&autoplay=0`}
            title={`${name}'s Trailer'`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="App" key={id}>
            <h1 className="name">{name}</h1>
            <div className="movieCon-in-detail ">
              <div className="container">
                <Link className="App-link" to={`./${id}`}>
                  <img
                    src={poster}
                    className="contentImg"
                    alt={name}
                    title={name}
                  />
                </Link>
              </div>

              <div className="content-in-detail ">
                <Counter
                  id={id}
                  movies={movies}
                  setMovies={setMovies}
                  stat={counts.status}
                  likes={counts.likes}
                  dislikes={counts.disLikes}
                />

                <p>
                  {" "}
                  <a
                    href={`https:youtu.be/${
                      trailer.split("/")[trailer.split("/").length - 1]
                    }`}
                    className="App-link"
                  >
                    {" "}
                    Watch Trailer{" "}
                  </a>
                </p>
                <p> category : {category} </p>
                <p> Release Date : {releaseDate} </p>
                <p> Genre : {genre.join(", ")}</p>
                {/* <details><summary> Description </summary> <p >{summary}</p></details>  */}
                <p>
                  {" "}
                  Description :{" "}
                  {!show ? (
                    <span>
                      {summary.substring(0, 50)}...
                      <Button
                        variant="text"
                        sx={{ color: "#61dafb" }}
                        onClick={(e) => setShow(true)}
                      >
                        <Icons.KeyboardArrowDown /> Read More
                      </Button>{" "}
                    </span>
                  ) : (
                    <span>
                      {summary}
                      <Button
                        variant="text"
                        color="warning"
                        onClick={(e) => setShow(false)}
                      >
                        <TopIcon /> Read Less
                      </Button>
                    </span>
                  )}{" "}
                </p>
                {watchOn.name ? (
                  <p>
                    {" "}
                    Watch On{" "}
                    <a
                      className="App-link"
                      href={watchOn.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      watchOn{" "}
                    </a>
                  </p>
                ) : (
                  <span></span>
                )}
              </div>
              <div className="App-header-in-detail">
                {movies.map(
                  ({
                    id,
                    name,
                    poster,
                    trailer,
                    category,
                    watchOn,
                    summary,
                    releaseDate,
                    genre,
                    counts,
                  }) => (
                    <div key={name} id={id}>
                      <Accordion
                        sx={{
                          border: "none",
                          margin: "0px",
                          boxShadow: "none",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ margin: "0px" }} />}
                        >
                          <Typography
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              border: "none",
                            }}
                          >
                            <div>
                              <Link
                                className="App-link"
                                to={`/movie/${id}/#${id}`}
                              >
                                {" "}
                                <div className="movieList-in-detail">
                                  <div className="posterCon-in-detail">
                                    <img
                                      src={poster}
                                      className="poster-in-detail"
                                      alt={name}
                                      title={name}
                                    />
                                  </div>
                                  <div>
                                    <p>{name}</p>
                                    <p style={{ color: "grey" }}>{category}</p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <div>
                              {watchOn.name ? 
                                <p>
                                  {" "}
                                  Watch On{" "}
                                  <a
                                    className="App-link"
                                    href={watchOn.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {" "}
                                    watchOn{" "}
                                  </a>
                                </p>
                              : 
                                <></>
                              }
                              {summary}
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}{" "}
    </div>
  );
}

export default MovieDetail;
