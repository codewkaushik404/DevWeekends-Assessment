import { useState, useEffect, useCallback } from "react";

import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import Toast from "./components/Toast";

import {
  LoadingSkeleton,
  DisconnectedState,
  EmptyState,
  SearchEmpty,
} from "./components/NotesStates";

import { api } from "./services/api";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [connected, setConnected] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const fetchNotes = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api("GET", "/api/notes");

      setNotes(res.data || []);
      setConnected(true);
    } catch (e) {
      setConnected(false);
      showToast(
        "Cannot connect to API: " + e.message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreate = async (data) => {
    setSaving(true);

    try {
      await api("POST", "/api/notes", data);

      showToast("Note created!");

      setModalState(null);

      fetchNotes();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (data) => {
    setSaving(true);

    try {
      await api(
        "PUT",
        "/api/notes/" + modalState.note.id,
        data
      );

      showToast("Note updated!");

      setModalState(null);

      fetchNotes();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api("DELETE", "/api/notes/" + id);

      showToast("Note deleted");

      fetchNotes();
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  const handleTogglePin = async (note) => {
    try {
      await api(
        "PUT",
        "/api/notes/" + (note.id || note._id),
        {
          title: note.title,
          content: note.content,
          pinned: !note.pinned,
        }
      );

      showToast(
        note.pinned
          ? "Note unpinned"
          : "Note pinned"
      );

      fetchNotes();
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  const filtered = notes.filter(
    (n) =>
      n.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      n.content
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const pinned = filtered.filter(
    (n) => n.pinned
  );

  const unpinned = filtered.filter(
    (n) => !n.pinned
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Header
        search={search}
        setSearch={setSearch}
        connected={connected}
        notes={notes}
        loading={loading}
        fetchNotes={fetchNotes}
        setModalState={setModalState}
      />

      <main className="max-w-5xl mx-auto px-6 py-8">
        {loading && notes.length === 0 && (
          <LoadingSkeleton />
        )}

        {!loading &&
          connected === false && (
            <DisconnectedState
              fetchNotes={fetchNotes}
            />
          )}

        {!loading &&
          connected === true &&
          notes.length === 0 && (
            <EmptyState
              setModalState={setModalState}
            />
          )}

        {!loading &&
          connected === true &&
          notes.length > 0 &&
          filtered.length === 0 && (
            <SearchEmpty search={search} />
          )}

        {pinned.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
              </svg>

              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Pinned
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {pinned.map((note) => (
                <NoteCard
                  key={note._id || note.id}
                  note={{
                    ...note,
                    id:
                      note._id || note.id,
                  }}
                  onEdit={(n) =>
                    setModalState({
                      mode: "edit",
                      note: n,
                    })
                  }
                  onDelete={handleDelete}
                  onTogglePin={
                    handleTogglePin
                  }
                />
              ))}
            </div>
          </section>
        )}

        {unpinned.length > 0 && (
          <section>
            {pinned.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  All notes
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {unpinned.map((note) => (
                <NoteCard
                  key={note._id || note.id}
                  note={{
                    ...note,
                    id:
                      note._id || note.id,
                  }}
                  onEdit={(n) =>
                    setModalState({
                      mode: "edit",
                      note: n,
                    })
                  }
                  onDelete={handleDelete}
                  onTogglePin={
                    handleTogglePin
                  }
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {modalState && (
        <NoteModal
          note={
            modalState.mode === "edit"
              ? modalState.note
              : null
          }
          onClose={() =>
            setModalState(null)
          }
          onSave={
            modalState.mode === "edit"
              ? handleEdit
              : handleCreate
          }
          loading={saving}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}