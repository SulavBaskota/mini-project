import { TextField, FormControl } from "@mui/material";
import { useState } from "react";
import { NOVEL } from "../../constants/NOVEL";
import RadioGroupComponent from "../../components/RadioButtonComponent";
import EditNovelTemplate from "../../components/EditNovelTemplate";
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();
  const [statusValue, setStatusValue] = useState(novel.status);
  const [selectedGenres, setSelectedGenres] = useState(novel.genre);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <EditNovelTemplate
      pageTitle={"Edit Novel"}
      imageLabel={"Upload New Book Cover Art"}
      buttonLink={"novel"}
      buttonLabel={"Save Changes"}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
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

export async function getServerSideProps(context) {
  const { novel_id } = context.query;
  if (!novel_id) {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
  const hostUrl = process.env.NEXTAUTH_URL;
  const requestUrl =
    hostUrl + "/api/author/novel-info/" + encodeURIComponent(novel_id);
  let novelInfo = {};
  await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (novelInfo = res.data));

  return {
    props: {
      novel: novelInfo,
    },
  };
}
