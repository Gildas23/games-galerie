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

  const handleOrder = () => {
    const phone = import.meta.env.VITE_GAME_CONTACT;
    const message = selected.map((g, i) => `${i + 1}. ${g.title}`).join("\n");
    const encoded = encodeURIComponent(
      `Salutation, J'aimerais commander un jailbreak et ces quelque jeux pour ma console:\n\n${message}`
    );
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative w-full  pb-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {list.length === 0 && (
          <p className="text-slate-400 italic text-center text-sm w-full col-span-full">
            Aucun jeu trouvé. Essayez une autre recherche ou revenez plus tard.
          </p>
        )}

        {list.map((game, i) => {
          const isSelected = selected.some((g) => g.id === game.id);
          return (
            <div
              key={`${game.id}_${i}`}
              onClick={() => toggleSelect(game)}
              className={`group relative rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
                isSelected ? "border-indigo-500 shadow-lg" : "border-slate-600"
              } bg-slate-800/60 backdrop-blur-md`}
            >
              <div className="absolute top-3 right-3 z-10 p-1 rounded-md bg-slate-900/70">
                <label
                  className="flex items-center gap-1 cursor-pointer"
                  title="Sélectionner ce jeu"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(game)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 accent-indigo-500"
                    aria-label={`Sélectionner ${game.title}`}
                  />
                </label>
              </div>

              <div className="aspect-[4/5] relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              <div className="p-3 text-center">
                <h2 className="text-base font-semibold text-slate-100 group-hover:text-indigo-400 transition">
                  {game.title}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-1 left-1 w-full px-4 z-50 flex justify-center items-center">
          <button
            onClick={handleOrder}
            className="w-[60%] lg:w-[20%] py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition"
            aria-label="Commander les jeux sélectionnés"
          >
            Commander les jeux sélectionnés
          </button>
        </div>
      )}
    </div>
  );
}

export default Grid;
