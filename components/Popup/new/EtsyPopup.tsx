import IndividualProductPopup from "../template";

const EtsyPopUp = () => {
  return (
    <IndividualProductPopup
      heading={"Titans Pro Etsy"}
      overviewTexts={{
        texts: [
          "      Search suggestions",
          "Search results number",
          "Search volume est.",
          "Demand & opportunity analysis",
        ],
      }}
      buttonConfig={{
        url: "/shop",
        text: "More Information",
        textColor: "#ffffff",
        bgColor: "#8c71fd",
      }}
      imageUrl={{ name: "etsy", format: "img" }}
      themeColor="ffa800"
      ga_tracking_id="etsy- popup"
    />
  );
};
export default EtsyPopUp;
