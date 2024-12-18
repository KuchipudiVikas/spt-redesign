import React, { useEffect, useState } from "react";
import moment from "moment";
import usage from "@/lib/api/usage";
import { User } from "@/lib/ts/types/user";

export interface Activity {
  date: string;
  count: number;
}

export interface ActivityData {
  activity: Activity[];
  user_id: string;
}

const getActivityGrid = (activityData) => {
  const startOfYear = moment("2024-01-01");
  const endOfYear = moment("2024-12-31");

  const weeksInYear = [];
  let currentWeek = [];

  let currentDate = startOfYear.clone();
  while (currentDate <= endOfYear) {
    const dayActivity = activityData.find(
      (data) => data.date === currentDate.format("YYYY-MM-DD")
    ) || { date: currentDate.format("YYYY-MM-DD"), count: 0 };
    currentWeek.push(dayActivity);

    if (currentWeek.length === 7) {
      weeksInYear.push(currentWeek);
      currentWeek = [];
    }

    currentDate = currentDate.add(1, "day");
  }

  if (currentWeek.length > 0) {
    // Add remaining days if the year ends mid-week
    weeksInYear.push(currentWeek);
  }

  return weeksInYear;
};

// Get the color based on activity count
const getColor = (count) => {
  if (count === 0) return "#ebedf0";
  if (count <= 2) return "#c6e48b";
  if (count <= 4) return "#7bc96f";
  if (count <= 6) return "#239a3b";
  return "#196127";
};

// Get month labels with equal spacing
const getMonthLabels = () => {
  const startOfYear = moment("2024-01-01");
  const months = [];

  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = startOfYear.clone().add(month, "months");
    const monthIndex = month * (52 / 12);
    months.push({ month: firstDayOfMonth.format("MMM"), monthIndex });
  }

  return months;
};

interface ActivityDisplayProps {
  info: User;
}

const ActivityDisplay: React.FC<ActivityDisplayProps> = ({ info }) => {
  const months = getMonthLabels();
  // @ts-ignore
  const [activityData, setActivityData] = useState<ActivityData | null>([]);
  const weeksInYear = getActivityGrid(activityData);

  async function getActivityData() {
    const { data, error } = await usage.get_user_activity(info._id);
    if (error) {
      return console.error("An error occured", error);
    }
    // @ts-ignore
    setActivityData((data.activity as ActivityData) || []);
  }

  useEffect(() => {
    getActivityData();
  }, []);

  return (
    <>
      <div className=" rounded-lg  " style={styles.container}>
        <h3 style={styles.header} className="font-jsans font-bold pb-3">
          Activity Tracker
        </h3>
        <div className="flex overflow-auto ">
          <div className="flex mt-6 mr-4 flex-col">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div
                  key={index}
                  // @ts-ignore
                  style={{
                    ...styles.monthLabel,
                  }}
                  className={`${index === 0 ? `pt-[]` : `pt-[5.5px]`}`}
                >
                  {day}
                </div>
              )
            )}
          </div>

          <div className="">
            <div style={styles.monthsRow}>
              {months.map((month, index) => (
                <div
                  key={index}
                  // @ts-ignore
                  style={{
                    ...styles.monthLabel,
                    gridColumnStart: Math.floor(month.monthIndex) + 1,
                  }}
                >
                  {month.month}
                </div>
              ))}
            </div>
            {/* @ts-ignore */}
            <div style={styles.grid}>
              {weeksInYear.map((week, weekIndex) => (
                <div key={weekIndex} style={styles.weekColumn}>
                  {week.map((day, dayIndex) => (
                    <div
                      style={{
                        ...styles.daySquare,
                        backgroundColor: getColor(day.count),
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-2 flex gap-2 items-center font-jsans justify-end pr-5">
        Less
        <div className="flex gap-2">
          {[2, 3, 5, 10].map((item, index) => {
            const color = getColor(item);
            return (
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  background: color,
                }}
                className={`rounded-sm`}
                key={index}
              ></div>
            );
          })}
        </div>
        More
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    width: "100%",
    border: "1px solid #e1e4e8",
  },
  header: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#333",
  },
  monthsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(52, 22.9px)",
    marginBottom: "10px",
    paddingLeft: "22px",
    // paddingRight: "22px",
  },
  monthLabel: {
    textAlign: "center",
    fontSize: "11px",
    marginRight: "5px",
    color: "#666",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
  },
  weekColumn: {
    display: "grid",
    gridTemplateRows: "repeat(7, 16px)",
    gridGap: "5px",
    marginRight: "5px",
  },
  daySquare: {
    width: "17.3px",
    height: "17.3px",
    borderRadius: "2px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  "@media (max-width: 768px)": {
    monthsRow: {
      gridTemplateColumns: "repeat(52, 12px)",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    weekColumn: {
      gridTemplateRows: "repeat(7, 12px)",
      gridGap: "2px",
      marginRight: "2px",
    },
    daySquare: {
      width: "10px",
      height: "10px",
    },
  },
};

export default ActivityDisplay;
