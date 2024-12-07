import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, type FC, useState } from "react";
import styles from "@/styles/bsr-and-asin/ChartControlsStyles";
import commonStyles from "@/styles/bsr-and-asin/CommonStyles";

import "rodal/lib/rodal.css";

//Valid values: [ 1: com | 2: co.uk 225 | 3: de | 4: fr | 5: co.jp | 6: ca | 8: it | 9: es | 10: in | 11: com.mx ]

const domainDict = {
  com: 1,
  uk: 2,
  de: 3,
  fr: 4,
  jp: 5,
  ca: 6,
  it: 8,
  es: 9,
  in: 10,
  mx: 11,
};
interface IChart {
  asin: string;
  domainSuffix: string;
  onClick: () => void;
}

const Chart: FC<IChart> = (props) => {
  const { asin, domainSuffix } = props;
  const chartAsin = asin || "B07CZDXDG8";
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let colorIndex = {
    BSR: "#8601b0",
    Reviews: "#3d00a4",
    "Buy Box": "#02abae",
    "List Price": "#66b132",
  };

  useEffect(() => {
    // Get the ASIN value from the query string

    // const asin = 'B07CZDXDG8';
    /**
     * ---------------------------------------
     * This demo was created using amCharts 5.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v5/
     * ---------------------------------------
     */

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart: any = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        pinchZoomX: true,
        paddingTop: 25,
      })
    );

    var easing = am5.ease.linear;
    chart.get("colors").set("step", 3);

    var legendRoot = am5.Root.new("legenddiv");

    //legendRoot.setThemes([am5themes_Animated.new(chart)]);

    var legend = legendRoot.container.children.push(
      am5.Legend.new(legendRoot, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(0),
        y: am5.percent(0),
      })
    );

    // legend.markers.template.setup = function(marker) {
    //   console.log("marker", marker)
    //   var check = am5.Graphics.new(root, {
    //     fill: am5.color(0x000000),
    //     fillOpacity: 1,
    //     width: 20,
    //     height: 20,
    //     layer: 50,
    //     svgPath: "M15.75 2.527c-.61-.468-1.46-.328-1.902.32l-6.325 9.255L4.04 8.328a1.3 1.3 0 0 0-1.922-.062 1.505 1.505 0 0 0-.062 2.043s4.234 4.695 4.843 5.168c.61.468 1.457.328 1.903-.32L16.05 4.55c.445-.653.308-1.555-.301-2.024Zm0 0"
    //   });

    //   check.states.create("disabled", {
    //     fillOpacity: 0
    //   });

    //   marker.children.push(check);
    // }

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        // maxDeviation: 0.1,
        groupData: true,
        // groupCount: 10,
        groupIntervals: [
          {
            timeUnit: "day",
            count: 1,
          },
        ],
        baseInterval: {
          timeUnit: "second",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var BSRSeries;
    function createAxisAndSeries(
      chartType,
      opposite,
      data,
      color,
      createlegend = false,
      legend
    ) {
      if (
        // chartType == "amazon" ||
        // chartType == "new" ||
        // chartType == "buyBox" ||
        chartType == "list"
        // chartType == "fba"
      ) {
        var yRenderer = am5xy.AxisRendererY.new(root, {
          // inside: true
          minGridDistance: 35,
        });
        // hide yAxis labels
        //yRenderer.labels.template.set("visible", false);
        yRenderer.labels.template.setAll({
          centerY: am5.percent(100),
          //maxPosition: 0.90
        });
      } else if (chartType == "BSR") {
        var yRenderer = am5xy.AxisRendererY.new(root, {
          opposite: opposite,
          minGridDistance: 35,
        });
        // hide yAxis labels
        //yRenderer.labels.template.set("visible", false);
        yRenderer.labels.template.setAll({
          centerY: am5.percent(100),
          //maxPosition: 0.90
        });
      } else {
        var yRenderer = am5xy.AxisRendererY.new(root, {
          opposite: opposite,
        });
        // hide yAxis labels
        yRenderer.labels.template.set("visible", false);
      }

      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 1,
          renderer: yRenderer,
        })
      );
      let name = chartType;
      if (chartType == "BSR") {
        name = "BSR";
      } else if (chartType == "reviewCount") {
        name = "Reviews";
      } else if (chartType == "newOfferCount") {
        name = "New Offers";
      } else if (chartType == "amazon") {
        name = "Amazon";
      } else if (chartType == "new") {
        name = "New";
      } else if (chartType == "buyBox") {
        name = "Buy Box";
      } else if (chartType == "list") {
        name = "List Price";
      } else if (chartType == "fba") {
        name = "FBA";
      } else if (chartType == "used") {
        name = "Used";
      } else if (chartType == "collectible") {
        name = "Collectible";
      }

      var series = chart.series.push(
        am5xy.StepLineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: chartType,
          valueXField: "date",
          connect: true,
          autoGapCount: 9999999999999999999999999999999999999999999,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[#fff]{name} : [font-size: 1 #fff]{valueY}[/]",
          }),
          fill: am5.color(colorIndex[name]),
          stroke: am5.color(colorIndex[name]),
          // visible: false
        })
      );

      if (chartType == "BSR") {
        BSRSeries = series;
      }
      if (chartType == "amazon") {
        series.fills.template.setAll({
          fillOpacity: 0.2,
          visible: true,
        });
      }

      //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
      series.strokes.template.setAll({ strokeWidth: 1 });

      yRenderer.grid.template.set("strokeOpacity", 0.05);
      yRenderer.labels.template.set("fill", series.get("fill"));
      yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1,
      });

      // Set up data processor to parse string dates
      // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
      series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd",
        dateFields: ["date"],
      });

      series.data.setAll(data);
      if (createlegend) {
        legend.data.setAll(chart.series.values);
      }
    }

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    // Generates random data, quite different range
    function generateChartData(value) {
      var data = [];
      var firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 100);
      firstDate.setHours(0, 0, 0, 0);

      for (var i = 0; i < 100; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        value += Math.round(
          ((Math.random() < 0.5 ? 1 : -1) * Math.random() * value) / 20
        );

        data.push({
          date: newDate,
          value: value,
        });
      }
      return data;
    }
    console.log(domainDict, domainSuffix);
    setLoading(true);
    const params = new URLSearchParams({
      Domain: domainDict[domainSuffix],
      ChartAsin: chartAsin,
    });
    async function getKeepaData() {
      await fetch(`/api/keepa?${params.toString()}`, {
        headers: {
          "x-app-token": process.env.NEXT_PUBLIC_KEEPA_SECRET,
        },
      }).then(async function (result) {
        try {
          console.log("result", result);
          if (!result.ok) {
            if (result.status === 401) {
              throw new Error("Unauthorized");
            } else {
              throw new Error("Internal server error");
            }
          }
          let res = await result.json();
          let keepaResponse = res;
          let keepaProductsCsv = keepaResponse.products[0].csv;
          console.log("keepaProductsCsv", keepaProductsCsv);

          const keepaAmazonPriceHistory = keepaProductsCsv[0] || [];
          const keepaNewPriceHistory = keepaProductsCsv[1] || [];
          const keepaUsedPriceHistory = keepaProductsCsv[2] || [];
          const keepaSalesRankHistory = keepaProductsCsv[3] || [];
          const keepaReviewHistory = keepaProductsCsv[17] || [];
          const keepaListPriceHistory = keepaProductsCsv[4] || [];
          const keepaCollectiblePriceHistory = keepaProductsCsv[5] || [];
          const keepaBuyBoxPriceHistory = keepaProductsCsv[18] || [];
          const keepaFbaPriceHistory = keepaProductsCsv[10] || [];
          const sellersNewHistory = keepaProductsCsv[11] || [];

          console.log("keepaReviewHistory", keepaReviewHistory);

          let keepaChartData = [];
          let keepaLast3MonthsChartData = [];

          let prevAmzPrice = null;
          let prevNewPrice = null;
          let prevUsedPrice = null;
          let prevListPrice = null;
          let prevBuyBoxPrice = null;
          let prevFbaPrice = null;
          let prevNewSellerCount = null;
          let prevReviewCount = null;

          let dateToday = new Date();
          let todayTimestamp = dateToday.getTime();
          let last3MonthsLength = todayTimestamp - 1000 * 60 * 60 * 24 * 367;

          for (let i = 0; i <= keepaSalesRankHistory.length - 1; i++) {
            if (i % 2 === 0) {
              //Format Amz Price Data
              if (keepaAmazonPriceHistory) {
                let amazonPrice = prevAmzPrice;

                if (
                  keepaAmazonPriceHistory.includes(keepaSalesRankHistory[i])
                ) {
                  let indexOfAmazonData = keepaAmazonPriceHistory.indexOf(
                    keepaSalesRankHistory[i]
                  );

                  if (keepaAmazonPriceHistory[indexOfAmazonData + 1] == -1) {
                    amazonPrice = null;
                  } else {
                    amazonPrice =
                      keepaAmazonPriceHistory[indexOfAmazonData + 1];
                  }
                }

                //Update
                prevAmzPrice = amazonPrice;
              }

              //Format Amz Price Data End

              //Format New Price Data
              if (keepaNewPriceHistory) {
                let newPrice = prevNewPrice;

                if (keepaNewPriceHistory.includes(keepaSalesRankHistory[i])) {
                  let indexOfNewData = keepaNewPriceHistory.indexOf(
                    keepaSalesRankHistory[i]
                  );

                  if (keepaNewPriceHistory[indexOfNewData + 1] == -1) {
                    newPrice = null;
                  } else {
                    newPrice = keepaNewPriceHistory[indexOfNewData + 1];
                  }
                }

                //Update
                prevNewPrice = newPrice;
              }

              //Format Used Price Data
              if (keepaListPriceHistory) {
                let listPrice = prevListPrice;

                if (keepaListPriceHistory.includes(keepaSalesRankHistory[i])) {
                  let indexOfListData = keepaListPriceHistory.indexOf(
                    keepaSalesRankHistory[i]
                  );

                  if (keepaListPriceHistory[indexOfListData + 1] == -1) {
                    listPrice = null;
                  } else {
                    listPrice = keepaListPriceHistory[indexOfListData + 1];
                  }
                }

                //Update
                prevListPrice = listPrice;
              }

              //Format New Price Data End

              //Format BuyBox Price Data
              if (keepaBuyBoxPriceHistory) {
                let buyBoxPrice = prevBuyBoxPrice;

                if (
                  keepaBuyBoxPriceHistory.includes(keepaSalesRankHistory[i])
                ) {
                  let indexOfBuyBoxData = keepaBuyBoxPriceHistory.indexOf(
                    keepaSalesRankHistory[i]
                  );

                  if (keepaBuyBoxPriceHistory[indexOfBuyBoxData + 1] == -1) {
                    buyBoxPrice = null;
                  } else {
                    let buyBoxOriginalPrice =
                      keepaBuyBoxPriceHistory[indexOfBuyBoxData + 1];
                    let buyBoxShippingPrice =
                      keepaBuyBoxPriceHistory[indexOfBuyBoxData + 2];
                    buyBoxPrice = buyBoxOriginalPrice + buyBoxShippingPrice;
                  }
                }

                //Update
                prevBuyBoxPrice = buyBoxPrice;
              }

              //Format BuyBox Price Data End

              //Format FBA  Price Data
              if (keepaFbaPriceHistory) {
                let fbaPrice = prevFbaPrice;

                if (keepaFbaPriceHistory.includes(keepaSalesRankHistory[i])) {
                  let indexOfFbaData = keepaFbaPriceHistory.indexOf(
                    keepaSalesRankHistory[i]
                  );

                  if (keepaFbaPriceHistory[indexOfFbaData + 1] == -1) {
                    fbaPrice = null;
                  } else {
                    fbaPrice = keepaFbaPriceHistory[indexOfFbaData + 1];
                  }
                }

                //Update
                prevFbaPrice = fbaPrice;
              }

              //Format FBA Price Data End

              //Format new Seller Data
              if (sellersNewHistory) {
                let newSellerCount = prevNewSellerCount;

                if (sellersNewHistory.includes(keepaSalesRankHistory[i])) {
                  let indexOfNewSellerData = sellersNewHistory.indexOf(
                    keepaSalesRankHistory[i]
                  );

                  if (sellersNewHistory[indexOfNewSellerData + 1] == -1) {
                    newSellerCount = null;
                  } else {
                    newSellerCount =
                      sellersNewHistory[indexOfNewSellerData + 1];
                  }
                }

                //Update
                prevNewSellerCount = newSellerCount;
              }

              prevReviewCount;
              //Format Review Count Data
              if (keepaReviewHistory) {
                let newReviewCount = prevReviewCount;

                if (keepaReviewHistory.includes(keepaSalesRankHistory[i])) {
                  let indexOfReviewCountData = keepaReviewHistory.indexOf(
                    keepaSalesRankHistory[i]
                  );

                  if (keepaReviewHistory[indexOfReviewCountData + 1] == -1) {
                    newReviewCount = null;
                  } else {
                    newReviewCount =
                      keepaReviewHistory[indexOfReviewCountData + 1];
                  }
                }

                //Update
                prevReviewCount = newReviewCount;
              }

              //Format new Seller Data End
              //Format new Seller Data
              if (keepaSalesRankHistory) {
                keepaSalesRankHistory[i + 1] !== -1 &&
                  keepaChartData.push({
                    date: (keepaSalesRankHistory[i] + 21564000) * 60000,
                    BSR: keepaSalesRankHistory[i + 1],
                    amazon: prevAmzPrice ? prevAmzPrice / 100 : null,
                    buyBox: prevBuyBoxPrice ? prevBuyBoxPrice / 100 : null,
                    fba: prevFbaPrice ? prevFbaPrice / 100 : null,
                    new: prevNewPrice ? prevNewPrice / 100 : null,
                    newOfferCount: prevNewSellerCount,
                    reviewCount: prevReviewCount,
                    list: prevListPrice ? prevListPrice / 100 : null,
                  });
              }

              //Last 3 Months Data
              if (
                last3MonthsLength <=
                (keepaSalesRankHistory[i] + 21564000) * 60000
              ) {
                keepaLast3MonthsChartData.push({
                  date: (keepaSalesRankHistory[i] + 21564000) * 60000,
                  BSR: keepaSalesRankHistory[i + 1],
                  amazon: prevAmzPrice ? prevAmzPrice / 100 : null,
                  buyBox: prevBuyBoxPrice ? prevBuyBoxPrice / 100 : null,
                  fba: prevFbaPrice ? prevFbaPrice / 100 : null,
                  new: prevNewPrice ? prevNewPrice / 100 : null,
                  newOfferCount: prevNewSellerCount,
                  reviewCount: prevReviewCount,
                  list: prevListPrice ? prevListPrice / 100 : null,
                });
              }
            }
          }

          const data = keepaChartData;

          var processor = am5.DataProcessor.new(root, {
            dateFields: ["date"],
            dateFormat: "yyyy-MM-dd",
            numericFields: [
              "BSR",
              "buyBox",
              // "new",
              "reviewCount",
              // "fba",
              // "amazon",
            ],
          });
          processor.processMany(data);

          // Set data
          // fbaSeries.data.setAll(data);
          // newSeries.data.setAll(data);
          // amazonSeries.data.setAll(data);
          // buyBoxSeries.data.setAll(data);
          // listSeries.data.setAll(data);

          // BSRSeries.data.setAll(data);
          // // BSRSeries2.data.setAll(data);
          // // newOfferSeries.data.setAll(data);
          // reviewCountSeries.data.setAll(data);

          createAxisAndSeries("BSR", true, data, "#8FBC8F", false, legend);
          createAxisAndSeries(
            "reviewCount",
            true,
            data,
            "#8ab300",
            false,
            legend
          );
          // createAxisAndSeries("new", false, data, "#88d");
          // createAxisAndSeries("amazon", false, data, "#FFA500");
          createAxisAndSeries("buyBox", false, data, "#ff00b4", false, legend);
          createAxisAndSeries("list", false, data, "#8b4513", true, legend);
          //createAxisAndSeries("fba", false, data, "#ff5722", true, legend);

          chart.zoomOutButton.set("forceHidden", true);
          root.events.once("frameended", defaultPreZoomingPoint1);
          setLoading(false);

          function defaultPreZoomingPoint1() {
            let preZoomingPointStart = new Date(2023, 6, 1);
            let preZoomingPointEnd = new Date();
            BSRSeries.get("xAxis").zoomToDates(
              new Date(preZoomingPointStart),
              new Date(preZoomingPointEnd)
            );
          }

          function defaultPreZoomingPoint(
            preZoomingPointStart,
            preZoomingPointEnd
          ) {
            BSRSeries.get("xAxis").zoomToDates(
              new Date(preZoomingPointStart),
              new Date(preZoomingPointEnd)
            );
          }

          //last 24 hours
          const dateRange1Day = document.querySelector("a.day1");
          dateRange1Day.addEventListener("click", () => {
            let preZoomingPointEnd = new Date();
            let daysToSubtract = 1;
            let preZoomingPointStart = new Date(preZoomingPointEnd);
            preZoomingPointStart.setDate(
              preZoomingPointEnd.getDate() - daysToSubtract
            );

            defaultPreZoomingPoint(preZoomingPointStart, preZoomingPointEnd);
          });

          //last week
          const dateRange7 = document.querySelector("a.day7");
          dateRange7.addEventListener("click", () => {
            let preZoomingPointEnd = new Date(); // Set preZoomingPointEnd to the current date
            let daysToSubtract = 7;
            let preZoomingPointStart = new Date(preZoomingPointEnd);
            preZoomingPointStart.setDate(
              preZoomingPointEnd.getDate() - daysToSubtract
            );

            defaultPreZoomingPoint(preZoomingPointStart, preZoomingPointEnd);
          });

          //last 30 days
          const dateRange1Month = document.querySelector("a.month1");
          dateRange1Month.addEventListener("click", () => {
            let preZoomingPointEnd = new Date(); // Set preZoomingPointEnd to the current date
            let daysToSubtract = 30;
            let preZoomingPointStart = new Date(preZoomingPointEnd);
            preZoomingPointStart.setDate(
              preZoomingPointEnd.getDate() - daysToSubtract
            );
            defaultPreZoomingPoint(preZoomingPointStart, preZoomingPointEnd);
          });

          //last 90 days
          const dateRange3Month = document.querySelector("a.month3");
          dateRange3Month.addEventListener("click", () => {
            let preZoomingPointEnd = new Date(); // Set preZoomingPointEnd to the current date
            let daysToSubtract = 90;
            let preZoomingPointStart = new Date(preZoomingPointEnd);
            preZoomingPointStart.setDate(
              preZoomingPointEnd.getDate() - daysToSubtract
            );
            defaultPreZoomingPoint(preZoomingPointStart, preZoomingPointEnd);
          });

          const dateRange6Month = document.querySelector("a.month6");
          dateRange6Month.addEventListener("click", () => {
            let preZoomingPointEnd = new Date(); // Set preZoomingPointEnd to the current date
            let daysToSubtract = 180;
            let preZoomingPointStart = new Date(preZoomingPointEnd);
            preZoomingPointStart.setDate(
              preZoomingPointEnd.getDate() - daysToSubtract
            );
            defaultPreZoomingPoint(preZoomingPointStart, preZoomingPointEnd);
          });

          const dateRange1Year = document.querySelector("a.year1");
          dateRange1Year.addEventListener("click", () => {
            let preZoomingPointEnd = new Date(); // Set preZoomingPointEnd to the current date
            let daysToSubtract = 365;
            let preZoomingPointStart = new Date(preZoomingPointEnd);
            preZoomingPointStart.setDate(
              preZoomingPointEnd.getDate() - daysToSubtract
            );
            defaultPreZoomingPoint(preZoomingPointStart, preZoomingPointEnd);
          });

          const dateRangeAll = document.querySelector("a.all");
          dateRangeAll.addEventListener("click", () => {
            let preZoomingPointEnd = new Date(); // Set preZoomingPointEnd to the current date
            let daysToSubtract = 5000;
            let preZoomingPointStart = new Date(preZoomingPointEnd);
            preZoomingPointStart.setDate(
              preZoomingPointEnd.getDate() - daysToSubtract
            );
            defaultPreZoomingPoint(preZoomingPointStart, preZoomingPointEnd);
          });
        } catch (error) {
          console.dir(error);
          setLoading(false);
        }
      });
    }
    getKeepaData();

    // dispose all objects
    return () => {
      root.dispose();
      chart.dispose();
      legendRoot.dispose();
    };
  }, []);

  return (
    <div style={commonStyles.mainDiv} className="w-full">
      <div id="chartcontrols" style={styles.chartcontrols}>
        <div
          title="Period selector"
          className="am5stock am5stock-control am5stock-control-button am5stock-no-hover"
          style={styles.am5stockControlButton}
        >
          <div
            className="am5stock-control-icon"
            style={{ display: "none", height: "500px", marginTop: 10 }}
          >
            <svg viewBox="0 0 50 50" className="am5stock_control_default_icon">
              <path d="M 25 10 L 25 40 M 10 25 L 41 25"></path>
            </svg>
          </div>
          <div
            className="am5stock-control-label"
            style={styles.am5stockControlLabel}
          >
            <a
              className="am5stock-link 1day day1"
              data-period="month1"
              style={styles.am5stockLink}
            >
              24 Hours
            </a>
            <a
              className="am5stock-link 7day day7"
              data-period="month1"
              style={styles.am5stockLink}
            >
              7 Days
            </a>
            <a
              className="am5stock-link month1"
              data-period="month1"
              style={styles.am5stockLink}
            >
              30 Days
            </a>
            <a
              className="am5stock-link month3"
              data-period="month3"
              style={styles.am5stockLink}
            >
              90 Days
            </a>
            <a
              className="am5stock-link month6"
              data-period="month6"
              style={styles.am5stockLink}
            >
              6M
            </a>
            <a
              className="am5stock-link year1"
              data-period="year1"
              style={styles.am5stockLink}
            >
              1 Year
            </a>
            <a
              className="am5stock-link all"
              data-period="month1"
              style={styles.am5stockLink}
            >
              All Time
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-center items-center">
          <div className="ml-10">Filter / Show:</div>

          <div
            id="legenddiv"
            style={{ width: "50%" }}
            className=" h-7 -ml-16"
          ></div>
        </div>
      </div>
      {loading && (
        <div className="transition-all scale-150 transform  fixed top-1/2 left-1/2  w-fit -translate-x-1/2 -translate-y-1/2">
          <Spinner className=" " size={"xl"} />
        </div>
      )}
      <div
        id="chartdiv"
        className="transition-all"
        style={{ width: "100%", height: "500px", marginTop: 10 }}
      ></div>
    </div>
  );
};

export default Chart;
