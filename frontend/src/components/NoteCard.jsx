import { useState } from "react";
import {formatDate} from "../utils/formatDate.js"

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const [deleting, setDeleting] = useState(false);
  const [pinning, setPinning] = useState(false);
 
  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    setDeleting(true);
    await onDelete(note.id || note._id);
    setDeleting(false);
  };
 
  const handlePin = async () => {
    setPinning(true);
    await onTogglePin(note);
    setPinning(false);
  };
 
  return (
    <div className={`group relative flex flex-col bg-white rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
      ${note.pinned ? "border-zinc-400 shadow-sm" : "border-zinc-200"}`}
    >
      {note.pinned && (
        <div className="absolute -top-2 right-3">
          <span className="inline-flex items-center gap-1 bg-zinc-900 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>
            pinned
          </span>
        </div>
      )}
 
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2">{note.title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-4 flex-1">{note.content}</p>
        <p className="text-[11px] text-zinc-400 mt-1">{formatDate(note.createdAt || note.created_At)}</p>
      </div>
 
      <div className="px-4 pb-3 flex items-center gap-1.5 border-t border-zinc-100 pt-3">
        <button
          onClick={handlePin}
          disabled={pinning}
          title={note.pinned ? "Unpin" : "Pin"}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors disabled:opacity-40"
        >
          {pinning ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          )}
          {note.pinned ? "Unpin" : "Pin"}
        </button>
 
        <button
          onClick={() => onEdit(note)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          Edit
        </button>
 
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="ml-auto flex items-center justify-center w-7 h-7 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
        >
          {deleting ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}