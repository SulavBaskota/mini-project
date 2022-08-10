import { TextField, FormControl } from "@mui/material";
import { useState } from "react";
import RadioGroupComponent from "../../components/RadioButtonComponent";
import EditNovelTemplate from "./components/EditNovelTemplate";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import { uploadImage } from "../../src/Utils";
import { getRequestOptions } from "../../src/Utils";

const status = ["Ongoing", "Completed", "Hiatus"];

const EditNovelTextFieldComponents = ({
  desc,
  title,
  status,
  statusValue,
  setStatusValue,
}) => (
  <>
    <TextField
      required
      id="name"
      name="title"
      label="Novel Name"
      value={title}
      InputProps={{
        readOnly: true,
      }}
    />
    <TextField
      required
      id="synopsis"
      name="desc"
      label="Novel Description"
      defaultValue={desc}
      multiline
    />
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

export default function EditNovel({ novelInfo }) {
  const router = useRouter();
  const [statusValue, setStatusValue] = useState(novelInfo.status);
  const [selectedGenres, setSelectedGenres] = useState(novelInfo.genre);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const requestData = {
      id: novelInfo._id,
      desc: formData.get("desc"),
      genre: selectedGenres,
      status: statusValue,
      img: novelInfo.img,
    };

    if (
      requestData.desc === novelInfo.desc &&
      requestData.genre === novelInfo.genre &&
      requestData.status === novelInfo.status &&
      !selectedImage
    ) {
      setLoading(false);
      return;
    }
    if (selectedImage) {
      const imgData = new FormData();
      imgData.append("file", selectedImage);
      imgData.append("upload_preset", "book-cover-pics");
      const cloudinaryResponse = await uploadImage(imgData).then((res) =>
        res.json()
      );

      requestData.img = cloudinaryResponse.secure_url;
    }
    const res = await fetch(
      "/api/author/edit-novel",
      getRequestOptions(requestData, "PUT")
    ).then((res) => res.json());
    if (!res.success) {
      router.push("/400");
      return;
    }
    router.push({
      pathname: "/novel",
      query: { novel_id: encodeURIComponent(novelInfo._id) },
    });
  };

  return (
    <>
      {loading && <Loader open={loading} />}
      <EditNovelTemplate
        pageTitle={"Edit Novel"}
        imageLabel={"Upload New Book Cover Art"}
        buttonLink={`novel?novel_id=${encodeURIComponent(novelInfo._id)}`}
        buttonLabel={"Save Changes"}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        textFieldComponents={
          <EditNovelTextFieldComponents
            desc={novelInfo.desc}
            title={novelInfo.title}
            status={status}
            statusValue={statusValue}
            setStatusValue={setStatusValue}
          />
        }
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req });
  const { novel_id } = query;
  if (!session || !novel_id || session.user.userrole !== "author") {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
  const hostUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const requestUrl =
    hostUrl + "/api/novel/novel-info/" + encodeURIComponent(novel_id);
  let novelInfo = {};
  await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (novelInfo = res.data));
  if (session.user.id !== novelInfo.author_id) {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
  return {
    props: {
      novelInfo: novelInfo,
    },
  };
}
