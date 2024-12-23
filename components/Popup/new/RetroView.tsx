import IndividualProductPopup from "../template";

const RetroViewPopup = () => {
  const themePurple = "#8c71fd";

  return (
    <IndividualProductPopup
      heading={"Titans Retro View"}
      overviewTexts={{
        texts: [
          "Reverse engineer any product",
          "Find top competitors keywords",
          "See rankings of competitors",
          "Full analysis of each keyword",
          "More affordable than all alternatives",
        ],
      }}
      buttonConfig={{
        url: "/shop",
        text: "More Information",
        textColor: "#ffffff",
        bgColor: themePurple,
      }}
      imageUrl={{ name: "retro_view", format: "webm" }}
      videoUrl="trvm"
      themeColor="ffa800"
      ga_tracking_id="retro-view- popup"
    />
  );
};
export default RetroViewPopup;
