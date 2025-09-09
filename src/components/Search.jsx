import { useEffect, useState } from "react";

const labels = ["PlayStation 4", "PlayStation 5", "Xbox 360"];

function Search({ games, setSearch, setIsSearching }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(labels[0]);

  const handleCategoryclick = (currentCategory) => {
    setCat(currentCategory);
  };

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();

    const filtered = games.filter((game) => {
      const matchesCategory = game.platform === cat;
      const matchesQuery = game.title.toLowerCase().includes(trimmed);
      return matchesCategory && (trimmed === "" || matchesQuery);
    });

    console.log(filtered);

    setSearch(filtered);
    setIsSearching(trimmed !== "");
  }, [query, cat, games, setSearch, setIsSearching]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto ">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search for a game..."
        className="w-full px-4 py-2 rounded-md border border-slate-600 text-slate-200 placeholder-slate-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <div className="flex gap-4 items-center justify-between">
        {labels.map((label) => (
          <StyledLabel
            key={label}
            isCurrentCategory={label == cat}
            onClick={() => handleCategoryclick(label)}
          >
            {label}
          </StyledLabel>
        ))}
      </div>
    </div>
  );
}

export default Search;

function StyledLabel({ children, isCurrentCategory, onClick }) {
  return (
    <span
      className={`text-sm font-semibold text-blue-600  px-2 py-1 rounded-md shadow-sm ${
        isCurrentCategory && "bg-blue-500 text-white"
      } `}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
