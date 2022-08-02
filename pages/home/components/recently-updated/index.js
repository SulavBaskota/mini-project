import { RECENTLY_UPDATED } from "../../../../constants/RECENTLY_UPDATED";
import { useMediaQuery } from "@mui/material";
import RecentlyUpdatedDesktop from "./RecentlyUpdatedDeskop";
import RecentlyUpdateMobile from "./RecentlyUpdatedMobile";
import HomeSectionTemplate from "../HomeSectionTemplate";

const RecentlyUpdatedSubComponent = ({ mobileView }) =>
  mobileView ? (
    <RecentlyUpdateMobile updateList={RECENTLY_UPDATED} />
  ) : (
    <RecentlyUpdatedDesktop updateList={RECENTLY_UPDATED} />
  );

export default function RecentlyUpdated() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <HomeSectionTemplate
      sectionTitle={"Recently Updated"}
      lowLevelComp={<RecentlyUpdatedSubComponent mobileView={mobileView} />}
    />
  );
}
