import BookTile from "../../../components/book-tile/BookTile";
import HomeSectionTemplate from "./HomeSectionTemplate";

export default function NewOngoingReleases({ newNovels }) {
  return (
    <HomeSectionTemplate
      sectionTitle={"New Ongoing Releases"}
      lowLevelComp={<BookTile bookList={newNovels} />}
    />
  );
}
