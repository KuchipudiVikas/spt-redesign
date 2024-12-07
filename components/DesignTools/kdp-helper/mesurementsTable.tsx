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
  measurements
}: {
  measurements: Dimensions | null;
}) {
  if (!measurements) {
    return null;
  }

  const dimensions = [
    {
      name: "Full Cover Width",
      measurements: {
        inches: measurements.fullCover.width.inches,
        centimeters: measurements.fullCover.width.centimeters,
        pixels: measurements.fullCover.width.pixels,
        points: measurements.fullCover.width.points
      }
    },
    {
      name: "Full Cover Height",
      measurements: {
        inches: measurements.fullCover.height.inches,
        centimeters: measurements.fullCover.height.centimeters,
        pixels: measurements.fullCover.height.pixels,
        points: measurements.fullCover.height.points
      }
    },
    {
      name: "Spine Width",
      measurements: {
        inches: measurements.spineWidth.inches,
        centimeters: measurements.spineWidth.centimeters,
        pixels: measurements.spineWidth.pixels,
        points: measurements.spineWidth.points
      }
    }
  ];

  return (
    <div className="">
      <h3 className="text-xl font-Inter mb-1.5 flex text-gray-700 items-center gap-2">
        Measurements
      </h3>
      <table
        style={{
          border: "1px solid #e2e8f0"
        }}
        className=" max-w-full border text-sm text-left rtl:text-right text-gray-500 rounded">
        <thead className="text-xs text-gray-700 bg-gray-400 uppercase bg-gray-50 ">
          <tr>
            <th className="px-1 md:px-6 py-3">Measurements</th>
            <th className="px-1 md:px-6 py-3">Inches</th>
            <th className="px-1 md:px-6 py-3">Centimeters</th>
            <th className="px-1 md:px-6 py-3">Pixels</th>
            <th className="px-1 md:px-6 py-3">Points</th>
          </tr>
        </thead>
        <tbody>
          {dimensions.map((dimension) => (
            <tr className="bg-white border-b " key={dimension.name}>
              <td className="px-1 md:px-6 py-4">{dimension.name}</td>
              <td className="px-1 md:px-6 py-4">
                {dimension.measurements.inches.toFixed(3)}
              </td>
              <td className="px-1 md:px-6 py-4">
                {dimension.measurements.centimeters.toFixed(3)}
              </td>
              <td className="px-1 md:px-6 py-4">
                {dimension.measurements.pixels.toFixed()}
              </td>
              <td className="px-1 md:px-6 py-4">
                {dimension.measurements.points.toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
