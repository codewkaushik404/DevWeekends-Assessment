export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-36 bg-white border border-zinc-200 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}

export function DisconnectedState({ fetchNotes }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
        <svg
          className="w-6 h-6 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M6.343 17.657a9 9 0 010-12.728M9.172 14.828a5 5 0 010-7.072M12 12h.01"
          />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-zinc-700">
          Could not connect to backend
        </p>

        <p className="text-xs text-zinc-400 mt-1">
          Make sure your server is running on{" "}
          <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">
            localhost:5000
          </code>
        </p>
      </div>

      <button
        onClick={fetchNotes}
        className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

export function EmptyState({ setModalState }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
        <svg
          className="w-6 h-6 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-zinc-700">
          No notes yet
        </p>

        <p className="text-xs text-zinc-400 mt-1">
          Create your first note to get started
        </p>
      </div>

      <button
        onClick={() => setModalState({ mode: "create" })}
        className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors"
      >
        Create note
      </button>
    </div>
  );
}

export function SearchEmpty({ search }) {
  return (
    <div className="text-center py-16">
      <p className="text-sm text-zinc-400">
        No notes match "{search}"
      </p>
    </div>
  );
}