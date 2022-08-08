import {
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function RecentlyUpdateMobile({ updateList }) {
  const router = useRouter();
  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {updateList.map((item, index) => (
              <TableRow
                key={index}
                onClick={() =>
                  router.push({
                    pathname: "/chapter",
                    query: {
                      novel_id: encodeURIComponent(item.novel_id),
                      chapter_number: encodeURIComponent(item.chapter),
                    },
                  })
                }
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Image
                      src={item.img}
                      alt={item.title}
                      layout="intrinsic"
                      width={60}
                      height={80}
                    />
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 200 }}>
                        Chapter {item.chapter} : {item.chapterTitle}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 50 }}>
                        {item.time}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
