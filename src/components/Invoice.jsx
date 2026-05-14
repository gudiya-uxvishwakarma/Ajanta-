import { useRef } from 'react';
import { useWebsiteSettings } from '../hooks/useWebsiteSettings';

export default function Invoice({ order, onClose }) {
  const printRef = useRef();
  const { settings } = useWebsiteSettings();

  const handlePrint = () => {
    const content = printRef.current.innerHTML
      .replace('src="/Ajanta logo.png"', `src="${window.location.origin}/Ajanta logo.png"`);
    const win = window.open('', '_blank', 'width=800,height=900');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; background: #fff; }
            .invoice { max-width: 750px; margin: 0 auto; padding: 40px; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #cc0000; }
            .logo { font-size: 28px; font-weight: 900; color: #cc0000; letter-spacing: -1px; }
            .logo span { color: #1a1a1a; }
            .invoice-title { text-align: right; }
            .invoice-title h2 { font-size: 22px; font-weight: 900; color: #1a1a1a; text-transform: uppercase; letter-spacing: 2px; }
            .invoice-title p { font-size: 12px; color: #888; margin-top: 4px; }
            .invoice-title .order-id { font-size: 13px; font-weight: 700; color: #cc0000; margin-top: 6px; font-family: monospace; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
            .info-box h4 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #888; margin-bottom: 8px; }
            .info-box p { font-size: 13px; color: #333; line-height: 1.6; }
            .info-box strong { color: #1a1a1a; font-weight: 700; }
            .status-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
            .status-processing { background: #fff3e0; color: #e65100; }
            .status-shipped { background: #e3f2fd; color: #1565c0; }
            .status-delivered { background: #e8f5e9; color: #2e7d32; }
            .status-cancelled { background: #fdecea; color: #c62828; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            thead tr { background: #1a1a1a; color: #fff; }
            thead th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
            tbody tr { border-bottom: 1px solid #f0f0f0; }
            tbody tr:last-child { border-bottom: none; }
            tbody td { padding: 12px 16px; font-size: 13px; color: #333; }
            .item-name { font-weight: 600; color: #1a1a1a; }
            .totals { margin-left: auto; width: 260px; }
            .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #555; }
            .total-row.grand { border-top: 2px solid #1a1a1a; margin-top: 8px; padding-top: 12px; font-size: 16px; font-weight: 900; color: #1a1a1a; }
            .total-row.grand span:last-child { color: #cc0000; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
            .footer p { font-size: 11px; color: #aaa; }
            .footer .thank-you { font-size: 14px; font-weight: 700; color: #cc0000; }
            .payment-badge { display: inline-block; background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #555; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  const subtotal = (order.items || []).reduce((s, item) => {
    const price = parseInt(String(item.price || "0").replace(/[^\d]/g, ""));
    return s + price * (item.qty || 1);
  }, 0);
  const shipping = subtotal >= 999 ? 0 : 50;
  const total = order.total || subtotal + shipping;

  const statusClass = {
    processing: "status-processing",
    shipped: "status-shipped",
    delivered: "status-delivered",
    cancelled: "status-cancelled",
  }[order.status] || "status-processing";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-black text-gray-900 text-base">Invoice Preview</h3>
          <div className="flex gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-2 bg-[#cc0000] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#b30000] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download / Print
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div ref={printRef} className="invoice p-8">
          {/* Header */}
          <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, paddingBottom: 24, borderBottom: "2px solid #cc0000" }}>
            <div>
              <img src="/Ajanta logo.png" alt="Ajanta" style={{ height: 40, marginBottom: 8 }} />
              <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Quality Products Since 1983</p>
              <p style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{settings.contactEmail}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2 }}>Invoice</h2>
              <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Date: {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#cc0000", marginTop: 6, fontFamily: "monospace" }}>{order.id}</p>
              <span className={`status-badge ${statusClass}`} style={{ marginTop: 8, display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                {order.status || "Processing"}
              </span>
            </div>
          </div>

          {/* Bill To */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
            <div>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", marginBottom: 8 }}>Bill To</h4>
              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>
                <strong style={{ color: "#1a1a1a", fontWeight: 700 }}>{order.customerName || "Customer"}</strong><br />
                {order.customerEmail}<br />
                {order.customerPhone}
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", marginBottom: 8 }}>Ship To</h4>
              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>
                {order.shippingAddress?.address || "—"}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
                PIN: {order.shippingAddress?.pincode}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr style={{ background: "#1a1a1a", color: "#fff" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>#</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Product</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Qty</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Price</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {(order.items || []).map((item, i) => {
                const price = parseInt(String(item.price || "0").replace(/[^\d]/g, ""));
                const amount = price * (item.qty || 1);
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#888" }}>{i + 1}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.title || item.productName}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, textAlign: "center", color: "#555" }}>{item.qty || item.quantity || 1}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, textAlign: "right", color: "#555" }}>₹{price.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, textAlign: "right", fontWeight: 700, color: "#1a1a1a" }}>₹{amount.toLocaleString("en-IN")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ marginLeft: "auto", width: 260 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#555" }}>
              <span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#555" }}>
              <span>Shipping</span><span style={{ color: shipping === 0 ? "#2e7d32" : "#555" }}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 6px", fontSize: 16, fontWeight: 900, color: "#1a1a1a", borderTop: "2px solid #1a1a1a", marginTop: 8 }}>
              <span>Total</span><span style={{ color: "#cc0000" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ display: "inline-block", background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#555" }}>
                Payment: {order.paymentMethod || "COD"}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#cc0000" }}>Thank you for shopping with Ajanta!</p>
              <p style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>For support: {settings.contactEmail}</p>
            </div>
            <p style={{ fontSize: 11, color: "#aaa" }}>This is a computer-generated invoice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
