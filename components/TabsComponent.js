import PropTypes from "prop-types";
import { Container, Box, Tabs, Tab } from "@mui/material";
import ChapterList from "./ChapterList";
import NovelReviews from "./NovelReviews";
import { useState } from "react";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

export default function TabsComponent({ chapters, reviews }) {
  const [value, setValue] = useState(0);
  const [descOrderChapter, setDescOrderChapter] = useState(true);
  const [descOrderReview, setDescOrderReview] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "md" }}>
      <Container sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Chapters" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
      </Container>
      <Container>
        <TabPanel value={value} index={0}>
          <ChapterList
            chapters={chapters}
            descOrderChapter={descOrderChapter}
            setDescOrderChapter={setDescOrderChapter}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NovelReviews
            reviews={reviews}
            descOrderReview={descOrderReview}
            setDescOrderReview={setDescOrderReview}
          />
        </TabPanel>
      </Container>
    </Box>
  );
}
