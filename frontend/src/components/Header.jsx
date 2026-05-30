export default function Header({
  search,
  setSearch,
  connected,
  notes,
  loading,
  fetchNotes,
  setModalState,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900 tracking-tight">Notes</span>
          </div>
 
          {/* Search */}
          <div className="flex-1 relative max-w-sm">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes…"
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-zinc-100 border border-transparent rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-300 transition-all"
            />
          </div>
 
          <div className="ml-auto flex items-center gap-3">
            {/* Status dot */}
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${connected === true ? "bg-emerald-500" : connected === false ? "bg-red-500" : "bg-zinc-300"}`} />
              <span className="text-xs text-zinc-400 hidden sm:block">
                {connected === true ? `${notes.length} notes` : connected === false ? "Disconnected" : "Connecting…"}
              </span>
            </div>
 
            <button
              onClick={fetchNotes}
              disabled={loading}
              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-40"
              title="Refresh"
            >
              <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
 
            <button
              onClick={() => setModalState({ mode: "create" })}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
              New note
            </button>
          </div>
        </div>
      </header>
  );
}