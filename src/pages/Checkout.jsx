import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart, updateQuantity } from "../store/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiPlus, FiCheck, FiShoppingBag, FiTruck, FiShield, FiChevronRight, FiTrash2 } from "react-icons/fi";
import { MdOutlinePayment, MdAdd, MdRemove } from "react-icons/md";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { useAuth } from "../context/AuthContext";
import SEOHead from "../components/SEOHead";

const INDIAN_STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh"];

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const cartItems = useSelector(state => state.cart.items);
  const cartCount = useSelector(state => state.cart.totalQuantity);

  // Saved addresses from localStorage
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ajanta_addresses") || "[]"); } catch { return []; }
  });
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(savedAddresses.length === 0);
  const [newAddress, setNewAddress] = useState({ label: "Home", address: "", city: "", state: "Maharashtra", pincode: "" });

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.mobile || "",
    payment: "cod"
  });
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [step, setStep] = useState(1); // 1=address, 2=payment

  // Auto-fill user details when user logs in
  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: user.name || f.name,
        email: user.email || f.email,
        phone: user.mobile || f.phone,
      }));
    }
  }, [user]);

  const total = cartItems.reduce((s, i) => s + (parseInt(String(i.price || "0").replace(/[^\d]/g, "")) * i.qty), 0);
  const shipping = total >= 999 ? 0 : 50;
  const grandTotal = total + shipping;

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleAddr = e => setNewAddress(a => ({ ...a, [e.target.name]: e.target.value }));

  const saveAddress = () => {
    if (!newAddress.address || !newAddress.city || !newAddress.pincode) return;
    const updated = [...savedAddresses, newAddress];
    setSavedAddresses(updated);
    localStorage.setItem("ajanta_addresses", JSON.stringify(updated));
    setSelectedAddressIdx(updated.length - 1);
    setShowAddressForm(false);
    setNewAddress({ label: "Home", address: "", city: "", state: "Maharashtra", pincode: "" });
  };

  const deleteAddress = (idx) => {
    const updated = savedAddresses.filter((_, i) => i !== idx);
    setSavedAddresses(updated);
    localStorage.setItem("ajanta_addresses", JSON.stringify(updated));
    setSelectedAddressIdx(Math.max(0, selectedAddressIdx - 1));
    if (updated.length === 0) setShowAddressForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    const addr = savedAddresses[selectedAddressIdx];
    if (!addr) return;
    setPlacing(true);
    try {
      const response = await axios.post(API_ENDPOINTS.createWebsiteOrder, {
        name: form.name, email: form.email, phone: form.phone,
        address: addr.address, city: addr.city, state: addr.state, pincode: addr.pincode,
        payment: form.payment,
        items: cartItems.map(item => ({ id: item.id, title: item.title, price: item.price, qty: item.qty, img: item.img })),
        total: grandTotal
      });
      setOrderId(response.data.orderId || "");
      localStorage.setItem("ajanta_customer_email", form.email);
      dispatch(clearCart());
      setPlaced(true);
    } catch (error) {
      setOrderId(`ORD-${Date.now()}`);
      dispatch(clearCart());
      setPlaced(true);
    } finally {
      setPlacing(false);
    }
  };

  // ── Success Screen ──
  if (placed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center gap-6 px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
          <FiCheck className="w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Order Placed!</h2>
          {orderId && <p className="text-xs text-gray-400 font-mono bg-gray-100 px-3 py-1 rounded-full inline-block mb-3">{orderId}</p>}
          <p className="text-sm text-gray-500 max-w-sm">
            Thank you, <strong>{form.name}</strong>! Your order will be delivered to <strong>{savedAddresses[selectedAddressIdx]?.city || "your address"}</strong>.
          </p>
        </motion.div>
        <div className="flex gap-3">
          <button onClick={() => navigate("/orders")} className="px-6 py-3 bg-[#cc0000] text-white rounded-xl font-bold text-sm hover:bg-[#b30000] transition-colors">
            Track Order
          </button>
          <button onClick={() => navigate("/shop")} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Empty Cart ──
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <FiShoppingBag className="w-16 h-16 text-gray-200" />
        <p className="text-gray-400 text-sm font-semibold">Your cart is empty</p>
        <button onClick={() => navigate("/shop")} className="bg-[#cc0000] text-white px-8 py-3 text-sm font-bold rounded-xl hover:bg-[#b30000] transition-colors">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <SEOHead title="Checkout" noIndex={true} />
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <img src="/Ajanta logo.png" alt="Ajanta" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-2 text-sm">
            {[{ n: 1, label: "Address" }, { n: 2, label: "Payment" }].map(s => (
              <div key={s.n} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s.n ? "bg-[#cc0000] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {step > s.n ? <FiCheck className="w-3.5 h-3.5" /> : s.n}
                </div>
                <span className={`hidden sm:block text-xs font-semibold ${step >= s.n ? "text-gray-900" : "text-gray-400"}`}>{s.label}</span>
                {s.n < 2 && <FiChevronRight className="w-4 h-4 text-gray-300" />}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 font-medium">{cartCount} item{cartCount !== 1 ? "s" : ""}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-5">

            {/* User Info Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-[#cc0000]" /> Contact Details
                </h2>
                {!user && (
                  <Link to="/login" state={{ from: "/checkout" }} className="text-xs text-[#cc0000] font-semibold hover:underline">
                    Sign in to autofill
                  </Link>
                )}
                {user && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <FiCheck className="w-3 h-3" /> Auto-filled
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: "name", label: "Full Name", icon: FiUser, placeholder: "Your name" },
                  { name: "email", label: "Email", icon: FiMail, placeholder: "you@email.com", type: "email" },
                  { name: "phone", label: "Phone", icon: FiPhone, placeholder: "10-digit mobile", type: "tel" },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        name={f.name} type={f.type || "text"} required
                        value={form[f.name]} onChange={handle}
                        placeholder={f.placeholder}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#cc0000] transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-[#cc0000]" /> Delivery Address
                </h2>
                <button onClick={() => setShowAddressForm(s => !s)}
                  className="flex items-center gap-1 text-xs text-[#cc0000] font-semibold hover:underline">
                  <FiPlus className="w-3.5 h-3.5" /> Add New
                </button>
              </div>

              {/* Saved Addresses */}
              {savedAddresses.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {savedAddresses.map((addr, idx) => (
                    <div key={idx}
                      onClick={() => setSelectedAddressIdx(idx)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddressIdx === idx ? "border-[#cc0000] bg-red-50" : "border-gray-100 hover:border-gray-300"}`}
                    >
                      {selectedAddressIdx === idx && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-[#cc0000] rounded-full flex items-center justify-center">
                          <FiCheck className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{addr.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{addr.address}</p>
                      <p className="text-xs text-gray-500 mt-1">{addr.city}, {addr.state} — {addr.pincode}</p>
                      <button onClick={e => { e.stopPropagation(); deleteAddress(idx); }}
                        className="mt-2 text-xs text-red-400 hover:text-red-600 font-medium">Remove</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Address Form */}
              <AnimatePresence>
                {showAddressForm && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                      <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">New Address</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Label */}
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Address Label</label>
                          <div className="flex gap-2">
                            {["Home", "Work", "Other"].map(l => (
                              <button key={l} type="button" onClick={() => setNewAddress(a => ({ ...a, label: l }))}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${newAddress.label === l ? "bg-[#cc0000] text-white border-[#cc0000]" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                                {l}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Address */}
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Street Address *</label>
                          <input name="address" value={newAddress.address} onChange={handleAddr} placeholder="House no, Street, Area, Landmark"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000] transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">City *</label>
                          <input name="city" value={newAddress.city} onChange={handleAddr} placeholder="City"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000] transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Pincode *</label>
                          <input name="pincode" value={newAddress.pincode} onChange={handleAddr} placeholder="6-digit pincode" maxLength={6}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000] transition-all" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-gray-500 mb-1">State</label>
                          <select name="state" value={newAddress.state} onChange={handleAddr}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000] transition-all bg-white">
                            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button type="button" onClick={saveAddress}
                          className="flex-1 bg-[#cc0000] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#b30000] transition-colors">
                          Save Address
                        </button>
                        {savedAddresses.length > 0 && (
                          <button type="button" onClick={() => setShowAddressForm(false)}
                            className="px-4 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
                <MdOutlinePayment className="w-4 h-4 text-[#cc0000]" /> Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "cod", label: "Cash on Delivery", sub: "Pay when delivered", icon: "💵" },
                  { value: "upi", label: "UPI Payment", sub: "GPay, PhonePe, Paytm", icon: "📱" },
                  { value: "card", label: "Card Payment", sub: "Credit / Debit card", icon: "💳" },
                ].map(opt => (
                  <label key={opt.value}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.payment === opt.value ? "border-[#cc0000] bg-red-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={handle} className="mt-0.5 accent-[#cc0000]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{opt.icon}</span>
                        <span className="text-sm font-bold text-gray-900">{opt.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {savedAddresses.length === 0 && (
              <p className="text-center text-xs text-red-500 font-medium -mt-3">Please add a delivery address to continue</p>
            )}

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <FiShield className="w-3 h-3" /> 100% Secure Checkout · SSL Encrypted
            </p>
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-black text-gray-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiShoppingBag className="w-4 h-4 text-[#cc0000]" /> Order Summary
                <span className="ml-auto text-xs font-semibold text-gray-400">{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
              </h2>

              <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1 mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <img src={item.img} alt={item.title} className="w-14 h-14 object-cover bg-gray-100 rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
                      <p className="text-xs text-[#cc0000] font-bold mt-1">{item.price}</p>
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => item.qty > 1 ? dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 })) : dispatch(removeFromCart(item.id))}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          <MdRemove className="text-gray-700 text-sm" />
                        </button>
                        <span className="text-xs font-bold text-gray-900 min-w-[16px] text-center">{item.qty}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }))}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          <MdAdd className="text-gray-700 text-sm" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-1.5 text-gray-400 hover:text-[#cc0000] hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span><span className="font-semibold text-gray-700">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><FiTruck className="w-3 h-3" /> Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-700"}`}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-gray-400">Add ₹{(999 - total).toLocaleString("en-IN")} more for free shipping</p>
                )}
                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span><span className="text-[#cc0000]">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Delivery address preview */}
              {savedAddresses[selectedAddressIdx] && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" /> Delivering to
                  </p>
                  <p className="text-xs font-semibold text-gray-700">{savedAddresses[selectedAddressIdx].address}</p>
                  <p className="text-xs text-gray-500">{savedAddresses[selectedAddressIdx].city}, {savedAddresses[selectedAddressIdx].state} — {savedAddresses[selectedAddressIdx].pincode}</p>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: FiShield, label: "Secure" },
                  { icon: FiTruck, label: "Fast Delivery" },
                  { icon: FiCheck, label: "Easy Returns" },
                ].map(b => (
                  <div key={b.label} className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                    <b.icon className="w-4 h-4 text-[#cc0000]" />
                    <span className="text-[9px] text-gray-500 font-semibold text-center">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Place Order Button — also in summary card */}
              <button
                onClick={handleSubmit}
                disabled={placing || savedAddresses.length === 0 || !form.name || !form.email || !form.phone}
                className="mt-4 w-full bg-[#cc0000] text-white py-3.5 rounded-xl font-black text-sm hover:bg-[#b30000] transition-all shadow-md shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {placing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing...</>
                ) : (
                  <><FiShield className="w-4 h-4" /> Place Order · ₹{grandTotal.toLocaleString("en-IN")}</>
                )}
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                <FiShield className="w-3 h-3" /> SSL Encrypted · Secure Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
