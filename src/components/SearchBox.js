import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import { MovieContext } from "../MovieContext";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Movie from "./Movie";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  textInput: {
    textAlign: "center",
    color: "white",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const contextData = useContext(MovieContext);
  const classes = useStyles();

  useEffect(() => {
    try {
      Axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
      ).then((res) => contextData.setSearchArray(res.data.Search));
      console.log("Search Arr", contextData.searchArray);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  return (
    <div>
      <div style={{ margin: "10px", padding: "5px" }}>
        <CssTextField
          // fullWidth
          style={{
            margin: "20px",
            width: "22ch",
            minWidth: "250px",
          }}
          className={classes.margin}
          label="Enter a movie name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);
          }}
          id="custom-css-outlined-input"
          inputProps={{
            className: classes.textInput,
          }}
          InputProps={{
            className: classes.textInput,
          }}
          InputLabelProps={{
            className: classes.textInput,
          }}
        />
      </div>
    </div>
  );
};

export default SearchBox;