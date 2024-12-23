import IndividualProductPopup from "../template";
const PuzzleTools = () => {
  const lightOrange = "#fff6ec";
  const darkOrange = "#ff6d00";

  return (
    <>
      <IndividualProductPopup
        heading={"All Puzzle tools Bundle"}
        overviewTexts={{
          highlightTexts: [],
          texts: [
            "Over 20 puzzle & activity tools",
            "Easy interface, unlimited use",
            "Biggest variety available anywhere",
            "Download puzzles as png files",
            "Option to create pdf pages",
          ],
        }}
        buttonConfig={{
          url: "/shop",
          text: "More Information",
          textColor: darkOrange,
          bgColor: lightOrange,
        }}
        imageUrl={{ name: "puzzleTools", format: "img" }}
        themeColor="ffa800"
        // videoUrl="puzzle-page"
        ga_tracking_id="puzzle-tools- popup"
      />
    </>
  );
};

export default PuzzleTools;
