function Grid({ games, search, selected, setSelected, isSearching }) {
  // const list = isSearching ? search : games;
  const list = search;

  const toggleSelect = (game) => {
    const isSelected = selected.some((g) => g.id === game.id);
    if (isSelected) {
      setSelected(selected.filter((g) => g.id !== game.id));
    } else {
      setSelected([...selected, game]);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {list.length === 0 && (
        <p className="text-slate-400 italic text-center  text-sm w-full col-span-full">
          I dont have this game yet.
        </p>
      )}
      {list.map((game) => {
        const isSelected = selected.some((g) => g.id === game.id);
        return (
          <div
            key={game.id}
            onClick={() => toggleSelect(game)}
            className={`relative rounded-xl overflow-hidden border ${
              isSelected ? "border-indigo-500 shadow-lg" : "border-slate-500"
            }  backdrop-blur-md transition-all duration-350 hover:scale-[1.1]`}
          >
            <div className="absolute top-3 right-3 z-10  p-1 rounded-md">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelect(game)}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="aspect-[4/5]">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 text-center">
              <h2 className="text-sm font-semibold text-slate-200">
                {game.title}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
