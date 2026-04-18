import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartCount, removeFromCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", payment: "cod" });
  const [placed, setPlaced] = useState(false);

  const total = cart.reduce((s, i) => s + (parseInt((i.price || "0").replace(/[^\d]/g, "")) * i.qty), 0);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-5 px-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-[22px] font-black text-[#1a1a1a] tracking-tight">Order Placed!</h2>
        <p className="text-[13px] text-gray-500 text-center max-w-sm">
          Thank you, <strong>{form.name}</strong>. Your order has been received and will be delivered to {form.city}.
        </p>
        <button onClick={() => navigate("/")} className="bg-[#cf2127] text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-[#a01a1f] transition-colors rounded-xl">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-[13px] tracking-widest uppercase">Your cart is empty</p>
        <button onClick={() => navigate("/shop")} className="bg-[#cf2127] text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-[#a01a1f] transition-colors rounded-xl">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fafafa] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-14 py-10">
        <h1 className="text-[24px] font-black text-[#1a1a1a] tracking-tight mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* Left — Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Shipping */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h2 className="text-[12px] font-black uppercase tracking-widest text-[#1a1a1a] mb-5">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Full Name", placeholder: "Your full name", col: 2 },
                  { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                  { name: "phone", label: "Phone", placeholder: "10-digit mobile number", type: "tel" },
                  { name: "address", label: "Address", placeholder: "House no, Street, Area", col: 2 },
                  { name: "city", label: "City", placeholder: "City" },
                  { name: "state", label: "State", placeholder: "State" },
                  { name: "pincode", label: "Pincode", placeholder: "6-digit pincode" },
                ].map(f => (
                  <div key={f.name} className={f.col === 2 ? "md:col-span-2" : ""}>
                    <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-1.5">{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type || "text"}
                      required
                      value={form[f.name]}
                      onChange={handle}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-200 px-4 py-2.5 text-[13px] outline-none focus:border-[#cf2127] transition-colors rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h2 className="text-[12px] font-black uppercase tracking-widest text-[#1a1a1a] mb-5">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {[
                  { value: "cod", label: "Cash on Delivery", icon: "💵" },
                  { value: "upi", label: "UPI / GPay / PhonePe", icon: "📱" },
                  { value: "card", label: "Credit / Debit Card", icon: "💳" },
                ].map(opt => (
                  <label key={opt.value} className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all ${form.payment === opt.value ? "border-[#cf2127] bg-red-50" : "border-gray-100 hover:border-gray-300"}`}>
                    <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={handle} className="accent-[#cf2127]" />
                    <span className="text-lg">{opt.icon}</span>
                    <span className="text-[13px] font-semibold text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-[#cf2127] text-white py-4 text-[12px] font-black tracking-widest uppercase rounded-xl hover:bg-[#a01a1f] transition-colors shadow-lg shadow-red-100">
              Place Order · ₹{total.toLocaleString("en-IN")}
            </button>
          </form>

          {/* Right — Order Summary */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit sticky top-6">
            <h2 className="text-[12px] font-black uppercase tracking-widest text-[#1a1a1a] mb-5">Order Summary ({cartCount})</h2>
            <div className="flex flex-col gap-4 mb-5">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <img src={item.img} alt={item.title} className="w-14 h-14 object-cover bg-gray-100 rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#1a1a1a] line-clamp-2">{item.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Qty: {item.qty}</p>
                    <p className="text-[12px] text-[#cf2127] font-bold mt-0.5">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-[12px] text-gray-500">
                <span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[12px] text-gray-500">
                <span>Shipping</span><span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-[14px] font-black text-[#1a1a1a] mt-1 pt-2 border-t border-gray-100">
                <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
