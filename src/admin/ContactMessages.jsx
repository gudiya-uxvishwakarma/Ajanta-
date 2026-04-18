import { useState } from "react";

const SUBJECT_COLORS = {
  "Order Inquiry": "bg-blue-50 text-blue-600",
  "Return / Exchange": "bg-amber-50 text-amber-600",
  "Product Question": "bg-purple-50 text-purple-600",
  "Warranty Claim": "bg-red-50 text-red-600",
  "Other": "bg-gray-100 text-gray-500",
};

export default function ContactMessages() {
  const [messages, setMessages] = useState(() =>
    JSON.parse(localStorage.getItem("ajanta_contact_msgs") || "[]")
  );
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const subjects = ["All", "Order Inquiry", "Return / Exchange", "Product Question", "Warranty Claim", "Other"];

  const filtered = filter === "All" ? messages : messages.filter(m => m.subject === filter);
  const unreadCount = messages.filter(m => !m.read).length;

  const markRead = (id) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(updated);
    localStorage.setItem("ajanta_contact_msgs", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this message?")) return;
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem("ajanta_contact_msgs", JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const handleOpen = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  };

  if (selected) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelected(null)} className="text-[11px] text-gray-400 hover:text-[#cf2127] tracking-widest uppercase">← Back</button>
          <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">Message</h1>
        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-6 max-w-2xl flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-black text-[#1a1a1a]">{selected.name}</p>
              <p className="text-sm text-gray-400">{selected.email}{selected.phone ? ` · ${selected.phone}` : ""}</p>
            </div>
            <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full shrink-0 ${SUBJECT_COLORS[selected.subject] || "bg-gray-100 text-gray-500"}`}>
              {selected.subject}
            </span>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-2">Message</p>
            <p className="text-sm text-[#1a1a1a] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
          </div>
          <p className="text-xs text-gray-300">{selected.date}</p>
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <a
              href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
              className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-[#a01a1f] transition-colors"
            >
              Reply via Email
            </a>
            <button onClick={() => handleDelete(selected.id)} className="border border-gray-200 text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">
          Contact Messages
          <span className="text-gray-400 font-normal text-base ml-2">({filtered.length})</span>
          {unreadCount > 0 && (
            <span className="ml-2 bg-[#cf2127] text-white text-[10px] font-black px-2 py-0.5 rounded-full">{unreadCount} new</span>
          )}
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full transition-colors ${
              filter === s ? "bg-[#cf2127] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-[#cf2127] hover:text-[#cf2127]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white border border-gray-100 shadow-sm divide-y divide-gray-50">
        {filtered.length === 0 && (
          <p className="px-6 py-12 text-center text-gray-400 text-sm">No messages yet.</p>
        )}
        {filtered.map(msg => (
          <div
            key={msg.id}
            onClick={() => handleOpen(msg)}
            className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${!msg.read ? "bg-red-50/30" : ""}`}
          >
            {/* Unread dot */}
            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!msg.read ? "bg-[#cf2127]" : "bg-transparent"}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-1">
                <p className={`text-sm ${!msg.read ? "font-black text-[#1a1a1a]" : "font-medium text-gray-700"}`}>{msg.name}</p>
                <span className="text-xs text-gray-300 shrink-0">{msg.date}</span>
              </div>
              <p className="text-xs text-gray-400 truncate">{msg.email}</p>
              <p className="text-xs text-gray-500 truncate mt-1">{msg.message}</p>
            </div>
            <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full shrink-0 ${SUBJECT_COLORS[msg.subject] || "bg-gray-100 text-gray-500"}`}>
              {msg.subject}
            </span>
            <button
              onClick={e => { e.stopPropagation(); handleDelete(msg.id); }}
              className="text-gray-300 hover:text-red-500 transition-colors text-sm shrink-0"
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
