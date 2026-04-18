// Mock orders — in a real app these would come from a backend
const MOCK_ORDERS = [
  { id: "ORD-1001", customer: "Rahul Sharma", email: "rahul@example.com", items: 3, total: "₹ 2,460", status: "Delivered", date: "Apr 1, 2026" },
  { id: "ORD-1002", customer: "Priya Mehta", email: "priya@example.com", items: 1, total: "₹ 830", status: "Processing", date: "Apr 2, 2026" },
  { id: "ORD-1003", customer: "Amit Patel", email: "amit@example.com", items: 2, total: "₹ 1,634", status: "Shipped", date: "Apr 2, 2026" },
  { id: "ORD-1004", customer: "Sneha Joshi", email: "sneha@example.com", items: 1, total: "₹ 1,295", status: "Pending", date: "Apr 3, 2026" },
  { id: "ORD-1005", customer: "Vikram Singh", email: "vikram@example.com", items: 4, total: "₹ 4,120", status: "Delivered", date: "Mar 30, 2026" },
];

const STATUS_STYLES = {
  Delivered: "bg-green-50 text-green-600",
  Processing: "bg-blue-50 text-blue-600",
  Shipped: "bg-amber-50 text-amber-600",
  Pending: "bg-gray-100 text-gray-500",
};

export default function Orders() {
  return (
    <div>
      <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight mb-6">Orders <span className="text-gray-400 font-normal text-base">({MOCK_ORDERS.length})</span></h1>
      <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map(h => (
                <th key={h} className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map(o => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{o.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#1a1a1a]">{o.customer}</p>
                  <p className="text-xs text-gray-400">{o.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-500">{o.items}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a1a]">{o.total}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full ${STATUS_STYLES[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
