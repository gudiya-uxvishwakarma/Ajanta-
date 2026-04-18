import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// ── default data ──────────────────────────────────────────────
const DEFAULT_PANELS = [
  { id: 1, label: "Panel 1", width: "25%", caption: "", captionSub: "", src: "" },
  { id: 2, label: "Panel 2", width: "35%", caption: "AJANTA QUARTZ", captionSub: "Trusted Since 1983", src: "" },
  {
    id: 3, label: "Panel 3", width: "flex-1", caption: "New Collection", captionSub: "Precision\nBy Nature",
    btn1Label: "SHOP TORCHES", btn1Link: "/shop?filter=hand-torch",
    btn2Label: "SHOP CLOCKS",  btn2Link: "/shop?filter=clock",
    src: "",
  },
];

const DEFAULT_CATS = [
  { id: 1, label: "Hand Torches",     to: "/shop?filter=hand-torch",      bg: "#6b7280", img: "/image copy 15.png" },
  { id: 2, label: "Clocks",           to: "/shop?filter=clock",           bg: "#78716c", img: "/image copy 27.png" },
  { id: 3, label: "Emergency Lights", to: "/shop?filter=emergency-light", bg: "#a8a29e", img: "/image copy 23.png" },
  { id: 4, label: "Home Appliances",  to: "/shop?filter=home-appliance",  bg: "#374151", img: "/image copy 25.png" },
];

// ── helpers ───────────────────────────────────────────────────
function FilePicker({ onPick, label = "Choose Video/Image" }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer w-fit">
      <span className="border border-gray-200 px-4 py-2 text-[11px] font-bold tracking-widest uppercase text-gray-600 hover:border-[#cf2127] hover:text-[#cf2127] transition-colors">
        {label}
      </span>
      <input
        type="file"
        accept="video/*,image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          onPick(URL.createObjectURL(file), file.name);
        }}
      />
    </label>
  );
}

function ImagePicker({ onPick }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer w-fit">
      <span className="border border-gray-200 px-4 py-2 text-[11px] font-bold tracking-widest uppercase text-gray-600 hover:border-[#cf2127] hover:text-[#cf2127] transition-colors">
        Choose Image
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          onPick(URL.createObjectURL(file), file.name);
        }}
      />
    </label>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127]"
      />
    </div>
  );
}

// ── tabs ──────────────────────────────────────────────────────
const TABS = ["Video Banner", "Category Cards"];

export default function HomeSections() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight mb-6">Home Sections</h1>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 border-b border-gray-100">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-5 py-2.5 text-[11px] font-black tracking-widest uppercase transition-colors ${
              tab === i
                ? "border-b-2 border-[#cf2127] text-[#cf2127]"
                : "text-gray-400 hover:text-[#1a1a1a]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && <VideoBannerEditor />}
      {tab === 1 && <CategoryCardsEditor />}
    </div>
  );
}

