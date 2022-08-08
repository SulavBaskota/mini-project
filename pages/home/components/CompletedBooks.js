import HomeSectionTemplate from "./HomeSectionTemplate";
import BookTile from "../../../components/book-tile/BookTile";

export default function CompletedBooks({ completedNovels }) {
  return (
    <HomeSectionTemplate
      sectionTitle={"Completed"}
      lowLevelComp={<BookTile bookList={completedNovels} />}
    />
  );
}
