import { TextField, FormControl } from "@mui/material";
import { useState } from "react";
import { NOVEL } from "../constants/NOVEL";
import RadioGroupComponent from "../components/RadioButtonComponent";
import EditNovelTemplate from "../components/EditNovelTemplate";

const status = ["Ongoing", "Completed", "Hiatus"];

const EditNovelTextFieldComponents = ({
  desc,
  title,
  status,
  statusValue,
  setStatusValue,
}) => (
  <>
    <TextField id="name" label="Novel Name" value={title} />
    <TextField id="synopsis" label="Novel Description" value={desc} multiline />
    <FormControl>
      <RadioGroupComponent
        id="status"
        label="Status"
        value={statusValue}
        itemList={status}
        setValue={setStatusValue}
      />
    </FormControl>
  </>
);

export default function EditNovel() {
  const novel = NOVEL;
  const [statusValue, setStatusValue] = useState(novel.status);
  const [selectedGenres, setSelectedGenres] = useState(novel.genre);

  return (
    <EditNovelTemplate
      pageTitle={"Edit Novel"}
      imageLabel={"Upload New Book Cover Art"}
      buttonLink={"novel"}
      buttonLabel={"Save Changes"}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      textFieldComponents={
        <EditNovelTextFieldComponents
          desc={novel.desc}
          title={novel.title}
          status={status}
          statusValue={statusValue}
          setStatusValue={setStatusValue}
        />
      }
    />
  );
}
