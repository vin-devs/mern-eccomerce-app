import { FaCheck } from "react-icons/fa";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center w-full max-w-2xl mx-auto my-10 px-4">
      {/* Step 1: Login */}
      <div className="flex flex-col items-center relative flex-1">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
            step1
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "bg-slate-900 border-slate-700 text-slate-500"
          }`}
        >
          {step1 ? <FaCheck size={12} /> : "1"}
        </div>
        <span
          className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${step1 ? "text-indigo-400" : "text-slate-500"}`}
        >
          Login
        </span>
      </div>

      {/* Line between 1 and 2 */}
      <div
        className={`h-[2px] flex-1 mx-[-10px] mb-6 transition-all ${step2 ? "bg-indigo-600" : "bg-slate-800"}`}
      />

      {/* Step 2: Shipping */}
      <div className="flex flex-col items-center relative flex-1">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
            step2
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "bg-slate-900 border-slate-700 text-slate-500"
          }`}
        >
          {step2 ? <FaCheck size={12} /> : "2"}
        </div>
        <span
          className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${step2 ? "text-indigo-400" : "text-slate-500"}`}
        >
          Shipping
        </span>
      </div>

      {/* Line between 2 and 3 */}
      <div
        className={`h-[2px] flex-1 mx-[-10px] mb-6 transition-all ${step3 ? "bg-indigo-600" : "bg-slate-800"}`}
      />

      {/* Step 3: Summary */}
      <div className="flex flex-col items-center relative flex-1">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
            step3
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "bg-slate-900 border-slate-700 text-slate-500"
          }`}
        >
          {step3 ? <FaCheck size={12} /> : "3"}
        </div>
        <span
          className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${step3 ? "text-indigo-400" : "text-slate-500"}`}
        >
          Summary
        </span>
      </div>
    </div>
  );
};

export default ProgressSteps;
