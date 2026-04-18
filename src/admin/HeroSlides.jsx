import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DEFAULT_SLIDES = [
  {
    id: 1,
    src: "/cor1.jpg",
    objectFit: "cover",
    objectPosition: "top center",
    borderRadius: "0px",
    heading: "Power When You Need It",
    sub: "Reliable torches and emergency lights for every home",
    btn: "SHOP NOW",
  },
  {
    id: 2,
    src: "/cor2.jpg",
    objectFit: "cover",
    objectPosition: "top center",
    borderRadius: "0px",
    heading: "Never Be Left in the Dark",
    sub: "Oreva — India's trusted lighting brand",
    btn: "EXPLORE",
  },
  {
    id: 3,
    src: "/cor3.jpg",
    objectFit: "cover",
    objectPosition: "top center",
    borderRadius: "0px",
    heading: "Built for Every Emergency",
    sub: "High brightness. Long backup. Durable design.",
    btn: "VIEW COLLECTION",
  },
];

const EMPTY = {
  src: "",
  objectFit: "cover",
  objectPosition: "top center",
  borderRadius: "0px",
  heading: "",
  sub: "",
  btn: "",
};

const FIELDS = [
  ["Heading", "heading"],
  ["Subtext", "sub"],
  ["Button Label", "btn"],
];

export default function HeroSlides() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleSave = () => {
    if (isNew) {
      setSlides((prev) => [...prev, { ...editing, id: Date.now() }]);
      toast.success("Slide added");
    } else {
      setSlides((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
      toast.success("Slide updated");
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id) => {
    if (slides.length <= 1) return toast.error("At least one slide is required.");
    if (confirm("Delete this slide?")) {
      setSlides((prev) => prev.filter((s) => s.id !== id));
      toast.success("Slide deleted");
    }
  };

  const move = (index, dir) => {
    const next = [...slides];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSlides(next);
  };

  if (editing) {
    return (
      <div>
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setEditing(null); setIsNew(false); }}
            className="text-[11px] text-gray-400 hover:text-[#cf2127] tracking-widest uppercase"
          >
            ← Back
          </button>
          <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">
            {isNew ? "Add Slide" : "Edit Slide"}
          </h1>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.map(([label, key]) => (
              <div key={key} className={key === "heading" || key === "sub" ? "md:col-span-2" : ""}>
                <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={editing[key] || ""}
                  onChange={(e) => setEditing((s) => ({ ...s, [key]: e.target.value }))}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127]"
                />
              </div>
            ))}

            {/* Image picker */}
            <div className="md:col-span-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">
                Slide Image
              </label>
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
                    const url = URL.createObjectURL(file);
                    setEditing((s) => ({ ...s, src: url }));
                    toast.success(`"${file.name}" selected`);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Live preview */}
          {editing.src && (
            <div className="mt-5">
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-2">Preview</p>
              <div className="relative w-full h-40 overflow-hidden rounded bg-gray-100">
                <img
                  src={editing.src}
                  alt="preview"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: editing.objectPosition }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55 flex flex-col items-center justify-center text-center px-4">
                  <p className="text-white font-bold text-sm drop-shadow">{editing.heading}</p>
                  <p className="text-white/80 text-xs mt-1 drop-shadow">{editing.sub}</p>
                  <span className="mt-2 bg-[#cc0000] text-white text-[10px] font-semibold tracking-widest px-4 py-1 rounded-full">
                    {editing.btn || "BUTTON"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-5">
            <button
              onClick={handleSave}
              className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-[#a01a1f] transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="border border-gray-200 text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">
          Hero Slides <span className="text-gray-400 font-normal text-base">({slides.length})</span>
        </h1>
        <button
          onClick={() => { setEditing({ ...EMPTY }); setIsNew(true); }}
          className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-[#a01a1f] transition-colors"
        >
          + Add Slide
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="bg-white border border-gray-100 shadow-sm flex items-center gap-4 p-4"
          >
            {/* Thumbnail */}
            <div className="w-24 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0 relative">
              <img
                src={slide.src}
                alt={slide.heading}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1a1a1a] text-sm truncate">{slide.heading}</p>
              <p className="text-gray-400 text-xs truncate mt-0.5">{slide.sub}</p>
              <span className="inline-block mt-1 bg-gray-100 text-gray-500 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                {slide.btn}
              </span>
            </div>

            {/* Order controls */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="text-gray-400 hover:text-[#cf2127] disabled:opacity-20 text-xs leading-none"
                title="Move up"
              >
                ▲
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === slides.length - 1}
                className="text-gray-400 hover:text-[#cf2127] disabled:opacity-20 text-xs leading-none"
                title="Move down"
              >
                ▼
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => setPreview(slide)}
                className="text-[11px] text-gray-400 font-bold hover:text-[#cf2127]"
              >
                Preview
              </button>
              <button
                onClick={() => setEditing({ ...slide })}
                className="text-[11px] text-[#cf2127] font-bold hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="text-[11px] text-gray-400 font-bold hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={preview.src}
              alt={preview.heading}
              className="w-full h-72 object-cover"
              style={{ objectPosition: preview.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55 flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-white text-2xl font-bold drop-shadow">{preview.heading}</h2>
              <p className="text-white/85 text-sm mt-2 drop-shadow">{preview.sub}</p>
              <button className="mt-4 bg-[#cc0000] text-white text-xs font-semibold tracking-widest px-6 py-2 rounded-full">
                {preview.btn}
              </button>
            </div>
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
