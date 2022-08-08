import { Box, Stack, Divider, Typography, Button } from "@mui/material";
import UserCommentField from "./UserCommentField";
import CommentComponent from "./CommentComponent";
import TabsComponentTemplate from "./TabsComponentTemplate";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import { getRequestOptions } from "../src/Utils";

const ChapterCommentsSubComponent = ({
  list,
  commentValue,
  handleCommentChange,
  session,
  handleSubmit,
  error,
  handleCloseAlert,
  editing,
  handleEdit,
  handleCancel,
  handleUpdate,
  handleDelete,
}) => (
  <Box>
    {session && list.length === 0 ? (
      <Typography variant="body1" align="center" color="text.secondary" mb={3}>
        Be the first to comment on this chapter.
      </Typography>
    ) : null}
    {!session ? (
      <Button
        disableRipple={true}
        variant="body1"
        onClick={signIn}
        mt={3}
        sx={{
          textTransform: "capitalize",
          textDecoration: "underline",
          "&:hover": { background: "inherit" },
        }}
      >
        Log in to leave a comment.
      </Button>
    ) : null}
    {session && (
      <UserCommentField
        commentValue={commentValue}
        handleCommentChange={handleCommentChange}
        handleSubmit={handleSubmit}
        error={error}
        handleCloseAlert={handleCloseAlert}
        editing={editing}
        handleCancel={handleCancel}
        handleUpdate={handleUpdate}
      />
    )}
    {list.length > 0 ? (
      <CommentComponent
        commentList={list}
        handleEdit={handleEdit}
        editing={editing}
        handleDelete={handleDelete}
      />
    ) : null}
  </Box>
);

export default function ChapterComments({ comments, chapter_id }) {
  const itemPerPage = 2;
  const [list, setList] = useState(comments.slice(0, itemPerPage));
  const [commentId, setCommentId] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [descOrderComment, setDescOrderComment] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const getRequestData = () => {
    return {
      user: session.user.id,
      chapter: chapter_id,
      comment: commentValue,
    };
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  const handleCloseAlert = (editing) => {
    setError(false);
    if (!editing) setCommentValue("");
  };

  const handleEdit = (prevComment, prevCommentId) => {
    setCommentId(prevCommentId);
    setCommentValue(prevComment);
    setEditing(true);
  };

  const handleCancel = () => {
    setCommentId("");
    setCommentValue("");
    setError(false);
    setEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = getRequestData();
    const res = await fetch(
      "/api/comment/create-comment",
      getRequestOptions(requestData, "POST")
    ).then((res) => res.json());
    setLoading(false);
    if (!res.success) {
      router.push("/400");
      return;
    }
    setCommentValue("");
    router.reload();
    return;
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = {
      comment_id: commentId,
      user_id: session.user.id,
      comment_value: commentValue,
    };

    const res = await fetch(
      "/api/comment/update-comment",
      getRequestOptions(requestData, "PUT")
    ).then((res) => res.json());
    if (!res.success) {
      setLoading(false);
      if (res.error === "comment already exists") {
        setError(true);
        return;
      }
      if (res.error === "unauthorized") {
        router.push("/401");
        return;
      }
      if (res.error === "bad request") {
        router.push("/400");
        return;
      }
    }
    handleCancel();
    router.reload();
    return;
  };

  const handleDelete = async (comment_id, user_id) => {
    setLoading(true);
    const requestData = {
      comment_id: comment_id,
      user_id: user_id,
    };
    const res = await fetch(
      "/api/comment/delete-comment",
      getRequestOptions(requestData, "DELETE")
    ).then((res) => res.json());
    if (!res.success) {
      setLoading(false);
      if (res.error === "unauthorized") {
        router.push("/401");
        return;
      }
      if (res.error === "bad request") {
        router.push("/400");
        return;
      }
    }
    router.reload();
    return;
  };

  return (
    <>
      {loading && <Loader open={loading} />}
      <Box pt={4}>
        <Stack spacing={4}>
          <Divider />
          <TabsComponentTemplate
            itemList={comments}
            itemPerPage={itemPerPage}
            setList={setList}
            descending={descOrderComment}
            setDescending={setDescOrderComment}
            subComponent={
              <ChapterCommentsSubComponent
                list={list}
                commentValue={commentValue}
                handleCommentChange={handleCommentChange}
                session={session}
                handleSubmit={handleSubmit}
                error={error}
                handleCloseAlert={handleCloseAlert}
                editing={editing}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            }
          />
          <Divider />
        </Stack>
      </Box>
    </>
  );
}
