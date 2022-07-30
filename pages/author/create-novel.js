import { TextField } from "@mui/material";
import { useState } from "react";
import EditNovelTemplate from "../../components/EditNovelTemplate";

const CreateNovelTextFieldComponents = () => (
  <>
    <TextField required id="name" label="Novel Name" />
    <TextField
      required
      id="synopsis"
      label="Novel Description"
      multiline
      rows={5}
    />
  </>
);

export default function CreateNovel() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <EditNovelTemplate
      pageTitle={"Create New Novel"}
      imageLabel={"Upload Book Cover Art"}
      buttonLink={"author/my-novels"}
      buttonLabel={"Create Novel"}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      textFieldComponents={<CreateNovelTextFieldComponents />}
    />
  );
}
