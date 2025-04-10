const StatusBadge = ({ status }) => {
    const color = status === "Completed" ? "green" : "yellow";
    return (
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800`}
      >
        {status || "Pending"}
      </span>
    );
  };
  export default StatusBadge;