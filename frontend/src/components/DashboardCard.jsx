const DashboardCard = ({ title, value, note }) => (
  <div className="bg-white shadow-md md:shadow-xl rounded-lg md:rounded-2xl p-4 md:p-6 transition-transform duration-300 hover:scale-[1.02]">
    <h2 className="text-xs md:text-sm text-gray-500 mb-1">{title}</h2>
    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">{value}</p>
    {note && <p className="text-xs text-gray-400 mt-2">{note}</p>}
  </div>
);

export default DashboardCard;
