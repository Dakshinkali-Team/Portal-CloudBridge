const ProgressBar = ({
  label,
  value,
  color = "bg-blue-500",
}) => {
  return (
    <div className="space-y-2">

      <div className="flex items-center justify-between">

        <span className="text-sm text-slate-700 font-medium">
          {label}
        </span>

        <span className="text-sm text-slate-500">
          {value}%
        </span>

      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
};

export default ProgressBar;