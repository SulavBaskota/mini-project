import { Box, Stack, Paper, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function TitleInfo({ status, title, novel_id, author_id }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Paper
          sx={{
            background: (theme) => theme.palette.secondary.main,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            component="span"
            fontWeight="medium"
            color="black"
            sx={{ p: 2 }}
          >
            {status}
          </Typography>
        </Paper>
        {session?.user.userrole === "author" && session.user.id === author_id && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() =>
              router.push({
                pathname: "/author/edit-novel",
                query: { novel_id: encodeURIComponent(novel_id) },
              })
            }
          >
            Edit
          </Button>
        )}
      </Stack>
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
}
