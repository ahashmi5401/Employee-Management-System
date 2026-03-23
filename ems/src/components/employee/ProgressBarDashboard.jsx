import { useEffect, useState } from "react";
import MyTaskData from "../../data/employee/MyTaskData";
import { auth, db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const ProgressList = () => {
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState([]);
  let currentUser = auth.currentUser;
  if (!currentUser) return;
  useEffect(() => {
    const refSub = ref(db, "submissions");
    const unSubs = onValue(refSub, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const subData = Object.entries(data)
          .filter(([_, val]) => val.employeeId === currentUser.uid)
          .map(([id, val]) => ({
            id,
            ...val,
          }));
        setSubmission(subData);
        setLoading(false);
      } else {
        setSubmission([]);
        setLoading(false);
      }
    });
    return () => unSubs();
  }, []);

  function progressColor (compeletion) {
    if(compeletion < 30) 'bg-red-500'
    else if(compeletion > 30 && compeletion  < 70)  'bg-orange-500'
    else if(compeletion === 100) 'bg-green-500'
    return 'bg-blue-500'
  }
  return (
    <div className="bg-zinc-900 mt-2 border border-zinc-800 rounded-2xl p-4">
      <div className="border-b border-zinc-800 pb-3 mb-4">
        <p className="text-white text-sm font-semibold">
          Task completion progress
        </p>
        <span className="text-zinc-500 text-xs">This month</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {submission.map(
          (
            { id, taskTitle, completion }, // ← sub → submissions, real fields
          ) => (
            <div key={id}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">{taskTitle}</span>
                <span className="text-zinc-400 font-medium">{completion}%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${progressColor(completion)} rounded-full`}
                  style={{ width: `${completion || 0}%` }}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default ProgressList;
