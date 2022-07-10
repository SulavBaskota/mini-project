import { Box, Stack, Divider } from "@mui/material";
import UserCommentField from "./UserCommentField";
import CommentComponent from "./CommentComponent";
import TabsComponentTemplate from "./TabsComponentTemplate";
import { useState } from "react";

const ChapterCommentsSubComponent = ({
  list,
  commentValue,
  handleCommentChange,
}) => (
  <Box>
    <UserCommentField
      commentValue={commentValue}
      handleCommentChange={handleCommentChange}
    />
    <CommentComponent commentList={list} />
  </Box>
);

export default function ChapterComments({ comments }) {
  const itemPerPage = 2;
  const [list, setList] = useState(comments.slice(0, itemPerPage));
  const [commentValue, setCommentValue] = useState("");
  const [descOrderComment, setDescOrderComment] = useState(true);

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  return (
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
            />
          }
        />
        <Divider />
      </Stack>
    </Box>
  );
}
