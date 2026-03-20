import MyTaskData from "./MyTaskData";
const HistoryStats = [
  {
    id: 1,
    label: "Total Submissions",
    value: MyTaskData.length,
    color: "text-blue-400",
    msg: "All time",
  },
  {
    id: 2,
    label: "Approved",
    value: MyTaskData.filter((t) => t.status === "Completed").length,
    color: "text-green-400",
    msg: "▲ 62% rate",
  },
  {
    id: 3,
    label: "Rejected",
    value: MyTaskData.filter((t) => t.status === "Failed").length,
    color: "text-red-400",
    msg: "Needs revision",
  },
];

export default HistoryStats