import {
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import RadioGroupComponent from "../components/RadioButtonComponent";

const status = ["Any", "Ongoing", "Completed", "Hiatus"];
const sortBy = ["Name", "Popular", "New", "Rating"];

export default function Series() {
  const [statusValue, setStatusValue] = useState("Any");
  const [sortByValue, setSortByValue] = useState("Name");

  return (
    <FormControl>
      <RadioGroupComponent
        id="status"
        label="Status"
        value={statusValue}
        itemList={status}
        setValue={setStatusValue}
      />
      <RadioGroupComponent
        id="sort-by"
        label="Sort By"
        value={sortByValue}
        itemList={sortBy}
        setValue={setSortByValue}
      />
    </FormControl>
  );
}
