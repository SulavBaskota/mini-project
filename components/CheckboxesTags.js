import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GENRES_LIST } from "../constants/GENRES_LIST";

export default function CheckboxesTags({ selectedGenres, setSelectedGenres }) {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags"
      options={GENRES_LIST}
      value={selectedGenres}
      onChange={(event, value) => {
        setSelectedGenres(value);
      }}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label="Select Genres" placeholder="Add Genre" />
      )}
    />
  );
}
