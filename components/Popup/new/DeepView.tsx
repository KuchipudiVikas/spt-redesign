import IndividualProductPopup from "../template";

const DeepViewPopup = () => {
  const themePurple = "#8c71fd";
  return (
    <IndividualProductPopup
      heading={"Titans Deep View"}
      overviewTexts={{
        highlightTexts: [""],
        texts: [
          "Analyze the top 100 competitors at once",
          "One click download of all data",
          "Search results (competitors)",
          "All key metrics",
        ],
      }}
      buttonConfig={{
        url: "/shop",
        text: "More Information",
        textColor: "#ffffff",
        bgColor: themePurple,
      }}
      imageUrl={{ name: "deep_view", format: "webm" }}
      videoUrl="deep-view"
      themeColor="ffa800"
      ga_tracking_id="deep-view- popup"
    />
  );
};
export default DeepViewPopup;
