import { useMediaQuery } from "@mui/material";
import RecentlyUpdatedDesktop from "./RecentlyUpdatedDeskop";
import RecentlyUpdateMobile from "./RecentlyUpdatedMobile";
import HomeSectionTemplate from "../HomeSectionTemplate";

const RecentlyUpdatedSubComponent = ({ mobileView, recentlyUpdated }) =>
  mobileView ? (
    <RecentlyUpdateMobile updateList={recentlyUpdated} />
  ) : (
    <RecentlyUpdatedDesktop updateList={recentlyUpdated} />
  );

export default function RecentlyUpdated({ recentlyUpdated }) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <HomeSectionTemplate
      sectionTitle={"Recently Updated"}
      lowLevelComp={
        <RecentlyUpdatedSubComponent
          mobileView={mobileView}
          recentlyUpdated={recentlyUpdated}
        />
      }
    />
  );
}
