import StatusBadge from "./StatusBadge";

const EntryTable = ({ entries }) => {
  return (
    <div className="overflow-auto bg-white shadow-xl rounded-2xl">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100">
            {[
              "App ID",
              "Date",
              "Name",
              "Mobile No",
              "Qty",
              "Particulars",
              "Invoice No",
              "Invoice Date",
              "Repair Amount",
              "Repair Date",
              "Out Date",
              "Out Particulars",
              "Remarks",
              "Status",
            ].map((head) => (
              <th key={head} className="px-4 py-2 whitespace-nowrap">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={e._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">elec{String(i + 1).padStart(5, "0")}</td>
              <td className="px-4 py-2">{e.date}</td>
              <td className="px-4 py-2">{e.name}</td>
              <td className="px-4 py-2">{e.mobile}</td>
              <td className="px-4 py-2">{e.qty}</td>
              <td className="px-4 py-2">{e.particulars}</td>
              <td className="px-4 py-2">{e.inNo}</td>
              <td className="px-4 py-2">{e.inDate}</td>
              <td className="px-4 py-2">₹{e.totalAmount}</td>
              <td className="px-4 py-2">{e.repairDate || "-"}</td>
              <td className="px-4 py-2">{e.outDate || "-"}</td>
              <td className="px-4 py-2">{e.outParticulars || "-"}</td>
              <td className="px-4 py-2">{e.remarks || "-"}</td>
              <td className="px-4 py-2">
                <StatusBadge status={e.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntryTable;