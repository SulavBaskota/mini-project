import ExpandableTypography from "./ExpandableTypography";
import { Paper, Stack, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import UserPostAccountInfo from "./UserPostAccountInfo";

export default function CommentComponent({
  commentList,
  handleEdit,
  editing,
  handleDelete,
}) {
  const { data: session } = useSession();

  return (
    <>
      {commentList.map((comment, index) => (
        <Paper elevation={2} sx={{ mt: 2, p: 1 }} key={index}>
          <Stack spacing={2}>
            <UserPostAccountInfo info={comment} />
            <ExpandableTypography
              desc={comment.comment}
              expandable={true}
              lineClamp="3"
            />
            {!editing && session?.user.id === comment.user._id && (
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  color="error"
                  onClick={() => handleDelete(comment._id, comment.user._id)}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleEdit(comment.comment, comment._id)}
                >
                  Edit
                </Button>
              </Stack>
            )}
          </Stack>
        </Paper>
      ))}
    </>
  );
}
