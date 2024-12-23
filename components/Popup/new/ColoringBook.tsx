import IndividualProductPopup from "../template";
const ColoringBook = () => {
  return (
    <>
      <IndividualProductPopup
        heading={"Coloring Book Maker"}
        overviewTexts={{
          highlightTexts: ["9,200"],
          texts: [
            " Over 9,200 coloring elements",
            "Hundreds of categories",
            "Search by keyword",
            "All hand drawn, no AI",
            "Unlimited use",
          ],
        }}
        buttonConfig={{
          url: "/coloring-book-maker",
          text: "More Information",
          textColor: "#ffa800",
          bgColor: "#fff6ec",
        }}
        imageUrl={{ name: "coloringBook", type: "png" }}
        themeColor="ffa800"
        ga_tracking_id="coloring-book- popup"
      />
    </>
  );
};

export default ColoringBook;
