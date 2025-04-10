const SearchBar = ({ search, setSearch }) => (
    <input
      type="text"
      placeholder="Search records..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full mb-4 p-3 rounded-xl border border-gray-300"
    />
  );
  export default SearchBar;