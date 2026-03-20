import performanceData from "../../data/employee/PerformaceData";

const PerformanceBarProfile = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl flex-1 p-5">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-3 mb-4">
        <h2 className="text-white text-sm font-semibold">Performance</h2>
        <span className="text-zinc-500 text-xs">Based on your tasks</span>
      </div>

      {/* Progress bars */}
      <div className="flex flex-col gap-4">
        {performanceData.map(({ label, value, color, textColor }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-zinc-400 text-xs">{label}</span>
              <span className={`${textColor} text-xs font-semibold`}>
                {value}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceBarProfile;
