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

export default function RecentlyUpdateMobile({ updateList }) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {updateList.map((item, index) => (
              <TableRow key={index}>
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
                      <Typography variant="subtitle2" sx={{ color: "#777777" }}>
                        Chapter {item.chapter} : {item.chapterTitle}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#777777" }}>
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
