export type Measurement = {
  inches: number;
  centimeters: number;
  pixels: number;
  points: number;
};

export type Dimensions = {
  fullCover: {
    width: Measurement;
    height: Measurement;
  };
  frontCover: {
    width: Measurement;
    height: Measurement;
  };
  spineWidth: Measurement;
};

export function MeasurementTable({
  measurements,
}: {
  measurements: Dimensions | null;
}) {
  const dimensions = measurements
    ? [
        {
          name: "Full Cover Width",
          measurements: {
            inches: measurements.fullCover.width.inches,
            centimeters: measurements.fullCover.width.centimeters,
            pixels: measurements.fullCover.width.pixels,
            points: measurements.fullCover.width.points,
          },
        },
        {
          name: "Full Cover Height",
          measurements: {
            inches: measurements.fullCover.height.inches,
            centimeters: measurements.fullCover.height.centimeters,
            pixels: measurements.fullCover.height.pixels,
            points: measurements.fullCover.height.points,
          },
        },
        {
          name: "Spine Width",
          measurements: {
            inches: measurements.spineWidth.inches,
            centimeters: measurements.spineWidth.centimeters,
            pixels: measurements.spineWidth.pixels,
            points: measurements.spineWidth.points,
          },
        },
      ]
    : [
        {
          name: "Full Cover Width",
          measurements: {
            inches: "-",
            centimeters: "-",
            pixels: "-",
            points: "-",
          },
        },
        {
          name: "Full Cover Height",
          measurements: {
            inches: "-",
            centimeters: "-",
            pixels: "-",
            points: "-",
          },
        },
        {
          name: "Spine Width",
          measurements: {
            inches: "-",
            centimeters: "-",
            pixels: "-",
            points: "-",
          },
        },
      ];

  return (
    <div className="max-w-full overflow-x-auto">
      <h3 className="text-xl font-bold   mb-3 flex text-gray-700 items-center gap-2">
        Cover Measurements
      </h3>
      <table
        style={{
          border: "1px solid #ccc",
        }}
        className="  kwt-table border light-border text-sm text-left rtl:text-right text-gray-500 rounded"
      >
        <thead className="text-xs text-gray-700 bg-gray-400 uppercase bg-gray-50 ">
          <tr>
            <th
              style={{
                padding: " 15px 8px ",
              }}
              className="px-1 md:px-1 py-3"
            >
              Measurements
            </th>
            <th
              style={{
                padding: " 15px 8px ",
              }}
              className="px-1 md:px-1 py-3"
            >
              Inches
            </th>
            <th
              style={{
                padding: " 15px 8px ",
              }}
              className="px-1 md:px-1 py-3"
            >
              Centimeters
            </th>
            <th
              style={{
                padding: " 15px 8px ",
              }}
              className="px-1 md:px-1 py-3"
            >
              Pixels
            </th>
            <th
              style={{
                padding: " 15px 8px ",
              }}
              className="px-1 md:px-1 py-3"
            >
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {dimensions.map((dimension) => (
            <tr className="bg-white border-b " key={dimension.name}>
              <td className="px-1 md:px-1 py-4">{dimension.name}</td>
              <td className="px-1 md:px-1 py-4">
                {typeof dimension.measurements.inches === "number"
                  ? dimension.measurements.inches.toFixed(2).toString()
                  : dimension.measurements.inches}
              </td>
              <td className="px-1 md:px-1 py-4">
                {typeof dimension.measurements.centimeters === "number"
                  ? dimension.measurements.centimeters.toFixed(2).toString()
                  : dimension.measurements.centimeters}
              </td>
              <td className="px-1 md:px-1 py-4">
                {typeof dimension.measurements.pixels === "number"
                  ? dimension.measurements.pixels.toFixed(2).toString()
                  : dimension.measurements.pixels}
              </td>
              <td className="px-1 md:px-1 py-4">
                {typeof dimension.measurements.points === "number"
                  ? dimension.measurements.points.toFixed(2).toString()
                  : dimension.measurements.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
