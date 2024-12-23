import IndividualProductPopup from "../template";
const Designer = () => {
  const themePurple = "#8c71fd";
  const white = "#ffffff";

  return (
    <>
      <IndividualProductPopup
        heading={"Digital Titans Designer"}
        overviewTexts={{
          highlightTexts: ["9,200"],
          texts: [
            "14 different font styles",
            "Letters in English, German, French, Italian, Spanish",
            "Includes numbers & common characters",
            "Upload any and all themes for background",
            "Sell custom fonts on Etsy and other platforms",
          ],
        }}
        buttonConfig={{
          url: "/shop",
          text: "More Information",
          textColor: white,
          bgColor: themePurple,
        }}
        imageUrl={{ name: "designer", format: "img" }}
        themeColor="ffa800"
        videoUrl="designer-page"
        ga_tracking_id="designer- popup"
      />
    </>
  );
};

export default Designer;
