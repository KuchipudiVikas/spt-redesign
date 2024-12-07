import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, type FC } from "react";
import styles from "@/styles/bsr-and-asin/ChartControlsStyles";
import commonStyles from "@/styles/bsr-and-asin/CommonStyles";
import { useState } from "react";
import "rodal/lib/rodal.css";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import "rodal/lib/rodal.css";

const Chart = (props) => {
  let { asin, trackingData } = props;
  const [initialDateRange, setInitialDateRange] = useState({
    start: null,
    end: null,
  });
  const [rankTrackingData, setRankTrackingData] = useState(trackingData);
  const [loading, setLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  function detectWindowSize() {
    const _isMobile = window.matchMedia("(max-width: 570px)").matches;
    setIsMobile(_isMobile);
  }

  useEffect(() => {
    detectWindowSize();

    window.onresize = detectWindowSize;

    return () => {
      window.onresize = null;
    };
  }, []);

  useEffect(() => {
    const endDate = new Date(); // current date
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 1); // default: 1 month ago
    setInitialDateRange({ start: startDate, end: endDate });

    var root = am5.Root.new("chartdiv");

    var responsive = am5themes_Responsive.newEmpty(root);

    responsive.addRule({
      relevant: am5themes_Responsive.widthM,
      applying: function () {
        chart.set("layout", root.verticalLayout);
        chart.set("height", 700);
        legend.setAll({
          marginTop: 250,
          height: 200,
          paddingRight: 0,
          maxWidth: window.innerWidth - 50,
        });
        legend.labels.template.setAll({
          minWidth: window.innerWidth - 100,
          oversizedBehavior: "wrap",
          fontSize: 12,
        });
        yAxis.get("renderer").labels.template.setAll({
          oversizedBehavior: "wrap",
          fontSize: 12,
        });

        xAxis.get("renderer").labels.template.setAll({
          fontSize: 12,
        });
        chart.series.each(function (chartSeries) {
          chartSeries
            .get("tooltip")
            .set("labelText", "[#fff]{name}:[font-size: 0.2 #fff]{valueY}[/]");
        });
      },
      removing: function () {
        chart.set("layout", root.horizontalLayout);
        legend.setAll({
          marginTop: 0,
          height: window.innerHeight,
          paddingRight: 0,
          paddingBottom: 10,
          maxWidth: 350,
        });
        chart.set("height", 700);

        legend.labels.template.setAll({
          maxWidth: 350,
          oversizedBehavior: "wrap",
          fontSize: 13,
        });
        yAxis.get("renderer").labels.template.setAll({
          oversizedBehavior: "wrap",
          fontSize: 13,
        });

        xAxis.get("renderer").labels.template.setAll({
          fontSize: 13,
        });
        chart.series.each(function (chartSeries) {
          chartSeries
            .get("tooltip")
            .set("labelText", "[#fff]{name} : [font-size: 1 #fff]{valueY}[/]");
        });
      },
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root), responsive]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.horizontalLayout,
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        maxHeight: 490,
        width: 1360,
        pinchZoomX: true,
      })
    );

    // var chart = root.container.children.push(
    //   am5percent.PieChart.new(root, {
    //     layout: root.horizontalLayout
    //   })
    // );

    var easing = am5.ease.linear;
    chart.get("colors").set("step", 3);
    var legendRoot = am5.Root.new("legenddiv");

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
        height: am5.percent(100),
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
        width: 260,
      })
    );

    legend.events.on("boundschanged", function () {
      document.getElementById("legenddiv").style.height =
        legend.height() + "px";
    });

    legend.valueLabels.template.set("forceHidden", true);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
        min: initialDateRange.start,
        max: initialDateRange.end,
      })
    );
    xAxis.children.push(
      am5.Label.new(root, {
        text: "Date",
        textAlign: "center",
        x: am5.p50,
        fontWeight: "bold",
      })
    );

    // xAxis.set("title")
    // var label1 = am5.Label.new(root, {
    //   rotation: -90,
    //   text: "Rank",
    //   y: am5.p50,
    //   centerX: am5.p50,
    //   fontWeight: "500",
    //   //x: am5.p0,
    //   //centerY: am5.p0
    // });
    // var label2 = am5.Label.new(root, {
    //   text: "Date",
    //   y: am5.p100,
    //   centerX: am5.p50,
    //   fontWeight: "500",
    //   x: am5.p50,
    //   centerY: am5.p0,
    // });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { inversed: true }),
      })
    );
    // yAxis.children.unshift(label1);
    // xAxis.children.unshift(label2);

    legend.labels.template.setAll({
      maxWidth: 200,
      oversizedBehavior: "wrap",
      fontSize: 13,
    });

    yAxis.children.unshift(
      am5.Label.new(root, {
        text: "Rank",
        textAlign: "center",
        y: am5.p50,
        rotation: -90,
        fontWeight: "bold",
      })
    );

    // When legend item container is hovered, dim all the series except the hovered one
    legend.itemContainers.template.events.on("pointerover", function (e) {
      var itemContainer = e.target;
      var series = itemContainer.dataItem.dataContext;

      chart.series.each(function (chartSeries) {
        if (chartSeries != series) {
          //@ts-ignore
          chartSeries.strokes.template.setAll({
            strokeOpacity: 0.15,
            stroke: am5.color(0x000000),
          });
        } else {
          //@ts-ignore
          chartSeries.strokes.template.setAll({
            strokeWidth: 3,
          });
        }
      });
    });

    // When legend item container is unhovered, make all series as they are
    legend.itemContainers.template.events.on("pointerout", function (e) {
      var itemContainer = e.target;
      var series = itemContainer.dataItem.dataContext;

      chart.series.each(function (chartSeries) {
        //@ts-ignore
        chartSeries.strokes.template.setAll({
          strokeOpacity: 1,
          strokeWidth: 1,
          stroke: chartSeries.get("fill"),
        });
      });
    });

    function createSeries(name, data, opposite) {
      data.sort((a, b) => a.date - b.date);
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          connect: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[#fff]{name} : [font-size: 1 #fff]{valueY}[/]",
          }),
        })
      );

      series.strokes.template.setAll({ strokeWidth: 2 });

      series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd",
        dateFields: ["date"],
      });
      series.data.setAll(data);
      series.appear(1000);

      series.data.setAll(data);
      legend.data.setAll(chart.series.values);
    }

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });

    let tData = trackingData;

    //adding dummy data just to display a line instead of point in chart
    tData.forEach((item) => {
      if (item.tracked_list.length === 1) {
        let newDate = new Date(item.tracked_list[0].updated_at);
        newDate.setDate(newDate.getDate() - 1);
        item.tracked_list.push({
          keyword: item.tracked_list[0].keyword,
          rank: item.tracked_list[0].rank,
          updated_at: newDate,
        });
      }
    });
    // Sort the data
    tData.forEach((item) => {
      item.tracked_list.sort((a, b) => {
        const dateA = new Date(a.updated_at);
        dateA.setHours(0, 0, 0, 0);
        const dateB = new Date(b.updated_at);
        dateB.setHours(0, 0, 0, 0);
        return dateA.getTime() - dateB.getTime();
      });
    });

    //creates series
    rankTrackingData.map((i) => {
      let name = i.tracked_list[0].keyword;
      let seriesData = i.tracked_list.map((j) => {
        return {
          date: j.updated_at,
          value: j.rank,
        };
      });
      createSeries(name, seriesData, false);
    });

    const updateAxisRange = (period) => {
      let newEndDate = new Date();
      let newStartDate = new Date();

      switch (period) {
        case "1day":
          newStartDate.setDate(newEndDate.getDate() - 1);
          break;
        case "7day":
          newStartDate.setDate(newEndDate.getDate() - 7);
          break;
        case "1month":
          newStartDate.setMonth(newEndDate.getMonth() - 1);
          break;
        case "3months":
          newStartDate.setMonth(newEndDate.getMonth() - 3);
          break;

        case "6months":
          newStartDate.setMonth(newEndDate.getMonth() - 6);
          break;
        case "1year":
          newStartDate.setFullYear(newEndDate.getFullYear() - 1);
          break;
        case "all":
          newStartDate.setFullYear(newEndDate.getFullYear() - 5);
          break;
        default:
          newStartDate.setMonth(newEndDate.getMonth() - 1);
          break;
      }
      xAxis.set("min", newStartDate.getTime()); // Convert to timestamp
      xAxis.set("max", newEndDate.getTime()); // Convert to timestamp
    };

    const dateRange1Day = document.querySelector("a.day1");
    dateRange1Day.addEventListener("click", () => {
      updateAxisRange("1day");
    });
    const dateRange7Days = document.querySelector("a.day7");
    dateRange7Days.addEventListener("click", () => {
      updateAxisRange("7day");
    });
    const dateRange1Month = document.querySelector("a.month1");
    dateRange1Month.addEventListener("click", () => {
      updateAxisRange("1month");
    });
    const dateRange3Months = document.querySelector("a.month3");
    dateRange3Months.addEventListener("click", () => {
      updateAxisRange("3months");
    });
    const dateRange6Months = document.querySelector("a.month6");
    dateRange6Months.addEventListener("click", () => {
      updateAxisRange("6months");
    });
    const dateRange1Year = document.querySelector("a.year1");
    dateRange1Year.addEventListener("click", () => {
      updateAxisRange("1year");
    });

    const dateRangeAll = document.querySelector("a.all");
    dateRangeAll.addEventListener("click", () => {
      updateAxisRange("all");
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
      chart.dispose();
      legendRoot.dispose();
      legend.dispose();
      xAxis.dispose();
      yAxis.dispose();
      cursor.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "5px",
        border: "1px solid rgb(238, 238, 238)",
        // minHeight: "350px",
        // maxHeight: "83vh",
        // maxWidth:"85vw",
        backgroundColor: "white",
        direction: "ltr",
      }}
      className="w-full"
    >
      <div id="chartcontrols" style={styles.chartcontrols}>
        <div
          title="Period selector"
          className="am5stock period-controller am5stock-control am5stock-control-button am5stock-no-hover"
          style={styles.am5stockControlButton}
        >
          <div
            className="am5stock-control-icon"
            style={{ display: "none", height: "500px", marginTop: 25 }}
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
              className="am5stock-link text-xs md:text-base 1day day1"
              data-period="month1"
              style={styles.am5stockLink}
            >
              24 Hours
            </a>
            <a
              className="am5stock-link text-xs md:text-base 7day day7"
              data-period="month1"
              style={styles.am5stockLink}
            >
              7 Days
            </a>
            <a
              className="am5stock-link text-xs md:text-base month1"
              data-period="month1"
              style={styles.am5stockLink}
            >
              30 Days
            </a>
            <a
              className="am5stock-link text-xs md:text-base month3"
              data-period="month3"
              style={styles.am5stockLink}
            >
              90 Days
            </a>
            <a
              className="am5stock-link text-xs md:text-base month6"
              data-period="month6"
              style={styles.am5stockLink}
            >
              6M
            </a>
            <a
              className="am5stock-link text-xs md:text-base year1"
              data-period="year1"
              style={styles.am5stockLink}
            >
              1 Year
            </a>
            <a
              className="am5stock-link text-xs md:text-base all"
              data-period="month1"
              style={styles.am5stockLink}
            >
              All Time
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-row-reverse">
        <div className="flex mx-2  flex-col justify-center items-center">
          <div
            id="legenddiv"
            // style={{ width: "10%" }}
            className=" h-7 "
          ></div>
        </div>
        <div
          id="chartdiv"
          style={{ width: "100%", height: "500px", marginTop: 10 }}
        ></div>
      </div>
    </div>
  );
};

export default Chart;
