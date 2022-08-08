import { TextField } from "@mui/material";
import { useState } from "react";
import EditNovelTemplate from "./components/EditNovelTemplate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import { uploadImage } from "../../src/Utils";
import { getRequestOptions } from "../../src/Utils";

const CreateNovelTextFieldComponents = ({ error }) => (
  <>
    <TextField
      required
      id="name"
      name="title"
      label="Novel Name"
      error={error}
      helperText={error ? "Title unavailable" : ""}
    />
    <TextField
      required
      id="synopsis"
      name="desc"
      label="Novel Description"
      multiline
      rows={5}
    />
  </>
);

export default function CreateNovel() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedGenres || !selectedImage) return;

    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const imgData = new FormData();
    imgData.append("file", selectedImage);
    imgData.append("upload_preset", "book-cover-pics");
    const cloudinaryResponse = await uploadImage(imgData).then((res) =>
      res.json()
    );

    const requestData = {
      title: formData.get("title"),
      img: cloudinaryResponse.secure_url,
      author: session.user.id,
      desc: formData.get("desc"),
      genre: selectedGenres,
    };
    const res = await fetch(
      "/api/author/create-novel",
      getRequestOptions(requestData, "POST")
    ).then((res) => res.json());
    if (!res.success) {
      if (res.error === "title not available") {
        setLoading(false);
        setError(true);
        return;
      }
      if (res.error === "bad request") router.push("/400");
      return;
    }
    setError(false);
    const data = await res.data;
    setLoading(false);
    router.push({
      pathname: "/novel",
      query: { novel_id: encodeURIComponent(data._id) },
    });
  };

  return (
    <>
      {loading && <Loader open={loading} />}
      <EditNovelTemplate
        pageTitle={"Create New Novel"}
        imageLabel={"Upload Book Cover Art"}
        buttonLink={"author/my-novels"}
        buttonLabel={"Create Novel"}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        textFieldComponents={<CreateNovelTextFieldComponents error={error} />}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