// ── Video Banner Editor ───────────────────────────────────────
function VideoBannerEditor() {
  const [panels, setPanels] = useState(DEFAULT_PANELS);
  const [editing, setEditing] = useState(null);

  const update = (id, key, val) =>
    setPanels((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: val } : p)));

  const handleSave = () => {
    setPanels((prev) => prev.map((p) => (p.id === editing.id ? editing : p)));
    toast.success("Panel saved");
    setEditing(null);
  };

  if (editing) {
    const isVideo = (src) => src && (src.startsWith("blob:") || src.endsWith(".mp4") || src.endsWith(".webm"));

    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setEditing(null)} className="text-[11px] text-gray-400 hover:text-[#cf2127] tracking-widest uppercase">
            ← Back
          </button>
          <h2 className="text-lg font-black text-[#1a1a1a]">Edit {editing.label}</h2>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm p-6 max-w-2xl flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Video / Image</label>
            <FilePicker
              onPick={(url, name) => {
                setEditing((p) => ({ ...p, src: url }));
                toast.success(`"${name}" selected`);
              }}
            />
            {editing.src && (
              <div className="mt-3 w-full h-32 rounded overflow-hidden bg-gray-100">
                {isVideo(editing.src)
                  ? <video src={editing.src} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                  : <img src={editing.src} className="w-full h-full object-cover" alt="preview" />
                }
              </div>
            )}
          </div>

          {editing.id !== 1 && (
            <>
              <Field label="Caption" value={editing.caption} onChange={(v) => setEditing((p) => ({ ...p, caption: v }))} />
              <Field label="Caption Sub" value={editing.captionSub} onChange={(v) => setEditing((p) => ({ ...p, captionSub: v }))} />
            </>
          )}

          {editing.id === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Button 1 Label" value={editing.btn1Label} onChange={(v) => setEditing((p) => ({ ...p, btn1Label: v }))} />
              <Field label="Button 1 Link"  value={editing.btn1Link}  onChange={(v) => setEditing((p) => ({ ...p, btn1Link: v }))} />
              <Field label="Button 2 Label" value={editing.btn2Label} onChange={(v) => setEditing((p) => ({ ...p, btn2Label: v }))} />
              <Field label="Button 2 Link"  value={editing.btn2Link}  onChange={(v) => setEditing((p) => ({ ...p, btn2Link: v }))} />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-[#a01a1f] transition-colors">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="border border-gray-200 text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {panels.map((panel) => (
        <div key={panel.id} className="bg-white border border-gray-100 shadow-sm flex items-center gap-4 p-4">
          {/* Thumbnail */}
          <div className="w-24 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
            {panel.src
              ? panel.src.endsWith(".mp4") || panel.src.startsWith("blob:")
                ? <video src={panel.src} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                : <img src={panel.src} className="w-full h-full object-cover" alt={panel.label} />
              : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No media</div>
            }
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#1a1a1a] text-sm">{panel.label}</p>
            {panel.caption && <p className="text-gray-400 text-xs mt-0.5 truncate">{panel.caption}</p>}
            <span className="text-[10px] text-gray-300 font-mono">width: {panel.width}</span>
          </div>

          <button
            onClick={() => setEditing({ ...panel })}
            className="text-[11px] text-[#cf2127] font-bold hover:underline flex-shrink-0"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Category Cards Editor ─────────────────────────────────────
function CategoryCardsEditor() {
  const [cats, setCats] = useState(DEFAULT_CATS);
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = () => {
    if (isNew) {
      setCats((prev) => [...prev, { ...editing, id: Date.now() }]);
      toast.success("Category added");
    } else {
      setCats((prev) => prev.map((c) => (c.id === editing.id ? editing : c)));
      toast.success("Category saved");
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this category card?")) {
      setCats((prev) => prev.filter((c) => c.id !== id));
      toast.success("Category deleted");
    }
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-[11px] text-gray-400 hover:text-[#cf2127] tracking-widest uppercase">
            ← Back
          </button>
          <h2 className="text-lg font-black text-[#1a1a1a]">{isNew ? "Add Category" : "Edit Category"}</h2>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm p-6 max-w-xl flex flex-col gap-4">
          <Field label="Label" value={editing.label} onChange={(v) => setEditing((c) => ({ ...c, label: v }))} />
          <Field label="Shop Link" value={editing.to} onChange={(v) => setEditing((c) => ({ ...c, to: v }))} placeholder="/shop?filter=..." />

          <div>
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={editing.bg}
                onChange={(e) => setEditing((c) => ({ ...c, bg: e.target.value }))}
                className="w-10 h-10 border border-gray-200 cursor-pointer rounded"
              />
              <span className="text-sm text-gray-500 font-mono">{editing.bg}</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Card Image</label>
            <ImagePicker
              onPick={(url, name) => {
                setEditing((c) => ({ ...c, img: url }));
                toast.success(`"${name}" selected`);
              }}
            />
            {editing.img && (
              <div className="mt-3 w-32 h-32 rounded overflow-hidden bg-gray-100">
                <img src={editing.img} className="w-full h-full object-contain p-2" alt="preview" />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-[#a01a1f] transition-colors">
              Save
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="border border-gray-200 text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => { setEditing({ id: null, label: "", to: "", bg: "#6b7280", img: "" }); setIsNew(true); }}
          className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-[#a01a1f] transition-colors"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cats.map((cat) => (
          <div key={cat.id} className="bg-white border border-gray-100 shadow-sm flex items-center gap-4 p-4">
            <div
              className="w-16 h-16 rounded overflow-hidden flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: cat.bg }}
            >
              {cat.img
                ? <img src={cat.img} className="w-full h-full object-contain p-1" alt={cat.label} />
                : <span className="text-white/40 text-xs">No img</span>
              }
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1a1a1a] text-sm">{cat.label}</p>
              <p className="text-gray-400 text-xs truncate mt-0.5">{cat.to}</p>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              <button onClick={() => setEditing({ ...cat })} className="text-[11px] text-[#cf2127] font-bold hover:underline">Edit</button>
              <button onClick={() => handleDelete(cat.id)} className="text-[11px] text-gray-400 font-bold hover:text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
