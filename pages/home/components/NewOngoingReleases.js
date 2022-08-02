import { NEW_BOOKS } from "../../../constants/NEW_BOOKS";
import BookTile from "../../../components/book-tile/BookTile";
import HomeSectionTemplate from "./HomeSectionTemplate";

export default function NewOngoingReleases() {
  return (
    <HomeSectionTemplate
      sectionTitle={"New Ongoing Releases"}
      lowLevelComp={<BookTile bookList={NEW_BOOKS} />}
    />
  );
}
