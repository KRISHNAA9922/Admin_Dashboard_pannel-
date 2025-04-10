import React, { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";
import EntryTable from "../components/EntryTable";
import SearchBar from "../components/SearchBar";
import AddRecordModal from "../components/AddRecordModal";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({
    totalRecords: 0,
    completedRepairs: 0,
    totalRevenue: 0,
    avgRevenue: 0,
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const [entriesRes, statsRes] = await Promise.all([
        api.getEntries(),
        api.getStats(),
      ]);
      setEntries(entriesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = entries.filter((entry) =>
    entry.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen w-full max-w-[calc(100%-16rem)] flex flex-col gap-4 md:gap-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Electronics Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition duration-200 font-medium w-full sm:w-auto"
          >
            + Add New Record
          </button>
          <button
            onClick={() => {
              const headers = [
                "Name",
                "Mobile",
                "Date",
                "Particulars",
                "Quantity",
                "Total Amount",
                "Paid Amount",
                "Status",
              ];
              const csvContent = [
                headers.join(","),
                ...filtered.map((entry) =>
                  [
                    `"${entry.name}"`,
                    `"${entry.mobile}"`,
                    `"${entry.date}"`,
                    `"${entry.particulars}"`,
                    `"${entry.qty}"`,
                    `"${entry.totalAmount}"`,
                    `"${entry.paidAmount}"`,
                    `"${entry.status}"`,
                  ].join(",")
                ),
              ].join("\n");

              const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "dashboard_entries.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 font-medium w-full sm:w-auto"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <DashboardCard
          title="Total Records"
          value={stats.totalRecords}
          className="bg-white shadow-md rounded-lg p-4"
        />
        <DashboardCard
          title="Completed Repairs"
          value={stats.completedRepairs}
          note={`${
            Math.round((stats.completedRepairs / stats.totalRecords) * 100) || 0
          }% of total`}
          className="bg-white shadow-md rounded-lg p-4"
        />
        <DashboardCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          note={`Avg: ₹${stats.avgRevenue}`}
          className="bg-white shadow-md rounded-lg p-4"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1">
              📋 Entry Records
            </h3>
            <p className="text-sm text-gray-500">
              Search and view all service entries
            </p>
          </div>
          <div className="sm:w-64 w-full">
            <SearchBar
              search={search}
              setSearch={setSearch}
              placeholder="Search by name..."
            />
          </div>
        </div>

        <div className="w-full">
          {filtered.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <EntryTable entries={filtered} />
            </div>
          ) : (
            <div className="w-full h-36 flex items-center justify-center text-gray-500 italic bg-gray-50 rounded-xl">
              No matching records found.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddRecordModal
          onClose={() => setShowModal(false)}
          fetchEntries={fetchData}
        />
      )}
    </div>
  );
};

export default Dashboard;