/* =========================================================================
   BuildPro ERP — vanilla JS app (no build step)
   Ready to swap MOCK arrays for Supabase queries later:
   const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
   ========================================================================= */

/* ---------------------------- helpers ---------------------------- */
function fmtINR(n){
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1e7) return `${sign}₹${(abs/1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `${sign}₹${(abs/1e5).toFixed(2)} L`;
  return `${sign}₹${abs.toLocaleString("en-IN")}`;
}
function el(html){ const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function icons(){ if (window.lucide) lucide.createIcons(); }
function showToast(msg){
  const t = document.getElementById("toast");
  t.innerHTML = `<i data-lucide="check-circle-2"></i><span>${msg}</span>`;
  t.classList.remove("hidden");
  icons();
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(()=> t.classList.add("hidden"), 2600);
}
function closeModal(){ document.getElementById("modalRoot").innerHTML = ""; }
function openModalNode(node){ const root = document.getElementById("modalRoot"); root.innerHTML=""; root.appendChild(node); icons(); }

/* ---------------------------- nav config ---------------------------- */
const NAV = [
  { label:"Dashboard", icon:"layout-dashboard" },
  { label:"Projects", icon:"folder-kanban" },
  { label:"BOQ & Estimation", icon:"calculator" },
  { label:"Purchase & Material", icon:"shopping-cart" },
  { label:"Labour & Contractor", icon:"hard-hat" },
  { label:"Billing & Accounts", icon:"wallet" },
  { label:"Clients & Vendors", icon:"building-2" },
  { label:"Site Management", icon:"map-pin" },
  { label:"Reports & Analytics", icon:"bar-chart-3" },
  { label:"Documents", icon:"file-text" },
  { label:"HR & Payroll", icon:"user-cog" },
  { label:"Equipment", icon:"wrench" },
  { label:"AI Insights", icon:"sparkles" },
  { label:"Settings", icon:"settings" },
];

/* ---------------------------- mock data ---------------------------- */
const KPI_CARDS = [
  { key:"projects", label:"Total Projects", value:"3", sub:"Active Sites", icon:"folder-kanban", tint:"blue", trend:"Zinnia · Whispering Grooves · Genial", up:true },
  { key:"contract", label:"Total Recorded Expense", value:"₹18.73 Cr", sub:"All 3 sites combined", icon:"indian-rupee", tint:"navy", trend:"2,807 entries", up:true },
  { key:"billed", label:"Paid to Date", value:"₹7.89 Cr", sub:"Settled payments", icon:"file-text", tint:"green", trend:"42% of total", up:true },
  { key:"outstanding", label:"Pending Payments", value:"₹10.83 Cr", sub:"To suppliers", icon:"clock", tint:"orange", trend:"58% pending", up:false },
  { key:"pnl", label:"Active Suppliers", value:"374", sub:"Vendors recorded", icon:"trending-up", tint:"green", trend:"Top 60 shown in Vendors", up:true },
];
const TINT = {
  blue:{bg:"#DBEAFE",fg:"#2563EB"}, navy:{bg:"#E2E8F0",fg:"#0B1D3A"},
  green:{bg:"#DCFCE7",fg:"#16A34A"}, orange:{bg:"#FFEDD5",fg:"#EA580C"},
};
const ALERTS = [
  { title:"Cost Overrun", desc:"3 projects are at risk of cost overrun", icon:"trending-down", sev:"red" },
  { title:"Project Delay", desc:"2 projects may be delayed", icon:"clock", sev:"orange" },
  { title:"Material Shortage", desc:"Cement stock is running low", icon:"package-x", sev:"orange" },
  { title:"Payment Reminder", desc:"₹5,45,00,000 payments pending", icon:"indian-rupee", sev:"blue" },
];
const SEV = { red:{bg:"#FEE2E2",fg:"#DC2626"}, orange:{bg:"#FFEDD5",fg:"#EA580C"}, blue:{bg:"#DBEAFE",fg:"#2563EB"} };

const MODULE_CARDS = [
  { title:"Projects", icon:"folder-kanban", rows:[["All Projects",3],["Active",3],["Completed",0],["On Hold",0]] },
  { title:"BOQ & Estimation", icon:"calculator", rows:[["Total BOQs",9],["Approved",6],["Under Approval",2],["Draft",1]] },
  { title:"Purchase & Material", icon:"shopping-cart", rows:[["Total PO",2807],["Open PO",1479],["Paid PO",1328],["Suppliers",374]] },
  { title:"Labour & Contractor", icon:"hard-hat", rows:[["Total Labour",245],["Present Today",198],["Absent Today",47],["Contractors",32]] },
  { title:"Billing & Accounts", icon:"wallet", rows:[["Total Invoices",7],["Paid",3],["Outstanding",4],["Overdue",2]] },
];

const PROGRESS_DATA = [
  { name:"On Track", value:3, color:"#16A34A" },
  { name:"At Risk", value:0, color:"#EA580C" },
  { name:"Delayed", value:0, color:"#DC2626" },
  { name:"Not Started", value:0, color:"#94A3B8" },
];
const CASHFLOW_LABELS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const CASHFLOW_IN  = [2.1,2.6,2.4,3.1,3.4,2.9,3.6,3.9,4.2,3.7,4.0,4.6];
const CASHFLOW_OUT = [1.6,1.9,2.1,2.3,2.6,2.4,2.8,3.0,3.3,2.9,3.1,3.5];
const PROFIT_LABELS = ["P1","P2","P3","P4","P5","P6","P7","P8"];
const PROFIT_VALUES = [145,98,87,76,-22,41,-14,63];

const TOP_PROJECTS = [
  { name:"Genial", loc:"Maharashtra", profit:"₹9,86,92,893", margin:1516 },
  { name:"Zinnia", loc:"Maharashtra", profit:"₹7,18,34,345", margin:922 },
  { name:"Whispering Grooves", loc:"Maharashtra", profit:"₹1,67,57,571", margin:369 },
];

const BOTTOM_KPIS = [
  { label:"Manpower on Site", value:"198 / 245", icon:"users" },
  { label:"Equipment Deployed", value:"45", icon:"wrench" },
  { label:"Total Sites", value:"18", icon:"map-pin" },
  { label:"Safety Compliance", value:"92%", icon:"shield-check" },
  { label:"Quality Score", value:"88%", icon:"check-circle-2" },
  { label:"Client Satisfaction", value:"4.7 / 5", icon:"star" },
];

const QUICK_ACTIONS = [
  { label:"New Project", icon:"folder-kanban", fields:["Project Name","Client","Location"] },
  { label:"Create BOQ", icon:"calculator", fields:["Project","Item","Estimated Amount"] },
  { label:"New Purchase Order", icon:"shopping-cart", fields:["Vendor","Material","Quantity"] },
  { label:"New Invoice", icon:"file-text", fields:["Client","Project","Amount"] },
  { label:"Labour Attendance", icon:"clipboard-list", fields:["Contractor","Present Count","Date"] },
  { label:"Material Receipt", icon:"boxes", fields:["Material","Received Qty","PO Number"] },
  { label:"Site Upload", icon:"camera", fields:["Site","Photo Caption","Uploaded By"] },
  { label:"Payment Received", icon:"credit-card", fields:["Client","Amount","Mode"] },
];

const STATUS_META = {
  "On Track": {fg:"#16A34A", bg:"#DCFCE7"},
  "At Risk": {fg:"#EA580C", bg:"#FFEDD5"},
  "Delayed": {fg:"#DC2626", bg:"#FEE2E2"},
  "Completed": {fg:"#2563EB", bg:"#DBEAFE"},
  "On Hold": {fg:"#64748B", bg:"#F1F5F9"},
};

let PROJECTS = [
  { id:"PRJ-001", name:"Zinnia", client:"Hiranmayi Developers", pm:"Gopal Bhau", location:"Maharashtra", status:"On Track", start:"2023-07-19", end:"2026-05-05", contract:0, billed:0, completion:0 },
  { id:"PRJ-002", name:"Whispering Grooves", client:"Hiranmayi Developers", pm:"Gopal Bhau", location:"Maharashtra", status:"On Track", start:"2024-06-03", end:"2026-05-06", contract:0, billed:0, completion:0 },
  { id:"PRJ-003", name:"Genial", client:"Hiranmayi Developers", pm:"Gopal Bhau", location:"Maharashtra", status:"On Track", start:"2023-01-11", end:"2026-05-03", contract:0, billed:0, completion:0 }
];

/* ---------------------------- BOQ data ---------------------------- */
const BOQ_STATUS_META = {
  "Draft": {fg:"#64748B", bg:"#F1F5F9"},
  "Under Approval": {fg:"#EA580C", bg:"#FFEDD5"},
  "Approved": {fg:"#16A34A", bg:"#DCFCE7"},
};
const UNITS = ["Cum","Sqm","Rmt","Kg","Ton","Nos","Bag","Ltr"];

let BOQS = [
  { id:"BOQ-0001", project:"Zinnia", item:"Excavation for Foundation", description:"Earthwork excavation in ordinary soil up to 1.5m depth", unit:"Cum", qty:1250, rate:185, actual:238000, remarks:"Rocky patch found, minor overrun", status:"Approved" },
  { id:"BOQ-0002", project:"Zinnia", item:"RCC M25 Footing", description:"Reinforced cement concrete M25 grade for isolated footings", unit:"Cum", qty:340, rate:8200, actual:2820000, remarks:"", status:"Approved" },
  { id:"BOQ-0003", project:"Whispering Grooves", item:"Brick Masonry 230mm", description:"Class-A brick masonry in CM 1:6 for external walls", unit:"Sqm", qty:2100, rate:850, actual:1750000, remarks:"", status:"Approved" },
  { id:"BOQ-0004", project:"Whispering Grooves", item:"Internal Plastering 12mm", description:"Cement plaster 1:4 on internal walls", unit:"Sqm", qty:4800, rate:145, actual:0, remarks:"Awaiting site readiness", status:"Under Approval" },
  { id:"BOQ-0005", project:"Genial", item:"Structural Steel Fabrication", description:"Fabrication and erection of structural steel members", unit:"Ton", qty:85, rate:92000, actual:8100000, remarks:"Rate escalation applied", status:"Approved" },
  { id:"BOQ-0006", project:"Genial", item:"Aluminium Window Frames", description:"Powder-coated aluminium window frames with glazing", unit:"Sqm", qty:620, rate:3400, actual:0, remarks:"", status:"Draft" },
  { id:"BOQ-0007", project:"Zinnia", item:"Vitrified Flooring 600x600", description:"Vitrified tile flooring including bedding and grouting", unit:"Sqm", qty:3100, rate:780, actual:2380000, remarks:"", status:"Approved" },
  { id:"BOQ-0008", project:"Whispering Grooves", item:"Waterproofing Terrace", description:"APP membrane waterproofing on terrace slab", unit:"Sqm", qty:980, rate:410, actual:0, remarks:"Vendor quote pending", status:"Under Approval" },
  { id:"BOQ-0009", project:"Zinnia", item:"External Painting", description:"Exterior emulsion paint, two coats with primer", unit:"Sqm", qty:5200, rate:95, actual:520000, remarks:"", status:"Draft" },
];

/* ---------------------------- Purchase & Material data ---------------------------- */
const PO_STATUS_META = {
  "Draft": {fg:"#64748B", bg:"#F1F5F9"},
  "Open": {fg:"#2563EB", bg:"#DBEAFE"},
  "Delivered": {fg:"#16A34A", bg:"#DCFCE7"},
  "Cancelled": {fg:"#DC2626", bg:"#FEE2E2"},
};

let PURCHASE_ORDERS = [
  { id:"PO-1001", vendor:"Site Set Up", project:"Zinnia", material:"Site Set Up", qty:1, unit:"Lump", rate:64730.0, gst:0, delivery:"2023-07-19", status:"Open" },
  { id:"PO-1002", vendor:"PCC Material", project:"Zinnia", material:"PCC Material", qty:1, unit:"Lump", rate:33600.0, gst:0, delivery:"2023-07-19", status:"Open" },
  { id:"PO-1003", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:7750.0, gst:0, delivery:"2023-07-20", status:"Open" },
  { id:"PO-1004", vendor:"Gorakh Chavan", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:3050.0, gst:0, delivery:"2024-09-24", status:"Open" },
  { id:"PO-1005", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:3400.0, gst:0, delivery:"2024-09-26", status:"Open" },
  { id:"PO-1006", vendor:"Sagar Pawar", project:"Zinnia", material:"80mm Metal", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2024-10-14", status:"Open" },
  { id:"PO-1007", vendor:"Vitthal Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2024-11-27", status:"Open" },
  { id:"PO-1008", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-12-01", status:"Open" },
  { id:"PO-1009", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2024-12-03", status:"Open" },
  { id:"PO-1010", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-12-09", status:"Open" },
  { id:"PO-1011", vendor:"Transportation", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:25500.0, gst:0, delivery:"2024-12-10", status:"Open" },
  { id:"PO-1012", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2024-12-11", status:"Delivered" },
  { id:"PO-1013", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-12-14", status:"Open" },
  { id:"PO-1014", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:16700.0, gst:0, delivery:"2024-12-17", status:"Open" },
  { id:"PO-1015", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2024-12-18", status:"Delivered" },
  { id:"PO-1016", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-12-19", status:"Open" },
  { id:"PO-1017", vendor:"Steel Vehicle", project:"Zinnia", material:"8mm=3.38 MT 10mm=1.48 MT 12 mm= 5.62 MT Total=10.48", qty:1, unit:"Lump", rate:628800.0, gst:0, delivery:"2024-12-19", status:"Open" },
  { id:"PO-1018", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2024-12-21", status:"Open" },
  { id:"PO-1019", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-12-24", status:"Open" },
  { id:"PO-1020", vendor:"Yash Enterprises", project:"Zinnia", material:"Drip", qty:1, unit:"Lump", rate:21543.0, gst:0, delivery:"2024-12-25", status:"Open" },
  { id:"PO-1021", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:29400.0, gst:0, delivery:"2024-12-25", status:"Open" },
  { id:"PO-1022", vendor:"Gurudev Plastic", project:"Zinnia", material:"Tarpolin", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2024-12-25", status:"Open" },
  { id:"PO-1023", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:29400.0, gst:0, delivery:"2024-12-25", status:"Open" },
  { id:"PO-1024", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:99000.0, gst:0, delivery:"2024-12-26", status:"Open" },
  { id:"PO-1025", vendor:"Nilkanth Xerox", project:"Zinnia", material:"Xerox", qty:1, unit:"Lump", rate:850.0, gst:0, delivery:"2024-12-27", status:"Open" },
  { id:"PO-1026", vendor:"Stamp Expense", project:"Zinnia", material:"Stamp", qty:1, unit:"Lump", rate:450.0, gst:0, delivery:"2024-12-27", status:"Open" },
  { id:"PO-1027", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2024-12-29", status:"Open" },
  { id:"PO-1028", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2024-12-29", status:"Open" },
  { id:"PO-1029", vendor:"Lime Bags", project:"Zinnia", material:"Lime Bags", qty:1, unit:"Lump", rate:100.0, gst:0, delivery:"2024-12-30", status:"Open" },
  { id:"PO-1030", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2024-12-31", status:"Open" },
  { id:"PO-1031", vendor:"Chetan Shelke", project:"Zinnia", material:"Pile Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-01-01", status:"Open" },
  { id:"PO-1032", vendor:"Yash Enterprises", project:"Zinnia", material:"Drip", qty:1, unit:"Lump", rate:21543.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-1033", vendor:"Chetan Shelke", project:"Zinnia", material:"Pile Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-1034", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-1035", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:29400.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-1036", vendor:"Cover Blocks", project:"Zinnia", material:"Cover Blocks", qty:1, unit:"Lump", rate:1400.0, gst:0, delivery:"2025-01-05", status:"Open" },
  { id:"PO-1037", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:1400.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-1038", vendor:"Diesel", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-01-07", status:"Open" },
  { id:"PO-1039", vendor:"Transportation", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-01-07", status:"Open" },
  { id:"PO-1040", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:6900.0, gst:0, delivery:"2025-01-07", status:"Open" },
  { id:"PO-1041", vendor:"Cover Blocks", project:"Zinnia", material:"Cover Blocks", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-1042", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-1043", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:1400.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-1044", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:63600.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-1045", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-09", status:"Open" },
  { id:"PO-1046", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:63600.0, gst:0, delivery:"2025-01-10", status:"Open" },
  { id:"PO-1047", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:63600.0, gst:0, delivery:"2025-01-10", status:"Delivered" },
  { id:"PO-1048", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-11", status:"Open" },
  { id:"PO-1049", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-11", status:"Open" },
  { id:"PO-1050", vendor:"Gorakh Chavan", project:"Zinnia", material:"Birla A1", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2025-01-13", status:"Open" },
  { id:"PO-1051", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2025-01-13", status:"Open" },
  { id:"PO-1052", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-01-13", status:"Open" },
  { id:"PO-1053", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-01-13", status:"Open" },
  { id:"PO-1054", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:94500.0, gst:0, delivery:"2025-01-17", status:"Open" },
  { id:"PO-1055", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:94500.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-1056", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:78000.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-1057", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:27500.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-1058", vendor:"Gorakh Chavan", project:"Zinnia", material:"Birla A1", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-1059", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-1060", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-20", status:"Open" },
  { id:"PO-1061", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-1062", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-1063", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-1064", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:54100.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-1065", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:54100.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-1066", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-1067", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:55600.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-1068", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:27500.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-1069", vendor:"Gorakh Chavan", project:"Zinnia", material:"Birla A1", qty:1, unit:"Lump", rate:6500.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-1070", vendor:"Tukaram Shirasat", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-1071", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-24", status:"Open" },
  { id:"PO-1072", vendor:"Murum Filling", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:108000.0, gst:0, delivery:"2025-01-26", status:"Open" },
  { id:"PO-1073", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:83750.0, gst:0, delivery:"2025-01-28", status:"Open" },
  { id:"PO-1074", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:740.0, gst:0, delivery:"2025-01-28", status:"Open" },
  { id:"PO-1075", vendor:"Murum Filling", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-1076", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:83600.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-1077", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-1078", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:39000.0, gst:0, delivery:"2025-02-01", status:"Open" },
  { id:"PO-1079", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:83600.0, gst:0, delivery:"2025-02-01", status:"Open" },
  { id:"PO-1080", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:30800.0, gst:0, delivery:"2025-02-04", status:"Open" },
  { id:"PO-1081", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:30800.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-1082", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-1083", vendor:"Murum Filling", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:58000.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-1084", vendor:"Diesel", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:92.0, gst:0, delivery:"2025-02-07", status:"Open" },
  { id:"PO-1085", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:1738.0, gst:0, delivery:"2025-02-10", status:"Open" },
  { id:"PO-1086", vendor:"Vitthal Nursary", project:"Zinnia", material:"Nursary Plants", qty:1, unit:"Lump", rate:67240.0, gst:0, delivery:"2025-02-11", status:"Open" },
  { id:"PO-1087", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-02-11", status:"Open" },
  { id:"PO-1088", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-02-11", status:"Open" },
  { id:"PO-1089", vendor:"Sagar Pawar", project:"Zinnia", material:"80mm Metal", qty:1, unit:"Lump", rate:19800.0, gst:0, delivery:"2025-02-11", status:"Open" },
  { id:"PO-1090", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:52650.0, gst:0, delivery:"2025-02-12", status:"Open" },
  { id:"PO-1091", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:11400.0, gst:0, delivery:"2025-02-12", status:"Open" },
  { id:"PO-1092", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:64050.0, gst:0, delivery:"2025-02-12", status:"Delivered" },
  { id:"PO-1093", vendor:"Cover Blocks", project:"Zinnia", material:"Cover Blocks", qty:1, unit:"Lump", rate:530.0, gst:0, delivery:"2025-02-13", status:"Open" },
  { id:"PO-1094", vendor:"Steel Vehicle", project:"Zinnia", material:"8mm=5.34MT 10mm=3.47MT 12 mm= 4.64 MT Total=13.45", qty:1, unit:"Lump", rate:807000.0, gst:0, delivery:"2025-02-14", status:"Open" },
  { id:"PO-1095", vendor:"Compactor Diesel", project:"Zinnia", material:"Compactor Diesel", qty:1, unit:"Lump", rate:92.0, gst:0, delivery:"2025-02-15", status:"Open" },
  { id:"PO-1096", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-02-16", status:"Open" },
  { id:"PO-1097", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:71150.0, gst:0, delivery:"2025-02-18", status:"Open" },
  { id:"PO-1098", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:900.0, gst:0, delivery:"2025-02-18", status:"Open" },
  { id:"PO-1099", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-02-19", status:"Open" },
  { id:"PO-1100", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-02-19", status:"Open" },
  { id:"PO-1101", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:20150.0, gst:0, delivery:"2025-02-19", status:"Open" },
  { id:"PO-1102", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:33150.0, gst:0, delivery:"2025-02-19", status:"Open" },
  { id:"PO-1103", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-02-19", status:"Open" },
  { id:"PO-1104", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:72050.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-1105", vendor:"Vitthal Nursary", project:"Zinnia", material:"Nursary Plants", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-1106", vendor:"Murum Filling", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-1107", vendor:"Cable Expenses", project:"Zinnia", material:"Cable Expenses", qty:1, unit:"Lump", rate:1650.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-1108", vendor:"Tables & Chairs Zinnia", project:"Zinnia", material:"Tables & Chairs Zinnia", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2025-02-21", status:"Open" },
  { id:"PO-1109", vendor:"Electric Board & Cables", project:"Zinnia", material:"Electric Board & Cables", qty:1, unit:"Lump", rate:1650.0, gst:0, delivery:"2025-02-21", status:"Open" },
  { id:"PO-1110", vendor:"Neeru", project:"Zinnia", material:"Neeru", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2025-02-23", status:"Open" },
  { id:"PO-1111", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:63200.0, gst:0, delivery:"2025-02-25", status:"Open" },
  { id:"PO-1112", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-02-25", status:"Open" },
  { id:"PO-1113", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:68200.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-1114", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-1115", vendor:"Chetan Shelke", project:"Zinnia", material:"Pile Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-1116", vendor:"Vitthal Nursary", project:"Zinnia", material:"Nursary Plants", qty:1, unit:"Lump", rate:27240.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-1117", vendor:"Rameshwar", project:"Zinnia", material:"Plumbing material", qty:1, unit:"Lump", rate:118480.0, gst:0, delivery:"2025-03-01", status:"Open" },
  { id:"PO-1118", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:17899.2, gst:0, delivery:"2025-03-01", status:"Open" },
  { id:"PO-1119", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-03-02", status:"Open" },
  { id:"PO-1120", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-03-04", status:"Delivered" },
  { id:"PO-1121", vendor:"Munna Electronics", project:"Zinnia", material:"LED lights", qty:1, unit:"Lump", rate:4625.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1122", vendor:"SM Timbers", project:"Zinnia", material:"Munde", qty:1, unit:"Lump", rate:11010.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1123", vendor:"Janata Hardware", project:"Zinnia", material:"GI patra", qty:1, unit:"Lump", rate:37300.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1124", vendor:"Janata Hardware", project:"Zinnia", material:"GI patra", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1125", vendor:"Drums 200 Ltr", project:"Zinnia", material:"Drums 200 Ltr", qty:1, unit:"Lump", rate:2250.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1126", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:28700.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1127", vendor:"Backfilling Work", project:"Zinnia", material:"Backfilling Work", qty:1, unit:"Lump", rate:16250.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1128", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1129", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1130", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1131", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1132", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1133", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:108350.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1134", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:5400.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-1135", vendor:"Mohit Rawal Fly Ash Bricks", project:"Zinnia", material:"Mohit Rawal Fly Ash Bricks", qty:1, unit:"Lump", rate:37290.0, gst:0, delivery:"2025-03-06", status:"Delivered" },
  { id:"PO-1136", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:113750.0, gst:0, delivery:"2025-03-06", status:"Delivered" },
  { id:"PO-1137", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-03-06", status:"Delivered" },
  { id:"PO-1138", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:28700.0, gst:0, delivery:"2025-03-06", status:"Delivered" },
  { id:"PO-1139", vendor:"Backfilling Work", project:"Zinnia", material:"Backfilling Work", qty:1, unit:"Lump", rate:16250.0, gst:0, delivery:"2025-03-06", status:"Delivered" },
  { id:"PO-1140", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:16243.75, gst:0, delivery:"2025-03-06", status:"Open" },
  { id:"PO-1141", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-03-07", status:"Open" },
  { id:"PO-1142", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:175000.0, gst:0, delivery:"2025-03-08", status:"Open" },
  { id:"PO-1143", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-03-08", status:"Open" },
  { id:"PO-1144", vendor:"Transportation", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-03-10", status:"Open" },
  { id:"PO-1145", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:149150.0, gst:0, delivery:"2025-03-11", status:"Open" },
  { id:"PO-1146", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:8400.0, gst:0, delivery:"2025-03-11", status:"Open" },
  { id:"PO-1147", vendor:"Clips & Hinges", project:"Zinnia", material:"Clips & Hinges", qty:1, unit:"Lump", rate:410.0, gst:0, delivery:"2025-03-12", status:"Open" },
  { id:"PO-1148", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:18645.0, gst:0, delivery:"2025-03-12", status:"Open" },
  { id:"PO-1149", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-03-13", status:"Open" },
  { id:"PO-1150", vendor:"Diesel", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:210.0, gst:0, delivery:"2025-03-13", status:"Open" },
  { id:"PO-1151", vendor:"Transportation", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-03-13", status:"Open" },
  { id:"PO-1152", vendor:"Transportation", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2025-03-13", status:"Open" },
  { id:"PO-1153", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:156200.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-1154", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15700.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-1155", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-1156", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:30800.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-1157", vendor:"Rameshwar", project:"Zinnia", material:"Plumbing material", qty:1, unit:"Lump", rate:51174.0, gst:0, delivery:"2025-03-15", status:"Open" },
  { id:"PO-1158", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-03-17", status:"Open" },
  { id:"PO-1159", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-03-17", status:"Open" },
  { id:"PO-1160", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-03-17", status:"Open" },
  { id:"PO-1161", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:96600.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-1162", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:7200.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-1163", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work material advance", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-1164", vendor:"Pahade", project:"Zinnia", material:"Core cutting Work", qty:1, unit:"Lump", rate:2400.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-1165", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:18645.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-1166", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:103800.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-1167", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work material advance", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-1168", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:18645.0, gst:0, delivery:"2025-03-21", status:"Open" },
  { id:"PO-1169", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:140000.0, gst:0, delivery:"2025-03-22", status:"Open" },
  { id:"PO-1170", vendor:"Harshad Patel", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-03-22", status:"Open" },
  { id:"PO-1171", vendor:"Steel Vehicle", project:"Zinnia", material:"8mm=5.14MT 10mm=3.05MT 12 mm= 6.05 MT Total=14.24", qty:1, unit:"Lump", rate:854400.0, gst:0, delivery:"2025-03-23", status:"Open" },
  { id:"PO-1172", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15820.0, gst:0, delivery:"2025-03-23", status:"Open" },
  { id:"PO-1173", vendor:"Compactr Belt", project:"Zinnia", material:"Compactr Belt", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-1174", vendor:"Vitthal Nursary", project:"Zinnia", material:"Nursary Plants", qty:1, unit:"Lump", rate:144430.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-1175", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:61500.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-1176", vendor:"Pooja Saman Plot No.14&15", project:"Zinnia", material:"Pooja Saman Plot No.14&15", qty:1, unit:"Lump", rate:60.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1177", vendor:"Diesel for Compactor Machine", project:"Zinnia", material:"Diesel for Compactor Machine", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1178", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum", qty:1, unit:"Lump", rate:128450.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1179", vendor:"Gradening Rotavator Nagarni", project:"Zinnia", material:"Gradening Rotavator Nagarni", qty:1, unit:"Lump", rate:22800.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1180", vendor:"Sagar Pawar", project:"Zinnia", material:"80mm Metal", qty:1, unit:"Lump", rate:19800.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1181", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1182", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:51700.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1183", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:10800.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-1184", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-03-27", status:"Open" },
  { id:"PO-1185", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-03-27", status:"Open" },
  { id:"PO-1186", vendor:"Sagar Pawar", project:"Zinnia", material:"80mm Metal", qty:1, unit:"Lump", rate:19800.0, gst:0, delivery:"2025-03-27", status:"Open" },
  { id:"PO-1187", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:62500.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1188", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:34465.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1189", vendor:"Somnath Kshirsagar", project:"Zinnia", material:"Plumbing Work", qty:1, unit:"Lump", rate:87350.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1190", vendor:"Pahade", project:"Zinnia", material:"Core cutting Work", qty:1, unit:"Lump", rate:4800.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1191", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1192", vendor:"Harshad Patel", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1193", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1194", vendor:"Gradening Rotavator Nagarni", project:"Zinnia", material:"Gradening Rotavator Nagarni", qty:1, unit:"Lump", rate:22800.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-1195", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:375.0, gst:0, delivery:"2025-03-28", status:"Open" },
  { id:"PO-1196", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:2525.0, gst:0, delivery:"2025-03-29", status:"Open" },
  { id:"PO-1197", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-03-29", status:"Open" },
  { id:"PO-1198", vendor:"Pooja Saman Zinnia plot 14 &15", project:"Zinnia", material:"Pooja Saman Zinnia plot 14 &15", qty:1, unit:"Lump", rate:82.0, gst:0, delivery:"2025-03-31", status:"Open" },
  { id:"PO-1199", vendor:"Pooja Saman Naral Zinnia plot 14 &15", project:"Zinnia", material:"Pooja Saman Naral Zinnia plot 14 &15", qty:1, unit:"Lump", rate:60.0, gst:0, delivery:"2025-03-31", status:"Open" },
  { id:"PO-1200", vendor:"Shravan Bhau Transport", project:"Zinnia", material:"Shravan Bhau Transport", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-03-31", status:"Open" },
  { id:"PO-1201", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-1202", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-1203", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-1204", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15820.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-1205", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15820.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-1206", vendor:"Diesel for Compactor Machine", project:"Zinnia", material:"Diesel for Compactor Machine", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-1207", vendor:"JCB", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-1208", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-1209", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:160450.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-1210", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:4800.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-1211", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:134750.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-1212", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15820.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-1213", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-1214", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:3279.0, gst:0, delivery:"2025-04-05", status:"Open" },
  { id:"PO-1215", vendor:"Diesel", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-04-07", status:"Open" },
  { id:"PO-1216", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1217", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1218", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1219", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1220", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1221", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1222", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:160500.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1223", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-1224", vendor:"Diesel for generator", project:"Zinnia", material:"Diesel for generator", qty:1, unit:"Lump", rate:2200.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-1225", vendor:"Chetan Shelke", project:"Zinnia", material:"Pile Work", qty:1, unit:"Lump", rate:37800.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-1226", vendor:"Gopal Bhau", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:6900.0, gst:0, delivery:"2025-04-10", status:"Open" },
  { id:"PO-1227", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-1228", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:161750.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-1229", vendor:"Mohit Rawal", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15820.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-1230", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-1231", vendor:"Chetan Shelke", project:"Zinnia", material:"Pile Work", qty:1, unit:"Lump", rate:37800.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-1232", vendor:"Generator", project:"Zinnia", material:"Generator", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-1233", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum", qty:1, unit:"Lump", rate:27200.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-1234", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:5900.0, gst:0, delivery:"2025-04-12", status:"Open" },
  { id:"PO-1235", vendor:"Vitthal Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:43400.0, gst:0, delivery:"2025-04-12", status:"Open" },
  { id:"PO-1236", vendor:"Transportation", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:2600.0, gst:0, delivery:"2025-04-12", status:"Open" },
  { id:"PO-1237", vendor:"Kisan Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-04-14", status:"Delivered" },
  { id:"PO-1238", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:138125.0, gst:0, delivery:"2025-04-13", status:"Open" },
  { id:"PO-1239", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:95600.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1240", vendor:"Pickup Transport", project:"Zinnia", material:"Pickup Transport", qty:1, unit:"Lump", rate:12000.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1241", vendor:"Diesel for generator", project:"Zinnia", material:"Diesel for generator", qty:1, unit:"Lump", rate:3700.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1242", vendor:"Cable Expenses", project:"Zinnia", material:"Cable Expenses", qty:1, unit:"Lump", rate:3470.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1243", vendor:"Plumbing Material shiffting", project:"Zinnia", material:"Plumbing Material shiffting", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1244", vendor:"Cement Transportation", project:"Zinnia", material:"Cement Transportation", qty:1, unit:"Lump", rate:3300.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1245", vendor:"Bamboo Material", project:"Zinnia", material:"Bambo Material", qty:1, unit:"Lump", rate:41500.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1246", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:22800.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1247", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:110800.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1248", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:3600.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-1249", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-04-16", status:"Open" },
  { id:"PO-1250", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-16", status:"Open" },
  { id:"PO-1251", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-1252", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:139000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-1253", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:78450.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-1254", vendor:"Somnath Kshirsagar", project:"Zinnia", material:"Plumbing Work", qty:1, unit:"Lump", rate:37250.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-1255", vendor:"Kisan Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:41500.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-1256", vendor:"Vitthal Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-1257", vendor:"Gopal Bhau", project:"Zinnia", material:"Pickup Transport", qty:1, unit:"Lump", rate:23470.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-1258", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-04-17", status:"Open" },
  { id:"PO-1259", vendor:"Binding Wire Zinnia", project:"Zinnia", material:"Binding Wire Zinnia", qty:1, unit:"Lump", rate:1900.0, gst:0, delivery:"2025-04-18", status:"Open" },
  { id:"PO-1260", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-18", status:"Open" },
  { id:"PO-1261", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-18", status:"Open" },
  { id:"PO-1262", vendor:"Binding Wire Zinnia", project:"Zinnia", material:"Binding Wire Zinnia", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2025-04-19", status:"Open" },
  { id:"PO-1263", vendor:"Cable Expenses", project:"Zinnia", material:"Cable Expenses", qty:1, unit:"Lump", rate:19020.0, gst:0, delivery:"2025-04-21", status:"Open" },
  { id:"PO-1264", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-04-21", status:"Open" },
  { id:"PO-1265", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-04-22", status:"Open" },
  { id:"PO-1266", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-04-22", status:"Open" },
  { id:"PO-1267", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:197350.0, gst:0, delivery:"2025-04-22", status:"Open" },
  { id:"PO-1268", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-23", status:"Open" },
  { id:"PO-1269", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-23", status:"Open" },
  { id:"PO-1270", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-04-23", status:"Open" },
  { id:"PO-1271", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1272", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:172810.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1273", vendor:"Vitthal Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1274", vendor:"Kisan Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1275", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1276", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1277", vendor:"Gopal Bhau", project:"Zinnia", material:"Pickup Transport", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1278", vendor:"RCC Designer", project:"Zinnia", material:"RCC designer", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-1279", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-04-24", status:"Open" },
  { id:"PO-1280", vendor:"200Ltr Drums", project:"Zinnia", material:"200Ltr Drums", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1281", vendor:"Xerox Exepense", project:"Zinnia", material:"Xerox Exepense", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1282", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1283", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1284", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1285", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1286", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1287", vendor:"Prashant Jachak", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1288", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1289", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-1290", vendor:"Prashant Jachak", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-04-27", status:"Open" },
  { id:"PO-1291", vendor:"Binding Wire Zinnia", project:"Zinnia", material:"Binding Wire Zinnia", qty:1, unit:"Lump", rate:1988.0, gst:0, delivery:"2025-04-28", status:"Open" },
  { id:"PO-1292", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:162500.0, gst:0, delivery:"2025-04-29", status:"Open" },
  { id:"PO-1293", vendor:"Stamp Expense", project:"Zinnia", material:"Stamp", qty:1, unit:"Lump", rate:250.0, gst:0, delivery:"2025-04-29", status:"Open" },
  { id:"PO-1294", vendor:"Prashant Jachak", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-04-29", status:"Open" },
  { id:"PO-1295", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:232900.0, gst:0, delivery:"2025-04-29", status:"Open" },
  { id:"PO-1296", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:81250.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-1297", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-1298", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-1299", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1300", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Vihan Jain (Shantai Traders)", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1301", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:224540.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1302", vendor:"Rajesh Lambe", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:60000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1303", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Murum Filling", qty:1, unit:"Lump", rate:38400.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1304", vendor:"Sandip jadhav", project:"Zinnia", material:"Fly ash brick", qty:1, unit:"Lump", rate:61800.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1305", vendor:"Kisan Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1306", vendor:"Prashant Jachak", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:102000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1307", vendor:"Vitthal Nursary", project:"Zinnia", material:"Plantation", qty:1, unit:"Lump", rate:57830.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1308", vendor:"Mahesh Patil", project:"Zinnia", material:"Roofing Agency", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-1309", vendor:"Steel Vehicle", project:"Zinnia", material:"8mm=7.05MT 10mm=5.2MT 12 mm= 2.52 MT 16mm=1.00MT Total=15.57MT", qty:1, unit:"Lump", rate:934200.0, gst:0, delivery:"2025-05-02", status:"Open" },
  { id:"PO-1310", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-1311", vendor:"Steel Vehicle", project:"Zinnia", material:"Steel vehicle", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-1312", vendor:"Steel Vehicle", project:"Zinnia", material:"Steel vehicle", qty:1, unit:"Lump", rate:25650.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-1313", vendor:"Gorakh Chavan", project:"Zinnia", material:"Plumbing material", qty:1, unit:"Lump", rate:2630.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-1314", vendor:"Prashant Jachak", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-1315", vendor:"Prashant Jachak", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-05-05", status:"Open" },
  { id:"PO-1316", vendor:"Cement Transportation", project:"Zinnia", material:"Cement Transportation", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-05-06", status:"Open" },
  { id:"PO-1317", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:81250.0, gst:0, delivery:"2025-05-06", status:"Open" },
  { id:"PO-1318", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:213250.0, gst:0, delivery:"2025-05-07", status:"Open" },
  { id:"PO-1319", vendor:"Tarpolin", project:"Zinnia", material:"Trapolin", qty:1, unit:"Lump", rate:3300.0, gst:0, delivery:"2025-05-07", status:"Open" },
  { id:"PO-1320", vendor:"Generator", project:"Zinnia", material:"Generator", qty:1, unit:"Lump", rate:11564.0, gst:0, delivery:"2025-05-08", status:"Open" },
  { id:"PO-1321", vendor:"Nilesh Fabricator", project:"Zinnia", material:"Arch Wall Farma", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-05-08", status:"Delivered" },
  { id:"PO-1322", vendor:"Diesel for generator", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:2752.0, gst:0, delivery:"2025-05-12", status:"Open" },
  { id:"PO-1323", vendor:"Diesel for generator", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-1324", vendor:"Transportation", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-1325", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-1326", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-1327", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-1328", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:113600.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-1329", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-1330", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:119600.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1331", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:77500.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1332", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:360250.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1333", vendor:"Ravindra Jain", project:"Zinnia", material:"Swimming pool Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1334", vendor:"Prashant Jachak", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:68000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1335", vendor:"Binding Wire Zinnia", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:5150.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1336", vendor:"Mauli Enterprises", project:"Zinnia", material:"Generator", qty:1, unit:"Lump", rate:11564.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1337", vendor:"Gopal Bhau", project:"Zinnia", material:"Pickup Transport", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-1338", vendor:"Gopal Bhau", project:"Zinnia", material:"Pipeline Expense", qty:1, unit:"Lump", rate:2750.0, gst:0, delivery:"2025-05-17", status:"Delivered" },
  { id:"PO-1339", vendor:"Cable Expenses", project:"Zinnia", material:"Cable Expenses", qty:1, unit:"Lump", rate:34342.0, gst:0, delivery:"2025-05-17", status:"Delivered" },
  { id:"PO-1340", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:82500.0, gst:0, delivery:"2025-05-18", status:"Open" },
  { id:"PO-1341", vendor:"Stationary Expense", project:"Zinnia", material:"Stationary Expense", qty:1, unit:"Lump", rate:200.0, gst:0, delivery:"2025-05-19", status:"Open" },
  { id:"PO-1342", vendor:"Labour Charges", project:"Zinnia", material:"Labour Charges", qty:1, unit:"Lump", rate:10500.0, gst:0, delivery:"2025-05-20", status:"Open" },
  { id:"PO-1343", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:131550.0, gst:0, delivery:"2025-05-21", status:"Open" },
  { id:"PO-1344", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:5400.0, gst:0, delivery:"2025-05-21", status:"Open" },
  { id:"PO-1345", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-05-23", status:"Delivered" },
  { id:"PO-1346", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:112600.0, gst:0, delivery:"2025-05-23", status:"Delivered" },
  { id:"PO-1347", vendor:"Ravindra Jain", project:"Zinnia", material:"Swimming pool Work", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-05-23", status:"Delivered" },
  { id:"PO-1348", vendor:"Nilesh Fabricator", project:"Zinnia", material:"Arch Wall Farma", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-05-23", status:"Delivered" },
  { id:"PO-1349", vendor:"Cable Expenses", project:"Zinnia", material:"Cable Expenses", qty:1, unit:"Lump", rate:14688.0, gst:0, delivery:"2025-05-23", status:"Delivered" },
  { id:"PO-1350", vendor:"Stationary Expense", project:"Zinnia", material:"Stationary Expense", qty:1, unit:"Lump", rate:250.0, gst:0, delivery:"2025-05-24", status:"Open" },
  { id:"PO-1351", vendor:"Nut bolts for Pharna", project:"Zinnia", material:"Nut bolts for Pharna", qty:1, unit:"Lump", rate:270.0, gst:0, delivery:"2025-05-24", status:"Open" },
  { id:"PO-1352", vendor:"Diesel for generator", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:2752.0, gst:0, delivery:"2025-05-25", status:"Open" },
  { id:"PO-1353", vendor:"Stationary Expense", project:"Zinnia", material:"Stationary Expense", qty:1, unit:"Lump", rate:945.0, gst:0, delivery:"2025-05-25", status:"Open" },
  { id:"PO-1354", vendor:"gardening", project:"Zinnia", material:"Gardening", qty:1, unit:"Lump", rate:9296.0, gst:0, delivery:"2025-05-25", status:"Open" },
  { id:"PO-1355", vendor:"Motar Repairy", project:"Zinnia", material:"Motar Repairy", qty:1, unit:"Lump", rate:6500.0, gst:0, delivery:"2025-05-25", status:"Open" },
  { id:"PO-1356", vendor:"gardening", project:"Zinnia", material:"Gardening", qty:1, unit:"Lump", rate:2910.0, gst:0, delivery:"2025-05-25", status:"Open" },
  { id:"PO-1357", vendor:"Cover Blocks", project:"Zinnia", material:"200D", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-05-26", status:"Open" },
  { id:"PO-1358", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2025-05-26", status:"Open" },
  { id:"PO-1359", vendor:"Diesel for generator", project:"Zinnia", material:"Diesel", qty:1, unit:"Lump", rate:2752.0, gst:0, delivery:"2025-05-26", status:"Open" },
  { id:"PO-1360", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:48750.0, gst:0, delivery:"2025-05-26", status:"Open" },
  { id:"PO-1361", vendor:"Pappu Phadol", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:25800.0, gst:0, delivery:"2025-05-27", status:"Open" },
  { id:"PO-1362", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:181500.0, gst:0, delivery:"2025-05-28", status:"Open" },
  { id:"PO-1363", vendor:"Departmental Work", project:"Zinnia", material:"Departmental Work", qty:1, unit:"Lump", rate:12900.0, gst:0, delivery:"2025-05-28", status:"Open" },
  { id:"PO-1364", vendor:"Sagar Pawar", project:"Zinnia", material:"Building Material", qty:1, unit:"Lump", rate:151400.0, gst:0, delivery:"2025-05-29", status:"Delivered" },
  { id:"PO-1365", vendor:"Vihan Jain (Shantai Traders)", project:"Zinnia", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-05-29", status:"Delivered" },
  { id:"PO-1366", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Work", qty:1, unit:"Lump", rate:218750.0, gst:0, delivery:"2025-05-29", status:"Delivered" },
  { id:"PO-1367", vendor:"Ravindra Jain", project:"Zinnia", material:"Swimming pool Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-05-29", status:"Delivered" },
  { id:"PO-1368", vendor:"Dewashish Construction", project:"Zinnia", material:"Cement Ultra Tech", qty:1, unit:"Lump", rate:17250.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-1369", vendor:"Gorakh Chavan", project:"Zinnia", material:"Binding Wire", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-1370", vendor:"Sagar Pawar", project:"Zinnia", material:"80mm Metal", qty:1, unit:"Lump", rate:19800.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-1371", vendor:"Sagar Pawar", project:"Zinnia", material:"20mm Metal", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-1372", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-1373", vendor:"Sagar Pawar", project:"Zinnia", material:"Wash Sand", qty:1, unit:"Lump", rate:10600.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-1374", vendor:"Transportation CCTV", project:"Zinnia", material:"Transportation CCTV", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-06-01", status:"Open" },
  { id:"PO-1375", vendor:"PMC", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-06-03", status:"Delivered" },
  { id:"PO-1376", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:65000.0, gst:0, delivery:"2025-06-03", status:"Open" },
  { id:"PO-1377", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:191350.0, gst:0, delivery:"2025-06-03", status:"Open" },
  { id:"PO-1378", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:157500.0, gst:0, delivery:"2025-06-07", status:"Open" },
  { id:"PO-1379", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:133750.0, gst:0, delivery:"2025-06-10", status:"Open" },
  { id:"PO-1380", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:79600.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-1381", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:233800.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-1382", vendor:"Shivaji Pawar", project:"Zinnia", material:"Advance", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-1383", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-1384", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-1385", vendor:"Satija Stones", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-1386", vendor:"Pardhi Zinnia Murum filling", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-1387", vendor:"Ankit Self Expense", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:6500.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-1388", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:132800.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1389", vendor:"Cement Transport Total", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1390", vendor:"Cement Transport Total", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1391", vendor:"Wireman Zinnia", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:700.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1392", vendor:"Zinnia Shade", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1393", vendor:"Cement Shifting", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:1700.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1394", vendor:"Zinnia Bamboo", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1395", vendor:"Zinnia Hardware Khurpe", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:350.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1396", vendor:"Zinnia Hardware", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:340.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1397", vendor:"Zinnia Cable & Boards", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:2750.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1398", vendor:"Generator Shifting", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1399", vendor:"Zinnia Wiremen", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1400", vendor:"Zinnia Dam Motar Expenses", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1401", vendor:"Zinnia Hardware", project:"Zinnia", material:"Gopal Bhau", qty:1, unit:"Lump", rate:340.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-1402", vendor:"Stone factory Bhopal (Manda", project:"Zinnia", material:"Radical Infraventures Pvt.Ltd", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1403", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100800.0, gst:0, delivery:"2025-06-19", status:"Delivered" },
  { id:"PO-1404", vendor:"Shantai Traders (Vihan jain)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1405", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:164150.0, gst:0, delivery:"2025-06-19", status:"Delivered" },
  { id:"PO-1406", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:125000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1407", vendor:"Sandip Jadhav", project:"Zinnia", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1408", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1409", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25318.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1410", vendor:"Devta JCB", project:"Zinnia", material:"JCB Swimming pool", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1411", vendor:"Devta JCB", project:"Zinnia", material:"JCB Murum Filling", qty:1, unit:"Lump", rate:33800.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-1412", vendor:"Sutali Bundal", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2025-06-21", status:"Open" },
  { id:"PO-1413", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:31750.0, gst:0, delivery:"2025-06-24", status:"Open" },
  { id:"PO-1414", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:68000.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-1415", vendor:"Pappu Phadole", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:67850.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-1416", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:36900.0, gst:0, delivery:"2025-07-01", status:"Open" },
  { id:"PO-1417", vendor:"Shivaji Pawar", project:"Zinnia", material:"RCC Contractor", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-03", status:"Delivered" },
  { id:"PO-1418", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-1419", vendor:"Yash Entrprices", project:"Zinnia", material:"Drip Material", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-1420", vendor:"Petrol Sai", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100.0, gst:0, delivery:"2025-07-16", status:"Open" },
  { id:"PO-1421", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:31000.0, gst:0, delivery:"2025-07-17", status:"Delivered" },
  { id:"PO-1422", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-1423", vendor:"Yash Entrprices", project:"Zinnia", material:"Drip Material", qty:1, unit:"Lump", rate:28412.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-1424", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-1425", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-1426", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7732.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-1427", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-07-20", status:"Open" },
  { id:"PO-1428", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20800.0, gst:0, delivery:"2025-07-22", status:"Open" },
  { id:"PO-1429", vendor:"MSEB Bill", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:11020.0, gst:0, delivery:"2025-07-31", status:"Open" },
  { id:"PO-1430", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:68400.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-1431", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20800.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-1432", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-1433", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Plot 39 & 41 Murum Filing", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-1434", vendor:"MSEB", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:11020.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-1435", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:24000.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-1436", vendor:"Ishwar Petrol & Kirana", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-1437", vendor:"Basin West Pipe", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:180.0, gst:0, delivery:"2025-08-05", status:"Open" },
  { id:"PO-1438", vendor:"Sutali", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:395.0, gst:0, delivery:"2025-08-05", status:"Open" },
  { id:"PO-1439", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:48500.0, gst:0, delivery:"2025-08-12", status:"Open" },
  { id:"PO-1440", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-1441", vendor:"Ravindra Jain", project:"Zinnia", material:"ID 2068774037", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-08-15", status:"Open" },
  { id:"PO-1442", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-08-15", status:"Delivered" },
  { id:"PO-1443", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-1444", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-1445", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:102300.0, gst:0, delivery:"2025-08-19", status:"Open" },
  { id:"PO-1446", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4200.0, gst:0, delivery:"2025-08-19", status:"Open" },
  { id:"PO-1447", vendor:"Shantai Traders (Vihan jain)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:12800.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1448", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-08-21", status:"Delivered" },
  { id:"PO-1449", vendor:"Ravindra Jain", project:"Zinnia", material:"ID 2074584342", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1450", vendor:"Zinnia murum Filing", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:29400.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1451", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1452", vendor:"Ganpat Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1453", vendor:"Tractor Zugare", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2800.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1454", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1250.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1455", vendor:"Ankit Self Expense", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1540.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1456", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:3675.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-1457", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:29600.0, gst:0, delivery:"2025-08-27", status:"Open" },
  { id:"PO-1458", vendor:"Prashant Jachak", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:38000.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-1459", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:19000.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-1460", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:655.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-1461", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:90800.0, gst:0, delivery:"2025-09-17", status:"Open" },
  { id:"PO-1462", vendor:"Mohit Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-09-19", status:"Open" },
  { id:"PO-1463", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:105950.0, gst:0, delivery:"2025-09-19", status:"Delivered" },
  { id:"PO-1464", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-1465", vendor:"Hariom Cement Tushar Bhau", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:30500.0, gst:0, delivery:"2025-09-21", status:"Delivered" },
  { id:"PO-1466", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:158800.0, gst:0, delivery:"2025-09-24", status:"Open" },
  { id:"PO-1467", vendor:"Steel Vehicle", project:"Zinnia", material:"Through Sai", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-25", status:"Open" },
  { id:"PO-1468", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:118600.0, gst:0, delivery:"2025-10-01", status:"Open" },
  { id:"PO-1469", vendor:"Jalna Steel", project:"Zinnia", material:"Steel 8mm=6.020 10mm=4.020 12mm=6.020 16mm =4.000", qty:1, unit:"Lump", rate:1204800.0, gst:0, delivery:"2025-10-02", status:"Open" },
  { id:"PO-1470", vendor:"Jalna Steel", project:"Zinnia", material:"Steel 8mm=6.020 10mm=4.020 12mm=6.000 16mm =4.000", qty:1, unit:"Lump", rate:1203600.0, gst:0, delivery:"2025-10-02", status:"Open" },
  { id:"PO-1471", vendor:"Tractor Trolley", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-10-02", status:"Open" },
  { id:"PO-1472", vendor:"Tractor Trolley", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-05", status:"Open" },
  { id:"PO-1473", vendor:"Tractor Trolley", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-10-06", status:"Open" },
  { id:"PO-1474", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100400.0, gst:0, delivery:"2025-10-08", status:"Open" },
  { id:"PO-1475", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-10-09", status:"Open" },
  { id:"PO-1476", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-10-09", status:"Open" },
  { id:"PO-1477", vendor:"Hariom Cement Tushar Bhau", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:109800.0, gst:0, delivery:"2025-10-09", status:"Delivered" },
  { id:"PO-1478", vendor:"Gopal Bhau", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-10-09", status:"Open" },
  { id:"PO-1479", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7900.0, gst:0, delivery:"2025-10-09", status:"Open" },
  { id:"PO-1480", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:147500.0, gst:0, delivery:"2025-10-11", status:"Open" },
  { id:"PO-1481", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:147500.0, gst:0, delivery:"2025-10-12", status:"Open" },
  { id:"PO-1482", vendor:"Bardan Expense", project:"Zinnia", material:"(Thakkar & CO) DBS Bank", qty:1, unit:"Lump", rate:26000.0, gst:0, delivery:"2025-10-13", status:"Open" },
  { id:"PO-1483", vendor:"Aadi Industries LDPE Sheets", project:"Zinnia", material:"DBS Bank", qty:1, unit:"Lump", rate:76200.0, gst:0, delivery:"2025-10-14", status:"Open" },
  { id:"PO-1484", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:119110.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-1485", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:141400.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-1486", vendor:"Milap Enterprises (HDPE Pipe)", project:"Zinnia", material:"528814976768", qty:1, unit:"Lump", rate:31890.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-1487", vendor:"Hydra Crane", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-10-18", status:"Open" },
  { id:"PO-1488", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:138500.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1489", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:138500.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1490", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:138500.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1491", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-10-17", status:"Delivered" },
  { id:"PO-1492", vendor:"Vahule Roller", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:12000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1493", vendor:"Nilesh Pawar", project:"Zinnia", material:"Trimix Work", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1494", vendor:"Bhagavati Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1495", vendor:"Mohit Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:33600.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1496", vendor:"Gopal Bhau", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:21400.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1497", vendor:"Sahil Bhau Chota Hatti", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1498", vendor:"Rokade", project:"Zinnia", material:"JCB Work", qty:1, unit:"Lump", rate:8800.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1499", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:400000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1500", vendor:"Ankit Self Expense", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1501", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:13400.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1502", vendor:"Shravan Transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4500.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-1503", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:146200.0, gst:0, delivery:"2025-10-29", status:"Open" },
  { id:"PO-1504", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4800.0, gst:0, delivery:"2025-10-29", status:"Open" },
  { id:"PO-1505", vendor:"Mohit Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:33600.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1506", vendor:"Akshay Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:30600.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1507", vendor:"Rafiq Khan", project:"Zinnia", material:"Kit", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1508", vendor:"Nashik Cable", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:87928.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1509", vendor:"Pappu Phadole", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1510", vendor:"Jay Durga Earthmovers", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:36500.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1511", vendor:"Shantai Traders (Vihan jain)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1512", vendor:"Shivkrupa Steel ( Tushar Bhau)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1513", vendor:"Ankit Self Expense", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1514", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-10-31", status:"Delivered" },
  { id:"PO-1515", vendor:"Tractor Zugare", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1516", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:17000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-1517", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:97900.0, gst:0, delivery:"2025-11-05", status:"Open" },
  { id:"PO-1518", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7200.0, gst:0, delivery:"2025-11-05", status:"Open" },
  { id:"PO-1519", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-07", status:"Delivered" },
  { id:"PO-1520", vendor:"Pappu Phadole", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10200.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-1521", vendor:"Tractor Zugare", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-1522", vendor:"Pile Tractor", project:"Zinnia", material:"Driver", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-1523", vendor:"Ankit Self Expense", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:3550.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-1524", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:700000.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-1525", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-11-07", status:"Delivered" },
  { id:"PO-1526", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:116300.0, gst:0, delivery:"2025-11-12", status:"Open" },
  { id:"PO-1527", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2025-11-12", status:"Open" },
  { id:"PO-1528", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-14", status:"Open" },
  { id:"PO-1529", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-11-14", status:"Delivered" },
  { id:"PO-1530", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-11-14", status:"Open" },
  { id:"PO-1531", vendor:"Sumit Art Tranportation", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-11-15", status:"Open" },
  { id:"PO-1532", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-11-16", status:"Open" },
  { id:"PO-1533", vendor:"Ravindra Jain", project:"Zinnia", material:"ID 2177257497", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-11-19", status:"Open" },
  { id:"PO-1534", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:106400.0, gst:0, delivery:"2025-11-19", status:"Open" },
  { id:"PO-1535", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:9600.0, gst:0, delivery:"2025-11-19", status:"Open" },
  { id:"PO-1536", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1537", vendor:"Mohit Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:33600.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1538", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1539", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:230000.0, gst:0, delivery:"2025-11-20", status:"Delivered" },
  { id:"PO-1540", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:788800.0, gst:0, delivery:"2025-11-20", status:"Delivered" },
  { id:"PO-1541", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:42300.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1542", vendor:"Tractor Zugare", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25050.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1543", vendor:"Paradhi Murum Filing", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:42300.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1544", vendor:"Ganpat Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:9875.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1545", vendor:"Ramdas Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-1546", vendor:"Hariom Cement Tushar Bhau", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:106200.0, gst:0, delivery:"2025-11-20", status:"Delivered" },
  { id:"PO-1547", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:134000.0, gst:0, delivery:"2025-11-26", status:"Open" },
  { id:"PO-1548", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:134000.0, gst:0, delivery:"2025-11-26", status:"Open" },
  { id:"PO-1549", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:161000.0, gst:0, delivery:"2025-11-26", status:"Open" },
  { id:"PO-1550", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:134000.0, gst:0, delivery:"2025-11-28", status:"Open" },
  { id:"PO-1551", vendor:"Ravate", project:"Zinnia", material:"Electrical Work", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1552", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-11-29", status:"Delivered" },
  { id:"PO-1553", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1554", vendor:"Sanjay Mama", project:"Zinnia", material:"Office Expencess", qty:1, unit:"Lump", rate:1348.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1555", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1556", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1557", vendor:"Mohit Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:32100.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1558", vendor:"Vishnu Minde Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1559", vendor:"Shravan Transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1560", vendor:"Ankit Self Expense", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1561", vendor:"Road Work Departmental Payment", project:"Zinnia", material:"Zinnia Road Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1562", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:323620.0, gst:0, delivery:"2025-11-29", status:"Delivered" },
  { id:"PO-1563", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1564", vendor:"Tile Unloading payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:16600.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1565", vendor:"Tile Unloading payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:5700.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1566", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1884.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1567", vendor:"CM Logistic", project:"Zinnia", material:"Tile Transport", qty:1, unit:"Lump", rate:96000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1568", vendor:"CM Logistic", project:"Zinnia", material:"Tile Transport", qty:1, unit:"Lump", rate:29000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1569", vendor:"CM Logistic", project:"Zinnia", material:"Tile Transport", qty:1, unit:"Lump", rate:98500.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1570", vendor:"CM Logistic", project:"Zinnia", material:"Tile Transport", qty:1, unit:"Lump", rate:6500.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1571", vendor:"CM Logistic", project:"Zinnia", material:"Tile Transport", qty:1, unit:"Lump", rate:92690.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-1572", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:226900.0, gst:0, delivery:"2025-12-03", status:"Open" },
  { id:"PO-1573", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:8400.0, gst:0, delivery:"2025-12-03", status:"Open" },
  { id:"PO-1574", vendor:"CM Logistic", project:"Zinnia", material:"Tile Transport", qty:1, unit:"Lump", rate:152500.0, gst:0, delivery:"2025-12-03", status:"Open" },
  { id:"PO-1575", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-12-04", status:"Open" },
  { id:"PO-1576", vendor:"Mohit Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:16800.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1577", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:194800.0, gst:0, delivery:"2025-12-06", status:"Delivered" },
  { id:"PO-1578", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:119000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1579", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1580", vendor:"Vishnu Minde Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:9600.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1581", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:24000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1582", vendor:"H frames Set", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:41000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1583", vendor:"Tile Unloading payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:6500.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1584", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1550.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1585", vendor:"Ankit Self Expense", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1586", vendor:"CM Logistic", project:"Zinnia", material:"Tile Transport", qty:1, unit:"Lump", rate:94000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-1587", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2025-12-10", status:"Open" },
  { id:"PO-1588", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:281500.0, gst:0, delivery:"2025-12-10", status:"Open" },
  { id:"PO-1589", vendor:"Ravate", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-12-12", status:"Open" },
  { id:"PO-1590", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-1591", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:229710.0, gst:0, delivery:"2025-12-13", status:"Delivered" },
  { id:"PO-1592", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:265650.0, gst:0, delivery:"2025-12-13", status:"Delivered" },
  { id:"PO-1593", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-1594", vendor:"Sachin Kakad", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:15700.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-1595", vendor:"Drums", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:3750.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-1596", vendor:"Milap Enterprises (HDPE Pipe)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7200.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-1597", vendor:"Chinmay Hardware", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7830.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-1598", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-1599", vendor:"Grass Cutting", project:"Zinnia", material:"ID 2207790209", qty:1, unit:"Lump", rate:1100.0, gst:0, delivery:"2025-12-16", status:"Open" },
  { id:"PO-1600", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:223200.0, gst:0, delivery:"2025-12-17", status:"Open" },
  { id:"PO-1601", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:5700.0, gst:0, delivery:"2025-12-17", status:"Open" },
  { id:"PO-1602", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:406000.0, gst:0, delivery:"2025-12-18", status:"Delivered" },
  { id:"PO-1603", vendor:"Mahesh Patil", project:"Zinnia", material:"Labour Shade", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1604", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1605", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:123000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1606", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:305660.0, gst:0, delivery:"2025-12-18", status:"Delivered" },
  { id:"PO-1607", vendor:"Hariom Cement Tushar Bhau", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:102600.0, gst:0, delivery:"2025-12-18", status:"Delivered" },
  { id:"PO-1608", vendor:"Water Filter", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:38000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1609", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1610", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1611", vendor:"Pappu Phadole", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:24510.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1612", vendor:"Cover Blocks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:3712.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1613", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:198.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-1614", vendor:"Diesel", project:"Zinnia", material:"Tractor", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-12-20", status:"Open" },
  { id:"PO-1615", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-21", status:"Open" },
  { id:"PO-1616", vendor:"R N Enterprices", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:42041.0, gst:0, delivery:"2025-12-22", status:"Open" },
  { id:"PO-1617", vendor:"Water Filter", project:"Zinnia", material:"Ravate", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-12-22", status:"Open" },
  { id:"PO-1618", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:227200.0, gst:0, delivery:"2025-12-23", status:"Open" },
  { id:"PO-1619", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2800.0, gst:0, delivery:"2025-12-23", status:"Open" },
  { id:"PO-1620", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID 221547064", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-12-23", status:"Open" },
  { id:"PO-1621", vendor:"Nashik Cable", project:"Zinnia", material:"ID 2215579922", qty:1, unit:"Lump", rate:26666.0, gst:0, delivery:"2025-12-23", status:"Open" },
  { id:"PO-1622", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-12-23", status:"Open" },
  { id:"PO-1623", vendor:"Hariom Cement Tushar Bhau", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:102600.0, gst:0, delivery:"2025-12-23", status:"Delivered" },
  { id:"PO-1624", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:160800.0, gst:0, delivery:"2025-12-24", status:"Open" },
  { id:"PO-1625", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID 2219031834", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2025-12-26", status:"Open" },
  { id:"PO-1626", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:216900.0, gst:0, delivery:"2025-12-27", status:"Delivered" },
  { id:"PO-1627", vendor:"Nilesh Pawar", project:"Zinnia", material:"Trimix Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1628", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1629", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1630", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2025-12-27", status:"Delivered" },
  { id:"PO-1631", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:31450.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1632", vendor:"Chaitanya Earthmovers", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:3750.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1633", vendor:"Tractor Zugare", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4950.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1634", vendor:"Ramdas Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1700.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1635", vendor:"Shiv Earthmovers", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:53150.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1636", vendor:"Shravan Paradhi", project:"Zinnia", material:"Murum", qty:1, unit:"Lump", rate:5550.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1637", vendor:"Murum Transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1638", vendor:"Somnath Shirsagar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1639", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1640", vendor:"Water Filter", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:2100.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1641", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-1642", vendor:"Pravin Bhavsar Rohit Ele (Arihant Steel)", project:"Zinnia", material:"ID 2219979662", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-12-28", status:"Open" },
  { id:"PO-1643", vendor:"Pravin Bhavsar Rohit Ele (Arihant Steel)", project:"Zinnia", material:"ID 2219980197", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-12-28", status:"Open" },
  { id:"PO-1644", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:275150.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1645", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID 2222876629", qty:1, unit:"Lump", rate:96000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1646", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1647", vendor:"shivaji pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:366800.0, gst:0, delivery:"2025-12-31", status:"Delivered" },
  { id:"PO-1648", vendor:"ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1649", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1650", vendor:"sagar pawar", project:"Zinnia", material:"cement", qty:1, unit:"Lump", rate:89900.0, gst:0, delivery:"2025-12-31", status:"Delivered" },
  { id:"PO-1651", vendor:"sagar pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:47560.0, gst:0, delivery:"2025-12-31", status:"Delivered" },
  { id:"PO-1652", vendor:"Raju kumavat Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1519000.0, gst:0, delivery:"2025-12-31", status:"Delivered" },
  { id:"PO-1653", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:75000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1654", vendor:"Pranay Shah", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1655", vendor:"RCC Designer", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-1656", vendor:"Fertilizer transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2026-01-03", status:"Open" },
  { id:"PO-1657", vendor:"Cement unloading chrges(Dept. labours)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2026-01-03", status:"Open" },
  { id:"PO-1658", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:160800.0, gst:0, delivery:"2026-01-04", status:"Open" },
  { id:"PO-1659", vendor:"ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-01-06", status:"Open" },
  { id:"PO-1660", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID 2231615997", qty:1, unit:"Lump", rate:51200.0, gst:0, delivery:"2026-01-07", status:"Open" },
  { id:"PO-1661", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:113900.0, gst:0, delivery:"2026-01-07", status:"Open" },
  { id:"PO-1662", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID 2231617102", qty:1, unit:"Lump", rate:33502.0, gst:0, delivery:"2026-01-07", status:"Open" },
  { id:"PO-1663", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:236600.0, gst:0, delivery:"2026-01-08", status:"Open" },
  { id:"PO-1664", vendor:"shivaji pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:218000.0, gst:0, delivery:"2026-01-10", status:"Delivered" },
  { id:"PO-1665", vendor:"sagar pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:314360.0, gst:0, delivery:"2026-01-10", status:"Delivered" },
  { id:"PO-1666", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:37000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1667", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1668", vendor:"RCC Designer", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1669", vendor:"Vishnu Minde Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1900.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1670", vendor:"Shravan Transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1671", vendor:"Sahil Bhau Chota Hatti", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1672", vendor:"Sachin Kakad", project:"Zinnia", material:"motor", qty:1, unit:"Lump", rate:15900.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1673", vendor:"BSNL Bill", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:706.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1674", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1675", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-1676", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:217000.0, gst:0, delivery:"2026-01-13", status:"Open" },
  { id:"PO-1677", vendor:"Pravin Bhavsar Rohit Ele", project:"Zinnia", material:"ID - 2244794002", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2026-01-17", status:"Open" },
  { id:"PO-1678", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID2244931382", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2026-01-17", status:"Open" },
  { id:"PO-1679", vendor:"mahesh patil ( Darshana)", project:"Zinnia", material:"DBS Bank", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2026-01-17", status:"Open" },
  { id:"PO-1680", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150400.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1681", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1682", vendor:"shivaji pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:266000.0, gst:0, delivery:"2026-01-20", status:"Delivered" },
  { id:"PO-1683", vendor:"Raju kumavat Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-01-20", status:"Delivered" },
  { id:"PO-1684", vendor:"Zugare Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:21900.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1685", vendor:"Paradhi Murum Filing", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:8600.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1686", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:58000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1687", vendor:"Rokade tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:22500.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1688", vendor:"Shrawan pardhi Murum Filling", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1689", vendor:"Nilesh fabricator", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:17000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1690", vendor:"Sahil Bhau Chota Hatti", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-1691", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-01-20", status:"Delivered" },
  { id:"PO-1692", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID22449321031", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-01-21", status:"Open" },
  { id:"PO-1693", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID2250294552", qty:1, unit:"Lump", rate:54400.0, gst:0, delivery:"2026-01-22", status:"Open" },
  { id:"PO-1694", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1695", vendor:"Nilesh pawar", project:"Zinnia", material:"Trimix Work", qty:1, unit:"Lump", rate:80000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1696", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:146740.0, gst:0, delivery:"2026-01-27", status:"Delivered" },
  { id:"PO-1697", vendor:"Raju kumavat Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-01-27", status:"Delivered" },
  { id:"PO-1698", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1699", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1700", vendor:"Pravin Bhavsar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1701", vendor:"Dilip tayade", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1702", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:183550.0, gst:0, delivery:"2026-01-27", status:"Delivered" },
  { id:"PO-1703", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1704", vendor:"ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1705", vendor:"rokade JCB", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:34500.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1706", vendor:"Vishnu Minde Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:5200.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1707", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:23590.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1708", vendor:"Pravin Bhavsar (arihant Steel )", project:"Zinnia", material:"ID2254127418", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-1709", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:219600.0, gst:0, delivery:"2026-01-28", status:"Open" },
  { id:"PO-1710", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:3600.0, gst:0, delivery:"2026-01-28", status:"Open" },
  { id:"PO-1711", vendor:"DG Set", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:406000.0, gst:0, delivery:"2026-01-28", status:"Open" },
  { id:"PO-1712", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:171000.0, gst:0, delivery:"2026-02-04", status:"Open" },
  { id:"PO-1713", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:297550.0, gst:0, delivery:"2026-02-04", status:"Open" },
  { id:"PO-1714", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:325000.0, gst:0, delivery:"2026-02-05", status:"Delivered" },
  { id:"PO-1715", vendor:"Chetan Shelke Pile Work", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2026-02-05", status:"Open" },
  { id:"PO-1716", vendor:"sagar Pawar", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:94400.0, gst:0, delivery:"2026-02-05", status:"Delivered" },
  { id:"PO-1717", vendor:"Rokade JCB", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-02-05", status:"Open" },
  { id:"PO-1718", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:80000.0, gst:0, delivery:"2026-02-06", status:"Open" },
  { id:"PO-1719", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID2266153244", qty:1, unit:"Lump", rate:54400.0, gst:0, delivery:"2026-02-06", status:"Open" },
  { id:"PO-1720", vendor:"ravindra Jain", project:"Zinnia", material:"ID2266253008", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-06", status:"Open" },
  { id:"PO-1721", vendor:"Mahesh Patil (Darshana)", project:"Zinnia", material:"DBS Bank", qty:1, unit:"Lump", rate:400000.0, gst:0, delivery:"2026-02-06", status:"Open" },
  { id:"PO-1722", vendor:"Mauli Chemicals", project:"Zinnia", material:"ID2266444796", qty:1, unit:"Lump", rate:31226.0, gst:0, delivery:"2026-02-06", status:"Open" },
  { id:"PO-1723", vendor:"CM Logistic", project:"Zinnia", material:"Transportation", qty:1, unit:"Lump", rate:75000.0, gst:0, delivery:"2026-02-06", status:"Open" },
  { id:"PO-1724", vendor:"Morabi Tiles", project:"Zinnia", material:"Cygenmorabi", qty:1, unit:"Lump", rate:445616.0, gst:0, delivery:"2026-02-07", status:"Open" },
  { id:"PO-1725", vendor:"Marfil Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:193966.0, gst:0, delivery:"2026-02-07", status:"Open" },
  { id:"PO-1726", vendor:"Ravindra Jain", project:"Zinnia", material:"ID2269830189", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2026-02-08", status:"Open" },
  { id:"PO-1727", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:313650.0, gst:0, delivery:"2026-02-10", status:"Open" },
  { id:"PO-1728", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2026-02-10", status:"Open" },
  { id:"PO-1729", vendor:"Nashik Cable", project:"Zinnia", material:"ID2273346782", qty:1, unit:"Lump", rate:27158.0, gst:0, delivery:"2026-02-10", status:"Open" },
  { id:"PO-1730", vendor:"Transportation", project:"Zinnia", material:"Plumbing Material", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2026-02-10", status:"Open" },
  { id:"PO-1731", vendor:"Tractor Servicing Via Sai", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:5534.0, gst:0, delivery:"2026-02-10", status:"Open" },
  { id:"PO-1732", vendor:"Tile Unloading payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:6500.0, gst:0, delivery:"2026-02-11", status:"Open" },
  { id:"PO-1733", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID2275719362", qty:1, unit:"Lump", rate:54400.0, gst:0, delivery:"2026-02-12", status:"Open" },
  { id:"PO-1734", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID2275725869", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-02-12", status:"Open" },
  { id:"PO-1735", vendor:"Dilip Manvatkar", project:"Zinnia", material:"Beam Breaking", qty:1, unit:"Lump", rate:5100.0, gst:0, delivery:"2026-02-12", status:"Open" },
  { id:"PO-1736", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2026-02-12", status:"Open" },
  { id:"PO-1737", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:350000.0, gst:0, delivery:"2026-02-12", status:"Delivered" },
  { id:"PO-1738", vendor:"national cement Pipe", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2026-02-12", status:"Open" },
  { id:"PO-1739", vendor:"Tanhaji RD developer", project:"Zinnia", material:"Red Soil", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-12", status:"Open" },
  { id:"PO-1740", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:334080.0, gst:0, delivery:"2026-02-12", status:"Delivered" },
  { id:"PO-1741", vendor:"Mahesh Patil (Darshana)", project:"Zinnia", material:"ID2277771626", qty:1, unit:"Lump", rate:240000.0, gst:0, delivery:"2026-02-14", status:"Open" },
  { id:"PO-1742", vendor:"Rokade JCB", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1743", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:166000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1744", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1745", vendor:"PMC", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-02-16", status:"Delivered" },
  { id:"PO-1746", vendor:"Diesel petrol pump", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1747", vendor:"Pranay Shah", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1748", vendor:"Tanhaji RD developer", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:82000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1749", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1750", vendor:"Somnath Shirsagar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1751", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-02-16", status:"Delivered" },
  { id:"PO-1752", vendor:"RD Land Developeer", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1753", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-1754", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:248400.0, gst:0, delivery:"2026-02-17", status:"Open" },
  { id:"PO-1755", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2200.0, gst:0, delivery:"2026-02-17", status:"Open" },
  { id:"PO-1756", vendor:"Vakratund entraprises (rohan Date)", project:"Zinnia", material:"ID2281627329", qty:1, unit:"Lump", rate:3684.0, gst:0, delivery:"2026-02-18", status:"Open" },
  { id:"PO-1757", vendor:"Porter", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:350.0, gst:0, delivery:"2026-02-18", status:"Open" },
  { id:"PO-1758", vendor:"Jalna Steel", project:"Zinnia", material:"Steel 8mm=11.93 10mm=3.96 12mm=3.98", qty:1, unit:"Lump", rate:1192200.0, gst:0, delivery:"2026-02-20", status:"Open" },
  { id:"PO-1759", vendor:"Porter", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:916.0, gst:0, delivery:"2026-02-21", status:"Open" },
  { id:"PO-1760", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:240500.0, gst:0, delivery:"2026-02-25", status:"Open" },
  { id:"PO-1761", vendor:"Sambhaji patil Core Cutting", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1762", vendor:"Rokade JCB", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1763", vendor:"Rokade tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1764", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1765", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:9008.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1766", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1767", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:84000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1768", vendor:"Santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1769", vendor:"Raju pardhi murum filling", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:21750.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1770", vendor:"RD Land Developeer", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1771", vendor:"Zugare Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1772", vendor:"Vishnu Minde Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7800.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1773", vendor:"Ganpat Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1774", vendor:"Raju kumavat Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-02-26", status:"Delivered" },
  { id:"PO-1775", vendor:"Somnath Shirsagar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1776", vendor:"Diesel petrol pump", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1777", vendor:"Pranay Shah", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1778", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4450.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-1779", vendor:"Hariom Cement Tushar Bhau", project:"Zinnia", material:"Cement", qty:1, unit:"Lump", rate:102600.0, gst:0, delivery:"2026-02-28", status:"Delivered" },
  { id:"PO-1780", vendor:"Pravin Bhavsar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2026-03-02", status:"Open" },
  { id:"PO-1781", vendor:"Chemical Bag Transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:76000.0, gst:0, delivery:"2026-03-02", status:"Open" },
  { id:"PO-1782", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:214500.0, gst:0, delivery:"2026-03-04", status:"Open" },
  { id:"PO-1783", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:13800.0, gst:0, delivery:"2026-03-04", status:"Open" },
  { id:"PO-1784", vendor:"Tile Unloading payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:6200.0, gst:0, delivery:"2026-03-04", status:"Open" },
  { id:"PO-1785", vendor:"National cement Pipe", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1786", vendor:"Raju kumavat Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-08", status:"Delivered" },
  { id:"PO-1787", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1788", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1789", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:400000.0, gst:0, delivery:"2026-03-08", status:"Delivered" },
  { id:"PO-1790", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1791", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1792", vendor:"Somnath Shirsagar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1793", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:147500.0, gst:0, delivery:"2026-03-08", status:"Delivered" },
  { id:"PO-1794", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:75000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1795", vendor:"PMC", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-08", status:"Delivered" },
  { id:"PO-1796", vendor:"Tractor Zugare", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1797", vendor:"Paranchi Material", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1798", vendor:"Amol Gavali", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-1799", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:8850.0, gst:0, delivery:"2026-03-08", status:"Delivered" },
  { id:"PO-1800", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:160300.0, gst:0, delivery:"2026-03-11", status:"Open" },
  { id:"PO-1801", vendor:"Vishnu Minde Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2026-03-11", status:"Open" },
  { id:"PO-1802", vendor:"Vakratund entraprises (rohan Date)", project:"Zinnia", material:"ID 6019510337", qty:1, unit:"Lump", rate:87665.0, gst:0, delivery:"2026-03-11", status:"Open" },
  { id:"PO-1803", vendor:"Pravin Bhavsar", project:"Zinnia", material:"fabrication Work", qty:1, unit:"Lump", rate:400000.0, gst:0, delivery:"2026-03-12", status:"Open" },
  { id:"PO-1804", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:145000.0, gst:0, delivery:"2026-03-11", status:"Open" },
  { id:"PO-1805", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2026-03-14", status:"Open" },
  { id:"PO-1806", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2026-03-16", status:"Open" },
  { id:"PO-1807", vendor:"Asif Bhai Painter", project:"Zinnia", material:"No Screen shot Seen", qty:1, unit:"Lump", rate:236000.0, gst:0, delivery:"2026-03-16", status:"Open" },
  { id:"PO-1808", vendor:"Asif Bhai Painter", project:"Zinnia", material:"No Screen shot Seen", qty:1, unit:"Lump", rate:236000.0, gst:0, delivery:"2026-03-16", status:"Open" },
  { id:"PO-1809", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID 2313062465", qty:1, unit:"Lump", rate:54400.0, gst:0, delivery:"2026-03-16", status:"Open" },
  { id:"PO-1810", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID 2312886926", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-03-16", status:"Open" },
  { id:"PO-1811", vendor:"Raju kumavat Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-1812", vendor:"Somnath Shirsagar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1813", vendor:"Dilip tayade", project:"Zinnia", material:"Waterproofing Work", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1814", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:265060.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-1815", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1816", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:128300.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-1817", vendor:"PMC", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-1818", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:82000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1819", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"advance", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1820", vendor:"Vishnu Minde Water Tanker", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:12300.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1821", vendor:"MSEB", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:19700.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1822", vendor:"Sambhaji patil Core Cutting", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1823", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1824", vendor:"Diesel petrol pump", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1825", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4686.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1826", vendor:"Tractor Zugare", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:22820.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1827", vendor:"Ganpat Tractor", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:26220.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1828", vendor:"Raju Tractor", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:2100.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1829", vendor:"Rokade", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-1830", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:209400.0, gst:0, delivery:"2026-03-18", status:"Open" },
  { id:"PO-1831", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:9800.0, gst:0, delivery:"2026-03-18", status:"Open" },
  { id:"PO-1832", vendor:"Rafiq Khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-03-20", status:"Open" },
  { id:"PO-1833", vendor:"Universal Enterprises(Chamber Covers)", project:"Zinnia", material:"ID 231874487", qty:1, unit:"Lump", rate:11564.0, gst:0, delivery:"2026-03-21", status:"Open" },
  { id:"PO-1834", vendor:"Tractor Maintainance", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2026-03-21", status:"Open" },
  { id:"PO-1835", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-03-24", status:"Open" },
  { id:"PO-1836", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:175900.0, gst:0, delivery:"2026-03-25", status:"Open" },
  { id:"PO-1837", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7500.0, gst:0, delivery:"2026-03-25", status:"Open" },
  { id:"PO-1838", vendor:"Santosh pandit", project:"Zinnia", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-28", status:"Open" },
  { id:"PO-1839", vendor:"Ravindra Jain", project:"Zinnia", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-03-28", status:"Open" },
  { id:"PO-1840", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:130000.0, gst:0, delivery:"2026-03-29", status:"Delivered" },
  { id:"PO-1841", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:289500.0, gst:0, delivery:"2026-03-29", status:"Delivered" },
  { id:"PO-1842", vendor:"Dilip tayade", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1843", vendor:"Somnath Shirsagar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1844", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1845", vendor:"Santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1846", vendor:"Raju kumavat Tile", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-03-29", status:"Delivered" },
  { id:"PO-1847", vendor:"Kashinath Pardhi murum Filling", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:49000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1848", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1849", vendor:"Mauli Generators", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1850", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1851", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:7700.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1852", vendor:"Rokade JCB", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:80800.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-1853", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:166800.0, gst:0, delivery:"2026-03-31", status:"Open" },
  { id:"PO-1854", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:3800.0, gst:0, delivery:"2026-03-31", status:"Open" },
  { id:"PO-1855", vendor:"Pravin Bhavsar", project:"Zinnia", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:400000.0, gst:0, delivery:"2026-04-02", status:"Open" },
  { id:"PO-1856", vendor:"Mahesh Patil", project:"Zinnia", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2026-04-02", status:"Open" },
  { id:"PO-1857", vendor:"Datta Krupa Ent. ( Patil Fly Ash)", project:"Zinnia", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-02", status:"Open" },
  { id:"PO-1858", vendor:"Ravindra Jain", project:"Zinnia", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-04-04", status:"Open" },
  { id:"PO-1859", vendor:"Yashika Chemicals", project:"Zinnia", material:"ID2335329387", qty:1, unit:"Lump", rate:80000.0, gst:0, delivery:"2026-04-04", status:"Open" },
  { id:"PO-1860", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:87000.0, gst:0, delivery:"2026-04-06", status:"Open" },
  { id:"PO-1861", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:87000.0, gst:0, delivery:"2026-04-06", status:"Open" },
  { id:"PO-1862", vendor:"Devashish Construction", project:"Zinnia", material:"PPC", qty:1, unit:"Lump", rate:203000.0, gst:0, delivery:"2026-04-06", status:"Open" },
  { id:"PO-1863", vendor:"Vakratund entraprises (rohan Date)", project:"Zinnia", material:"ID 2342136910", qty:1, unit:"Lump", rate:83423.0, gst:0, delivery:"2026-04-08", status:"Open" },
  { id:"PO-1864", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:119000.0, gst:0, delivery:"2026-04-08", status:"Open" },
  { id:"PO-1865", vendor:"Departmental Payment", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:12600.0, gst:0, delivery:"2026-04-08", status:"Open" },
  { id:"PO-1866", vendor:"Rafiq Khan", project:"Zinnia", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1867", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:232000.0, gst:0, delivery:"2026-04-09", status:"Delivered" },
  { id:"PO-1868", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1869", vendor:"Pravin Bhavsar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1870", vendor:"Somnath Shirsagar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1871", vendor:"Rokade JCB", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1872", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1873", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1874", vendor:"Diesel petrol pump", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1875", vendor:"Rohit Electrical", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-1876", vendor:"Rafiq Khan (141240)", project:"Zinnia", material:"By billing", qty:1, unit:"Lump", rate:166664.0, gst:0, delivery:"2026-04-11", status:"Open" },
  { id:"PO-1877", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-14", status:"Delivered" },
  { id:"PO-1878", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:143800.0, gst:0, delivery:"2026-04-14", status:"Open" },
  { id:"PO-1879", vendor:"Akshay Sakale JCB Zinnia", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:9500.0, gst:0, delivery:"2026-04-18", status:"Open" },
  { id:"PO-1880", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-04-18", status:"Open" },
  { id:"PO-1881", vendor:"Pravin Bhavsar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-04-18", status:"Open" },
  { id:"PO-1882", vendor:"Rohit Electrical", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-18", status:"Open" },
  { id:"PO-1883", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2026-04-20", status:"Open" },
  { id:"PO-1884", vendor:"Rafiq khan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-20", status:"Open" },
  { id:"PO-1885", vendor:"Shivaji Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:70200.0, gst:0, delivery:"2026-04-21", status:"Open" },
  { id:"PO-1886", vendor:"Patel Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2026-04-21", status:"Open" },
  { id:"PO-1887", vendor:"Ramesh Netke", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1888", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1889", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2026-04-25", status:"Delivered" },
  { id:"PO-1890", vendor:"Sandip Fly Ash Bricks", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:69000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1891", vendor:"Chetan Shelke Pile Work", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:23000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1892", vendor:"Pravin Bhavsar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1893", vendor:"Mahesh Patil", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1894", vendor:"JCB Rokade", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:24500.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1895", vendor:"santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1896", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1897", vendor:"Shravan Transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1898", vendor:"Sanja Mama For Diesel Zinnia", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1899", vendor:"Fevi Quick", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1300.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1900", vendor:"Amol Gavali", project:"Zinnia", material:"JCB", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1901", vendor:"Gorakh Chavan", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1902", vendor:"Disesel Generator", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1903", vendor:"Pranay Shah", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1904", vendor:"Rohit Electrical", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1905", vendor:"Rafiq Khan (Labour shed)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:26000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1906", vendor:"Tadpatri Expenses", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1907", vendor:"Fevi Quick", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:700.0, gst:0, delivery:"2026-04-26", status:"Open" },
  { id:"PO-1908", vendor:"Petty Cash", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2026-04-26", status:"Open" },
  { id:"PO-1909", vendor:"Diesel", project:"Zinnia", material:"Generator", qty:1, unit:"Lump", rate:6750.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1910", vendor:"Jyoti Pest Control", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:4720.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-1911", vendor:"Santosh pandit", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-05-01", status:"Open" },
  { id:"PO-1912", vendor:"Shivraj Kadam", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-05-02", status:"Open" },
  { id:"PO-1913", vendor:"Rohit Electrical", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-05-03", status:"Open" },
  { id:"PO-1914", vendor:"Pravin Bhavsar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-05-03", status:"Open" },
  { id:"PO-1915", vendor:"Shravan Transport", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2026-05-03", status:"Open" },
  { id:"PO-1916", vendor:"Ravindra Jain", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-05-03", status:"Open" },
  { id:"PO-1917", vendor:"Diesel", project:"Zinnia", material:"Generator", qty:1, unit:"Lump", rate:1825.0, gst:0, delivery:"2026-05-03", status:"Open" },
  { id:"PO-1918", vendor:"Diesel", project:"Zinnia", material:"Generator", qty:1, unit:"Lump", rate:2281.0, gst:0, delivery:"2026-05-04", status:"Open" },
  { id:"PO-1919", vendor:"Binding Wire", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:10248.0, gst:0, delivery:"2026-05-05", status:"Open" },
  { id:"PO-1920", vendor:"Ramesh Netke", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-05-05", status:"Open" },
  { id:"PO-1921", vendor:"Ravindra Jain ( Sagar Pawar)", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-05-05", status:"Open" },
  { id:"PO-1922", vendor:"Sagar Pawar", project:"Zinnia", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-05-05", status:"Delivered" },
  { id:"PO-1923", vendor:"Cement", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:16600.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1924", vendor:"Plastic Tank", project:"Whispering Grooves", material:"Plastic Tank", qty:1, unit:"Lump", rate:5800.0, gst:0, delivery:"2024-06-13", status:"Open" },
  { id:"PO-1925", vendor:"HDP Tank", project:"Whispering Grooves", material:"HDP Tank", qty:1, unit:"Lump", rate:11200.0, gst:0, delivery:"2024-06-03", status:"Open" },
  { id:"PO-1926", vendor:"HDP Tank Transport", project:"Whispering Grooves", material:"HDP Tank Transport", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2024-06-03", status:"Open" },
  { id:"PO-1927", vendor:"Patra & Balli", project:"Whispering Grooves", material:"Patra & Balli", qty:1, unit:"Lump", rate:54604.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1928", vendor:"Generator", project:"Whispering Grooves", material:"Generator", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1929", vendor:"Furtilizer", project:"Whispering Grooves", material:"Furtilizer", qty:1, unit:"Lump", rate:26690.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1930", vendor:"Vitthal Narsary", project:"Whispering Grooves", material:"Plantation", qty:1, unit:"Lump", rate:119143.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1931", vendor:"Transport", project:"Whispering Grooves", material:"Generator", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1932", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Shade", qty:1, unit:"Lump", rate:10900.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1933", vendor:"Bhagwati", project:"Whispering Grooves", material:"Water Jar", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-1934", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"W. Sand & Metal", qty:1, unit:"Lump", rate:44000.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-1935", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks 6000 Nos", qty:1, unit:"Lump", rate:42000.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-1936", vendor:"Transport", project:"Whispering Grooves", material:"Water Tanker", qty:1, unit:"Lump", rate:2100.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-1937", vendor:"Labour Payment", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:900.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-1938", vendor:"Koyata & Vila", project:"Whispering Grooves", material:"Koyata & Vila", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-1939", vendor:"Watchman Baba", project:"Whispering Grooves", material:"Watchman Baba", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-1940", vendor:"Transport", project:"Whispering Grooves", material:"Watchman baba", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-1941", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:27500.0, gst:0, delivery:"2024-06-12", status:"Open" },
  { id:"PO-1942", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks 3000 Nos", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2024-06-12", status:"Open" },
  { id:"PO-1943", vendor:"Hari om Cement Tushar bhau", project:"Whispering Grooves", material:"Steel", qty:1, unit:"Lump", rate:232618.0, gst:0, delivery:"2024-06-12", status:"Open" },
  { id:"PO-1944", vendor:"Transport", project:"Whispering Grooves", material:"Water Tanker", qty:1, unit:"Lump", rate:2800.0, gst:0, delivery:"2024-06-16", status:"Open" },
  { id:"PO-1945", vendor:"Hari om Cement Tushar bhau", project:"Whispering Grooves", material:"100Bgas", qty:1, unit:"Lump", rate:32000.0, gst:0, delivery:"2024-06-18", status:"Open" },
  { id:"PO-1946", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:38500.0, gst:0, delivery:"2024-06-19", status:"Open" },
  { id:"PO-1947", vendor:"Nirutti Pagar", project:"Whispering Grooves", material:"JCB", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2024-06-24", status:"Open" },
  { id:"PO-1948", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks ( Via Gopal )", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2024-06-24", status:"Open" },
  { id:"PO-1949", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2024-06-27", status:"Open" },
  { id:"PO-1950", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"DBS Bank", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2024-06-28", status:"Open" },
  { id:"PO-1951", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Khadi Material", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-06-28", status:"Open" },
  { id:"PO-1952", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-07-01", status:"Open" },
  { id:"PO-1953", vendor:"Nirutti Pagar", project:"Whispering Grooves", material:"JCB", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2024-07-03", status:"Open" },
  { id:"PO-1954", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Metal", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2024-07-05", status:"Open" },
  { id:"PO-1955", vendor:"Ajay Dange", project:"Whispering Grooves", material:"Whispering Road Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-07-05", status:"Open" },
  { id:"PO-1956", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:20200.0, gst:0, delivery:"2024-07-09", status:"Open" },
  { id:"PO-1957", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"W.Sand 4 Brass", qty:1, unit:"Lump", rate:20800.0, gst:0, delivery:"2024-07-11", status:"Open" },
  { id:"PO-1958", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2024-07-18", status:"Open" },
  { id:"PO-1959", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:20250.0, gst:0, delivery:"2024-07-24", status:"Open" },
  { id:"PO-1960", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-08-01", status:"Open" },
  { id:"PO-1961", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Fabrication Work", qty:1, unit:"Lump", rate:94226.0, gst:0, delivery:"2024-08-03", status:"Open" },
  { id:"PO-1962", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Sagar Pawar", qty:1, unit:"Lump", rate:19800.0, gst:0, delivery:"2024-08-04", status:"Open" },
  { id:"PO-1963", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"80mm 2 Brass", qty:1, unit:"Lump", rate:6800.0, gst:0, delivery:"2024-08-04", status:"Open" },
  { id:"PO-1964", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-08-05", status:"Open" },
  { id:"PO-1965", vendor:"Nirutti Pagar", project:"Whispering Grooves", material:"JCB", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2024-08-05", status:"Open" },
  { id:"PO-1966", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2024-08-14", status:"Open" },
  { id:"PO-1967", vendor:"Gopal Pagar", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:16000.0, gst:0, delivery:"2024-08-14", status:"Open" },
  { id:"PO-1968", vendor:"Transport", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2024-08-14", status:"Open" },
  { id:"PO-1969", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2024-08-16", status:"Open" },
  { id:"PO-1970", vendor:"Binding Wire", project:"Whispering Grooves", material:"Binding Wire", qty:1, unit:"Lump", rate:750.0, gst:0, delivery:"2024-08-17", status:"Open" },
  { id:"PO-1971", vendor:"Cement", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:15500.0, gst:0, delivery:"2024-08-17", status:"Open" },
  { id:"PO-1972", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:46250.0, gst:0, delivery:"2024-08-20", status:"Open" },
  { id:"PO-1973", vendor:"Binding Wire", project:"Whispering Grooves", material:"Binding Wire", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2024-08-22", status:"Open" },
  { id:"PO-1974", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks 4000 Nos", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2024-08-27", status:"Open" },
  { id:"PO-1975", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-08-28", status:"Open" },
  { id:"PO-1976", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Fabrication Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-08-28", status:"Open" },
  { id:"PO-1977", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-09-01", status:"Open" },
  { id:"PO-1978", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Sagar Pawar", qty:1, unit:"Lump", rate:20800.0, gst:0, delivery:"2024-09-03", status:"Open" },
  { id:"PO-1979", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2024-09-04", status:"Open" },
  { id:"PO-1980", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2024-09-04", status:"Open" },
  { id:"PO-1981", vendor:"Cement", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:16400.0, gst:0, delivery:"2024-09-04", status:"Open" },
  { id:"PO-1982", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2024-09-12", status:"Open" },
  { id:"PO-1983", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks 2000 nos", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-09-13", status:"Open" },
  { id:"PO-1984", vendor:"Grudev Plastic", project:"Whispering Grooves", material:"Tadpatri", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2024-09-14", status:"Open" },
  { id:"PO-1985", vendor:"Cement Shifting", project:"Whispering Grooves", material:"Cement Shifting", qty:1, unit:"Lump", rate:700.0, gst:0, delivery:"2024-09-14", status:"Open" },
  { id:"PO-1986", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:484.0, gst:0, delivery:"2024-09-16", status:"Open" },
  { id:"PO-1987", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:19750.0, gst:0, delivery:"2024-09-18", status:"Open" },
  { id:"PO-1988", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"W.Sand & Metal", qty:1, unit:"Lump", rate:33600.0, gst:0, delivery:"2024-09-19", status:"Open" },
  { id:"PO-1989", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Fabrication Work", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2024-09-21", status:"Open" },
  { id:"PO-1990", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-09-20", status:"Open" },
  { id:"PO-1991", vendor:"Binding Wire", project:"Whispering Grooves", material:"Binding Wire", qty:1, unit:"Lump", rate:750.0, gst:0, delivery:"2024-09-20", status:"Open" },
  { id:"PO-1992", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"W.Sand & Metal", qty:1, unit:"Lump", rate:37600.0, gst:0, delivery:"2024-09-24", status:"Open" },
  { id:"PO-1993", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:66050.0, gst:0, delivery:"2024-09-25", status:"Open" },
  { id:"PO-1994", vendor:"Cement", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:33550.0, gst:0, delivery:"2024-09-26", status:"Open" },
  { id:"PO-1995", vendor:"RCC Beam Breaking", project:"Whispering Grooves", material:"RCC Beam Breaking", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2024-09-28", status:"Open" },
  { id:"PO-1996", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:400.0, gst:0, delivery:"2024-10-01", status:"Open" },
  { id:"PO-1997", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-10-01", status:"Open" },
  { id:"PO-1998", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:45050.0, gst:0, delivery:"2024-10-02", status:"Open" },
  { id:"PO-1999", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-10-02", status:"Open" },
  { id:"PO-2000", vendor:"Transport", project:"Whispering Grooves", material:"50 bag Cement", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2024-10-02", status:"Open" },
  { id:"PO-2001", vendor:"Cement", project:"Whispering Grooves", material:"51 bag Cement", qty:1, unit:"Lump", rate:16250.0, gst:0, delivery:"2024-10-02", status:"Open" },
  { id:"PO-2002", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Fabrication Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-10-02", status:"Open" },
  { id:"PO-2003", vendor:"Tar Brush", project:"Whispering Grooves", material:"Tar Brush", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-10-05", status:"Open" },
  { id:"PO-2004", vendor:"Binding Wire", project:"Whispering Grooves", material:"Binding Wire", qty:1, unit:"Lump", rate:750.0, gst:0, delivery:"2024-10-06", status:"Open" },
  { id:"PO-2005", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-10-08", status:"Open" },
  { id:"PO-2006", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:66850.0, gst:0, delivery:"2024-10-10", status:"Open" },
  { id:"PO-2007", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Fabrication Work", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2024-10-13", status:"Open" },
  { id:"PO-2008", vendor:"Chinmay Enterprices", project:"Whispering Grooves", material:"Bonding Chemical", qty:1, unit:"Lump", rate:780.0, gst:0, delivery:"2024-10-14", status:"Open" },
  { id:"PO-2009", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2010", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2011", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Fabrication Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-10-17", status:"Open" },
  { id:"PO-2012", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:270.0, gst:0, delivery:"2024-10-18", status:"Open" },
  { id:"PO-2013", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-10-20", status:"Open" },
  { id:"PO-2014", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2024-10-21", status:"Open" },
  { id:"PO-2015", vendor:"Cement", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:16150.0, gst:0, delivery:"2024-10-22", status:"Open" },
  { id:"PO-2016", vendor:"Transport", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:400.0, gst:0, delivery:"2024-10-22", status:"Open" },
  { id:"PO-2017", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"W.Sand & Metal", qty:1, unit:"Lump", rate:55600.0, gst:0, delivery:"2024-10-23", status:"Open" },
  { id:"PO-2018", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:17200.0, gst:0, delivery:"2024-10-23", status:"Open" },
  { id:"PO-2019", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Fabrication Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-10-31", status:"Open" },
  { id:"PO-2020", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-11-01", status:"Open" },
  { id:"PO-2021", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Bonus Salary", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2024-11-01", status:"Open" },
  { id:"PO-2022", vendor:"Chinmay Enterprices", project:"Whispering Grooves", material:"Fiber Mesh", qty:1, unit:"Lump", rate:2980.0, gst:0, delivery:"2024-11-14", status:"Open" },
  { id:"PO-2023", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:20400.0, gst:0, delivery:"2024-11-14", status:"Open" },
  { id:"PO-2024", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2024-11-14", status:"Open" },
  { id:"PO-2025", vendor:"Line Dori", project:"Whispering Grooves", material:"Line Dori", qty:1, unit:"Lump", rate:60.0, gst:0, delivery:"2024-11-14", status:"Open" },
  { id:"PO-2026", vendor:"Transport", project:"Whispering Grooves", material:"Cement Gopal Bhau", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-11-17", status:"Open" },
  { id:"PO-2027", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-11-17", status:"Open" },
  { id:"PO-2028", vendor:"Transport", project:"Whispering Grooves", material:"Tractor", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2024-11-17", status:"Open" },
  { id:"PO-2029", vendor:"Deepa Traders", project:"Whispering Grooves", material:"Fiber Mesh", qty:1, unit:"Lump", rate:2832.0, gst:0, delivery:"2024-11-18", status:"Open" },
  { id:"PO-2030", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:590.0, gst:0, delivery:"2024-11-19", status:"Open" },
  { id:"PO-2031", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:74200.0, gst:0, delivery:"2024-11-20", status:"Open" },
  { id:"PO-2032", vendor:"Shirsat", project:"Whispering Grooves", material:"Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-11-22", status:"Open" },
  { id:"PO-2033", vendor:"Cement", project:"Whispering Grooves", material:"Cement 100 Bags", qty:1, unit:"Lump", rate:38400.0, gst:0, delivery:"2024-11-25", status:"Open" },
  { id:"PO-2034", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2024-11-25", status:"Open" },
  { id:"PO-2035", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:55800.0, gst:0, delivery:"2024-11-26", status:"Open" },
  { id:"PO-2036", vendor:"Petrol", project:"Whispering Grooves", material:"Petrol", qty:1, unit:"Lump", rate:590.0, gst:0, delivery:"2024-11-29", status:"Open" },
  { id:"PO-2037", vendor:"Plumbing Pipes", project:"Whispering Grooves", material:"Plumbing Material", qty:1, unit:"Lump", rate:1140.0, gst:0, delivery:"2024-11-30", status:"Open" },
  { id:"PO-2038", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-12-01", status:"Open" },
  { id:"PO-2039", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2024-12-06", status:"Open" },
  { id:"PO-2040", vendor:"Plastic", project:"Whispering Grooves", material:"Plastic Sheet", qty:1, unit:"Lump", rate:200.0, gst:0, delivery:"2024-12-07", status:"Open" },
  { id:"PO-2041", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:491.0, gst:0, delivery:"2024-12-08", status:"Open" },
  { id:"PO-2042", vendor:"Dashrath Rathod", project:"Whispering Grooves", material:"Generator Repairing", qty:1, unit:"Lump", rate:9500.0, gst:0, delivery:"2024-12-11", status:"Open" },
  { id:"PO-2043", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:49000.0, gst:0, delivery:"2024-12-11", status:"Open" },
  { id:"PO-2044", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-12-13", status:"Open" },
  { id:"PO-2045", vendor:"Cutter Blead", project:"Whispering Grooves", material:"Cutter Blead", qty:1, unit:"Lump", rate:30.0, gst:0, delivery:"2024-12-15", status:"Open" },
  { id:"PO-2046", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:180.0, gst:0, delivery:"2024-12-15", status:"Open" },
  { id:"PO-2047", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:10650.0, gst:0, delivery:"2024-12-18", status:"Open" },
  { id:"PO-2048", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:490.0, gst:0, delivery:"2024-12-21", status:"Open" },
  { id:"PO-2049", vendor:"Dashrath Rathod", project:"Whispering Grooves", material:"Generator Repairing", qty:1, unit:"Lump", rate:4200.0, gst:0, delivery:"2024-12-27", status:"Open" },
  { id:"PO-2050", vendor:"Rameshwar Sales", project:"Whispering Grooves", material:"Plumbing Material", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-12-30", status:"Open" },
  { id:"PO-2051", vendor:"Somnath Kshirsagar", project:"Whispering Grooves", material:"Plumber", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-01-01", status:"Open" },
  { id:"PO-2052", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-01-01", status:"Open" },
  { id:"PO-2053", vendor:"Transport", project:"Whispering Grooves", material:"Plumbing Material", qty:1, unit:"Lump", rate:2100.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-2054", vendor:"Gopal Pagar", project:"Whispering Grooves", material:"Miscalanious", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-2055", vendor:"Transport", project:"Whispering Grooves", material:"Cement", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-2056", vendor:"Rameshwar Sales", project:"Whispering Grooves", material:"Plumbing Material", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-2057", vendor:"Rameshwar Sales", project:"Whispering Grooves", material:"Plumbing Material", qty:1, unit:"Lump", rate:57481.0, gst:0, delivery:"2025-01-10", status:"Open" },
  { id:"PO-2058", vendor:"Dhiraj Sharma", project:"Whispering Grooves", material:"Waterproofing Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-01-10", status:"Open" },
  { id:"PO-2059", vendor:"Milap Enetrprices", project:"Whispering Grooves", material:"Pipe Material", qty:1, unit:"Lump", rate:15250.0, gst:0, delivery:"2025-01-20", status:"Open" },
  { id:"PO-2060", vendor:"Dhiraj Sharma", project:"Whispering Grooves", material:"Waterproofing Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-01-22", status:"Open" },
  { id:"PO-2061", vendor:"Nirutti Pagar", project:"Whispering Grooves", material:"JCB", qty:1, unit:"Lump", rate:23000.0, gst:0, delivery:"2025-01-28", status:"Open" },
  { id:"PO-2062", vendor:"PMC", project:"Whispering Grooves", material:"Ishwar Date Salary", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-02-01", status:"Open" },
  { id:"PO-2063", vendor:"Saursampada Energy", project:"Whispering Grooves", material:"Solar Pump", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-02-06", status:"Open" },
  { id:"PO-2064", vendor:"Miscalanious Material", project:"Whispering Grooves", material:"Ishwar", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-02-13", status:"Open" },
  { id:"PO-2065", vendor:"Tiles Payment", project:"Whispering Grooves", material:"Boffo Granito", qty:1, unit:"Lump", rate:273134.0, gst:0, delivery:"2025-02-24", status:"Open" },
  { id:"PO-2066", vendor:"Tiles Payment", project:"Whispering Grooves", material:"Boffo Granito", qty:1, unit:"Lump", rate:565629.0, gst:0, delivery:"2025-02-24", status:"Open" },
  { id:"PO-2067", vendor:"Swimming pool tile", project:"Whispering Grooves", material:"223 Box", qty:1, unit:"Lump", rate:64785.0, gst:0, delivery:"2025-03-08", status:"Open" },
  { id:"PO-2068", vendor:"Furtilizer", project:"Whispering Grooves", material:"Furtilizer", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-03-09", status:"Open" },
  { id:"PO-2069", vendor:"Transport", project:"Whispering Grooves", material:"Tile", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-03-09", status:"Open" },
  { id:"PO-2070", vendor:"Transport", project:"Whispering Grooves", material:"Tile", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-03-10", status:"Open" },
  { id:"PO-2071", vendor:"Transport", project:"Whispering Grooves", material:"Plants", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2025-03-11", status:"Open" },
  { id:"PO-2072", vendor:"Saursampada Energy", project:"Whispering Grooves", material:"Solar Pump", qty:1, unit:"Lump", rate:105000.0, gst:0, delivery:"2025-03-14", status:"Open" },
  { id:"PO-2073", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Labour Payment", qty:1, unit:"Lump", rate:18800.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-2074", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-2075", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:914.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-2076", vendor:"Labour Shade", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-10", status:"Open" },
  { id:"PO-2077", vendor:"Araldite", project:"Whispering Grooves", material:"Araldite", qty:1, unit:"Lump", rate:2700.0, gst:0, delivery:"2025-04-14", status:"Open" },
  { id:"PO-2078", vendor:"Yashika", project:"Whispering Grooves", material:"Chemical", qty:1, unit:"Lump", rate:42360.0, gst:0, delivery:"2025-04-16", status:"Open" },
  { id:"PO-2079", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2025-04-19", status:"Open" },
  { id:"PO-2080", vendor:"Diesel", project:"Whispering Grooves", material:"Diesel", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2025-04-26", status:"Open" },
  { id:"PO-2081", vendor:"Labour Payment", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-04-26", status:"Open" },
  { id:"PO-2082", vendor:"Plant Transportation", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-04-28", status:"Open" },
  { id:"PO-2083", vendor:"Diesel", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:1834.0, gst:0, delivery:"2025-05-02", status:"Open" },
  { id:"PO-2084", vendor:"Diesel", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:2200.0, gst:0, delivery:"2025-05-05", status:"Open" },
  { id:"PO-2085", vendor:"Binding Wire", project:"Whispering Grooves", material:"Binding Wire", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-05-10", status:"Open" },
  { id:"PO-2086", vendor:"Binding Wire", project:"Whispering Grooves", material:"Binding Wire", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2025-05-12", status:"Open" },
  { id:"PO-2087", vendor:"Diesel", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2025-05-16", status:"Open" },
  { id:"PO-2088", vendor:"Diesel", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:2150.0, gst:0, delivery:"2025-05-21", status:"Open" },
  { id:"PO-2089", vendor:"Miscalanious Material", project:"Whispering Grooves", material:"Miscalanious Material", qty:1, unit:"Lump", rate:1730.0, gst:0, delivery:"2025-05-22", status:"Open" },
  { id:"PO-2090", vendor:"Labour Shade", project:"Whispering Grooves", material:"Material", qty:1, unit:"Lump", rate:12096.0, gst:0, delivery:"2025-05-23", status:"Open" },
  { id:"PO-2091", vendor:"Plastic", project:"Whispering Grooves", material:"Tadpatri", qty:1, unit:"Lump", rate:5400.0, gst:0, delivery:"2025-05-23", status:"Open" },
  { id:"PO-2092", vendor:"Plastic Gopal Bhau", project:"Whispering Grooves", material:"Tadpatri", qty:1, unit:"Lump", rate:5400.0, gst:0, delivery:"2025-05-23", status:"Open" },
  { id:"PO-2093", vendor:"Gururaj Electrical", project:"Whispering Grooves", material:"Gururaj Electrical", qty:1, unit:"Lump", rate:4147.0, gst:0, delivery:"2025-05-27", status:"Open" },
  { id:"PO-2094", vendor:"Tiles Payment", project:"Whispering Grooves", material:"Boffo Granito", qty:1, unit:"Lump", rate:391422.0, gst:0, delivery:"2025-12-03", status:"Open" },
  { id:"PO-2095", vendor:"4.48 MT", project:"Whispering Grooves", material:"Vehicle No MH18 BG 5546", qty:1, unit:"Lump", rate:268800.0, gst:0, delivery:"2025-05-02", status:"Open" },
  { id:"PO-2096", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:18800.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-2097", vendor:"Rajesh Lambe", project:"Whispering Grooves", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-04-10", status:"Open" },
  { id:"PO-2098", vendor:"Generator Transportation", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-04-10", status:"Open" },
  { id:"PO-2099", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:42000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-2100", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:23400.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-2101", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:64000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-2102", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:4800.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-2103", vendor:"Ravindra jain", project:"Whispering Grooves", material:"Tiles Work", qty:1, unit:"Lump", rate:53520.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-2104", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:1025000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-2105", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Tractors Payment", qty:1, unit:"Lump", rate:7500.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-2106", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:38400.0, gst:0, delivery:"2025-05-15", status:"Delivered" },
  { id:"PO-2107", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-05-15", status:"Delivered" },
  { id:"PO-2108", vendor:"Gururaj Electrical", project:"Whispering Grooves", material:"Electrical Work", qty:1, unit:"Lump", rate:227980.0, gst:0, delivery:"2025-05-15", status:"Delivered" },
  { id:"PO-2109", vendor:"Parany Shah", project:"Whispering Grooves", material:"AC Works", qty:1, unit:"Lump", rate:24107.0, gst:0, delivery:"2025-05-15", status:"Open" },
  { id:"PO-2110", vendor:"Mauli Generators", project:"Whispering Grooves", material:"Generator Rent", qty:1, unit:"Lump", rate:11564.0, gst:0, delivery:"2025-05-15", status:"Open" },
  { id:"PO-2111", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2025-05-15", status:"Open" },
  { id:"PO-2112", vendor:"Ravindra Jain", project:"Whispering Grooves", material:"Tiles Work", qty:1, unit:"Lump", rate:11696.0, gst:0, delivery:"2025-05-15", status:"Delivered" },
  { id:"PO-2113", vendor:"Ankit Self Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:13918.0, gst:0, delivery:"2025-05-15", status:"Open" },
  { id:"PO-2114", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-05-23", status:"Delivered" },
  { id:"PO-2115", vendor:"Shravan Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2025-05-23", status:"Open" },
  { id:"PO-2116", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Diesel Expense", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-05-23", status:"Open" },
  { id:"PO-2117", vendor:"Ravindra Jain", project:"Whispering Grooves", material:"Water proofing Work", qty:1, unit:"Lump", rate:39430.0, gst:0, delivery:"2025-05-28", status:"Delivered" },
  { id:"PO-2118", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:13300.0, gst:0, delivery:"2025-05-28", status:"Delivered" },
  { id:"PO-2119", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-05-28", status:"Delivered" },
  { id:"PO-2120", vendor:"Gururaj Electrical", project:"Whispering Grooves", material:"Electrical Work", qty:1, unit:"Lump", rate:4147.0, gst:0, delivery:"2025-05-28", status:"Delivered" },
  { id:"PO-2121", vendor:"Pappu Phadole", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:18200.0, gst:0, delivery:"2025-05-28", status:"Open" },
  { id:"PO-2122", vendor:"Ankit Self Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:9950.0, gst:0, delivery:"2025-05-28", status:"Open" },
  { id:"PO-2123", vendor:"Devashish Construction", project:"Whispering Grooves", material:"OPC", qty:1, unit:"Lump", rate:86250.0, gst:0, delivery:"2025-06-03", status:"Open" },
  { id:"PO-2124", vendor:"Devashish Construction", project:"Whispering Grooves", material:"OPC", qty:1, unit:"Lump", rate:86250.0, gst:0, delivery:"2025-06-05", status:"Open" },
  { id:"PO-2125", vendor:"Devashish Construction", project:"Whispering Grooves", material:"OPC", qty:1, unit:"Lump", rate:86250.0, gst:0, delivery:"2025-06-06", status:"Open" },
  { id:"PO-2126", vendor:"Bardan Expense", project:"Whispering Grooves", material:"Gopal Bhau", qty:1, unit:"Lump", rate:12000.0, gst:0, delivery:"2025-06-06", status:"Open" },
  { id:"PO-2127", vendor:"Devashish Construction", project:"Whispering Grooves", material:"OPC", qty:1, unit:"Lump", rate:172500.0, gst:0, delivery:"2025-06-07", status:"Open" },
  { id:"PO-2128", vendor:"Bardan Expense", project:"Whispering Grooves", material:"Thakkar", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-06-10", status:"Open" },
  { id:"PO-2129", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:12200.0, gst:0, delivery:"2025-06-10", status:"Open" },
  { id:"PO-2130", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:12200.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-2131", vendor:"Shravan Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:5700.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-2132", vendor:"Gorakh Chavan", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:5154.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-2133", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:8930.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-2134", vendor:"Pappu Phadole", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-2135", vendor:"Mahesh Patil", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-2136", vendor:"Nilesh Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-2137", vendor:"Ankit Self Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:33173.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-2138", vendor:"Yashika Chemicals", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-06-12", status:"Open" },
  { id:"PO-2139", vendor:"Devashish Construction", project:"Whispering Grooves", material:"OPC", qty:1, unit:"Lump", rate:86250.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-2140", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Transportation", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-2141", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:2400.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-2142", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:348500.0, gst:0, delivery:"2025-06-19", status:"Delivered" },
  { id:"PO-2143", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:2400.0, gst:0, delivery:"2025-06-19", status:"Delivered" },
  { id:"PO-2144", vendor:"Shravan Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-2145", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-2146", vendor:"Devta JCB", project:"Whispering Grooves", material:"Plantation Pits", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-2147", vendor:"Vishnu Pagar For Generator Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:6500.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-2148", vendor:"Ankit Self Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-2149", vendor:"Palm Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-2150", vendor:"Charging Bulb", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2025-06-20", status:"Open" },
  { id:"PO-2151", vendor:"Diesel", project:"Whispering Grooves", material:"Generator", qty:1, unit:"Lump", rate:2800.0, gst:0, delivery:"2025-06-28", status:"Open" },
  { id:"PO-2152", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-06-30", status:"Delivered" },
  { id:"PO-2153", vendor:"Yashika Chemicals", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-2154", vendor:"Shravan Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-2155", vendor:"Ganpat Tractor", project:"Whispering Grooves", material:"Tile Shifting", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-2156", vendor:"Pappu Phadole", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:32150.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-2157", vendor:"Jay Durga Earthmovers", project:"Whispering Grooves", material:"JCB", qty:1, unit:"Lump", rate:19000.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-2158", vendor:"Ankit Self Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:21200.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-2159", vendor:"Labour Payment", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:13000.0, gst:0, delivery:"2025-07-02", status:"Open" },
  { id:"PO-2160", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:2400.0, gst:0, delivery:"2025-07-01", status:"Open" },
  { id:"PO-2161", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:308400.0, gst:0, delivery:"2025-07-03", status:"Delivered" },
  { id:"PO-2162", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Tile Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-03", status:"Delivered" },
  { id:"PO-2163", vendor:"Nilesh Pawar", project:"Whispering Grooves", material:"Trimix Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-2164", vendor:"Vitthal Nursary", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-2165", vendor:"Ganpat Tractor", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-2166", vendor:"Material Shifting", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-2167", vendor:"Ankit Self Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:7056.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-2168", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-07-17", status:"Delivered" },
  { id:"PO-2169", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:2400.0, gst:0, delivery:"2025-07-17", status:"Delivered" },
  { id:"PO-2170", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-17", status:"Delivered" },
  { id:"PO-2171", vendor:"Yashika Chemicals", project:"Whispering Grooves", material:"(ID 2036326724)", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-2172", vendor:"Shravan Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-2173", vendor:"Pappu Phadole", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:17900.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-2174", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:1700.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-2175", vendor:"Mauli Generators", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:30520.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-2176", vendor:"Nilesh Pawar", project:"Whispering Grooves", material:"Trimix Work", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-2177", vendor:"Ankit Self Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:6118.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-2178", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:13600.0, gst:0, delivery:"2025-07-22", status:"Open" },
  { id:"PO-2179", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-23", status:"Delivered" },
  { id:"PO-2180", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Furniture", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-07-26", status:"Open" },
  { id:"PO-2181", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:13600.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-2182", vendor:"Vitthal Nursary", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-2183", vendor:"Sai Glass Window", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-2184", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:17900.0, gst:0, delivery:"2025-08-05", status:"Open" },
  { id:"PO-2185", vendor:"Hydra Crane", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-2186", vendor:"Sai Glass Window", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-2187", vendor:"Paradhi Murum Filing", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-2188", vendor:"Jay Durga Earthmovers", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-2189", vendor:"Gopal Bhau", project:"Whispering Grooves", material:"Tar Brush", qty:1, unit:"Lump", rate:280.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-2190", vendor:"Shravan Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:8600.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-2191", vendor:"Nilesh Pawar", project:"Whispering Grooves", material:"Trimix Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-2192", vendor:"Murum Landscpe Work", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14875.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-2193", vendor:"Jay Durga Earthmovers", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-2194", vendor:"Ganpat Tractor", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-2195", vendor:"Shravan Transport", project:"Whispering Grooves", material:"By Gopal Pagare", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2025-09-02", status:"Open" },
  { id:"PO-2196", vendor:"Mauli Generators", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-2197", vendor:"Arihant Ceramic", project:"Whispering Grooves", material:"ID 2093413001", qty:1, unit:"Lump", rate:39000.0, gst:0, delivery:"2025-09-08", status:"Open" },
  { id:"PO-2198", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:8000.0, gst:0, delivery:"2025-09-17", status:"Open" },
  { id:"PO-2199", vendor:"Shravan Transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:3800.0, gst:0, delivery:"2025-09-19", status:"Open" },
  { id:"PO-2200", vendor:"Om Bajarang", project:"Whispering Grooves", material:"JCB", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-09-19", status:"Open" },
  { id:"PO-2201", vendor:"Mohit Fly Ash Bricks", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-09-19", status:"Open" },
  { id:"PO-2202", vendor:"Sai Glass Window", project:"Whispering Grooves", material:"ID 2107414169", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-09-20", status:"Open" },
  { id:"PO-2203", vendor:"Mauli Generators", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-2204", vendor:"Ravindra Jain", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:190000.0, gst:0, delivery:"2025-09-26", status:"Delivered" },
  { id:"PO-2205", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-10-01", status:"Open" },
  { id:"PO-2206", vendor:"Ravindra Jain", project:"Whispering Grooves", material:"", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-10-04", status:"Delivered" },
  { id:"PO-2207", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:56000.0, gst:0, delivery:"2025-10-08", status:"Open" },
  { id:"PO-2208", vendor:"Painter Mishra", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:71000.0, gst:0, delivery:"2025-10-09", status:"Open" },
  { id:"PO-2209", vendor:"Designer Gallery PVC Roofing", project:"Whispering Grooves", material:"2130821907", qty:1, unit:"Lump", rate:107328.0, gst:0, delivery:"2025-10-10", status:"Open" },
  { id:"PO-2210", vendor:"Cobble Stone", project:"Whispering Grooves", material:"Pramod Jain", qty:1, unit:"Lump", rate:88500.0, gst:0, delivery:"2025-10-14", status:"Open" },
  { id:"PO-2211", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:24200.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-2212", vendor:"Nivrutti Hagavate Murum", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:4400.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-2213", vendor:"Painter Mishra", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-2214", vendor:"Tractor Zugare", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:9900.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-2215", vendor:"Sagar Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:59455.0, gst:0, delivery:"2025-10-31", status:"Delivered" },
  { id:"PO-2216", vendor:"Rafiq Khan", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:11400.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-2217", vendor:"Cobble Stone", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:11500.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-2218", vendor:"Fevicol Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:18700.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-2219", vendor:"Cobble Stone", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-03", status:"Open" },
  { id:"PO-2220", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:37800.0, gst:0, delivery:"2025-11-05", status:"Open" },
  { id:"PO-2221", vendor:"Cobble Stone", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:22750.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-2222", vendor:"Fevicol Expense", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-11-08", status:"Open" },
  { id:"PO-2223", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:35200.0, gst:0, delivery:"2025-11-12", status:"Open" },
  { id:"PO-2224", vendor:"Designer Gallery PVC Roofing", project:"Whispering Grooves", material:"ID 2170170735", qty:1, unit:"Lump", rate:128917.0, gst:0, delivery:"2025-11-13", status:"Open" },
  { id:"PO-2225", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14500.0, gst:0, delivery:"2025-11-19", status:"Open" },
  { id:"PO-2226", vendor:"Departmental Payment", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-11-19", status:"Open" },
  { id:"PO-2227", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-11-26", status:"Open" },
  { id:"PO-2228", vendor:"Shabad Tile", project:"Whispering Grooves", material:"16500+2500", qty:1, unit:"Lump", rate:19000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-2229", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-2230", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Labour Fevicol Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-2231", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:7200.0, gst:0, delivery:"2025-12-03", status:"Open" },
  { id:"PO-2232", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-2233", vendor:"Transperant Plastic", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:3050.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-2234", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Labour Fevicol Work", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-2235", vendor:"Plastic", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:3700.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-2236", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14800.0, gst:0, delivery:"2025-12-10", status:"Open" },
  { id:"PO-2237", vendor:"Yashika Chemicals", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:46025.0, gst:0, delivery:"2025-12-11", status:"Open" },
  { id:"PO-2238", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-12-13", status:"Delivered" },
  { id:"PO-2239", vendor:"Tulasi Vrundavan", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-2240", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-12-17", status:"Open" },
  { id:"PO-2241", vendor:"Departmental Payment", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2025-12-17", status:"Open" },
  { id:"PO-2242", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:39800.0, gst:0, delivery:"2025-12-23", status:"Open" },
  { id:"PO-2243", vendor:"Departmental Payment", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2025-12-23", status:"Open" },
  { id:"PO-2244", vendor:"Departmental Payment", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:6800.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-2245", vendor:"Raju kumavat Tile", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-12-27", status:"Delivered" },
  { id:"PO-2246", vendor:"Mauli Generators", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-2247", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-2248", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-2249", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-2250", vendor:"santosh pandit", project:"Whispering Grooves", material:"tile work", qty:1, unit:"Lump", rate:60000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-2251", vendor:"santosh pandit", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-2252", vendor:"Paradhi Murum Filing", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:3400.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-2253", vendor:"Palkhi transport", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-2254", vendor:"santosh pandit", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-2255", vendor:"khuzema doors", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-2256", vendor:"sambhaji Shinde Carpenter", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-2257", vendor:"Munde Material", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:3550.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-2258", vendor:"santosh pandit", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-2259", vendor:"Pappu Phadole", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:23650.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-2260", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-2261", vendor:"Pop Verma", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:60000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-2262", vendor:"Sanap Nursery", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-28", status:"Open" },
  { id:"PO-2263", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-05", status:"Open" },
  { id:"PO-2264", vendor:"santosh pandit", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2026-02-05", status:"Open" },
  { id:"PO-2265", vendor:"Tulasi Vrundavan", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2026-02-12", status:"Open" },
  { id:"PO-2266", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-2267", vendor:"Infinity Doors", project:"Whispering Grooves", material:"ID2279216829", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-2268", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:365000.0, gst:0, delivery:"2026-02-26", status:"Delivered" },
  { id:"PO-2269", vendor:"Hydra Belt & CP Material", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-2270", vendor:"Sambhaji Shinde Carpenter", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-03-09", status:"Open" },
  { id:"PO-2271", vendor:"Kanhiya lal Pintu Bhai", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-03-09", status:"Open" },
  { id:"PO-2272", vendor:"Office Chair Transportation", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2026-03-11", status:"Open" },
  { id:"PO-2273", vendor:"Bhakti Electricals Kolors Switches", project:"Whispering Grooves", material:"Switches", qty:1, unit:"Lump", rate:59846.0, gst:0, delivery:"2026-03-21", status:"Open" },
  { id:"PO-2274", vendor:"Ramesh Netke", project:"Whispering Grooves", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2026-03-28", status:"Open" },
  { id:"PO-2275", vendor:"Diesel petrol pump", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-2276", vendor:"Sambhaji Shinde Carpenter", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-2277", vendor:"Ramesh Netke", project:"Whispering Grooves", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-03", status:"Open" },
  { id:"PO-2278", vendor:"Sambhaji Shinde Carpenter", project:"Whispering Grooves", material:"by Mandakini Mam", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-03", status:"Open" },
  { id:"PO-2279", vendor:"Ceramic Traders", project:"Whispering Grooves", material:"ID 2335429244", qty:1, unit:"Lump", rate:255554.0, gst:0, delivery:"2026-04-04", status:"Open" },
  { id:"PO-2280", vendor:"Dusane Engineering ( Auto Change Over)", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2026-04-10", status:"Open" },
  { id:"PO-2281", vendor:"Shivaji Pawar", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:9600.0, gst:0, delivery:"2026-04-21", status:"Open" },
  { id:"PO-2282", vendor:"Royal Aqua (Aqua Guard Payment)", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:45281.0, gst:0, delivery:"2026-04-28", status:"Open" },
  { id:"PO-2283", vendor:"Bodke JCB whispering Grooves", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-2284", vendor:"Babu Bhai Painter", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2026-04-26", status:"Open" },
  { id:"PO-2285", vendor:"Diesel", project:"Whispering Grooves", material:"Generator", qty:1, unit:"Lump", rate:3200.0, gst:0, delivery:"2026-04-29", status:"Open" },
  { id:"PO-2286", vendor:"Arihant Ceramic", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2026-05-01", status:"Open" },
  { id:"PO-2287", vendor:"Royal Aqua (Aqua Guard Payment)", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:129500.0, gst:0, delivery:"2026-05-01", status:"Open" },
  { id:"PO-2288", vendor:"Infinity Doors", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:116607.0, gst:0, delivery:"2026-05-01", status:"Open" },
  { id:"PO-2289", vendor:"Babu Bhai Painter", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-05-02", status:"Open" },
  { id:"PO-2290", vendor:"Sanap Nursery", project:"Whispering Grooves", material:"Misc Expense", qty:1, unit:"Lump", rate:221000.0, gst:0, delivery:"2026-05-05", status:"Open" },
  { id:"PO-2291", vendor:"Diesel", project:"Whispering Grooves", material:"Generator", qty:1, unit:"Lump", rate:3120.0, gst:0, delivery:"2026-05-06", status:"Open" },
  { id:"PO-2292", vendor:"Electric Work", project:"Genial", material:"Electrical Cable 4core 2.5 Sqmm", qty:1, unit:"Lump", rate:10740.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2293", vendor:"Electric Work", project:"Genial", material:"Electrical Material", qty:1, unit:"Lump", rate:2320.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2294", vendor:"Gurudev Plstic", project:"Genial", material:"Tadpatri", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2295", vendor:"Manoraj Agency", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:3838.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2296", vendor:"Mauli Chemicals", project:"Genial", material:"Cover blocks & Admixture", qty:1, unit:"Lump", rate:7358.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2297", vendor:"Miscalneous", project:"Genial", material:"Drums", qty:1, unit:"Lump", rate:1900.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2298", vendor:"Miscalneous", project:"Genial", material:"Generator", qty:1, unit:"Lump", rate:650.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2299", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2023-08-23", status:"Open" },
  { id:"PO-2300", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:3800.0, gst:0, delivery:"2023-08-24", status:"Open" },
  { id:"PO-2301", vendor:"Electric Work", project:"Genial", material:"Electrical Material", qty:1, unit:"Lump", rate:1498.0, gst:0, delivery:"2023-08-24", status:"Open" },
  { id:"PO-2302", vendor:"Miscalneous", project:"Genial", material:"Lime", qty:1, unit:"Lump", rate:110.0, gst:0, delivery:"2023-08-24", status:"Open" },
  { id:"PO-2303", vendor:"Miscalneous", project:"Genial", material:"Generator", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2023-08-24", status:"Open" },
  { id:"PO-2304", vendor:"Miscalneous", project:"Genial", material:"Drums", qty:1, unit:"Lump", rate:170.0, gst:0, delivery:"2023-08-25", status:"Open" },
  { id:"PO-2305", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1869.0, gst:0, delivery:"2023-08-28", status:"Open" },
  { id:"PO-2306", vendor:"Arjun Suppliers", project:"Genial", material:"Metal & Wash Sand", qty:1, unit:"Lump", rate:50900.0, gst:0, delivery:"2023-08-26", status:"Open" },
  { id:"PO-2307", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2023-08-27", status:"Open" },
  { id:"PO-2308", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-08-29", status:"Open" },
  { id:"PO-2309", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2023-08-30", status:"Open" },
  { id:"PO-2310", vendor:"Arjun Suppliers", project:"Genial", material:"Metal", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2023-08-31", status:"Open" },
  { id:"PO-2311", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1869.0, gst:0, delivery:"2023-09-02", status:"Open" },
  { id:"PO-2312", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2023-09-06", status:"Open" },
  { id:"PO-2313", vendor:"Miscalneous", project:"Genial", material:"Neeru for plot Marking", qty:1, unit:"Lump", rate:180.0, gst:0, delivery:"2023-09-10", status:"Open" },
  { id:"PO-2314", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-09-12", status:"Open" },
  { id:"PO-2315", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-09-15", status:"Open" },
  { id:"PO-2316", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:57750.0, gst:0, delivery:"2023-09-17", status:"Open" },
  { id:"PO-2317", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-09-19", status:"Open" },
  { id:"PO-2318", vendor:"S.R.Kharat", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:15600.0, gst:0, delivery:"2023-09-20", status:"Open" },
  { id:"PO-2319", vendor:"S.R.Kharat", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:15628.0, gst:0, delivery:"2023-09-20", status:"Open" },
  { id:"PO-2320", vendor:"S.R.Kharat", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2023-09-20", status:"Open" },
  { id:"PO-2321", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:935.0, gst:0, delivery:"2023-09-20", status:"Open" },
  { id:"PO-2322", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:934.0, gst:0, delivery:"2023-09-22", status:"Open" },
  { id:"PO-2323", vendor:"Ravi Patel", project:"Genial", material:"Neeru for plot Marking", qty:1, unit:"Lump", rate:180.0, gst:0, delivery:"2023-09-22", status:"Open" },
  { id:"PO-2324", vendor:"Arjun Suppliers", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:32900.0, gst:0, delivery:"2023-09-22", status:"Open" },
  { id:"PO-2325", vendor:"Arjun Suppliers", project:"Genial", material:"Metal", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2023-09-22", status:"Open" },
  { id:"PO-2326", vendor:"Arjun Suppliers", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:32900.0, gst:0, delivery:"2023-09-22", status:"Open" },
  { id:"PO-2327", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2023-09-24", status:"Open" },
  { id:"PO-2328", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2023-09-26", status:"Open" },
  { id:"PO-2329", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2023-09-25", status:"Delivered" },
  { id:"PO-2330", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:52500.0, gst:0, delivery:"2023-09-26", status:"Open" },
  { id:"PO-2331", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1869.0, gst:0, delivery:"2023-09-27", status:"Open" },
  { id:"PO-2332", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Survey Material", qty:1, unit:"Lump", rate:450.0, gst:0, delivery:"2023-09-29", status:"Open" },
  { id:"PO-2333", vendor:"Mauli Chemicals", project:"Genial", material:"Cover blocks & Admixture", qty:1, unit:"Lump", rate:8909.0, gst:0, delivery:"2023-09-30", status:"Open" },
  { id:"PO-2334", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:3700.0, gst:0, delivery:"2023-09-30", status:"Open" },
  { id:"PO-2335", vendor:"Miscalneous", project:"Genial", material:"Labour shed", qty:1, unit:"Lump", rate:2900.0, gst:0, delivery:"2023-09-30", status:"Open" },
  { id:"PO-2336", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2023-09-30", status:"Open" },
  { id:"PO-2337", vendor:"mauli enterprices", project:"Genial", material:"Generator", qty:1, unit:"Lump", rate:15096.0, gst:0, delivery:"2023-10-02", status:"Open" },
  { id:"PO-2338", vendor:"Nobal arts", project:"Genial", material:"Phrama", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2023-10-03", status:"Open" },
  { id:"PO-2339", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2023-10-04", status:"Delivered" },
  { id:"PO-2340", vendor:"Nobal arts", project:"Genial", material:"Phrama", qty:1, unit:"Lump", rate:2400.0, gst:0, delivery:"2023-10-05", status:"Open" },
  { id:"PO-2341", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2023-10-05", status:"Open" },
  { id:"PO-2342", vendor:"Miscalneous", project:"Genial", material:"Office Expense", qty:1, unit:"Lump", rate:3800.0, gst:0, delivery:"2023-10-05", status:"Open" },
  { id:"PO-2343", vendor:"Miscalneous", project:"Genial", material:"Office Expense", qty:1, unit:"Lump", rate:250.0, gst:0, delivery:"2023-10-05", status:"Open" },
  { id:"PO-2344", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-07", status:"Open" },
  { id:"PO-2345", vendor:"Bhandure InfraProjects", project:"Genial", material:"Bhandure InfraProjects", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-10-09", status:"Delivered" },
  { id:"PO-2346", vendor:"Bhandure InfraProjects", project:"Genial", material:"Bhandure InfraProjects", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-10-09", status:"Delivered" },
  { id:"PO-2347", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-10", status:"Open" },
  { id:"PO-2348", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:36000.0, gst:0, delivery:"2023-10-11", status:"Open" },
  { id:"PO-2349", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-13", status:"Open" },
  { id:"PO-2350", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:66000.0, gst:0, delivery:"2023-10-15", status:"Open" },
  { id:"PO-2351", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-17", status:"Open" },
  { id:"PO-2352", vendor:"Bhandure InfraProjects", project:"Genial", material:"Khadi", qty:1, unit:"Lump", rate:18900.0, gst:0, delivery:"2023-10-17", status:"Open" },
  { id:"PO-2353", vendor:"Bhandure InfraProjects", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:31500.0, gst:0, delivery:"2023-10-17", status:"Open" },
  { id:"PO-2354", vendor:"Bhandure InfraProjects", project:"Genial", material:"Khadi", qty:1, unit:"Lump", rate:18900.0, gst:0, delivery:"2023-10-17", status:"Open" },
  { id:"PO-2355", vendor:"Bhandure InfraProjects", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:31500.0, gst:0, delivery:"2023-10-17", status:"Open" },
  { id:"PO-2356", vendor:"Hemant Daware", project:"Genial", material:"Compactor machine", qty:1, unit:"Lump", rate:43160.0, gst:0, delivery:"2023-10-18", status:"Open" },
  { id:"PO-2357", vendor:"Suchit Steel", project:"Genial", material:"Steel 44 B / 3520 kg 13 B /1020 kg 36 B/ 2960 kg 33B/ 2470 kg", qty:1, unit:"Lump", rate:572690.0, gst:0, delivery:"2023-10-18", status:"Open" },
  { id:"PO-2358", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2023-10-18", status:"Open" },
  { id:"PO-2359", vendor:"S.R.Kharat", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-10-18", status:"Open" },
  { id:"PO-2360", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2023-10-18", status:"Open" },
  { id:"PO-2361", vendor:"Bhandure Infraprojects", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:50800.0, gst:0, delivery:"2023-10-18", status:"Delivered" },
  { id:"PO-2362", vendor:"S.R.Kharat", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:23000.0, gst:0, delivery:"2023-10-20", status:"Open" },
  { id:"PO-2363", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-20", status:"Open" },
  { id:"PO-2364", vendor:"Hemant Daware", project:"Genial", material:"Compactor machine", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2023-10-06", status:"Open" },
  { id:"PO-2365", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-25", status:"Open" },
  { id:"PO-2366", vendor:"Miscalneous", project:"Genial", material:"Belt & Wycers", qty:1, unit:"Lump", rate:270.0, gst:0, delivery:"2023-10-24", status:"Open" },
  { id:"PO-2367", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2023-10-26", status:"Open" },
  { id:"PO-2368", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-28", status:"Open" },
  { id:"PO-2369", vendor:"Jitu more", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2023-10-28", status:"Open" },
  { id:"PO-2370", vendor:"Miscalneous", project:"Genial", material:"Neeru for plot Marking", qty:1, unit:"Lump", rate:240.0, gst:0, delivery:"2023-10-27", status:"Open" },
  { id:"PO-2371", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel 10mm 13 Bundle", qty:1, unit:"Lump", rate:68108.0, gst:0, delivery:"2023-10-27", status:"Open" },
  { id:"PO-2372", vendor:"Bhandure InfraProjects", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:31500.0, gst:0, delivery:"2023-10-27", status:"Open" },
  { id:"PO-2373", vendor:"Bhandure InfraProjects", project:"Genial", material:"Khadi", qty:1, unit:"Lump", rate:15750.0, gst:0, delivery:"2023-10-28", status:"Open" },
  { id:"PO-2374", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-10-28", status:"Delivered" },
  { id:"PO-2375", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2023-10-29", status:"Delivered" },
  { id:"PO-2376", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:58500.0, gst:0, delivery:"2023-10-29", status:"Open" },
  { id:"PO-2377", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-10-30", status:"Open" },
  { id:"PO-2378", vendor:"Bhandure Infraprojects", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:50400.0, gst:0, delivery:"2023-10-30", status:"Delivered" },
  { id:"PO-2379", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2023-01-11", status:"Open" },
  { id:"PO-2380", vendor:"Nobal arts", project:"Genial", material:"Pharma for beam Casting", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-11-01", status:"Open" },
  { id:"PO-2381", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2023-11-01", status:"Delivered" },
  { id:"PO-2382", vendor:"Jitu more", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:19700.0, gst:0, delivery:"2023-11-01", status:"Open" },
  { id:"PO-2383", vendor:"Jitu more", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:22500.0, gst:0, delivery:"2023-11-01", status:"Open" },
  { id:"PO-2384", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:44240.0, gst:0, delivery:"2023-11-01", status:"Open" },
  { id:"PO-2385", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-11-01", status:"Delivered" },
  { id:"PO-2386", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-11-03", status:"Open" },
  { id:"PO-2387", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:19240.0, gst:0, delivery:"2023-11-03", status:"Delivered" },
  { id:"PO-2388", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-11-05", status:"Open" },
  { id:"PO-2389", vendor:"Nobal arts", project:"Genial", material:"Pharma for beam Casting", qty:1, unit:"Lump", rate:51700.0, gst:0, delivery:"2023-11-05", status:"Open" },
  { id:"PO-2390", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2023-11-06", status:"Open" },
  { id:"PO-2391", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:21840.0, gst:0, delivery:"2023-11-06", status:"Open" },
  { id:"PO-2392", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:21840.0, gst:0, delivery:"2023-11-06", status:"Delivered" },
  { id:"PO-2393", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:27000.0, gst:0, delivery:"2023-11-09", status:"Open" },
  { id:"PO-2394", vendor:"Miscalneous", project:"Genial", material:"Kharata", qty:1, unit:"Lump", rate:45.0, gst:0, delivery:"2023-11-09", status:"Open" },
  { id:"PO-2395", vendor:"mauli enterprices", project:"Genial", material:"generator Rent oct 23", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2023-11-09", status:"Open" },
  { id:"PO-2396", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-11-10", status:"Open" },
  { id:"PO-2397", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-11-15", status:"Open" },
  { id:"PO-2398", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-11-21", status:"Open" },
  { id:"PO-2399", vendor:"Bhandure InfraProjects", project:"Genial", material:"Khadi", qty:1, unit:"Lump", rate:18900.0, gst:0, delivery:"2023-11-23", status:"Open" },
  { id:"PO-2400", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-11-28", status:"Open" },
  { id:"PO-2401", vendor:"Bhandure Infraprojects", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:15750.0, gst:0, delivery:"2023-11-30", status:"Delivered" },
  { id:"PO-2402", vendor:"Bhandure Infraprojects", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2023-11-30", status:"Delivered" },
  { id:"PO-2403", vendor:"S.R.Kharat", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:3600.0, gst:0, delivery:"2023-11-30", status:"Open" },
  { id:"PO-2404", vendor:"Electric Work", project:"Genial", material:"Cable For 1.5 Sqmmx core For Motar", qty:1, unit:"Lump", rate:2280.0, gst:0, delivery:"2023-12-02", status:"Open" },
  { id:"PO-2405", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-12-04", status:"Open" },
  { id:"PO-2406", vendor:"Suchit Steel", project:"Genial", material:"Steel 31 B / 2450 kg 25 B /1980 kg 42 B/ 3490 kg 27 B/ 2020 kg", qty:1, unit:"Lump", rate:577472.0, gst:0, delivery:"2023-12-04", status:"Open" },
  { id:"PO-2407", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:75858.0, gst:0, delivery:"2023-12-07", status:"Delivered" },
  { id:"PO-2408", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2023-12-08", status:"Open" },
  { id:"PO-2409", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2023-12-08", status:"Delivered" },
  { id:"PO-2410", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:5032.0, gst:0, delivery:"2023-12-10", status:"Open" },
  { id:"PO-2411", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-12-11", status:"Open" },
  { id:"PO-2412", vendor:"Bhandure InfraProjects", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:31500.0, gst:0, delivery:"2023-12-11", status:"Open" },
  { id:"PO-2413", vendor:"Bhandure InfraProjects", project:"Genial", material:"Khadi", qty:1, unit:"Lump", rate:18900.0, gst:0, delivery:"2023-12-11", status:"Open" },
  { id:"PO-2414", vendor:"Bhandure InfraProjects", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:31500.0, gst:0, delivery:"2023-12-11", status:"Open" },
  { id:"PO-2415", vendor:"Bhandure Infraprojects", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:46900.0, gst:0, delivery:"2023-12-11", status:"Delivered" },
  { id:"PO-2416", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:21840.0, gst:0, delivery:"2023-12-11", status:"Open" },
  { id:"PO-2417", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:21840.0, gst:0, delivery:"2023-12-11", status:"Delivered" },
  { id:"PO-2418", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:53250.0, gst:0, delivery:"2023-12-14", status:"Open" },
  { id:"PO-2419", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-12-15", status:"Open" },
  { id:"PO-2420", vendor:"mauli enterprices", project:"Genial", material:"generator Rent Nov 23", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2023-12-15", status:"Open" },
  { id:"PO-2421", vendor:"Hard Ware", project:"Genial", material:"Labour Shed lock Comman Expense", qty:1, unit:"Lump", rate:232.0, gst:0, delivery:"2023-12-16", status:"Open" },
  { id:"PO-2422", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:53250.0, gst:0, delivery:"2023-12-16", status:"Open" },
  { id:"PO-2423", vendor:"Hard Ware", project:"Genial", material:"HDPE Pipe", qty:1, unit:"Lump", rate:7980.0, gst:0, delivery:"2023-12-16", status:"Open" },
  { id:"PO-2424", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-12-18", status:"Open" },
  { id:"PO-2425", vendor:"Miscalneous", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2023-12-18", status:"Open" },
  { id:"PO-2426", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:106500.0, gst:0, delivery:"2023-12-20", status:"Delivered" },
  { id:"PO-2427", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:60000.0, gst:0, delivery:"2023-12-21", status:"Open" },
  { id:"PO-2428", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-12-22", status:"Open" },
  { id:"PO-2429", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-12-24", status:"Open" },
  { id:"PO-2430", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:41250.0, gst:0, delivery:"2023-12-27", status:"Open" },
  { id:"PO-2431", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB Excavation Work", qty:1, unit:"Lump", rate:10800.0, gst:0, delivery:"2023-12-27", status:"Open" },
  { id:"PO-2432", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2023-12-27", status:"Open" },
  { id:"PO-2433", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:21840.0, gst:0, delivery:"2023-12-31", status:"Open" },
  { id:"PO-2434", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Metal & Flys Ash Bricks", qty:1, unit:"Lump", rate:90930.0, gst:0, delivery:"2023-12-31", status:"Open" },
  { id:"PO-2435", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks & Wash Sand", qty:1, unit:"Lump", rate:81900.0, gst:0, delivery:"2023-12-31", status:"Open" },
  { id:"PO-2436", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:21840.0, gst:0, delivery:"2023-12-31", status:"Delivered" },
  { id:"PO-2437", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Metal & Flys Ash Bricks", qty:1, unit:"Lump", rate:90930.0, gst:0, delivery:"2023-12-31", status:"Delivered" },
  { id:"PO-2438", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks & Wash Sand", qty:1, unit:"Lump", rate:81900.0, gst:0, delivery:"2023-12-31", status:"Delivered" },
  { id:"PO-2439", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-02", status:"Open" },
  { id:"PO-2440", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-02", status:"Open" },
  { id:"PO-2441", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-01-02", status:"Delivered" },
  { id:"PO-2442", vendor:"Bhandure InfraProjects", project:"Genial", material:"Khadi", qty:1, unit:"Lump", rate:18900.0, gst:0, delivery:"2024-01-08", status:"Open" },
  { id:"PO-2443", vendor:"Bhandure InfraProjects", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:31500.0, gst:0, delivery:"2024-01-08", status:"Open" },
  { id:"PO-2444", vendor:"Bhandure InfraProjects", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:31500.0, gst:0, delivery:"2024-01-08", status:"Open" },
  { id:"PO-2445", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-09", status:"Open" },
  { id:"PO-2446", vendor:"Bhandure Infraprojects", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:81900.0, gst:0, delivery:"2024-01-09", status:"Delivered" },
  { id:"PO-2447", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-12", status:"Open" },
  { id:"PO-2448", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB Excavation Work & Murum", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-01-12", status:"Open" },
  { id:"PO-2449", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-14", status:"Open" },
  { id:"PO-2450", vendor:"Departmental Work", project:"Genial", material:"Murum Filling", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2024-01-17", status:"Open" },
  { id:"PO-2451", vendor:"mauli enterprices", project:"Genial", material:"generator Rent Dec 23", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2024-01-17", status:"Open" },
  { id:"PO-2452", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-17", status:"Open" },
  { id:"PO-2453", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:54700.0, gst:0, delivery:"2024-01-18", status:"Open" },
  { id:"PO-2454", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:1700.0, gst:0, delivery:"2024-01-19", status:"Open" },
  { id:"PO-2455", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Thapi", qty:1, unit:"Lump", rate:140.0, gst:0, delivery:"2024-01-20", status:"Open" },
  { id:"PO-2456", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:3700.0, gst:0, delivery:"2024-01-21", status:"Open" },
  { id:"PO-2457", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-21", status:"Open" },
  { id:"PO-2458", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad Traders", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2024-01-21", status:"Delivered" },
  { id:"PO-2459", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad Traders", qty:1, unit:"Lump", rate:33835.0, gst:0, delivery:"2024-01-24", status:"Open" },
  { id:"PO-2460", vendor:"Transportation", project:"Genial", material:"Plumbing Material", qty:1, unit:"Lump", rate:2500.0, gst:0, delivery:"2024-01-25", status:"Open" },
  { id:"PO-2461", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-25", status:"Open" },
  { id:"PO-2462", vendor:"Transportation", project:"Genial", material:"Plumbing Material", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2024-01-25", status:"Open" },
  { id:"PO-2463", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-01-27", status:"Open" },
  { id:"PO-2464", vendor:"Pahade", project:"Genial", material:"Labour Agency", qty:1, unit:"Lump", rate:13200.0, gst:0, delivery:"2024-01-29", status:"Open" },
  { id:"PO-2465", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:41370.0, gst:0, delivery:"2024-01-31", status:"Open" },
  { id:"PO-2466", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:41370.0, gst:0, delivery:"2024-01-31", status:"Delivered" },
  { id:"PO-2467", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-02", status:"Open" },
  { id:"PO-2468", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:170000.0, gst:0, delivery:"2024-02-05", status:"Delivered" },
  { id:"PO-2469", vendor:"Shivaji Pawar", project:"Genial", material:"Departmental Payment", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2024-02-05", status:"Open" },
  { id:"PO-2470", vendor:"mauli enterprices", project:"Genial", material:"generator Rent Jan 24", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2024-02-07", status:"Open" },
  { id:"PO-2471", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-07", status:"Open" },
  { id:"PO-2472", vendor:"Miscalneous", project:"Genial", material:"Dhumas Expense", qty:1, unit:"Lump", rate:1360.0, gst:0, delivery:"2024-02-08", status:"Open" },
  { id:"PO-2473", vendor:"Miscalneous", project:"Genial", material:"Dhumas Expense", qty:1, unit:"Lump", rate:150.0, gst:0, delivery:"2024-02-08", status:"Open" },
  { id:"PO-2474", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:50.0, gst:0, delivery:"2024-02-08", status:"Open" },
  { id:"PO-2475", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-10", status:"Open" },
  { id:"PO-2476", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-13", status:"Open" },
  { id:"PO-2477", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:170.0, gst:0, delivery:"2024-02-13", status:"Open" },
  { id:"PO-2478", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:57300.0, gst:0, delivery:"2024-02-14", status:"Open" },
  { id:"PO-2479", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:13800.0, gst:0, delivery:"2024-02-14", status:"Open" },
  { id:"PO-2480", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-15", status:"Open" },
  { id:"PO-2481", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-17", status:"Open" },
  { id:"PO-2482", vendor:"Miscalneous", project:"Genial", material:"Tape", qty:1, unit:"Lump", rate:60.0, gst:0, delivery:"2024-02-17", status:"Open" },
  { id:"PO-2483", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:80.0, gst:0, delivery:"2024-02-19", status:"Open" },
  { id:"PO-2484", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:2100.0, gst:0, delivery:"2024-02-20", status:"Open" },
  { id:"PO-2485", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:62000.0, gst:0, delivery:"2024-02-21", status:"Open" },
  { id:"PO-2486", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2024-02-21", status:"Open" },
  { id:"PO-2487", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:48750.0, gst:0, delivery:"2024-02-21", status:"Open" },
  { id:"PO-2488", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:130.0, gst:0, delivery:"2024-02-22", status:"Open" },
  { id:"PO-2489", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Neeru for plot Marking", qty:1, unit:"Lump", rate:60.0, gst:0, delivery:"2024-02-22", status:"Open" },
  { id:"PO-2490", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-22", status:"Open" },
  { id:"PO-2491", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:199000.0, gst:0, delivery:"2024-02-23", status:"Delivered" },
  { id:"PO-2492", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2024-02-23", status:"Delivered" },
  { id:"PO-2493", vendor:"Gurudev Plstic", project:"Genial", material:"Tadpatri", qty:1, unit:"Lump", rate:2400.0, gst:0, delivery:"2024-02-23", status:"Open" },
  { id:"PO-2494", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:20500.0, gst:0, delivery:"2024-02-24", status:"Delivered" },
  { id:"PO-2495", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-25", status:"Open" },
  { id:"PO-2496", vendor:"Hari Om cement Agencies", project:"Genial", material:"8mm -15 Bundle 16mm -15 Bundle", qty:1, unit:"Lump", rate:147889.0, gst:0, delivery:"2024-02-25", status:"Open" },
  { id:"PO-2497", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:53600.0, gst:0, delivery:"2024-02-28", status:"Open" },
  { id:"PO-2498", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2024-02-28", status:"Open" },
  { id:"PO-2499", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:5100.0, gst:0, delivery:"2024-02-28", status:"Open" },
  { id:"PO-2500", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Natural Sand & Wash Sand", qty:1, unit:"Lump", rate:78330.0, gst:0, delivery:"2024-02-29", status:"Open" },
  { id:"PO-2501", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Natural Sand & Wash Sand", qty:1, unit:"Lump", rate:78330.0, gst:0, delivery:"2024-02-29", status:"Delivered" },
  { id:"PO-2502", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-02-29", status:"Open" },
  { id:"PO-2503", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"PVC pipe 6\" 10ft", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2024-02-29", status:"Open" },
  { id:"PO-2504", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2024-02-29", status:"Open" },
  { id:"PO-2505", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-03-02", status:"Open" },
  { id:"PO-2506", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"20 mm Metal", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2024-03-03", status:"Open" },
  { id:"PO-2507", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2024-03-03", status:"Open" },
  { id:"PO-2508", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-03-04", status:"Open" },
  { id:"PO-2509", vendor:"Hari Om cement Agencies", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:103450.0, gst:0, delivery:"2024-03-04", status:"Delivered" },
  { id:"PO-2510", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-03-06", status:"Delivered" },
  { id:"PO-2511", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:73100.0, gst:0, delivery:"2024-03-06", status:"Open" },
  { id:"PO-2512", vendor:"Departmental Work", project:"Genial", material:"Departmental Work (Patel Debit)", qty:1, unit:"Lump", rate:14100.0, gst:0, delivery:"2024-03-06", status:"Open" },
  { id:"PO-2513", vendor:"Ravi Patel", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2024-03-06", status:"Open" },
  { id:"PO-2514", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:45.0, gst:0, delivery:"2024-03-07", status:"Open" },
  { id:"PO-2515", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:105.0, gst:0, delivery:"2024-03-07", status:"Open" },
  { id:"PO-2516", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-03-08", status:"Open" },
  { id:"PO-2517", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2024-03-08", status:"Delivered" },
  { id:"PO-2518", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Bricks Fly Ash", qty:1, unit:"Lump", rate:19500.0, gst:0, delivery:"2024-03-08", status:"Open" },
  { id:"PO-2519", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Cement PPC Ultratech 300 Bags", qty:1, unit:"Lump", rate:94500.0, gst:0, delivery:"2024-03-09", status:"Open" },
  { id:"PO-2520", vendor:"JCB Operator", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:200.0, gst:0, delivery:"2024-03-11", status:"Open" },
  { id:"PO-2521", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-03-12", status:"Open" },
  { id:"PO-2522", vendor:"Miscalneous", project:"Genial", material:"Katan Bardan For Slab Covering", qty:1, unit:"Lump", rate:4608.0, gst:0, delivery:"2024-03-12", status:"Open" },
  { id:"PO-2523", vendor:"Hari Om cement Agencies", project:"Genial", material:"Admixture Chemical", qty:1, unit:"Lump", rate:5200.0, gst:0, delivery:"2024-03-12", status:"Open" },
  { id:"PO-2524", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2024-03-12", status:"Open" },
  { id:"PO-2525", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Lime bag", qty:1, unit:"Lump", rate:100.0, gst:0, delivery:"2024-03-12", status:"Open" },
  { id:"PO-2526", vendor:"mauli enterprices", project:"Genial", material:"generator Rent Feb 24", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2024-03-13", status:"Open" },
  { id:"PO-2527", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2528", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2529", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:94500.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2530", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:3900.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2531", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2532", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:8100.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2533", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:16650.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2534", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2535", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2536", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:10350.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2537", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2024-03-14", status:"Open" },
  { id:"PO-2538", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Shantai Traders ( Vihan Jain)", qty:1, unit:"Lump", rate:170000.0, gst:0, delivery:"2024-03-14", status:"Delivered" },
  { id:"PO-2539", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-03-15", status:"Open" },
  { id:"PO-2540", vendor:"Gurudev Plstic", project:"Genial", material:"Tadpatri", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-03-15", status:"Open" },
  { id:"PO-2541", vendor:"Electric Work", project:"Genial", material:"Electric Work", qty:1, unit:"Lump", rate:630.0, gst:0, delivery:"2024-03-15", status:"Open" },
  { id:"PO-2542", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-03-17", status:"Open" },
  { id:"PO-2543", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2024-03-18", status:"Open" },
  { id:"PO-2544", vendor:"Mauli Chemicals", project:"Genial", material:"Cover blocks 50mm =200Nos 40mm=100 Nos 25 mm=1000 Nos 20 mm =1500 Nos", qty:1, unit:"Lump", rate:5570.0, gst:0, delivery:"2024-03-18", status:"Open" },
  { id:"PO-2545", vendor:"Miscalneous", project:"Genial", material:"HDPE Pipe 60 Mtr", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2024-03-18", status:"Open" },
  { id:"PO-2546", vendor:"Miscalneous", project:"Genial", material:"1 HP Motar & Pipe Assembly", qty:1, unit:"Lump", rate:8150.0, gst:0, delivery:"2024-03-18", status:"Open" },
  { id:"PO-2547", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Naural sand 24 Ton @1700Per Ton", qty:1, unit:"Lump", rate:43463.0, gst:0, delivery:"2024-03-19", status:"Open" },
  { id:"PO-2548", vendor:"Hari Om cement Agencies", project:"Genial", material:"8mm -29 Bundle 10 mm-34 Bundle 12 mm-24 bundle 16mm -40 Bundle", qty:1, unit:"Lump", rate:562663.0, gst:0, delivery:"2024-03-19", status:"Open" },
  { id:"PO-2549", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1870.0, gst:0, delivery:"2024-03-20", status:"Open" },
  { id:"PO-2550", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:175.0, gst:0, delivery:"2024-03-20", status:"Open" },
  { id:"PO-2551", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:72900.0, gst:0, delivery:"2024-03-20", status:"Open" },
  { id:"PO-2552", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-03-20", status:"Open" },
  { id:"PO-2553", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-03-20", status:"Open" },
  { id:"PO-2554", vendor:"Shivaji Pawar", project:"Genial", material:"Centering Material", qty:1, unit:"Lump", rate:10350.0, gst:0, delivery:"2024-03-21", status:"Delivered" },
  { id:"PO-2555", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2024-03-21", status:"Open" },
  { id:"PO-2556", vendor:"Miscalneous", project:"Genial", material:"Pipe Material for Curing work", qty:1, unit:"Lump", rate:1360.0, gst:0, delivery:"2024-03-21", status:"Open" },
  { id:"PO-2557", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1720.0, gst:0, delivery:"2024-03-24", status:"Open" },
  { id:"PO-2558", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-03-27", status:"Open" },
  { id:"PO-2559", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2024-03-27", status:"Delivered" },
  { id:"PO-2560", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Shantai Traders ( Vihan Jain)", qty:1, unit:"Lump", rate:129000.0, gst:0, delivery:"2024-03-27", status:"Delivered" },
  { id:"PO-2561", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:50300.0, gst:0, delivery:"2024-03-27", status:"Open" },
  { id:"PO-2562", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:17500.0, gst:0, delivery:"2024-03-27", status:"Open" },
  { id:"PO-2563", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Bricks Fly Ash", qty:1, unit:"Lump", rate:19500.0, gst:0, delivery:"2024-03-28", status:"Open" },
  { id:"PO-2564", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-03-29", status:"Open" },
  { id:"PO-2565", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Cement Ultratech 300 Bags", qty:1, unit:"Lump", rate:47250.0, gst:0, delivery:"2024-04-02", status:"Open" },
  { id:"PO-2566", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-02", status:"Open" },
  { id:"PO-2567", vendor:"JCB Operator", project:"Genial", material:"Operator Bhatta JCB", qty:1, unit:"Lump", rate:200.0, gst:0, delivery:"2024-04-02", status:"Open" },
  { id:"PO-2568", vendor:"Ravi Patel", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:337771.0, gst:0, delivery:"2024-04-03", status:"Open" },
  { id:"PO-2569", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:52100.0, gst:0, delivery:"2024-04-03", status:"Open" },
  { id:"PO-2570", vendor:"Departmental Work", project:"Genial", material:"Department Paymet", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2024-04-03", status:"Open" },
  { id:"PO-2571", vendor:"Ankit Self Expense", project:"Genial", material:"Recived from Mandakini Mam Against Labour Payment & Self Exp", qty:1, unit:"Lump", rate:60000.0, gst:0, delivery:"2024-04-03", status:"Delivered" },
  { id:"PO-2572", vendor:"Ravi Patel", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-04-04", status:"Delivered" },
  { id:"PO-2573", vendor:"Gururaj Electrical", project:"Genial", material:"Electric Work", qty:1, unit:"Lump", rate:2170000.0, gst:0, delivery:"2024-04-04", status:"Delivered" },
  { id:"PO-2574", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-05", status:"Open" },
  { id:"PO-2575", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:56000.0, gst:0, delivery:"2024-04-05", status:"Open" },
  { id:"PO-2576", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-08", status:"Open" },
  { id:"PO-2577", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Panja & locks", qty:1, unit:"Lump", rate:240.0, gst:0, delivery:"2024-04-09", status:"Open" },
  { id:"PO-2578", vendor:"Ankit Self Expense", project:"Genial", material:"Recived from Mandakini Mam Against Labour Payment & Self Exp", qty:1, unit:"Lump", rate:111000.0, gst:0, delivery:"2024-04-10", status:"Delivered" },
  { id:"PO-2579", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:90650.0, gst:0, delivery:"2024-04-10", status:"Open" },
  { id:"PO-2580", vendor:"Departmental Work", project:"Genial", material:"Department Paymet", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-04-10", status:"Open" },
  { id:"PO-2581", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-10", status:"Open" },
  { id:"PO-2582", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-04-11", status:"Open" },
  { id:"PO-2583", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2024-04-11", status:"Open" },
  { id:"PO-2584", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:155.0, gst:0, delivery:"2024-04-12", status:"Open" },
  { id:"PO-2585", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1826.0, gst:0, delivery:"2024-04-13", status:"Open" },
  { id:"PO-2586", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-04-15", status:"Open" },
  { id:"PO-2587", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 150 Bags", qty:1, unit:"Lump", rate:49500.0, gst:0, delivery:"2024-04-15", status:"Open" },
  { id:"PO-2588", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-16", status:"Open" },
  { id:"PO-2589", vendor:"Sagar Pawar", project:"Genial", material:"80/100", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2024-04-16", status:"Open" },
  { id:"PO-2590", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:66600.0, gst:0, delivery:"2024-04-17", status:"Open" },
  { id:"PO-2591", vendor:"Departmental Work", project:"Genial", material:"Department Paymet", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2024-04-17", status:"Open" },
  { id:"PO-2592", vendor:"Departmental Work", project:"Genial", material:"Department Paymet", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2024-04-17", status:"Open" },
  { id:"PO-2593", vendor:"Ankit Self Expense", project:"Genial", material:"Recived from Mandakini Mam Against Labour Payment Shivaji Pa", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-04-17", status:"Delivered" },
  { id:"PO-2594", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:53237.0, gst:0, delivery:"2024-04-18", status:"Open" },
  { id:"PO-2595", vendor:"JCB Operator", project:"Genial", material:"JCB Operator Bhatta", qty:1, unit:"Lump", rate:200.0, gst:0, delivery:"2024-04-18", status:"Open" },
  { id:"PO-2596", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks 4\"", qty:1, unit:"Lump", rate:29900.0, gst:0, delivery:"2024-04-18", status:"Open" },
  { id:"PO-2597", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-19", status:"Open" },
  { id:"PO-2598", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-04-19", status:"Open" },
  { id:"PO-2599", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-04-19", status:"Open" },
  { id:"PO-2600", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-04-20", status:"Open" },
  { id:"PO-2601", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-20", status:"Open" },
  { id:"PO-2602", vendor:"mauli enterprices", project:"Genial", material:"generator Rent March 23", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2024-04-20", status:"Open" },
  { id:"PO-2603", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Compactotr Belt", qty:1, unit:"Lump", rate:177.0, gst:0, delivery:"2024-04-21", status:"Open" },
  { id:"PO-2604", vendor:"Gurudev Plstic", project:"Genial", material:"Tadpatri cement bags", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2024-04-22", status:"Open" },
  { id:"PO-2605", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"ultratech cement 200 Bags", qty:1, unit:"Lump", rate:65000.0, gst:0, delivery:"2024-04-22", status:"Open" },
  { id:"PO-2606", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Chemical Admixture 50Ltr", qty:1, unit:"Lump", rate:5200.0, gst:0, delivery:"2024-04-22", status:"Open" },
  { id:"PO-2607", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-23", status:"Open" },
  { id:"PO-2608", vendor:"Ankit Self Expense & Shivaji Pawar", project:"Genial", material:"Recived from Mandakini Mam", qty:1, unit:"Lump", rate:158000.0, gst:0, delivery:"2024-04-24", status:"Delivered" },
  { id:"PO-2609", vendor:"Shivaji Pawar", project:"Genial", material:"Gangawala Payement against Slab Plot no.4", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-04-24", status:"Open" },
  { id:"PO-2610", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:85325.0, gst:0, delivery:"2024-04-24", status:"Open" },
  { id:"PO-2611", vendor:"Departmental Work", project:"Genial", material:"Department Paymet", qty:1, unit:"Lump", rate:5475.0, gst:0, delivery:"2024-04-24", status:"Open" },
  { id:"PO-2612", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:135.0, gst:0, delivery:"2024-04-24", status:"Open" },
  { id:"PO-2613", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-26", status:"Open" },
  { id:"PO-2614", vendor:"Miscalneous", project:"Genial", material:"curing Material", qty:1, unit:"Lump", rate:1550.0, gst:0, delivery:"2024-04-27", status:"Open" },
  { id:"PO-2615", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-04-27", status:"Open" },
  { id:"PO-2616", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-04-27", status:"Open" },
  { id:"PO-2617", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"ultratech cement 150 Bags", qty:1, unit:"Lump", rate:48750.0, gst:0, delivery:"2024-04-27", status:"Open" },
  { id:"PO-2618", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-04-29", status:"Open" },
  { id:"PO-2619", vendor:"Miscalneous", project:"Genial", material:"curing Material", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-04-29", status:"Open" },
  { id:"PO-2620", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-04-29", status:"Open" },
  { id:"PO-2621", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2024-04-30", status:"Open" },
  { id:"PO-2622", vendor:"JCB Operator", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:100.0, gst:0, delivery:"2024-04-30", status:"Open" },
  { id:"PO-2623", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-05-01", status:"Open" },
  { id:"PO-2624", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-05-01", status:"Open" },
  { id:"PO-2625", vendor:"Shivaji Pawar", project:"Genial", material:"Recived from Mandakini Patil Mam for Shivaji Pawar Payement", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-05-02", status:"Delivered" },
  { id:"PO-2626", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:78650.0, gst:0, delivery:"2024-05-02", status:"Open" },
  { id:"PO-2627", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-03", status:"Open" },
  { id:"PO-2628", vendor:"Bajirao Jadhav", project:"Genial", material:"Kata Pavti", qty:1, unit:"Lump", rate:150.0, gst:0, delivery:"2024-05-03", status:"Open" },
  { id:"PO-2629", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2024-05-06", status:"Delivered" },
  { id:"PO-2630", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Shantai Traders ( Vihan Jain)", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2024-05-06", status:"Delivered" },
  { id:"PO-2631", vendor:"mauli enterprices", project:"Genial", material:"generator Rent March 23", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2024-05-06", status:"Open" },
  { id:"PO-2632", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel For generator", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-07", status:"Open" },
  { id:"PO-2633", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2024-05-07", status:"Delivered" },
  { id:"PO-2634", vendor:"Shivaji Pawar", project:"Genial", material:"Recived from Mandakini Patil Mam for Shivaji Pawar Payement", qty:1, unit:"Lump", rate:55000.0, gst:0, delivery:"2024-05-08", status:"Delivered" },
  { id:"PO-2635", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:58700.0, gst:0, delivery:"2024-05-08", status:"Open" },
  { id:"PO-2636", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:28237.0, gst:0, delivery:"2024-05-08", status:"Delivered" },
  { id:"PO-2637", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 150 Bags", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2024-05-09", status:"Open" },
  { id:"PO-2638", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel For generator", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-10", status:"Open" },
  { id:"PO-2639", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel 57 B / 4430 kg 16 B /1240 kg 21 B/ 1720 kg 33 B/ 2440 kg", qty:1, unit:"Lump", rate:613785.0, gst:0, delivery:"2024-05-10", status:"Open" },
  { id:"PO-2640", vendor:"Steel Material", project:"Genial", material:"Kata Pavti Steel", qty:1, unit:"Lump", rate:100.0, gst:0, delivery:"2024-05-11", status:"Open" },
  { id:"PO-2641", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-05-11", status:"Open" },
  { id:"PO-2642", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:40.0, gst:0, delivery:"2024-05-12", status:"Open" },
  { id:"PO-2643", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-12", status:"Open" },
  { id:"PO-2644", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks 4\"", qty:1, unit:"Lump", rate:19500.0, gst:0, delivery:"2024-05-12", status:"Open" },
  { id:"PO-2645", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-05-13", status:"Delivered" },
  { id:"PO-2646", vendor:"Ravi Patel", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-05-13", status:"Delivered" },
  { id:"PO-2647", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-13", status:"Open" },
  { id:"PO-2648", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks 4\"", qty:1, unit:"Lump", rate:9750.0, gst:0, delivery:"2024-05-15", status:"Open" },
  { id:"PO-2649", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks 4\"", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2024-05-15", status:"Open" },
  { id:"PO-2650", vendor:"Pramod Sonawane", project:"Genial", material:"Recived From Pramod Sonawane On Behlaf Of Mandakini Mam", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2024-05-15", status:"Delivered" },
  { id:"PO-2651", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:101750.0, gst:0, delivery:"2024-05-15", status:"Open" },
  { id:"PO-2652", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-05-18", status:"Open" },
  { id:"PO-2653", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 150 Bags", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2024-05-18", status:"Open" },
  { id:"PO-2654", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-05-19", status:"Open" },
  { id:"PO-2655", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-05-19", status:"Open" },
  { id:"PO-2656", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-05-19", status:"Open" },
  { id:"PO-2657", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-05-20", status:"Open" },
  { id:"PO-2658", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel For generator", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-20", status:"Open" },
  { id:"PO-2659", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 150 Bags", qty:1, unit:"Lump", rate:64000.0, gst:0, delivery:"2024-05-21", status:"Open" },
  { id:"PO-2660", vendor:"Sagar Pawar", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:49000.0, gst:0, delivery:"2024-05-22", status:"Open" },
  { id:"PO-2661", vendor:"Miscalneous", project:"Genial", material:"Pharma Painting Material", qty:1, unit:"Lump", rate:230.0, gst:0, delivery:"2024-05-22", status:"Open" },
  { id:"PO-2662", vendor:"Pramod Sonawane", project:"Genial", material:"Recived From Pramod Sonawane On Behlaf Of Mandakini Mam", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-05-22", status:"Delivered" },
  { id:"PO-2663", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-05-23", status:"Delivered" },
  { id:"PO-2664", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel & Cement", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2024-05-23", status:"Delivered" },
  { id:"PO-2665", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Cement & Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-05-23", status:"Delivered" },
  { id:"PO-2666", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:63650.0, gst:0, delivery:"2024-05-23", status:"Open" },
  { id:"PO-2667", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:3300.0, gst:0, delivery:"2024-05-23", status:"Open" },
  { id:"PO-2668", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-05-23", status:"Open" },
  { id:"PO-2669", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-23", status:"Open" },
  { id:"PO-2670", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:165.0, gst:0, delivery:"2024-05-23", status:"Open" },
  { id:"PO-2671", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Curing Cans 5Ltr", qty:1, unit:"Lump", rate:210.0, gst:0, delivery:"2024-05-25", status:"Open" },
  { id:"PO-2672", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-05-26", status:"Open" },
  { id:"PO-2673", vendor:"Sagar Pawar", project:"Genial", material:"80/100", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2024-05-27", status:"Open" },
  { id:"PO-2674", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-27", status:"Open" },
  { id:"PO-2675", vendor:"Ankit Self Expense & Shivaji Pawar", project:"Genial", material:"Recived From Mandakini Mam For Labour Payment 29.05.24", qty:1, unit:"Lump", rate:110000.0, gst:0, delivery:"2024-05-29", status:"Delivered" },
  { id:"PO-2676", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:89300.0, gst:0, delivery:"2024-05-29", status:"Open" },
  { id:"PO-2677", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:10500.0, gst:0, delivery:"2024-05-29", status:"Open" },
  { id:"PO-2678", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-05-29", status:"Open" },
  { id:"PO-2679", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-05-30", status:"Open" },
  { id:"PO-2680", vendor:"Chavan Supplier", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2024-05-31", status:"Open" },
  { id:"PO-2681", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks 4\"", qty:1, unit:"Lump", rate:19500.0, gst:0, delivery:"2024-05-31", status:"Open" },
  { id:"PO-2682", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-06-02", status:"Open" },
  { id:"PO-2683", vendor:"Chavan Supplier", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2024-06-02", status:"Open" },
  { id:"PO-2684", vendor:"Chavan Supplier", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2024-06-02", status:"Open" },
  { id:"PO-2685", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2024-06-02", status:"Open" },
  { id:"PO-2686", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-2687", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-2688", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 150 Bags", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2024-06-04", status:"Open" },
  { id:"PO-2689", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2024-06-05", status:"Open" },
  { id:"PO-2690", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2024-04-05", status:"Delivered" },
  { id:"PO-2691", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-06-05", status:"Delivered" },
  { id:"PO-2692", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-06-05", status:"Delivered" },
  { id:"PO-2693", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:38500.0, gst:0, delivery:"2024-06-05", status:"Delivered" },
  { id:"PO-2694", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2024-06-05", status:"Delivered" },
  { id:"PO-2695", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-06-05", status:"Delivered" },
  { id:"PO-2696", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2024-06-05", status:"Delivered" },
  { id:"PO-2697", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:84950.0, gst:0, delivery:"2024-06-05", status:"Open" },
  { id:"PO-2698", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2024-06-05", status:"Open" },
  { id:"PO-2699", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks 4\"", qty:1, unit:"Lump", rate:19500.0, gst:0, delivery:"2024-06-07", status:"Open" },
  { id:"PO-2700", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-06-07", status:"Open" },
  { id:"PO-2701", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2024-06-09", status:"Open" },
  { id:"PO-2702", vendor:"mauli enterprices", project:"Genial", material:"generator Rent May24", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2024-06-09", status:"Open" },
  { id:"PO-2703", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:1828.0, gst:0, delivery:"2024-06-10", status:"Open" },
  { id:"PO-2704", vendor:"Electric Work", project:"Genial", material:"Board", qty:1, unit:"Lump", rate:1065.0, gst:0, delivery:"2024-06-11", status:"Open" },
  { id:"PO-2705", vendor:"Electric Work", project:"Genial", material:"Unarmad Cable for Meter", qty:1, unit:"Lump", rate:5400.0, gst:0, delivery:"2024-06-11", status:"Open" },
  { id:"PO-2706", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-06-11", status:"Open" },
  { id:"PO-2707", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-06-11", status:"Open" },
  { id:"PO-2708", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-06-12", status:"Open" },
  { id:"PO-2709", vendor:"Miscalneous", project:"Genial", material:"Water Supply", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2024-06-12", status:"Open" },
  { id:"PO-2710", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:96800.0, gst:0, delivery:"2024-06-12", status:"Open" },
  { id:"PO-2711", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:9600.0, gst:0, delivery:"2024-06-12", status:"Open" },
  { id:"PO-2712", vendor:"Chavan Supplier", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2024-06-13", status:"Open" },
  { id:"PO-2713", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-06-14", status:"Delivered" },
  { id:"PO-2714", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-06-14", status:"Delivered" },
  { id:"PO-2715", vendor:"Miscalneous", project:"Genial", material:"Motar Starter", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-06-14", status:"Open" },
  { id:"PO-2716", vendor:"Miscalneous", project:"Genial", material:"Motar Cable", qty:1, unit:"Lump", rate:7500.0, gst:0, delivery:"2024-06-14", status:"Open" },
  { id:"PO-2717", vendor:"mauli enterprices", project:"Genial", material:"generator Rent May24", qty:1, unit:"Lump", rate:14160.0, gst:0, delivery:"2024-06-14", status:"Delivered" },
  { id:"PO-2718", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-06-17", status:"Open" },
  { id:"PO-2719", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 200 Bags", qty:1, unit:"Lump", rate:64000.0, gst:0, delivery:"2024-06-17", status:"Open" },
  { id:"PO-2720", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 150 Bags", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2024-06-17", status:"Open" },
  { id:"PO-2721", vendor:"Hari Om cement Agencies", project:"Genial", material:"Admixture Chemical", qty:1, unit:"Lump", rate:12600.0, gst:0, delivery:"2024-06-17", status:"Open" },
  { id:"PO-2722", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-06-18", status:"Open" },
  { id:"PO-2723", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-06-18", status:"Open" },
  { id:"PO-2724", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Painting Material", qty:1, unit:"Lump", rate:230.0, gst:0, delivery:"2024-06-18", status:"Open" },
  { id:"PO-2725", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:106700.0, gst:0, delivery:"2024-06-20", status:"Open" },
  { id:"PO-2726", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:5550.0, gst:0, delivery:"2024-06-20", status:"Open" },
  { id:"PO-2727", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-06-20", status:"Open" },
  { id:"PO-2728", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2024-06-20", status:"Open" },
  { id:"PO-2729", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:72500.0, gst:0, delivery:"2024-06-26", status:"Open" },
  { id:"PO-2730", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:2250.0, gst:0, delivery:"2024-06-26", status:"Open" },
  { id:"PO-2731", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-06-26", status:"Delivered" },
  { id:"PO-2732", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-07-01", status:"Delivered" },
  { id:"PO-2733", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-07-01", status:"Delivered" },
  { id:"PO-2734", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-07-01", status:"Delivered" },
  { id:"PO-2735", vendor:"mauli enterprices", project:"Genial", material:"generator Rent June 24", qty:1, unit:"Lump", rate:7080.0, gst:0, delivery:"2024-07-02", status:"Open" },
  { id:"PO-2736", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:43000.0, gst:0, delivery:"2024-07-03", status:"Delivered" },
  { id:"PO-2737", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-07-03", status:"Delivered" },
  { id:"PO-2738", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:24350.0, gst:0, delivery:"2024-07-03", status:"Delivered" },
  { id:"PO-2739", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:36500.0, gst:0, delivery:"2024-07-03", status:"Open" },
  { id:"PO-2740", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-07-05", status:"Open" },
  { id:"PO-2741", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Shantai Traders ( Vihan Jain)", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-07-05", status:"Delivered" },
  { id:"PO-2742", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-07-05", status:"Delivered" },
  { id:"PO-2743", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2024-07-06", status:"Delivered" },
  { id:"PO-2744", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-07-09", status:"Open" },
  { id:"PO-2745", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-07-10", status:"Open" },
  { id:"PO-2746", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:2165.0, gst:0, delivery:"2024-07-10", status:"Open" },
  { id:"PO-2747", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel 11 B / 06 B/", qty:1, unit:"Lump", rate:71703.0, gst:0, delivery:"2024-07-10", status:"Open" },
  { id:"PO-2748", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2024-07-11", status:"Delivered" },
  { id:"PO-2749", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:59000.0, gst:0, delivery:"2024-07-11", status:"Open" },
  { id:"PO-2750", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-07-11", status:"Open" },
  { id:"PO-2751", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2024-07-11", status:"Delivered" },
  { id:"PO-2752", vendor:"Gurudev Plstic", project:"Genial", material:"Tadpatri cement bags", qty:1, unit:"Lump", rate:950.0, gst:0, delivery:"2024-07-13", status:"Open" },
  { id:"PO-2753", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:29900.0, gst:0, delivery:"2024-07-17", status:"Open" },
  { id:"PO-2754", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-07-17", status:"Open" },
  { id:"PO-2755", vendor:"Miscalneous", project:"Genial", material:"Tan Nashak", qty:1, unit:"Lump", rate:630.0, gst:0, delivery:"2024-07-18", status:"Open" },
  { id:"PO-2756", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:30500.0, gst:0, delivery:"2024-07-18", status:"Delivered" },
  { id:"PO-2757", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-07-18", status:"Delivered" },
  { id:"PO-2758", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2024-07-24", status:"Open" },
  { id:"PO-2759", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2024-07-24", status:"Delivered" },
  { id:"PO-2760", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-07-28", status:"Open" },
  { id:"PO-2761", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-07-28", status:"Delivered" },
  { id:"PO-2762", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 200 Bags", qty:1, unit:"Lump", rate:64000.0, gst:0, delivery:"2024-07-28", status:"Open" },
  { id:"PO-2763", vendor:"Hari Om cement Agencies", project:"Genial", material:"Admixture Chemical", qty:1, unit:"Lump", rate:5200.0, gst:0, delivery:"2024-07-28", status:"Open" },
  { id:"PO-2764", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:31550.0, gst:0, delivery:"2024-07-31", status:"Open" },
  { id:"PO-2765", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-08-01", status:"Delivered" },
  { id:"PO-2766", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:31550.0, gst:0, delivery:"2024-08-01", status:"Delivered" },
  { id:"PO-2767", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2024-08-02", status:"Delivered" },
  { id:"PO-2768", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2024-08-02", status:"Delivered" },
  { id:"PO-2769", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:96600.0, gst:0, delivery:"2024-08-04", status:"Delivered" },
  { id:"PO-2770", vendor:"Bharat Bapu Khumbhar", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-08-05", status:"Open" },
  { id:"PO-2771", vendor:"mauli enterprices", project:"Genial", material:"generator Rent June 24", qty:1, unit:"Lump", rate:7080.0, gst:0, delivery:"2024-08-05", status:"Delivered" },
  { id:"PO-2772", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:14400.0, gst:0, delivery:"2024-08-05", status:"Open" },
  { id:"PO-2773", vendor:"Electric Work", project:"Genial", material:"Motar Cable", qty:1, unit:"Lump", rate:8100.0, gst:0, delivery:"2024-08-05", status:"Open" },
  { id:"PO-2774", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:27200.0, gst:0, delivery:"2024-08-07", status:"Open" },
  { id:"PO-2775", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:27200.0, gst:0, delivery:"2024-08-07", status:"Delivered" },
  { id:"PO-2776", vendor:"Ravi Patel", project:"Genial", material:"RCC Labour Payment", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-08-08", status:"Delivered" },
  { id:"PO-2777", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-08-08", status:"Delivered" },
  { id:"PO-2778", vendor:"Nivrutti Pagar", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:14400.0, gst:0, delivery:"2024-08-12", status:"Delivered" },
  { id:"PO-2779", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel 8mm - 20Bundle 10 mm- 06Bundle 12 mm- 05bundle 16mm - 15 Bundle ", qty:1, unit:"Lump", rate:186900.0, gst:0, delivery:"2024-08-12", status:"Open" },
  { id:"PO-2780", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire 25 Kg @ 75 /- per kg", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-08-13", status:"Open" },
  { id:"PO-2781", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:63425.0, gst:0, delivery:"2024-08-14", status:"Open" },
  { id:"PO-2782", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:3375.0, gst:0, delivery:"2024-08-14", status:"Open" },
  { id:"PO-2783", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Shantai Traders ( Vihan Jain)", qty:1, unit:"Lump", rate:93813.0, gst:0, delivery:"2024-08-14", status:"Delivered" },
  { id:"PO-2784", vendor:"Miscalneous", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:24300.0, gst:0, delivery:"2024-08-14", status:"Open" },
  { id:"PO-2785", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Painting Material", qty:1, unit:"Lump", rate:150.0, gst:0, delivery:"2024-08-16", status:"Open" },
  { id:"PO-2786", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2024-08-16", status:"Delivered" },
  { id:"PO-2787", vendor:"Miscalneous", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:24300.0, gst:0, delivery:"2024-08-16", status:"Delivered" },
  { id:"PO-2788", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:46400.0, gst:0, delivery:"2024-08-21", status:"Open" },
  { id:"PO-2789", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2024-08-21", status:"Open" },
  { id:"PO-2790", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:48200.0, gst:0, delivery:"2024-08-22", status:"Delivered" },
  { id:"PO-2791", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-08-22", status:"Open" },
  { id:"PO-2792", vendor:"Hari Om cement Agencies", project:"Genial", material:"ultratech cement 200 Bags", qty:1, unit:"Lump", rate:52000.0, gst:0, delivery:"2024-08-22", status:"Open" },
  { id:"PO-2793", vendor:"Diamond Art For MDF Cuttings", project:"Genial", material:"MDF Payment Done by Mandakini Mam", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2024-08-23", status:"Delivered" },
  { id:"PO-2794", vendor:"Geeta Ply wood", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:8890.0, gst:0, delivery:"2024-08-23", status:"Open" },
  { id:"PO-2795", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1100.0, gst:0, delivery:"2024-08-27", status:"Open" },
  { id:"PO-2796", vendor:"Diamond Art For MDF Cuttings", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:17600.0, gst:0, delivery:"2024-08-27", status:"Open" },
  { id:"PO-2797", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:32900.0, gst:0, delivery:"2024-08-28", status:"Open" },
  { id:"PO-2798", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2024-08-28", status:"Delivered" },
  { id:"PO-2799", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:32900.0, gst:0, delivery:"2024-08-28", status:"Delivered" },
  { id:"PO-2800", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-09-01", status:"Delivered" },
  { id:"PO-2801", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2024-09-04", status:"Delivered" },
  { id:"PO-2802", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:59600.0, gst:0, delivery:"2024-09-04", status:"Open" },
  { id:"PO-2803", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:3600.0, gst:0, delivery:"2024-09-04", status:"Open" },
  { id:"PO-2804", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:63200.0, gst:0, delivery:"2024-09-04", status:"Delivered" },
  { id:"PO-2805", vendor:"Geeta Ply wood", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:1728.0, gst:0, delivery:"2024-09-05", status:"Open" },
  { id:"PO-2806", vendor:"Geeta Ply wood", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:250.0, gst:0, delivery:"2024-09-05", status:"Open" },
  { id:"PO-2807", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1100.0, gst:0, delivery:"2024-09-06", status:"Open" },
  { id:"PO-2808", vendor:"Diamond Art For MDF Cuttings", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:3840.0, gst:0, delivery:"2024-09-06", status:"Open" },
  { id:"PO-2809", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:45000.0, gst:0, delivery:"2024-09-09", status:"Delivered" },
  { id:"PO-2810", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-09-10", status:"Open" },
  { id:"PO-2811", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-09-11", status:"Open" },
  { id:"PO-2812", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:59900.0, gst:0, delivery:"2024-09-11", status:"Open" },
  { id:"PO-2813", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-09-11", status:"Open" },
  { id:"PO-2814", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:60500.0, gst:0, delivery:"2024-09-11", status:"Delivered" },
  { id:"PO-2815", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-09-12", status:"Open" },
  { id:"PO-2816", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:28.0, gst:0, delivery:"2024-09-14", status:"Open" },
  { id:"PO-2817", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om Agencies Tushar Bhau", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2024-09-15", status:"Delivered" },
  { id:"PO-2818", vendor:"Hari Om cement Agencies", project:"Genial", material:"Ultratech cement 250 Bags", qty:1, unit:"Lump", rate:82500.0, gst:0, delivery:"2024-09-16", status:"Open" },
  { id:"PO-2819", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:150.0, gst:0, delivery:"2024-09-16", status:"Open" },
  { id:"PO-2820", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:70950.0, gst:0, delivery:"2024-09-18", status:"Open" },
  { id:"PO-2821", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:1950.0, gst:0, delivery:"2024-09-18", status:"Open" },
  { id:"PO-2822", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:72900.0, gst:0, delivery:"2024-09-18", status:"Delivered" },
  { id:"PO-2823", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel 8mm - 16 Bundle 10 mm- 16Bundle 16mm - 10Bundle 20mm- 2 Bars", qty:1, unit:"Lump", rate:201022.0, gst:0, delivery:"2024-09-19", status:"Open" },
  { id:"PO-2824", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:41879.0, gst:0, delivery:"2024-09-19", status:"Open" },
  { id:"PO-2825", vendor:"Miscalneous", project:"Genial", material:"Safety Material", qty:1, unit:"Lump", rate:1860.0, gst:0, delivery:"2024-09-20", status:"Open" },
  { id:"PO-2826", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:260.0, gst:0, delivery:"2024-09-21", status:"Open" },
  { id:"PO-2827", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:59500.0, gst:0, delivery:"2024-09-21", status:"Open" },
  { id:"PO-2828", vendor:"Miscalneous", project:"Genial", material:"Safety Material", qty:1, unit:"Lump", rate:1455.0, gst:0, delivery:"2024-09-22", status:"Open" },
  { id:"PO-2829", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2024-09-22", status:"Open" },
  { id:"PO-2830", vendor:"Miscalneous", project:"Genial", material:"Tan Nashak", qty:1, unit:"Lump", rate:380.0, gst:0, delivery:"2024-09-22", status:"Open" },
  { id:"PO-2831", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-09-24", status:"Open" },
  { id:"PO-2832", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-09-24", status:"Open" },
  { id:"PO-2833", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:90000.0, gst:0, delivery:"2024-09-24", status:"Delivered" },
  { id:"PO-2834", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:65150.0, gst:0, delivery:"2024-09-24", status:"Open" },
  { id:"PO-2835", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:3750.0, gst:0, delivery:"2024-09-24", status:"Open" },
  { id:"PO-2836", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:68900.0, gst:0, delivery:"2024-09-24", status:"Delivered" },
  { id:"PO-2837", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Fly Ash Bricks 4\"", qty:1, unit:"Lump", rate:19500.0, gst:0, delivery:"2024-09-26", status:"Open" },
  { id:"PO-2838", vendor:"Hari Om cement Agencies", project:"Genial", material:"Ultratech cement 200 Bags", qty:1, unit:"Lump", rate:65000.0, gst:0, delivery:"2024-09-26", status:"Open" },
  { id:"PO-2839", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:42500.0, gst:0, delivery:"2024-09-27", status:"Open" },
  { id:"PO-2840", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-09-27", status:"Delivered" },
  { id:"PO-2841", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-09-27", status:"Open" },
  { id:"PO-2842", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2024-09-27", status:"Open" },
  { id:"PO-2843", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:116.0, gst:0, delivery:"2024-09-27", status:"Open" },
  { id:"PO-2844", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:30.0, gst:0, delivery:"2024-09-30", status:"Open" },
  { id:"PO-2845", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:41879.0, gst:0, delivery:"2024-09-30", status:"Delivered" },
  { id:"PO-2846", vendor:"PMC", project:"Genial", material:"Recived From Mandakini Mam PMC Payment genial", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-10-01", status:"Delivered" },
  { id:"PO-2847", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:42500.0, gst:0, delivery:"2024-10-01", status:"Open" },
  { id:"PO-2848", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:49550.0, gst:0, delivery:"2024-10-01", status:"Open" },
  { id:"PO-2849", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:4200.0, gst:0, delivery:"2024-10-01", status:"Open" },
  { id:"PO-2850", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:42500.0, gst:0, delivery:"2024-10-02", status:"Open" },
  { id:"PO-2851", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-10-02", status:"Open" },
  { id:"PO-2852", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:53750.0, gst:0, delivery:"2024-10-02", status:"Delivered" },
  { id:"PO-2853", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-10-02", status:"Delivered" },
  { id:"PO-2854", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-10-04", status:"Delivered" },
  { id:"PO-2855", vendor:"Miscalneous", project:"Genial", material:"Stationary Material", qty:1, unit:"Lump", rate:57.0, gst:0, delivery:"2024-10-07", status:"Open" },
  { id:"PO-2856", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2024-10-09", status:"Open" },
  { id:"PO-2857", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:41100.0, gst:0, delivery:"2024-10-10", status:"Open" },
  { id:"PO-2858", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:13500.0, gst:0, delivery:"2024-10-10", status:"Open" },
  { id:"PO-2859", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel 8mm -15 Bundle 10mm -24 Bundle 12mm -2 Bundle 16mm -19 Bundle 20", qty:1, unit:"Lump", rate:284044.0, gst:0, delivery:"2024-10-10", status:"Open" },
  { id:"PO-2860", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2024-10-11", status:"Open" },
  { id:"PO-2861", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:33000.0, gst:0, delivery:"2024-10-12", status:"Delivered" },
  { id:"PO-2862", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:79000.0, gst:0, delivery:"2024-10-12", status:"Delivered" },
  { id:"PO-2863", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:54600.0, gst:0, delivery:"2024-10-12", status:"Delivered" },
  { id:"PO-2864", vendor:"Hari Om cement Agencies", project:"Genial", material:"Ultratech cement 300 Bags", qty:1, unit:"Lump", rate:97500.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2865", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2866", vendor:"JCB Excavation", project:"Genial", material:"Excavation Work", qty:1, unit:"Lump", rate:3344.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2867", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:2250.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2868", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:79100.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2869", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:81350.0, gst:0, delivery:"2024-10-16", status:"Delivered" },
  { id:"PO-2870", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-10-16", status:"Open" },
  { id:"PO-2871", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-10-17", status:"Open" },
  { id:"PO-2872", vendor:"Geeta Ply wood", project:"Genial", material:"Design Plot 4 & 9", qty:1, unit:"Lump", rate:4570.0, gst:0, delivery:"2024-10-17", status:"Open" },
  { id:"PO-2873", vendor:"Miscalneous", project:"Genial", material:"Miscalenous", qty:1, unit:"Lump", rate:80.0, gst:0, delivery:"2024-10-17", status:"Open" },
  { id:"PO-2874", vendor:"Miscalneous", project:"Genial", material:"Cover Blocks", qty:1, unit:"Lump", rate:3210.0, gst:0, delivery:"2024-10-20", status:"Open" },
  { id:"PO-2875", vendor:"Miscalneous", project:"Genial", material:"Drum", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2024-10-20", status:"Open" },
  { id:"PO-2876", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1400.0, gst:0, delivery:"2024-10-20", status:"Open" },
  { id:"PO-2877", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-10-21", status:"Open" },
  { id:"PO-2878", vendor:"Diamond Art For MDF Cuttings", project:"Genial", material:"Design Plot 4 & 9", qty:1, unit:"Lump", rate:9600.0, gst:0, delivery:"2024-10-21", status:"Open" },
  { id:"PO-2879", vendor:"Miscalneous", project:"Genial", material:"Site lightening", qty:1, unit:"Lump", rate:2800.0, gst:0, delivery:"2024-10-21", status:"Open" },
  { id:"PO-2880", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om cement Agencies", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2024-10-22", status:"Delivered" },
  { id:"PO-2881", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:27000.0, gst:0, delivery:"2024-10-22", status:"Delivered" },
  { id:"PO-2882", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:45000.0, gst:0, delivery:"2024-10-22", status:"Delivered" },
  { id:"PO-2883", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:38250.0, gst:0, delivery:"2024-10-22", status:"Open" },
  { id:"PO-2884", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:42500.0, gst:0, delivery:"2024-10-23", status:"Open" },
  { id:"PO-2885", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:4200.0, gst:0, delivery:"2024-10-23", status:"Open" },
  { id:"PO-2886", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:145050.0, gst:0, delivery:"2024-10-23", status:"Open" },
  { id:"PO-2887", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:149250.0, gst:0, delivery:"2024-10-23", status:"Delivered" },
  { id:"PO-2888", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2024-10-23", status:"Delivered" },
  { id:"PO-2889", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:65200.0, gst:0, delivery:"2024-10-23", status:"Delivered" },
  { id:"PO-2890", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2024-10-24", status:"Open" },
  { id:"PO-2891", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2024-10-24", status:"Delivered" },
  { id:"PO-2892", vendor:"PMC", project:"Genial", material:"PMC Payement Genial recived From Mandakini Mam", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2024-10-24", status:"Delivered" },
  { id:"PO-2893", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-10-25", status:"Open" },
  { id:"PO-2894", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-10-25", status:"Open" },
  { id:"PO-2895", vendor:"MSEB", project:"Genial", material:"Genial Light Bill", qty:1, unit:"Lump", rate:13310.0, gst:0, delivery:"2024-10-25", status:"Open" },
  { id:"PO-2896", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-10-25", status:"Open" },
  { id:"PO-2897", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-10-25", status:"Open" },
  { id:"PO-2898", vendor:"Hari Om cement Agencies", project:"Genial", material:"Ultratech cement 200 Bags", qty:1, unit:"Lump", rate:65000.0, gst:0, delivery:"2024-10-26", status:"Open" },
  { id:"PO-2899", vendor:"Hari Om cement Agencies", project:"Genial", material:"Admixture Chemical", qty:1, unit:"Lump", rate:5200.0, gst:0, delivery:"2024-10-27", status:"Open" },
  { id:"PO-2900", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-10-27", status:"Open" },
  { id:"PO-2901", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2024-10-28", status:"Open" },
  { id:"PO-2902", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:229900.0, gst:0, delivery:"2024-10-28", status:"Open" },
  { id:"PO-2903", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2024-10-28", status:"Open" },
  { id:"PO-2904", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2024-10-28", status:"Open" },
  { id:"PO-2905", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2024-10-28", status:"Open" },
  { id:"PO-2906", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-10-28", status:"Delivered" },
  { id:"PO-2907", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-10-31", status:"Delivered" },
  { id:"PO-2908", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-11-02", status:"Delivered" },
  { id:"PO-2909", vendor:"Pradip Sanap", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:40750.0, gst:0, delivery:"2024-11-04", status:"Delivered" },
  { id:"PO-2910", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2024-11-06", status:"Delivered" },
  { id:"PO-2911", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2024-11-07", status:"Open" },
  { id:"PO-2912", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2024-11-07", status:"Delivered" },
  { id:"PO-2913", vendor:"Miscalneous", project:"Genial", material:"Neeru For Plot Marking Plot No.10", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-11-09", status:"Open" },
  { id:"PO-2914", vendor:"Gorakh Gavali", project:"Genial", material:"JCB Diesel Advance Against Bill", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-11-09", status:"Open" },
  { id:"PO-2915", vendor:"Hari Om cement Agencies", project:"Genial", material:"Steel 8mm -27 Bundle 10mm -17 Bundle 12mm 19 Bundle 16mm -34Bundle 20m", qty:1, unit:"Lump", rate:447600.0, gst:0, delivery:"2024-11-10", status:"Open" },
  { id:"PO-2916", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2024-11-10", status:"Open" },
  { id:"PO-2917", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-11-11", status:"Open" },
  { id:"PO-2918", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2024-11-11", status:"Open" },
  { id:"PO-2919", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-11-11", status:"Open" },
  { id:"PO-2920", vendor:"Miscalneous", project:"Genial", material:"Neeru For Plot Marking Plot No.10", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-11-12", status:"Open" },
  { id:"PO-2921", vendor:"Hari Om cement Agencies", project:"Genial", material:"Ultratech cement 300 Bags", qty:1, unit:"Lump", rate:97500.0, gst:0, delivery:"2024-11-12", status:"Open" },
  { id:"PO-2922", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-11-13", status:"Open" },
  { id:"PO-2923", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman Slab Casting Plot No.9", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-11-13", status:"Open" },
  { id:"PO-2924", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:143600.0, gst:0, delivery:"2024-11-13", status:"Open" },
  { id:"PO-2925", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2024-11-13", status:"Open" },
  { id:"PO-2926", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:168000.0, gst:0, delivery:"2024-11-13", status:"Delivered" },
  { id:"PO-2927", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2024-11-13", status:"Delivered" },
  { id:"PO-2928", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:11600.0, gst:0, delivery:"2024-11-13", status:"Open" },
  { id:"PO-2929", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2024-11-14", status:"Open" },
  { id:"PO-2930", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-11-17", status:"Open" },
  { id:"PO-2931", vendor:"Miscalneous", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:150.0, gst:0, delivery:"2024-11-17", status:"Open" },
  { id:"PO-2932", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-11-19", status:"Open" },
  { id:"PO-2933", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:141100.0, gst:0, delivery:"2024-11-20", status:"Open" },
  { id:"PO-2934", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2024-11-20", status:"Open" },
  { id:"PO-2935", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:2900.0, gst:0, delivery:"2024-11-20", status:"Open" },
  { id:"PO-2936", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2024-11-20", status:"Delivered" },
  { id:"PO-2937", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om cement Agencies", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2024-11-22", status:"Delivered" },
  { id:"PO-2938", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-11-21", status:"Open" },
  { id:"PO-2939", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:59500.0, gst:0, delivery:"2024-11-24", status:"Open" },
  { id:"PO-2940", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-11-24", status:"Open" },
  { id:"PO-2941", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-11-24", status:"Open" },
  { id:"PO-2942", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-11-25", status:"Open" },
  { id:"PO-2943", vendor:"Harshad patel", project:"Genial", material:"Fly ash bricks", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2024-11-25", status:"Open" },
  { id:"PO-2944", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:42245.0, gst:0, delivery:"2024-11-25", status:"Open" },
  { id:"PO-2945", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:204300.0, gst:0, delivery:"2024-11-26", status:"Open" },
  { id:"PO-2946", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:2250.0, gst:0, delivery:"2024-11-26", status:"Open" },
  { id:"PO-2947", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:206550.0, gst:0, delivery:"2024-11-26", status:"Delivered" },
  { id:"PO-2948", vendor:"Electric Work", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:1550.0, gst:0, delivery:"2024-11-27", status:"Open" },
  { id:"PO-2949", vendor:"Sagar Pawar", project:"Genial", material:"Khadi & Wash Sand", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-11-28", status:"Delivered" },
  { id:"PO-2950", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-11-28", status:"Delivered" },
  { id:"PO-2951", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:42245.0, gst:0, delivery:"2024-11-28", status:"Delivered" },
  { id:"PO-2952", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2024-11-28", status:"Delivered" },
  { id:"PO-2953", vendor:"Harshad patel", project:"Genial", material:"Fly ash bricks", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2024-11-28", status:"Delivered" },
  { id:"PO-2954", vendor:"Hari Om cement Agencies", project:"Genial", material:"Ultratech cement 300 Bags", qty:1, unit:"Lump", rate:91500.0, gst:0, delivery:"2024-11-30", status:"Open" },
  { id:"PO-2955", vendor:"Arch Ninad Bothara", project:"Genial", material:"Architect", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-12-01", status:"Delivered" },
  { id:"PO-2956", vendor:"Miscalneous", project:"Genial", material:"Mukul For Slab Pooja Saman Plot No.6", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-12-01", status:"Open" },
  { id:"PO-2957", vendor:"Hari Om cement Agencies", project:"Genial", material:"Ultratech cement 200 Bags", qty:1, unit:"Lump", rate:61000.0, gst:0, delivery:"2024-12-02", status:"Open" },
  { id:"PO-2958", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2024-12-03", status:"Open" },
  { id:"PO-2959", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:42500.0, gst:0, delivery:"2024-12-03", status:"Open" },
  { id:"PO-2960", vendor:"Geeta Ply wood", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:1978.0, gst:0, delivery:"2024-12-03", status:"Open" },
  { id:"PO-2961", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-12-03", status:"Open" },
  { id:"PO-2962", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:59500.0, gst:0, delivery:"2024-12-04", status:"Open" },
  { id:"PO-2963", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2024-12-04", status:"Open" },
  { id:"PO-2964", vendor:"Mauli Chemicals", project:"Genial", material:"Cover Blocks", qty:1, unit:"Lump", rate:802.0, gst:0, delivery:"2024-12-04", status:"Open" },
  { id:"PO-2965", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1100.0, gst:0, delivery:"2024-12-04", status:"Open" },
  { id:"PO-2966", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:171400.0, gst:0, delivery:"2024-12-04", status:"Open" },
  { id:"PO-2967", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:4500.0, gst:0, delivery:"2024-12-04", status:"Open" },
  { id:"PO-2968", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:175900.0, gst:0, delivery:"2024-12-05", status:"Delivered" },
  { id:"PO-2969", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-12-05", status:"Open" },
  { id:"PO-2970", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om cement Agencies", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2024-12-05", status:"Delivered" },
  { id:"PO-2971", vendor:"Electric Work", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:690.0, gst:0, delivery:"2024-12-05", status:"Open" },
  { id:"PO-2972", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:35.0, gst:0, delivery:"2024-12-07", status:"Open" },
  { id:"PO-2973", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2024-12-07", status:"Open" },
  { id:"PO-2974", vendor:"Chinmay Hardware", project:"Genial", material:"Plaster fibre", qty:1, unit:"Lump", rate:2660.0, gst:0, delivery:"2024-12-09", status:"Open" },
  { id:"PO-2975", vendor:"Navale", project:"Genial", material:"20 mm Metal", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2024-12-11", status:"Open" },
  { id:"PO-2976", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:227750.0, gst:0, delivery:"2024-12-11", status:"Open" },
  { id:"PO-2977", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:2250.0, gst:0, delivery:"2024-12-11", status:"Open" },
  { id:"PO-2978", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:230000.0, gst:0, delivery:"2024-12-11", status:"Delivered" },
  { id:"PO-2979", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-12-12", status:"Open" },
  { id:"PO-2980", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-12-13", status:"Open" },
  { id:"PO-2981", vendor:"Miscalneous", project:"Genial", material:"Neeru for plot Marking", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-12-14", status:"Open" },
  { id:"PO-2982", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:26250.0, gst:0, delivery:"2024-12-14", status:"Open" },
  { id:"PO-2983", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2024-12-16", status:"Open" },
  { id:"PO-2984", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Fibre Mesh", qty:1, unit:"Lump", rate:270.0, gst:0, delivery:"2024-12-16", status:"Open" },
  { id:"PO-2985", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:59500.0, gst:0, delivery:"2024-12-16", status:"Open" },
  { id:"PO-2986", vendor:"Hari Om cement Agencies", project:"Genial", material:"Hari Om cement Agencies", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2024-12-17", status:"Delivered" },
  { id:"PO-2987", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2024-12-17", status:"Open" },
  { id:"PO-2988", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:7925.0, gst:0, delivery:"2024-12-17", status:"Open" },
  { id:"PO-2989", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:185100.0, gst:0, delivery:"2024-12-17", status:"Open" },
  { id:"PO-2990", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:5400.0, gst:0, delivery:"2024-12-17", status:"Open" },
  { id:"PO-2991", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:190500.0, gst:0, delivery:"2024-12-18", status:"Delivered" },
  { id:"PO-2992", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2024-12-18", status:"Delivered" },
  { id:"PO-2993", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand, Wash Sand &20 mm Metal", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2024-12-18", status:"Delivered" },
  { id:"PO-2994", vendor:"Harshad patel", project:"Genial", material:"Fly ash bricks", qty:1, unit:"Lump", rate:8000.0, gst:0, delivery:"2024-12-18", status:"Delivered" },
  { id:"PO-2995", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2024-12-18", status:"Delivered" },
  { id:"PO-2996", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:35000.0, gst:0, delivery:"2024-12-18", status:"Delivered" },
  { id:"PO-2997", vendor:"Steel Vehicle Transport", project:"Genial", material:"Steel vehicle Transport", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2024-12-19", status:"Delivered" },
  { id:"PO-2998", vendor:"Jalna Steel", project:"Genial", material:"Steel 8mm -34 Bundle 10mm 29 Bundle 12mm 30 Bundle 16mm -32Bundle", qty:1, unit:"Lump", rate:574200.0, gst:0, delivery:"2024-12-19", status:"Open" },
  { id:"PO-2999", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:7925.0, gst:0, delivery:"2024-12-19", status:"Open" },
  { id:"PO-3000", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:83750.0, gst:0, delivery:"2024-12-20", status:"Open" },
  { id:"PO-3001", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2024-12-20", status:"Open" },
  { id:"PO-3002", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2024-12-20", status:"Open" },
  { id:"PO-3003", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2024-12-21", status:"Open" },
  { id:"PO-3004", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-12-22", status:"Open" },
  { id:"PO-3005", vendor:"Diamond Art For MDF Cuttings", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2024-12-23", status:"Open" },
  { id:"PO-3006", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:83750.0, gst:0, delivery:"2024-12-23", status:"Open" },
  { id:"PO-3007", vendor:"Diamond Art For MDF Cuttings", project:"Genial", material:"Mdf Sheet", qty:1, unit:"Lump", rate:1840.0, gst:0, delivery:"2024-12-23", status:"Open" },
  { id:"PO-3008", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2024-12-24", status:"Open" },
  { id:"PO-3009", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Fibre Mesh", qty:1, unit:"Lump", rate:270.0, gst:0, delivery:"2024-12-24", status:"Open" },
  { id:"PO-3010", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:255100.0, gst:0, delivery:"2024-12-25", status:"Open" },
  { id:"PO-3011", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2024-12-25", status:"Open" },
  { id:"PO-3012", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:255700.0, gst:0, delivery:"2024-12-25", status:"Delivered" },
  { id:"PO-3013", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2024-12-26", status:"Open" },
  { id:"PO-3014", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:67000.0, gst:0, delivery:"2024-12-26", status:"Open" },
  { id:"PO-3015", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Fibre Mesh", qty:1, unit:"Lump", rate:1890.0, gst:0, delivery:"2024-12-27", status:"Open" },
  { id:"PO-3016", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:63750.0, gst:0, delivery:"2024-12-27", status:"Open" },
  { id:"PO-3017", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-12-27", status:"Open" },
  { id:"PO-3018", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2024-12-29", status:"Open" },
  { id:"PO-3019", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2024-12-30", status:"Open" },
  { id:"PO-3020", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2024-12-30", status:"Open" },
  { id:"PO-3021", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2024-12-30", status:"Open" },
  { id:"PO-3022", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2024-12-31", status:"Open" },
  { id:"PO-3023", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:186150.0, gst:0, delivery:"2025-01-01", status:"Open" },
  { id:"PO-3024", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:1100.0, gst:0, delivery:"2025-01-01", status:"Open" },
  { id:"PO-3025", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:187250.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-3026", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand, Wash Sand &20 mm Metal", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-3027", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-3028", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-3029", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:41250.0, gst:0, delivery:"2025-01-01", status:"Delivered" },
  { id:"PO-3030", vendor:"Chinmay Hardware", project:"Genial", material:"Plaster fibre", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-01-01", status:"Open" },
  { id:"PO-3031", vendor:"Chinmay Hardware", project:"Genial", material:"Plaster fibre", qty:1, unit:"Lump", rate:380.0, gst:0, delivery:"2025-01-01", status:"Open" },
  { id:"PO-3032", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-02", status:"Open" },
  { id:"PO-3033", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:68000.0, gst:0, delivery:"2025-01-04", status:"Open" },
  { id:"PO-3034", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2025-01-04", status:"Open" },
  { id:"PO-3035", vendor:"Miscalneous", project:"Genial", material:"Motar Genial repairy", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-3036", vendor:"Miscalneous", project:"Genial", material:"Motar Genial repairy", qty:1, unit:"Lump", rate:450.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-3037", vendor:"Miscalneous", project:"Genial", material:"Motar Genial repairy", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-3038", vendor:"Miscalneous", project:"Genial", material:"Motar Genial repairy", qty:1, unit:"Lump", rate:2300.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-3039", vendor:"Miscalneous", project:"Genial", material:"New Motar", qty:1, unit:"Lump", rate:7980.0, gst:0, delivery:"2025-01-06", status:"Open" },
  { id:"PO-3040", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:241950.0, gst:0, delivery:"2025-01-07", status:"Open" },
  { id:"PO-3041", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-3042", vendor:"Mauli Chemicals", project:"Genial", material:"Cover Blocks", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-3043", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-3044", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-01-08", status:"Open" },
  { id:"PO-3045", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2025-01-10", status:"Open" },
  { id:"PO-3046", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:241950.0, gst:0, delivery:"2025-01-10", status:"Delivered" },
  { id:"PO-3047", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand, Wash Sand &20 mm Metal", qty:1, unit:"Lump", rate:109400.0, gst:0, delivery:"2025-01-10", status:"Delivered" },
  { id:"PO-3048", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-01-10", status:"Delivered" },
  { id:"PO-3049", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2025-01-10", status:"Delivered" },
  { id:"PO-3050", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-10", status:"Delivered" },
  { id:"PO-3051", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:8000.0, gst:0, delivery:"2025-01-11", status:"Open" },
  { id:"PO-3052", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:60000.0, gst:0, delivery:"2025-01-11", status:"Open" },
  { id:"PO-3053", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-01-12", status:"Open" },
  { id:"PO-3054", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-01-12", status:"Open" },
  { id:"PO-3055", vendor:"MSEB", project:"Genial", material:"MSEB", qty:1, unit:"Lump", rate:10390.0, gst:0, delivery:"2025-01-14", status:"Open" },
  { id:"PO-3056", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:83750.0, gst:0, delivery:"2025-01-14", status:"Open" },
  { id:"PO-3057", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-16", status:"Open" },
  { id:"PO-3058", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:197700.0, gst:0, delivery:"2025-01-17", status:"Open" },
  { id:"PO-3059", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:197700.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-3060", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand, Wash Sand &20 mm Metal", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-3061", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-3062", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2025-01-17", status:"Delivered" },
  { id:"PO-3063", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:8000.0, gst:0, delivery:"2025-01-18", status:"Open" },
  { id:"PO-3064", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:38500.0, gst:0, delivery:"2025-01-20", status:"Open" },
  { id:"PO-3065", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-3066", vendor:"Sagar Pawar", project:"Genial", material:"60-80mm", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-3067", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-3068", vendor:"Compactor Diesel", project:"Genial", material:"Compactor Diesel", qty:1, unit:"Lump", rate:140.0, gst:0, delivery:"2025-01-21", status:"Open" },
  { id:"PO-3069", vendor:"Miscalneous", project:"Genial", material:"Motar Genial repairy", qty:1, unit:"Lump", rate:200.0, gst:0, delivery:"2025-01-22", status:"Open" },
  { id:"PO-3070", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:170700.0, gst:0, delivery:"2025-01-22", status:"Open" },
  { id:"PO-3071", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2025-01-22", status:"Open" },
  { id:"PO-3072", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:176700.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-3073", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-3074", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:13750.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-3075", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:38500.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-3076", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:75000.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-3077", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:18750.0, gst:0, delivery:"2025-01-22", status:"Open" },
  { id:"PO-3078", vendor:"Audumber Wani Sir", project:"Genial", material:"RC Deisgner", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-01-22", status:"Delivered" },
  { id:"PO-3079", vendor:"Chavan Supplier", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:3200.0, gst:0, delivery:"2025-01-24", status:"Open" },
  { id:"PO-3080", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2025-01-24", status:"Open" },
  { id:"PO-3081", vendor:"Chinmay Hardware", project:"Genial", material:"Plaster fibre", qty:1, unit:"Lump", rate:2380.0, gst:0, delivery:"2025-01-25", status:"Open" },
  { id:"PO-3082", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:68000.0, gst:0, delivery:"2025-01-25", status:"Open" },
  { id:"PO-3083", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:5500.0, gst:0, delivery:"2025-01-29", status:"Open" },
  { id:"PO-3084", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:137350.0, gst:0, delivery:"2025-01-29", status:"Open" },
  { id:"PO-3085", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:7500.0, gst:0, delivery:"2025-01-29", status:"Open" },
  { id:"PO-3086", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:144850.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-3087", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand, Wash Sand &20 mm Metal", qty:1, unit:"Lump", rate:51800.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-3088", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:36750.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-3089", vendor:"Raju Kumavat", project:"Genial", material:"Raju Kumavat", qty:1, unit:"Lump", rate:102000.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-3090", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:75000.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-3091", vendor:"Raju Kumavat", project:"Genial", material:"Raju Kumavat", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-01-29", status:"Delivered" },
  { id:"PO-3092", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:83750.0, gst:0, delivery:"2025-01-29", status:"Open" },
  { id:"PO-3093", vendor:"Compactor Diesel", project:"Genial", material:"Compactor Diesel", qty:1, unit:"Lump", rate:180.0, gst:0, delivery:"2025-01-30", status:"Open" },
  { id:"PO-3094", vendor:"Sagar Pawar", project:"Genial", material:"Grit", qty:1, unit:"Lump", rate:16800.0, gst:0, delivery:"2025-01-30", status:"Open" },
  { id:"PO-3095", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-01-31", status:"Delivered" },
  { id:"PO-3096", vendor:"Sagar Pawar", project:"Genial", material:"Grit", qty:1, unit:"Lump", rate:17400.0, gst:0, delivery:"2025-02-02", status:"Open" },
  { id:"PO-3097", vendor:"Miscalneous", project:"Genial", material:"Screening Jali", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2025-02-02", status:"Open" },
  { id:"PO-3098", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:82500.0, gst:0, delivery:"2025-02-03", status:"Open" },
  { id:"PO-3099", vendor:"Chinmay Hardware", project:"Genial", material:"Grouting Chemical", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-02-04", status:"Open" },
  { id:"PO-3100", vendor:"Sagar Pawar", project:"Genial", material:"Grit", qty:1, unit:"Lump", rate:17400.0, gst:0, delivery:"2025-02-04", status:"Open" },
  { id:"PO-3101", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand, Wash Sand &20 mm Metal", qty:1, unit:"Lump", rate:63000.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-3102", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-3103", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:146500.0, gst:0, delivery:"2025-02-04", status:"Open" },
  { id:"PO-3104", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2025-02-04", status:"Open" },
  { id:"PO-3105", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:155500.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-3106", vendor:"Raju Kumavat", project:"Genial", material:"Raju Kumavat", qty:1, unit:"Lump", rate:51000.0, gst:0, delivery:"2025-02-04", status:"Open" },
  { id:"PO-3107", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:5500.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-3108", vendor:"Arch Ninad Bothara", project:"Genial", material:"Architect", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-3109", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-02-04", status:"Delivered" },
  { id:"PO-3110", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:82500.0, gst:0, delivery:"2025-02-06", status:"Open" },
  { id:"PO-3111", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2025-02-06", status:"Open" },
  { id:"PO-3112", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2025-02-07", status:"Delivered" },
  { id:"PO-3113", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"ChikenMesh & Binding Wire", qty:1, unit:"Lump", rate:3710.0, gst:0, delivery:"2025-02-07", status:"Open" },
  { id:"PO-3114", vendor:"Miscalneous", project:"Genial", material:"Motar Genial repairy", qty:1, unit:"Lump", rate:140.0, gst:0, delivery:"2025-02-07", status:"Open" },
  { id:"PO-3115", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-02-10", status:"Open" },
  { id:"PO-3116", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-02-10", status:"Open" },
  { id:"PO-3117", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1742.0, gst:0, delivery:"2025-02-10", status:"Open" },
  { id:"PO-3118", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:157100.0, gst:0, delivery:"2025-02-12", status:"Open" },
  { id:"PO-3119", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:800.0, gst:0, delivery:"2025-02-12", status:"Open" },
  { id:"PO-3120", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:157900.0, gst:0, delivery:"2025-02-12", status:"Delivered" },
  { id:"PO-3121", vendor:"Ravindra Jain", project:"Genial", material:"Swimming Pool Work", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2025-02-13", status:"Delivered" },
  { id:"PO-3122", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-02-14", status:"Open" },
  { id:"PO-3123", vendor:"Steel Vehicle Transport", project:"Genial", material:"Steel vehicle Transport", qty:1, unit:"Lump", rate:30320.0, gst:0, delivery:"2025-02-15", status:"Delivered" },
  { id:"PO-3124", vendor:"Jalna Steel", project:"Genial", material:"Steel 8mm -63 Bundle =4.6 10mm 15 Bundl=1.17 12mm 29 Bundle=2.44 16mm ", qty:1, unit:"Lump", rate:690600.0, gst:0, delivery:"2025-02-15", status:"Open" },
  { id:"PO-3125", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-02-16", status:"Open" },
  { id:"PO-3126", vendor:"Mauli Chemicals", project:"Genial", material:"Water proofing Chemical", qty:1, unit:"Lump", rate:4900.0, gst:0, delivery:"2025-02-17", status:"Delivered" },
  { id:"PO-3127", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2025-02-17", status:"Open" },
  { id:"PO-3128", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-02-18", status:"Open" },
  { id:"PO-3129", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-02-18", status:"Open" },
  { id:"PO-3130", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:156850.0, gst:0, delivery:"2025-02-19", status:"Open" },
  { id:"PO-3131", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Chemical Drum 20Ltr", qty:1, unit:"Lump", rate:5200.0, gst:0, delivery:"2025-02-19", status:"Delivered" },
  { id:"PO-3132", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2025-02-21", status:"Open" },
  { id:"PO-3133", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand, Wash Sand &20 mm Metal", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-3134", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-3135", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:156850.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-3136", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:19750.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-3137", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2025-02-21", status:"Delivered" },
  { id:"PO-3138", vendor:"Miscalneous", project:"Genial", material:"Easy Tab Injection for pet", qty:1, unit:"Lump", rate:100.0, gst:0, delivery:"2025-02-22", status:"Open" },
  { id:"PO-3139", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Thapi", qty:1, unit:"Lump", rate:120.0, gst:0, delivery:"2025-02-24", status:"Open" },
  { id:"PO-3140", vendor:"Ventus Air Conditioning", project:"Genial", material:"A/C consealed Fittings", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-02-24", status:"Open" },
  { id:"PO-3141", vendor:"Nexona Ceramic LLP", project:"Genial", material:"Nexona Swimming Pool Tiles", qty:1, unit:"Lump", rate:150827.0, gst:0, delivery:"2025-02-24", status:"Open" },
  { id:"PO-3142", vendor:"Chinmay Hardware", project:"Genial", material:"Plaster fibre", qty:1, unit:"Lump", rate:2380.0, gst:0, delivery:"2025-02-24", status:"Open" },
  { id:"PO-3143", vendor:"MSEB", project:"Genial", material:"MSEB", qty:1, unit:"Lump", rate:4390.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-3144", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-3145", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:150300.0, gst:0, delivery:"2025-02-26", status:"Open" },
  { id:"PO-3146", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-02-26", status:"Open" },
  { id:"PO-3147", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:151500.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-3148", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-02-26", status:"Delivered" },
  { id:"PO-3149", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-02-28", status:"Open" },
  { id:"PO-3150", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-02-28", status:"Open" },
  { id:"PO-3151", vendor:"Sitaram Transport", project:"Genial", material:"Situ material", qty:1, unit:"Lump", rate:24000.0, gst:0, delivery:"2025-03-01", status:"Open" },
  { id:"PO-3152", vendor:"Sitaram Transport", project:"Genial", material:"Situ material", qty:1, unit:"Lump", rate:34125.0, gst:0, delivery:"2025-03-01", status:"Open" },
  { id:"PO-3153", vendor:"Shantinath Marble", project:"Genial", material:"Steel grey Granite", qty:1, unit:"Lump", rate:100685.0, gst:0, delivery:"2025-03-01", status:"Open" },
  { id:"PO-3154", vendor:"Shantinath Marble", project:"Genial", material:"Steel grey Granite", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-03-01", status:"Delivered" },
  { id:"PO-3155", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2025-03-03", status:"Open" },
  { id:"PO-3156", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Motar Genial repairy", qty:1, unit:"Lump", rate:390.0, gst:0, delivery:"2025-03-03", status:"Open" },
  { id:"PO-3157", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-03-03", status:"Open" },
  { id:"PO-3158", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:16000.0, gst:0, delivery:"2025-03-04", status:"Delivered" },
  { id:"PO-3159", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:41761.0, gst:0, delivery:"2025-03-04", status:"Delivered" },
  { id:"PO-3160", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:40.0, gst:0, delivery:"2025-03-04", status:"Open" },
  { id:"PO-3161", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:117350.0, gst:0, delivery:"2025-03-05", status:"Open" },
  { id:"PO-3162", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-03-05", status:"Open" },
  { id:"PO-3163", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:118550.0, gst:0, delivery:"2025-03-05", status:"Delivered" },
  { id:"PO-3164", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-03-05", status:"Open" },
  { id:"PO-3165", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1750.0, gst:0, delivery:"2025-03-06", status:"Open" },
  { id:"PO-3166", vendor:"Ravindra Jain", project:"Genial", material:"Swimming Pool Work", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-03-07", status:"Delivered" },
  { id:"PO-3167", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-03-07", status:"Delivered" },
  { id:"PO-3168", vendor:"Shantinath Marble", project:"Genial", material:"Pearl black Granite leather finish", qty:1, unit:"Lump", rate:645562.0, gst:0, delivery:"2025-03-07", status:"Open" },
  { id:"PO-3169", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:26600.0, gst:0, delivery:"2025-03-07", status:"Open" },
  { id:"PO-3170", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:60900.0, gst:0, delivery:"2025-03-07", status:"Open" },
  { id:"PO-3171", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:87500.0, gst:0, delivery:"2025-03-07", status:"Open" },
  { id:"PO-3172", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Pati & favde Material", qty:1, unit:"Lump", rate:660.0, gst:0, delivery:"2025-03-09", status:"Open" },
  { id:"PO-3173", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-03-09", status:"Open" },
  { id:"PO-3174", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-03-09", status:"Open" },
  { id:"PO-3175", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:33000.0, gst:0, delivery:"2025-03-09", status:"Open" },
  { id:"PO-3176", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:170.0, gst:0, delivery:"2025-03-10", status:"Open" },
  { id:"PO-3177", vendor:"Janta Road Way", project:"Genial", material:"Tiles Transport", qty:1, unit:"Lump", rate:83300.0, gst:0, delivery:"2025-03-10", status:"Open" },
  { id:"PO-3178", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:228650.0, gst:0, delivery:"2025-03-11", status:"Open" },
  { id:"PO-3179", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:4800.0, gst:0, delivery:"2025-03-11", status:"Open" },
  { id:"PO-3180", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2025-03-11", status:"Open" },
  { id:"PO-3181", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2025-03-12", status:"Open" },
  { id:"PO-3182", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-03-12", status:"Open" },
  { id:"PO-3183", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-03-12", status:"Open" },
  { id:"PO-3184", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-03-13", status:"Open" },
  { id:"PO-3185", vendor:"Ravindra Jain", project:"Genial", material:"Swimming Pool Work", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-3186", vendor:"Shantinath Marble", project:"Genial", material:"Pearl black Granite leather finish", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-3187", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:233450.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-3188", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:30800.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-3189", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:33000.0, gst:0, delivery:"2025-03-13", status:"Delivered" },
  { id:"PO-3190", vendor:"Geeta Ply wood", project:"Genial", material:"MDf Material Slab Design Plot No.10", qty:1, unit:"Lump", rate:4570.0, gst:0, delivery:"2025-03-14", status:"Open" },
  { id:"PO-3191", vendor:"Miscalneous", project:"Genial", material:"200 Ltr Drums", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-03-16", status:"Open" },
  { id:"PO-3192", vendor:"Miscalneous", project:"Genial", material:"200 Ltr Drums", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-03-16", status:"Open" },
  { id:"PO-3193", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1300.0, gst:0, delivery:"2025-03-16", status:"Open" },
  { id:"PO-3194", vendor:"Miscalneous", project:"Genial", material:"Tile Protector", qty:1, unit:"Lump", rate:880.0, gst:0, delivery:"2025-03-16", status:"Open" },
  { id:"PO-3195", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2025-03-16", status:"Open" },
  { id:"PO-3196", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:6750000.0, gst:0, delivery:"2025-03-17", status:"Delivered" },
  { id:"PO-3197", vendor:"Shantinath Marble", project:"Genial", material:"Pearl black Granite leather finish", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-03-17", status:"Delivered" },
  { id:"PO-3198", vendor:"Miscalneous", project:"Genial", material:"Shade Material", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-03-18", status:"Open" },
  { id:"PO-3199", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Bond Tight & Feviquick", qty:1, unit:"Lump", rate:1550.0, gst:0, delivery:"2025-03-18", status:"Open" },
  { id:"PO-3200", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3201", vendor:"Pahade", project:"Genial", material:"Core cutting Work", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-3202", vendor:"Diamond Art For MDF Cuttings", project:"Genial", material:"Mdf design Plot no.10", qty:1, unit:"Lump", rate:7928.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3203", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-3204", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:160100.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3205", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3206", vendor:"Sagar Pawar", project:"Genial", material:"Sagar Pawar Building Material Supplier", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3207", vendor:"Dhiraj Sharam", project:"Genial", material:"Water Proofing Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3208", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3209", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3210", vendor:"Pahade", project:"Genial", material:"Core cutting Work", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2025-03-19", status:"Delivered" },
  { id:"PO-3211", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:152150.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-3212", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:7950.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-3213", vendor:"Harshad patel", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2025-03-19", status:"Open" },
  { id:"PO-3214", vendor:"Harshad patel", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2025-03-20", status:"Open" },
  { id:"PO-3215", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:40.0, gst:0, delivery:"2025-03-21", status:"Open" },
  { id:"PO-3216", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:27500.0, gst:0, delivery:"2025-03-22", status:"Open" },
  { id:"PO-3217", vendor:"JK grout Swimming pool", project:"Genial", material:"JK Swimming Pool Grout 200 bags @325 per bag", qty:1, unit:"Lump", rate:65000.0, gst:0, delivery:"2025-03-23", status:"Open" },
  { id:"PO-3218", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-03-23", status:"Open" },
  { id:"PO-3219", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-03-23", status:"Open" },
  { id:"PO-3220", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cutter Blade", qty:1, unit:"Lump", rate:30.0, gst:0, delivery:"2025-03-23", status:"Open" },
  { id:"PO-3221", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:87500.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-3222", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-03-24", status:"Delivered" },
  { id:"PO-3223", vendor:"Jalna Steel", project:"Genial", material:"Steel 8mm -29 Bundle =2.35 10mm 23 Bundl=1.82 12mm 6 Bundle=0.51 16mm ", qty:1, unit:"Lump", rate:359400.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-3224", vendor:"JK grout Swimming pool", project:"Genial", material:"JK Swimming Pool Grout 200 bags @325 per bag", qty:1, unit:"Lump", rate:65000.0, gst:0, delivery:"2025-03-25", status:"Delivered" },
  { id:"PO-3225", vendor:"Steel Vehicle Transport", project:"Genial", material:"Steel vehicle Transport", qty:1, unit:"Lump", rate:24850.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-3226", vendor:"Chinmay Hardware", project:"Genial", material:"Fibre Mesh", qty:1, unit:"Lump", rate:2380.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-3227", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-03-24", status:"Open" },
  { id:"PO-3228", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-3229", vendor:"Sagar Pawar", project:"Genial", material:"60-80mm", qty:1, unit:"Lump", rate:18600.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-3230", vendor:"Gorakh Gavali", project:"Genial", material:"Tractors", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-3231", vendor:"Miscalneous", project:"Genial", material:"Araldite", qty:1, unit:"Lump", rate:2950.0, gst:0, delivery:"2025-03-25", status:"Open" },
  { id:"PO-3232", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:33000.0, gst:0, delivery:"2025-03-26", status:"Open" },
  { id:"PO-3233", vendor:"Ravindra Jain", project:"Genial", material:"Waterproofing Swimmig Pool", qty:1, unit:"Lump", rate:142416.0, gst:0, delivery:"2025-03-26", status:"Open" },
  { id:"PO-3234", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:68000.0, gst:0, delivery:"2025-03-26", status:"Open" },
  { id:"PO-3235", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-03-27", status:"Open" },
  { id:"PO-3236", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:6325.0, gst:0, delivery:"2025-03-27", status:"Open" },
  { id:"PO-3237", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:158350.0, gst:0, delivery:"2025-03-27", status:"Open" },
  { id:"PO-3238", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:15750.0, gst:0, delivery:"2025-03-27", status:"Open" },
  { id:"PO-3239", vendor:"Shantinath Marble", project:"Genial", material:"Pearl black Granite leather finish", qty:1, unit:"Lump", rate:196000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3240", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3241", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:174100.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3242", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3243", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3244", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3245", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3246", vendor:"Harshad patel", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:56000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3247", vendor:"Sagar Pawar", project:"Genial", material:"Sagar Pawar Buliding Materials", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3248", vendor:"Chinmay Hardware", project:"Genial", material:"Fibre Mesh", qty:1, unit:"Lump", rate:2380.0, gst:0, delivery:"2025-03-27", status:"Delivered" },
  { id:"PO-3249", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:4800.0, gst:0, delivery:"2025-03-28", status:"Open" },
  { id:"PO-3250", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:55.0, gst:0, delivery:"2025-03-28", status:"Open" },
  { id:"PO-3251", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:80.0, gst:0, delivery:"2025-03-28", status:"Open" },
  { id:"PO-3252", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:22500.0, gst:0, delivery:"2025-03-28", status:"Open" },
  { id:"PO-3253", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel for Compactor", qty:1, unit:"Lump", rate:500.0, gst:0, delivery:"2025-03-29", status:"Open" },
  { id:"PO-3254", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-03-31", status:"Open" },
  { id:"PO-3255", vendor:"Himalaya Agro", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-03-31", status:"Open" },
  { id:"PO-3256", vendor:"Gurudev Plstic", project:"Genial", material:"Tadpatri Expense", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-3257", vendor:"Miscalneous", project:"Genial", material:"kadi Konda", qty:1, unit:"Lump", rate:260.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-3258", vendor:"MSEB", project:"Genial", material:"MSEB", qty:1, unit:"Lump", rate:4300.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-3259", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:2020.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-3260", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-3261", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:520.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-3262", vendor:"Ceramic Traders", project:"Genial", material:"Plumbing Material", qty:1, unit:"Lump", rate:195194.0, gst:0, delivery:"2025-04-01", status:"Open" },
  { id:"PO-3263", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:447900.0, gst:0, delivery:"2025-04-02", status:"Open" },
  { id:"PO-3264", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:32.0, gst:0, delivery:"2025-04-02", status:"Open" },
  { id:"PO-3265", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:20.0, gst:0, delivery:"2025-04-02", status:"Open" },
  { id:"PO-3266", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:15750.0, gst:0, delivery:"2025-04-02", status:"Open" },
  { id:"PO-3267", vendor:"Sagar Pawar", project:"Genial", material:"Grit", qty:1, unit:"Lump", rate:17400.0, gst:0, delivery:"2025-04-02", status:"Open" },
  { id:"PO-3268", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Nails", qty:1, unit:"Lump", rate:300.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-3269", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:15750.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-3270", vendor:"Sagar Pawar", project:"Genial", material:"Plaster sand", qty:1, unit:"Lump", rate:34200.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-3271", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-3272", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:136450.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-3273", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:22900.0, gst:0, delivery:"2025-04-03", status:"Open" },
  { id:"PO-3274", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:117574.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3275", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:7670.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3276", vendor:"Ravindra Jain", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3277", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3278", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3279", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3280", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:130326.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3281", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:4800.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3282", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:6325.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3283", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:159350.0, gst:0, delivery:"2025-04-03", status:"Delivered" },
  { id:"PO-3284", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:68000.0, gst:0, delivery:"2025-04-04", status:"Open" },
  { id:"PO-3285", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-04-05", status:"Delivered" },
  { id:"PO-3286", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:550.0, gst:0, delivery:"2025-04-05", status:"Open" },
  { id:"PO-3287", vendor:"Miscalneous", project:"Genial", material:"Files", qty:1, unit:"Lump", rate:650.0, gst:0, delivery:"2025-04-05", status:"Open" },
  { id:"PO-3288", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2025-04-05", status:"Open" },
  { id:"PO-3289", vendor:"Amol Gavali", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-04-05", status:"Open" },
  { id:"PO-3290", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:1300.0, gst:0, delivery:"2025-04-05", status:"Open" },
  { id:"PO-3291", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:15750.0, gst:0, delivery:"2025-04-07", status:"Open" },
  { id:"PO-3292", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:35.0, gst:0, delivery:"2025-04-07", status:"Open" },
  { id:"PO-3293", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:1100.0, gst:0, delivery:"2025-04-07", status:"Open" },
  { id:"PO-3294", vendor:"Devashish Construction", project:"Genial", material:"Ultratech OPC Cement", qty:1, unit:"Lump", rate:87500.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-3295", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:14080.0, gst:0, delivery:"2025-04-08", status:"Open" },
  { id:"PO-3296", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:160.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-3297", vendor:"Pahade", project:"Genial", material:"Core cutting Work", qty:1, unit:"Lump", rate:47700.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-3298", vendor:"Dhiraj Sharma Water Proofing Work", project:"Genial", material:"Dhiraj Sharma Water Proofing Work", qty:1, unit:"Lump", rate:2070000.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-3299", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Feviquick", qty:1, unit:"Lump", rate:700.0, gst:0, delivery:"2025-04-09", status:"Open" },
  { id:"PO-3300", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:123950.0, gst:0, delivery:"2025-04-10", status:"Open" },
  { id:"PO-3301", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:20400.0, gst:0, delivery:"2025-04-10", status:"Open" },
  { id:"PO-3302", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:144350.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3303", vendor:"Sagar Pawar", project:"Genial", material:"Sagar Pawar Buliding Materials Wash 6 Brass @ 4800 Per bra", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3304", vendor:"Mohit", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:14080.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3305", vendor:"Ravindra Jain", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:44000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3306", vendor:"Somnath Shirsagar", project:"Genial", material:"Plumbing Labour Work", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3307", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker & Tractor", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3308", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3309", vendor:"PMC", project:"Genial", material:"PMC", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3310", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:27000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3311", vendor:"Pahade", project:"Genial", material:"Core cutting Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-04-10", status:"Delivered" },
  { id:"PO-3312", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-04-11", status:"Open" },
  { id:"PO-3313", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-04-12", status:"Open" },
  { id:"PO-3314", vendor:"Miscalneous", project:"Genial", material:"Araldite", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-04-14", status:"Open" },
  { id:"PO-3315", vendor:"transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:1300.0, gst:0, delivery:"2025-04-14", status:"Open" },
  { id:"PO-3316", vendor:"Shantinath Marble", project:"Genial", material:"Steel Gray Granite", qty:1, unit:"Lump", rate:98540.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-3317", vendor:"Pahade", project:"Genial", material:"Core cutting Work", qty:1, unit:"Lump", rate:26800.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-3318", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:71200.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-3319", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:5400.0, gst:0, delivery:"2025-04-15", status:"Open" },
  { id:"PO-3320", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:76600.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3321", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3322", vendor:"Ravindra Jain", project:"Genial", material:"Waterproofing Swimmig Pool", qty:1, unit:"Lump", rate:56000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3323", vendor:"Ravindra Jain", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:44000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3324", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3325", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:9910.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3326", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3327", vendor:"Pahade", project:"Genial", material:"Core cutting Work", qty:1, unit:"Lump", rate:24500.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3328", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Cement Birla A1", qty:1, unit:"Lump", rate:47250.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3329", vendor:"Miscalneous", project:"Genial", material:"H frame", qty:1, unit:"Lump", rate:43000.0, gst:0, delivery:"2025-04-16", status:"Delivered" },
  { id:"PO-3330", vendor:"Transportation", project:"Genial", material:"H frame", qty:1, unit:"Lump", rate:1300.0, gst:0, delivery:"2025-04-16", status:"Open" },
  { id:"PO-3331", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:1300.0, gst:0, delivery:"2025-04-16", status:"Open" },
  { id:"PO-3332", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2025-04-16", status:"Open" },
  { id:"PO-3333", vendor:"Ceramic Traders", project:"Genial", material:"Plumbing Material", qty:1, unit:"Lump", rate:192048.0, gst:0, delivery:"2025-04-16", status:"Open" },
  { id:"PO-3334", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2025-04-17", status:"Open" },
  { id:"PO-3335", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2025-04-19", status:"Open" },
  { id:"PO-3336", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-04-22", status:"Open" },
  { id:"PO-3337", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3338", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:63750.0, gst:0, delivery:"2025-04-23", status:"Open" },
  { id:"PO-3339", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:8400.0, gst:0, delivery:"2025-04-23", status:"Open" },
  { id:"PO-3340", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:72150.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3341", vendor:"Sagar Pawar", project:"Genial", material:"Sagar Pawar Buliding Material", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3342", vendor:"Ravindra Jain", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:22000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3343", vendor:"Dhiraj Sharam", project:"Genial", material:"Waterproofing Swimmig Pool", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3344", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3345", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:9000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3346", vendor:"Somnath Shirsagar", project:"Genial", material:"Plumbing Labour Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3347", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:16500.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3348", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3349", vendor:"Shantinath Marble", project:"Genial", material:"Steel Gray Granite", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-04-23", status:"Delivered" },
  { id:"PO-3350", vendor:"Geeta Ply wood", project:"Genial", material:"Mdf Material", qty:1, unit:"Lump", rate:3680.0, gst:0, delivery:"2025-04-24", status:"Open" },
  { id:"PO-3351", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Admixture Chemical", qty:1, unit:"Lump", rate:2200.0, gst:0, delivery:"2025-04-24", status:"Open" },
  { id:"PO-3352", vendor:"Devashish Construction", project:"Genial", material:"Ultratech PPC Cement", qty:1, unit:"Lump", rate:81250.0, gst:0, delivery:"2025-04-24", status:"Open" },
  { id:"PO-3353", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:1492659.0, gst:0, delivery:"2025-04-25", status:"Open" },
  { id:"PO-3354", vendor:"Ceramic Traders", project:"Genial", material:"Plumbing Material", qty:1, unit:"Lump", rate:387242.0, gst:0, delivery:"2025-04-25", status:"Delivered" },
  { id:"PO-3355", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:298166.0, gst:0, delivery:"2025-04-25", status:"Delivered" },
  { id:"PO-3356", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-04-27", status:"Open" },
  { id:"PO-3357", vendor:"Ravindra Jain", project:"Genial", material:"Swimming Pool Work", qty:1, unit:"Lump", rate:1140000.0, gst:0, delivery:"2025-04-28", status:"Open" },
  { id:"PO-3358", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2025-04-28", status:"Open" },
  { id:"PO-3359", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-28", status:"Delivered" },
  { id:"PO-3360", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:42000.0, gst:0, delivery:"2025-04-29", status:"Open" },
  { id:"PO-3361", vendor:"Transportation", project:"Genial", material:"Acpipes", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-3362", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"AAC Block Wastage", qty:1, unit:"Lump", rate:33263.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-3363", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-3364", vendor:"Devashish Construction", project:"Genial", material:"Ultratech PPC Cement", qty:1, unit:"Lump", rate:81250.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-3365", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:105300.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-3366", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-04-30", status:"Open" },
  { id:"PO-3367", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:105900.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-3368", vendor:"Sagar Pawar", project:"Genial", material:"Sagar Pawar Buliding Material", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-3369", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:36000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-3370", vendor:"Dhiraj Sharam", project:"Genial", material:"Waterproofing Swimmig Pool", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-3371", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-3372", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-3373", vendor:"Shantinath Marble", project:"Genial", material:"Steel Gray Granite", qty:1, unit:"Lump", rate:48540.0, gst:0, delivery:"2025-04-30", status:"Delivered" },
  { id:"PO-3374", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:41283.0, gst:0, delivery:"2025-05-02", status:"Open" },
  { id:"PO-3375", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:7500.0, gst:0, delivery:"2025-05-02", status:"Open" },
  { id:"PO-3376", vendor:"Polish Material", project:"Genial", material:"SBR", qty:1, unit:"Lump", rate:12240.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-3377", vendor:"Ceramic Traders", project:"Genial", material:"Plumbing Material", qty:1, unit:"Lump", rate:126208.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-3378", vendor:"Micro concrete", project:"Genial", material:"Micro Conceret Material", qty:1, unit:"Lump", rate:1830.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-3379", vendor:"Transportation", project:"Genial", material:"Material", qty:1, unit:"Lump", rate:1100.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-3380", vendor:"Miscalneous", project:"Genial", material:"Cover Blocks", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-05-03", status:"Open" },
  { id:"PO-3381", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-05-04", status:"Open" },
  { id:"PO-3382", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:95350.0, gst:0, delivery:"2025-05-06", status:"Open" },
  { id:"PO-3383", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:23500.0, gst:0, delivery:"2025-05-06", status:"Open" },
  { id:"PO-3384", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:21000.0, gst:0, delivery:"2025-05-09", status:"Open" },
  { id:"PO-3385", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:200.0, gst:0, delivery:"2025-05-10", status:"Open" },
  { id:"PO-3386", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-05-10", status:"Delivered" },
  { id:"PO-3387", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:26300.0, gst:0, delivery:"2025-05-10", status:"Delivered" },
  { id:"PO-3388", vendor:"Miscalneous", project:"Genial", material:"Jar", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-05-11", status:"Open" },
  { id:"PO-3389", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:362825.0, gst:0, delivery:"2025-05-11", status:"Open" },
  { id:"PO-3390", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:95241.0, gst:0, delivery:"2025-05-11", status:"Delivered" },
  { id:"PO-3391", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-05-13", status:"Open" },
  { id:"PO-3392", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:97400.0, gst:0, delivery:"2025-05-14", status:"Open" },
  { id:"PO-3393", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:28900.0, gst:0, delivery:"2025-05-14", status:"Open" },
  { id:"PO-3394", vendor:"Sagar Pawar", project:"Genial", material:"Sagar Pawar Buliding Material", qty:1, unit:"Lump", rate:45000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3395", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Shantai Treders", qty:1, unit:"Lump", rate:36963.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3396", vendor:"Shivaji Pawar", project:"Genial", material:"Labour payment Shivaji Pawar As Per Weekly Payment Sheet 14.", qty:1, unit:"Lump", rate:245150.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3397", vendor:"Ravindra Jain", project:"Genial", material:"Waterproofing Swimmig Pool", qty:1, unit:"Lump", rate:84700.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3398", vendor:"Dhiraj Sharam", project:"Genial", material:"Water proofing", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3399", vendor:"Somnath Shirsagar", project:"Genial", material:"Plumbing", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3400", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3401", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3402", vendor:"Satija Stone Suppliers", project:"Genial", material:"Basalt Stone", qty:1, unit:"Lump", rate:116284.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3403", vendor:"Pranay Shah", project:"Genial", material:"AC work", qty:1, unit:"Lump", rate:113492.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3404", vendor:"Bajirao Jadhav", project:"Genial", material:"Natural Sand", qty:1, unit:"Lump", rate:41283.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3405", vendor:"Gorakh Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2025-05-14", status:"Delivered" },
  { id:"PO-3406", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2025-05-15", status:"Open" },
  { id:"PO-3407", vendor:"Sagar Pawar", project:"Genial", material:"Grit", qty:1, unit:"Lump", rate:17400.0, gst:0, delivery:"2025-05-15", status:"Open" },
  { id:"PO-3408", vendor:"Miscalneous", project:"Genial", material:"Feviquick", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-05-15", status:"Open" },
  { id:"PO-3409", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:82000.0, gst:0, delivery:"2025-05-15", status:"Delivered" },
  { id:"PO-3410", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-05-16", status:"Open" },
  { id:"PO-3411", vendor:"Micro concrete", project:"Genial", material:"Micro Conceret Material", qty:1, unit:"Lump", rate:7930.0, gst:0, delivery:"2025-05-16", status:"Open" },
  { id:"PO-3412", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:2070.0, gst:0, delivery:"2025-05-16", status:"Open" },
  { id:"PO-3413", vendor:"Gurudev Plstic", project:"Genial", material:"Tadpatri Expense", qty:1, unit:"Lump", rate:1200.0, gst:0, delivery:"2025-05-16", status:"Open" },
  { id:"PO-3414", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-05-17", status:"Open" },
  { id:"PO-3415", vendor:"Electric Work", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:1160.0, gst:0, delivery:"2025-05-18", status:"Open" },
  { id:"PO-3416", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-05-19", status:"Open" },
  { id:"PO-3417", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-05-19", status:"Open" },
  { id:"PO-3418", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:1875.0, gst:0, delivery:"2025-05-19", status:"Open" },
  { id:"PO-3419", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:3050.0, gst:0, delivery:"2025-05-20", status:"Open" },
  { id:"PO-3420", vendor:"Miscalneous", project:"Genial", material:"Jar", qty:1, unit:"Lump", rate:750.0, gst:0, delivery:"2025-05-21", status:"Open" },
  { id:"PO-3421", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:77900.0, gst:0, delivery:"2025-05-21", status:"Open" },
  { id:"PO-3422", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:36050.0, gst:0, delivery:"2025-05-21", status:"Open" },
  { id:"PO-3423", vendor:"Shivaji Pawar", project:"Genial", material:"Labour payment Shivaji Pawar As Per Weekly Payment Sheet 21.", qty:1, unit:"Lump", rate:113950.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3424", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:170000.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3425", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3426", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:68000.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3427", vendor:"Miscalneous", project:"Genial", material:"Jar", qty:1, unit:"Lump", rate:1350.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3428", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3429", vendor:"Pahade", project:"Genial", material:"Core cutting Work", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3430", vendor:"Arch Ninad Bothara", project:"Genial", material:"Architect", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-05-21", status:"Delivered" },
  { id:"PO-3431", vendor:"Geeta Ply wood", project:"Genial", material:"Mdf Material", qty:1, unit:"Lump", rate:2208.0, gst:0, delivery:"2025-05-22", status:"Open" },
  { id:"PO-3432", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-05-22", status:"Open" },
  { id:"PO-3433", vendor:"Shantai Traders ( Vihan Jain)", project:"Genial", material:"Admixture Chemical", qty:1, unit:"Lump", rate:2200.0, gst:0, delivery:"2025-05-23", status:"Open" },
  { id:"PO-3434", vendor:"Transportation", project:"Genial", material:"Transportation", qty:1, unit:"Lump", rate:3500.0, gst:0, delivery:"2025-05-23", status:"Open" },
  { id:"PO-3435", vendor:"Yashika Chemicals", project:"Genial", material:"Tile adhesives", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-05-24", status:"Delivered" },
  { id:"PO-3436", vendor:"Himalaya Agro", project:"Genial", material:"Ashirwad", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-05-24", status:"Delivered" },
  { id:"PO-3437", vendor:"Devashish Construction", project:"Genial", material:"Ultratech PPC Cement", qty:1, unit:"Lump", rate:82500.0, gst:0, delivery:"2025-05-25", status:"Open" },
  { id:"PO-3438", vendor:"Sagar Pawar", project:"Genial", material:"20mm Metal", qty:1, unit:"Lump", rate:16200.0, gst:0, delivery:"2025-05-25", status:"Open" },
  { id:"PO-3439", vendor:"Sagar Pawar", project:"Genial", material:"Wash Sand", qty:1, unit:"Lump", rate:28800.0, gst:0, delivery:"2025-05-26", status:"Open" },
  { id:"PO-3440", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-05-27", status:"Open" },
  { id:"PO-3441", vendor:"Miscalneous", project:"Genial", material:"Pooja Saman", qty:1, unit:"Lump", rate:110.0, gst:0, delivery:"2025-05-27", status:"Open" },
  { id:"PO-3442", vendor:"Mahadev petrol Pump", project:"Genial", material:"Diesel", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2025-05-27", status:"Open" },
  { id:"PO-3443", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Work", qty:1, unit:"Lump", rate:70550.0, gst:0, delivery:"2025-05-27", status:"Open" },
  { id:"PO-3444", vendor:"Departmental Work", project:"Genial", material:"Departmental Work", qty:1, unit:"Lump", rate:14450.0, gst:0, delivery:"2025-05-27", status:"Open" },
  { id:"PO-3445", vendor:"Shivaji Pawar", project:"Genial", material:"Labour payment Shivaji Pawar As Per Weekly Payment Sheet 21.", qty:1, unit:"Lump", rate:85000.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3446", vendor:"Somnath Shirsagar", project:"Genial", material:"Plumbing", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3447", vendor:"Dhiraj Sharam", project:"Genial", material:"Water proofing", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3448", vendor:"Raju Kumavat", project:"Genial", material:"Tile Labour Payment", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3449", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3450", vendor:"Electric Work", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:31186.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3451", vendor:"Pranay Shah", project:"Genial", material:"AC work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3452", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Binding Wire", qty:1, unit:"Lump", rate:3750.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3453", vendor:"Varma", project:"Genial", material:"Polish", qty:1, unit:"Lump", rate:2160000.0, gst:0, delivery:"2025-05-27", status:"Delivered" },
  { id:"PO-3454", vendor:"MSEB", project:"Genial", material:"MSEB", qty:1, unit:"Lump", rate:7560.0, gst:0, delivery:"2025-05-28", status:"Open" },
  { id:"PO-3455", vendor:"Miscalneous", project:"Genial", material:"Xerox", qty:1, unit:"Lump", rate:42.0, gst:0, delivery:"2025-05-28", status:"Open" },
  { id:"PO-3456", vendor:"Amol Gavali", project:"Genial", material:"Water Tanker", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-05-28", status:"Open" },
  { id:"PO-3457", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-05-29", status:"Open" },
  { id:"PO-3458", vendor:"Gorakh Chavan Beze Phata", project:"Genial", material:"Araldite", qty:1, unit:"Lump", rate:1420.0, gst:0, delivery:"2025-05-30", status:"Open" },
  { id:"PO-3459", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:34000.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-3460", vendor:"Sandip jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-05-31", status:"Open" },
  { id:"PO-3461", vendor:"mauli enterprices", project:"Genial", material:"Generator Rent", qty:1, unit:"Lump", rate:6598.0, gst:0, delivery:"2025-06-03", status:"Open" },
  { id:"PO-3462", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2025-06-03", status:"Delivered" },
  { id:"PO-3463", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-06-03", status:"Delivered" },
  { id:"PO-3464", vendor:"Umang Enterprices CCTV", project:"Genial", material:"Bill Pending", qty:1, unit:"Lump", rate:189750.0, gst:0, delivery:"2025-06-03", status:"Open" },
  { id:"PO-3465", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:57000.0, gst:0, delivery:"2025-06-03", status:"Open" },
  { id:"PO-3466", vendor:"Devashish Construction", project:"Genial", material:"PPC", qty:1, unit:"Lump", rate:78750.0, gst:0, delivery:"2025-06-07", status:"Open" },
  { id:"PO-3467", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:59200.0, gst:0, delivery:"2025-06-10", status:"Open" },
  { id:"PO-3468", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:62400.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-3469", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:116200.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-3470", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-3471", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-3472", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:10846.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-3473", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-3474", vendor:"Satija Stones", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-3475", vendor:"Arch Ninad Bothara", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-06-11", status:"Delivered" },
  { id:"PO-3476", vendor:"Ankit Self Expense", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:327.0, gst:0, delivery:"2025-06-11", status:"Open" },
  { id:"PO-3477", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:33450.0, gst:0, delivery:"2025-06-17", status:"Open" },
  { id:"PO-3478", vendor:"Mauli Generators", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:6598.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-3479", vendor:"Shivaji pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:33450.0, gst:0, delivery:"2025-06-19", status:"Delivered" },
  { id:"PO-3480", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:125000.0, gst:0, delivery:"2025-06-19", status:"Delivered" },
  { id:"PO-3481", vendor:"Somnath Shirsagar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-3482", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-06-19", status:"Delivered" },
  { id:"PO-3483", vendor:"Sandip Jadhav", project:"Genial", material:"Fly Ash Bricks", qty:1, unit:"Lump", rate:15400.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-3484", vendor:"Prashant Jachak", project:"Genial", material:"Red Bricks", qty:1, unit:"Lump", rate:52000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-3485", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:8000.0, gst:0, delivery:"2025-06-19", status:"Open" },
  { id:"PO-3486", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:63400.0, gst:0, delivery:"2025-06-24", status:"Open" },
  { id:"PO-3487", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2025-06-24", status:"Open" },
  { id:"PO-3488", vendor:"Yashika Chemicals", project:"Genial", material:"ID 2014657826", qty:1, unit:"Lump", rate:80000.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-3489", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-06-30", status:"Delivered" },
  { id:"PO-3490", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:72000.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-3491", vendor:"Satija Stones", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-06-30", status:"Open" },
  { id:"PO-3492", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2025-07-02", status:"Delivered" },
  { id:"PO-3493", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-07-02", status:"Delivered" },
  { id:"PO-3494", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:145850.0, gst:0, delivery:"2025-07-01", status:"Open" },
  { id:"PO-3495", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:9850.0, gst:0, delivery:"2025-07-01", status:"Open" },
  { id:"PO-3496", vendor:"Shivaji Pawar", project:"Genial", material:"RCC Contractor", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-03", status:"Delivered" },
  { id:"PO-3497", vendor:"Dhiraj Sharma", project:"Genial", material:"Waterproofing Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-07-03", status:"Delivered" },
  { id:"PO-3498", vendor:"Raju kumavat Tile", project:"Genial", material:"Tile Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-03", status:"Delivered" },
  { id:"PO-3499", vendor:"Pranay Shah", project:"Genial", material:"AC Works", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-3500", vendor:"Carpenter", project:"Genial", material:"Farma cutting", qty:1, unit:"Lump", rate:12500.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-3501", vendor:"Verma Polish Work", project:"Genial", material:"Polish Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-03", status:"Delivered" },
  { id:"PO-3502", vendor:"Satija Stones", project:"Genial", material:"Basalt Stone Payment", qty:1, unit:"Lump", rate:69500.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-3503", vendor:"Ankit Self Expense", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:6444.0, gst:0, delivery:"2025-07-03", status:"Open" },
  { id:"PO-3504", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:31950.0, gst:0, delivery:"2025-07-09", status:"Open" },
  { id:"PO-3505", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:450.0, gst:0, delivery:"2025-07-09", status:"Open" },
  { id:"PO-3506", vendor:"Devashish Construction", project:"Genial", material:"PPC", qty:1, unit:"Lump", rate:94400.0, gst:0, delivery:"2025-07-14", status:"Open" },
  { id:"PO-3507", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:74550.0, gst:0, delivery:"2025-07-16", status:"Open" },
  { id:"PO-3508", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:750.0, gst:0, delivery:"2025-07-16", status:"Open" },
  { id:"PO-3509", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-07-17", status:"Delivered" },
  { id:"PO-3510", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:14200.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3511", vendor:"Shantai Traders (Vihan jain)", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:37800.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3512", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:166600.0, gst:0, delivery:"2025-07-17", status:"Delivered" },
  { id:"PO-3513", vendor:"Somnath Shirsagar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3514", vendor:"Gorakh gavali JCB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:3250.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3515", vendor:"Yashika Chemicals", project:"Genial", material:"(ID 2036326724)", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3516", vendor:"Ashirwad Plumbing Material", project:"Genial", material:"(ID 2036332091)", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3517", vendor:"Pahade Core Cutting", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:17200.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3518", vendor:"Mauli Generators", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3519", vendor:"Granite Material", project:"Genial", material:"Tractor", qty:1, unit:"Lump", rate:40000.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3520", vendor:"Diamond Art", project:"Genial", material:"Plot 3 & 8", qty:1, unit:"Lump", rate:11520.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3521", vendor:"Ventus Air Conditioning", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:5665.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3522", vendor:"Ankit Self Expense", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:11183.0, gst:0, delivery:"2025-07-17", status:"Open" },
  { id:"PO-3523", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:49250.0, gst:0, delivery:"2025-07-22", status:"Open" },
  { id:"PO-3524", vendor:"Arch Ninad Bothara", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-07-23", status:"Delivered" },
  { id:"PO-3525", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-3526", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-3527", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:126000.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-3528", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:65600.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-3529", vendor:"Somnath Shirsagar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-3530", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-08-01", status:"Delivered" },
  { id:"PO-3531", vendor:"MSEB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:12890.0, gst:0, delivery:"2025-08-01", status:"Open" },
  { id:"PO-3532", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:127900.0, gst:0, delivery:"2025-08-05", status:"Open" },
  { id:"PO-3533", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-08-05", status:"Open" },
  { id:"PO-3534", vendor:"Arch Ninad Bothara", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-08-09", status:"Delivered" },
  { id:"PO-3535", vendor:"Yashika Chemicals", project:"Genial", material:"ID 2062901654", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-08-10", status:"Open" },
  { id:"PO-3536", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:82500.0, gst:0, delivery:"2025-08-12", status:"Open" },
  { id:"PO-3537", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:9600.0, gst:0, delivery:"2025-08-12", status:"Open" },
  { id:"PO-3538", vendor:"Basalt Stone", project:"Genial", material:"Tractor", qty:1, unit:"Lump", rate:4400.0, gst:0, delivery:"2025-08-13", status:"Open" },
  { id:"PO-3539", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-08-16", status:"Delivered" },
  { id:"PO-3540", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-08-16", status:"Delivered" },
  { id:"PO-3541", vendor:"Gururaj Electrical", project:"Genial", material:"Electrical Work", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-08-16", status:"Delivered" },
  { id:"PO-3542", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-08-16", status:"Open" },
  { id:"PO-3543", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:59000.0, gst:0, delivery:"2025-08-19", status:"Open" },
  { id:"PO-3544", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:10200.0, gst:0, delivery:"2025-08-19", status:"Open" },
  { id:"PO-3545", vendor:"Shantai Traders (Vihan jain)", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:37200.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-3546", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-08-21", status:"Delivered" },
  { id:"PO-3547", vendor:"Yashika Chemicals", project:"Genial", material:"ID 2074581851", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-3548", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-08-21", status:"Delivered" },
  { id:"PO-3549", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:5750.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-3550", vendor:"Ankit Self Expense", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:9460.0, gst:0, delivery:"2025-08-21", status:"Open" },
  { id:"PO-3551", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:26000.0, gst:0, delivery:"2025-08-27", status:"Open" },
  { id:"PO-3552", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-08-27", status:"Open" },
  { id:"PO-3553", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-08-28", status:"Delivered" },
  { id:"PO-3554", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2025-09-01", status:"Delivered" },
  { id:"PO-3555", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-09-01", status:"Delivered" },
  { id:"PO-3556", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15200.0, gst:0, delivery:"2025-09-03", status:"Open" },
  { id:"PO-3557", vendor:"Yashika Chemicals", project:"Genial", material:"ID 2089646733", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-05", status:"Open" },
  { id:"PO-3558", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-09-06", status:"Delivered" },
  { id:"PO-3559", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-06", status:"Delivered" },
  { id:"PO-3560", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:36000.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3561", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:72845.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3562", vendor:"Mauli Generators", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3563", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:39445.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3564", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1600.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3565", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:455.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3566", vendor:"Ganpat Tractor", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3567", vendor:"RCC Designer", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3568", vendor:"Gururaj Electrical", project:"Genial", material:"ID 2091101713", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-09-06", status:"Delivered" },
  { id:"PO-3569", vendor:"Satija Stones", project:"Genial", material:"ID 2091110309", qty:1, unit:"Lump", rate:16675.0, gst:0, delivery:"2025-09-06", status:"Open" },
  { id:"PO-3570", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:19000.0, gst:0, delivery:"2025-09-10", status:"Open" },
  { id:"PO-3571", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-12", status:"Delivered" },
  { id:"PO-3572", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-12", status:"Delivered" },
  { id:"PO-3573", vendor:"Somnath Shirsagar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-12", status:"Open" },
  { id:"PO-3574", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-09-12", status:"Delivered" },
  { id:"PO-3575", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-09-12", status:"Delivered" },
  { id:"PO-3576", vendor:"MSEB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-09-12", status:"Open" },
  { id:"PO-3577", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:62000.0, gst:0, delivery:"2025-09-17", status:"Open" },
  { id:"PO-3578", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:600.0, gst:0, delivery:"2025-09-17", status:"Open" },
  { id:"PO-3579", vendor:"R N Enterprices", project:"Genial", material:"ID 2104988985", qty:1, unit:"Lump", rate:20200.0, gst:0, delivery:"2025-09-18", status:"Open" },
  { id:"PO-3580", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-09-19", status:"Delivered" },
  { id:"PO-3581", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:144050.0, gst:0, delivery:"2025-09-19", status:"Delivered" },
  { id:"PO-3582", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-19", status:"Delivered" },
  { id:"PO-3583", vendor:"Yashika Chemicals", project:"Genial", material:"ID 21059474564", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-19", status:"Open" },
  { id:"PO-3584", vendor:"Shantai Traders (Vihan jain)", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-3585", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:36000.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-3586", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-09-21", status:"Delivered" },
  { id:"PO-3587", vendor:"Pranay Shah", project:"Genial", material:"AC Works", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-3588", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-09-21", status:"Delivered" },
  { id:"PO-3589", vendor:"Mauli Generators", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-3590", vendor:"Hariom Cement Tushar Bhau", project:"Genial", material:"Cement", qty:1, unit:"Lump", rate:76250.0, gst:0, delivery:"2025-09-21", status:"Delivered" },
  { id:"PO-3591", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-3592", vendor:"Granite Material", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:21500.0, gst:0, delivery:"2025-09-21", status:"Open" },
  { id:"PO-3593", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:42500.0, gst:0, delivery:"2025-09-24", status:"Open" },
  { id:"PO-3594", vendor:"Generator Transportation", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1700.0, gst:0, delivery:"2025-09-25", status:"Open" },
  { id:"PO-3595", vendor:"Generator Repairing Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:13500.0, gst:0, delivery:"2025-09-25", status:"Open" },
  { id:"PO-3596", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:184800.0, gst:0, delivery:"2025-09-26", status:"Delivered" },
  { id:"PO-3597", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-09-26", status:"Delivered" },
  { id:"PO-3598", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-09-26", status:"Delivered" },
  { id:"PO-3599", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-09-26", status:"Delivered" },
  { id:"PO-3600", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3601", vendor:"Vitthal Nursary", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:59000.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3602", vendor:"Shravan Transport", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1800.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3603", vendor:"Sandip Jadhav", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:49500.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3604", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3605", vendor:"Rafiq Khan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3606", vendor:"Sambhaji Patil Core Cutting", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3607", vendor:"Ankit Self Expense", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:32000.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3608", vendor:"Petty Cash", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:6700.0, gst:0, delivery:"2025-09-26", status:"Open" },
  { id:"PO-3609", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:48700.0, gst:0, delivery:"2025-10-01", status:"Open" },
  { id:"PO-3610", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:7200.0, gst:0, delivery:"2025-10-01", status:"Open" },
  { id:"PO-3611", vendor:"Yashika Chemicals", project:"Genial", material:"2120182859", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-02", status:"Open" },
  { id:"PO-3612", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:120000.0, gst:0, delivery:"2025-10-03", status:"Delivered" },
  { id:"PO-3613", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2025-10-03", status:"Delivered" },
  { id:"PO-3614", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-04", status:"Delivered" },
  { id:"PO-3615", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-10-04", status:"Open" },
  { id:"PO-3616", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-10-04", status:"Delivered" },
  { id:"PO-3617", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-10-04", status:"Delivered" },
  { id:"PO-3618", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-10-04", status:"Delivered" },
  { id:"PO-3619", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-10-04", status:"Delivered" },
  { id:"PO-3620", vendor:"Plumber Shirsagar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-04", status:"Open" },
  { id:"PO-3621", vendor:"Stone Chips C 2 Material", project:"Genial", material:"2130837638", qty:1, unit:"Lump", rate:69750.0, gst:0, delivery:"2025-10-07", status:"Open" },
  { id:"PO-3622", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:121550.0, gst:0, delivery:"2025-10-08", status:"Open" },
  { id:"PO-3623", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-10-09", status:"Delivered" },
  { id:"PO-3624", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:64600.0, gst:0, delivery:"2025-10-09", status:"Open" },
  { id:"PO-3625", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-10-09", status:"Delivered" },
  { id:"PO-3626", vendor:"Granite Material", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:21500.0, gst:0, delivery:"2025-10-09", status:"Open" },
  { id:"PO-3627", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-09", status:"Delivered" },
  { id:"PO-3628", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-09", status:"Delivered" },
  { id:"PO-3629", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-10-09", status:"Delivered" },
  { id:"PO-3630", vendor:"Yashika Chemicals", project:"Genial", material:"2132086108", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-10-11", status:"Open" },
  { id:"PO-3631", vendor:"Devashish Construction", project:"Genial", material:"PPC", qty:1, unit:"Lump", rate:19390.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-3632", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:221300.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-3633", vendor:"Ceramic Traders", project:"Genial", material:"2137241556", qty:1, unit:"Lump", rate:51576.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-3634", vendor:"Yashika Chemicals", project:"Genial", material:"2137313898", qty:1, unit:"Lump", rate:60000.0, gst:0, delivery:"2025-10-15", status:"Open" },
  { id:"PO-3635", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-3636", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:550000.0, gst:0, delivery:"2025-10-17", status:"Delivered" },
  { id:"PO-3637", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-3638", vendor:"Granite Material", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:21500.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-3639", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:650000.0, gst:0, delivery:"2025-10-17", status:"Delivered" },
  { id:"PO-3640", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-10-17", status:"Delivered" },
  { id:"PO-3641", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-10-17", status:"Delivered" },
  { id:"PO-3642", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-10-17", status:"Delivered" },
  { id:"PO-3643", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:72000.0, gst:0, delivery:"2025-10-17", status:"Open" },
  { id:"PO-3644", vendor:"Ravindra Jain", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2025-10-18", status:"Delivered" },
  { id:"PO-3645", vendor:"Nandu Bhau", project:"Genial", material:"fabrication Work", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-10-19", status:"Open" },
  { id:"PO-3646", vendor:"R N Entrprises", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:42800.0, gst:0, delivery:"2025-10-29", status:"Open" },
  { id:"PO-3647", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:128500.0, gst:0, delivery:"2025-10-29", status:"Open" },
  { id:"PO-3648", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2025-10-31", status:"Delivered" },
  { id:"PO-3649", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-3650", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:350000.0, gst:0, delivery:"2025-10-31", status:"Delivered" },
  { id:"PO-3651", vendor:"Granite Material", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:21500.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-3652", vendor:"Pranay Shah", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:33244.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-3653", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-31", status:"Delivered" },
  { id:"PO-3654", vendor:"Plumber Shirsagar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-3655", vendor:"Sambhaji Patil Core Cutting", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:3000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-3656", vendor:"Balasaheb Sonawane", project:"Genial", material:"JCB Work", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-3657", vendor:"Balasaheb Sonawane", project:"Genial", material:"Murum", qty:1, unit:"Lump", rate:11000.0, gst:0, delivery:"2025-10-31", status:"Open" },
  { id:"PO-3658", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:97600.0, gst:0, delivery:"2025-11-05", status:"Open" },
  { id:"PO-3659", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-11-05", status:"Open" },
  { id:"PO-3660", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:350000.0, gst:0, delivery:"2025-11-07", status:"Delivered" },
  { id:"PO-3661", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-3662", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-3663", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-11-07", status:"Open" },
  { id:"PO-3664", vendor:"Nandu Bhau", project:"Genial", material:"fabrication Work", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-11-10", status:"Open" },
  { id:"PO-3665", vendor:"Nandu Bhau", project:"Genial", material:"fabrication Work", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-10", status:"Open" },
  { id:"PO-3666", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:86400.0, gst:0, delivery:"2025-11-12", status:"Open" },
  { id:"PO-3667", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:23150.0, gst:0, delivery:"2025-11-12", status:"Open" },
  { id:"PO-3668", vendor:"BSNL Bill", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1023.0, gst:0, delivery:"2025-11-13", status:"Open" },
  { id:"PO-3669", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-14", status:"Delivered" },
  { id:"PO-3670", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-14", status:"Open" },
  { id:"PO-3671", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-11-14", status:"Delivered" },
  { id:"PO-3672", vendor:"Sagar Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:248900.0, gst:0, delivery:"2025-11-14", status:"Delivered" },
  { id:"PO-3673", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-11-14", status:"Delivered" },
  { id:"PO-3674", vendor:"R N Enterprices", project:"Genial", material:"ID 2175755184", qty:1, unit:"Lump", rate:35741.0, gst:0, delivery:"2025-11-18", status:"Open" },
  { id:"PO-3675", vendor:"Yashika Chemicals", project:"Genial", material:"ID 2175979105", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-18", status:"Open" },
  { id:"PO-3676", vendor:"Ceramic Traders", project:"Genial", material:"ID 2175986782", qty:1, unit:"Lump", rate:134672.0, gst:0, delivery:"2025-11-18", status:"Open" },
  { id:"PO-3677", vendor:"Yashika Chemicals", project:"Genial", material:"ID 21760339100", qty:1, unit:"Lump", rate:48000.0, gst:0, delivery:"2025-11-18", status:"Open" },
  { id:"PO-3678", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:110900.0, gst:0, delivery:"2025-11-19", status:"Open" },
  { id:"PO-3679", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:13000.0, gst:0, delivery:"2025-11-19", status:"Open" },
  { id:"PO-3680", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:300000.0, gst:0, delivery:"2025-11-20", status:"Delivered" },
  { id:"PO-3681", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-3682", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-3683", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:70000.0, gst:0, delivery:"2025-11-20", status:"Delivered" },
  { id:"PO-3684", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:8000.0, gst:0, delivery:"2025-11-20", status:"Open" },
  { id:"PO-3685", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:63650.0, gst:0, delivery:"2025-11-26", status:"Open" },
  { id:"PO-3686", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:17500.0, gst:0, delivery:"2025-11-26", status:"Open" },
  { id:"PO-3687", vendor:"Yashika Chemicals", project:"Genial", material:"ID 2184995190", qty:1, unit:"Lump", rate:28000.0, gst:0, delivery:"2025-11-27", status:"Open" },
  { id:"PO-3688", vendor:"Granite Material", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:64500.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3689", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-11-29", status:"Delivered" },
  { id:"PO-3690", vendor:"Balasaheb Sonawane", project:"Genial", material:"cement Shifting", qty:1, unit:"Lump", rate:1700.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3691", vendor:"Amol Gavali", project:"Genial", material:"cement Shifting", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3692", vendor:"Shantai Traders (Vihan jain)", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15196.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3693", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-11-29", status:"Delivered" },
  { id:"PO-3694", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:70180.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3695", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3696", vendor:"Nandu Bhau", project:"Genial", material:"fabrication Work", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3697", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-11-29", status:"Delivered" },
  { id:"PO-3698", vendor:"Jaydeep Mahajan Basalt", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3699", vendor:"MSEB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:19460.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3700", vendor:"BSNL Bill", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1032.0, gst:0, delivery:"2025-11-29", status:"Open" },
  { id:"PO-3701", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:75000.0, gst:0, delivery:"2025-11-29", status:"Delivered" },
  { id:"PO-3702", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:6600.0, gst:0, delivery:"2025-12-03", status:"Open" },
  { id:"PO-3703", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:16550.0, gst:0, delivery:"2025-12-03", status:"Open" },
  { id:"PO-3704", vendor:"Geeta Hardware MDF Debit Verma Ji", project:"Genial", material:"ID 2193873490", qty:1, unit:"Lump", rate:30564.0, gst:0, delivery:"2025-12-05", status:"Open" },
  { id:"PO-3705", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-12-06", status:"Delivered" },
  { id:"PO-3706", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-06", status:"Delivered" },
  { id:"PO-3707", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-06", status:"Delivered" },
  { id:"PO-3708", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2025-12-06", status:"Delivered" },
  { id:"PO-3709", vendor:"Jaydeep Mahajan Basalt", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-3710", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:14000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-3711", vendor:"Tile Unloading payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2025-12-06", status:"Open" },
  { id:"PO-3712", vendor:"Ravindra Jain", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-06", status:"Delivered" },
  { id:"PO-3713", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-13", status:"Delivered" },
  { id:"PO-3714", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-13", status:"Open" },
  { id:"PO-3715", vendor:"Arch Ninad Bothara", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-17", status:"Delivered" },
  { id:"PO-3716", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:9700.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-3717", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:250000.0, gst:0, delivery:"2025-12-18", status:"Delivered" },
  { id:"PO-3718", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-18", status:"Delivered" },
  { id:"PO-3719", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-3720", vendor:"Jaydeep Mahajan Basalt", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-3721", vendor:"Sahil Bhau Chota Hatti", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1500.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-3722", vendor:"Nilesh Electrical", project:"Genial", material:"Halogen", qty:1, unit:"Lump", rate:3330.0, gst:0, delivery:"2025-12-18", status:"Open" },
  { id:"PO-3723", vendor:"Asif Bhai Painter", project:"Genial", material:"ID 2219076845", qty:1, unit:"Lump", rate:236000.0, gst:0, delivery:"2025-12-26", status:"Open" },
  { id:"PO-3724", vendor:"Asif Bhai Painter", project:"Genial", material:"ID 2219077748", qty:1, unit:"Lump", rate:236000.0, gst:0, delivery:"2025-12-26", status:"Open" },
  { id:"PO-3725", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-27", status:"Delivered" },
  { id:"PO-3726", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-27", status:"Delivered" },
  { id:"PO-3727", vendor:"Asif Bhai Painter", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-3728", vendor:"Sahil Bhau Chota Hatti", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-3729", vendor:"BSNL Bill", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1137.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-3730", vendor:"Diesel", project:"Genial", material:"Generator", qty:1, unit:"Lump", rate:6000.0, gst:0, delivery:"2025-12-27", status:"Open" },
  { id:"PO-3731", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-3732", vendor:"Jaydeep Mahajan Basalt", project:"Genial", material:"Basalt Stone Payment", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-3733", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-31", status:"Delivered" },
  { id:"PO-3734", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-3735", vendor:"Nandu Bhau", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:20000.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-3736", vendor:"MSEB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:7500.0, gst:0, delivery:"2025-12-31", status:"Open" },
  { id:"PO-3737", vendor:"R N Enterprices", project:"Genial", material:"ID 2224845656", qty:1, unit:"Lump", rate:19500.0, gst:0, delivery:"2026-01-01", status:"Open" },
  { id:"PO-3738", vendor:"Devashish Construction", project:"Genial", material:"PPC", qty:1, unit:"Lump", rate:20100.0, gst:0, delivery:"2026-01-07", status:"Open" },
  { id:"PO-3739", vendor:"R N Enterprices", project:"Genial", material:"ID 2231619879", qty:1, unit:"Lump", rate:33502.0, gst:0, delivery:"2026-01-07", status:"Open" },
  { id:"PO-3740", vendor:"Asif Bhai Painter", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-3741", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:18000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-3742", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-01-10", status:"Delivered" },
  { id:"PO-3743", vendor:"Jaydeep Mahajan Basalt", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-3744", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-10", status:"Delivered" },
  { id:"PO-3745", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-10", status:"Delivered" },
  { id:"PO-3746", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-01-10", status:"Delivered" },
  { id:"PO-3747", vendor:"gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-3748", vendor:"Pranay Shah", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-3749", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-3750", vendor:"MSEB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:2020.0, gst:0, delivery:"2026-01-10", status:"Open" },
  { id:"PO-3751", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:27600.0, gst:0, delivery:"2026-01-13", status:"Open" },
  { id:"PO-3752", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:26000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-3753", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-20", status:"Delivered" },
  { id:"PO-3754", vendor:"Departmental Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:4000.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-3755", vendor:"Petty Cash", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:5450.0, gst:0, delivery:"2026-01-20", status:"Open" },
  { id:"PO-3756", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-01-20", status:"Delivered" },
  { id:"PO-3757", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-27", status:"Delivered" },
  { id:"PO-3758", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-27", status:"Delivered" },
  { id:"PO-3759", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-01-27", status:"Delivered" },
  { id:"PO-3760", vendor:"MSEB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:9510.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-3761", vendor:"Verma Window Work", project:"Genial", material:"ID2254133988 (Shriram glass)", qty:1, unit:"Lump", rate:1000000.0, gst:0, delivery:"2026-01-27", status:"Open" },
  { id:"PO-3762", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:28200.0, gst:0, delivery:"2026-01-28", status:"Open" },
  { id:"PO-3763", vendor:"DG Set", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:406000.0, gst:0, delivery:"2026-01-28", status:"Open" },
  { id:"PO-3764", vendor:"MSEB", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:19110.0, gst:0, delivery:"2026-01-28", status:"Open" },
  { id:"PO-3765", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-05", status:"Delivered" },
  { id:"PO-3766", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-02-05", status:"Delivered" },
  { id:"PO-3767", vendor:"Asif Bhai Painter", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-02-05", status:"Open" },
  { id:"PO-3768", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-02-05", status:"Delivered" },
  { id:"PO-3769", vendor:"Asif Bhai Painter", project:"Genial", material:"ID2266277958", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-02-06", status:"Open" },
  { id:"PO-3770", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-16", status:"Delivered" },
  { id:"PO-3771", vendor:"Raju kumavat Tile", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:150000.0, gst:0, delivery:"2026-02-16", status:"Delivered" },
  { id:"PO-3772", vendor:"Shantinath Marbles", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:28400.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-3773", vendor:"Prashant Jachak", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:38000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-3774", vendor:"Sambhaji Shinde Carpenter", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-16", status:"Open" },
  { id:"PO-3775", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-16", status:"Delivered" },
  { id:"PO-3776", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-02-16", status:"Delivered" },
  { id:"PO-3777", vendor:"BSNL Bill", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:710.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-3778", vendor:"Gorakh Chavan", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:15000.0, gst:0, delivery:"2026-02-26", status:"Open" },
  { id:"PO-3779", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-02-26", status:"Delivered" },
  { id:"PO-3780", vendor:"Verma Window Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:500000.0, gst:0, delivery:"2026-03-02", status:"Open" },
  { id:"PO-3781", vendor:"Asif Bhai Painter", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:200000.0, gst:0, delivery:"2026-03-08", status:"Open" },
  { id:"PO-3782", vendor:"Devashish Construction", project:"Genial", material:"PPC", qty:1, unit:"Lump", rate:145000.0, gst:0, delivery:"2026-03-11", status:"Open" },
  { id:"PO-3783", vendor:"Dhiraj Sharma", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-3784", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-3785", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-3786", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:193120.0, gst:0, delivery:"2026-03-17", status:"Delivered" },
  { id:"PO-3787", vendor:"Verma POP Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:10000.0, gst:0, delivery:"2026-03-17", status:"Open" },
  { id:"PO-3788", vendor:"BSNL Bill", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:674.0, gst:0, delivery:"2026-03-24", status:"Open" },
  { id:"PO-3789", vendor:"Rohit Electrical", project:"Genial", material:"Plot no.5", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-03-28", status:"Open" },
  { id:"PO-3790", vendor:"Gururaj Electrical", project:"Genial", material:"Gururaj Electricals", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-03-29", status:"Delivered" },
  { id:"PO-3791", vendor:"Amol Gavali", project:"Genial", material:"JCB", qty:1, unit:"Lump", rate:5000.0, gst:0, delivery:"2026-03-29", status:"Open" },
  { id:"PO-3792", vendor:"Asif Bhai Painter", project:"Genial", material:"ID 2335344453", qty:1, unit:"Lump", rate:272000.0, gst:0, delivery:"2026-04-04", status:"Open" },
  { id:"PO-3793", vendor:"Ashirwad Plumbing Material", project:"Genial", material:"ID2342138067", qty:1, unit:"Lump", rate:28696.0, gst:0, delivery:"2026-04-08", status:"Open" },
  { id:"PO-3794", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-09", status:"Delivered" },
  { id:"PO-3795", vendor:"Rohit Electrical", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-09", status:"Open" },
  { id:"PO-3796", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-18", status:"Delivered" },
  { id:"PO-3797", vendor:"Electritian Rawate", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:7000.0, gst:0, delivery:"2026-04-18", status:"Open" },
  { id:"PO-3798", vendor:"Shivaji Pawar", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-18", status:"Delivered" },
  { id:"PO-3799", vendor:"Rohit Electrical", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-04-18", status:"Open" },
  { id:"PO-3800", vendor:"Laxmi Techno STP plant Payment", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:240000.0, gst:0, delivery:"2026-04-28", status:"Open" },
  { id:"PO-3801", vendor:"PMC", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-25", status:"Delivered" },
  { id:"PO-3802", vendor:"Verma POP Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:30000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-3803", vendor:"Verma Polish Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:100000.0, gst:0, delivery:"2026-04-25", status:"Delivered" },
  { id:"PO-3804", vendor:"Rohit Electrical", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:50000.0, gst:0, delivery:"2026-04-25", status:"Open" },
  { id:"PO-3805", vendor:"Diesel", project:"Genial", material:"Genial", qty:1, unit:"Lump", rate:2000.0, gst:0, delivery:"2026-04-26", status:"Open" },
  { id:"PO-3806", vendor:"Verma Window Work", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:1500000.0, gst:0, delivery:"2026-05-01", status:"Open" },
  { id:"PO-3807", vendor:"Rohit Electrical", project:"Genial", material:"Misc Expense", qty:1, unit:"Lump", rate:25000.0, gst:0, delivery:"2026-05-03", status:"Open" }
];

let INVENTORY = [
  { material:"OPC 53 Grade Cement", unit:"Bag", opening:1400, received:800, consumed:1650, reorder:400 },
  { material:"River Sand", unit:"Cum", opening:340, received:220, consumed:310, reorder:100 },
  { material:"TMT Bars Fe500 12mm", unit:"Ton", opening:62, received:45, consumed:58, reorder:20 },
  { material:"Aggregate 20mm", unit:"Cum", opening:280, received:150, consumed:260, reorder:80 },
  { material:"Bricks (Class A)", unit:"Nos", opening:85000, received:40000, consumed:98000, reorder:15000 },
  { material:"Vitrified Tiles 600x600", unit:"Sqm", opening:1800, received:3100, consumed:2400, reorder:500 },
  { material:"Exterior Emulsion Paint", unit:"Ltr", opening:120, received:180, consumed:260, reorder:60 },
  { material:"Aluminium Window Frames", unit:"Sqm", opening:0, received:0, consumed:0, reorder:50 },
];

/* ---------------------------- Labour & Contractor data ---------------------------- */
const TRADES = ["Mason", "Carpenter", "Bar Bender", "Electrician", "Plumber", "Painter", "Helper", "Fitter"];

let CONTRACTORS = [
  { id:"CTR-01", name:"Shivaji Labour Suppliers", trade:"Mason", project:"Zinnia", workers:32, dayRate:750, totalBilled:1840000, advance:220000, outstanding:1620000 },
  { id:"CTR-02", name:"Patil Construction Labour", trade:"Bar Bender", project:"Genial", workers:18, dayRate:820, totalBilled:1120000, advance:150000, outstanding:970000 },
  { id:"CTR-03", name:"Deshmukh Electrical Works", trade:"Electrician", project:"Whispering Grooves", workers:12, dayRate:900, totalBilled:640000, advance:80000, outstanding:560000 },
  { id:"CTR-04", name:"Karad Carpentry Group", trade:"Carpenter", project:"Zinnia", workers:15, dayRate:780, totalBilled:580000, advance:60000, outstanding:520000 },
  { id:"CTR-05", name:"Om Sai Painting Contractors", trade:"Painter", project:"Zinnia", workers:22, dayRate:680, totalBilled:410000, advance:40000, outstanding:370000 },
  { id:"CTR-06", name:"Bhosale Plumbing Services", trade:"Plumber", project:"Zinnia", workers:9, dayRate:850, totalBilled:295000, advance:35000, outstanding:260000 },
];

let ATTENDANCE = [
  { id:"ATT-001", date:"2026-08-14", contractor:"Shivaji Labour Suppliers", project:"Zinnia", present:30, absent:2, otHours:24 },
  { id:"ATT-002", date:"2026-08-14", contractor:"Patil Construction Labour", project:"Genial", present:16, absent:2, otHours:12 },
  { id:"ATT-003", date:"2026-08-14", contractor:"Deshmukh Electrical Works", project:"Whispering Grooves", present:11, absent:1, otHours:6 },
  { id:"ATT-004", date:"2026-08-13", contractor:"Karad Carpentry Group", project:"Zinnia", present:14, absent:1, otHours:8 },
  { id:"ATT-005", date:"2026-08-13", contractor:"Om Sai Painting Contractors", project:"Zinnia", present:20, absent:2, otHours:16 },
  { id:"ATT-006", date:"2026-08-13", contractor:"Bhosale Plumbing Services", project:"Zinnia", present:8, absent:1, otHours:4 },
  { id:"ATT-007", date:"2026-08-12", contractor:"Shivaji Labour Suppliers", project:"Zinnia", present:29, absent:3, otHours:18 },
];

/* ---------------------------- Billing & Accounts data ---------------------------- */
const INV_STATUS_META = {
  "Paid": {fg:"#16A34A", bg:"#DCFCE7"},
  "Outstanding": {fg:"#2563EB", bg:"#DBEAFE"},
  "Overdue": {fg:"#DC2626", bg:"#FEE2E2"},
};

function invNet(inv){
  const gstAmt = inv.basic * (inv.gst/100);
  const tdsAmt = inv.basic * (inv.tds/100);
  const retentionAmt = inv.basic * (inv.retention/100);
  return inv.basic + gstAmt - tdsAmt - retentionAmt;
}

let INVOICES = [
  { id:"INV-2001", raBill:"RA-14", client:"Hiranmayi Developers", project:"Zinnia", basic:8500000, gst:18, tds:1, retention:5, dueDate:"2026-08-10", status:"Overdue", paid:0 },
  { id:"INV-2002", raBill:"RA-11", client:"Hiranmayi Developers", project:"Whispering Grooves", basic:6200000, gst:18, tds:1, retention:5, dueDate:"2026-08-28", status:"Outstanding", paid:0 },
  { id:"INV-2003", raBill:"RA-08", client:"Hiranmayi Developers", project:"Genial", basic:4100000, gst:18, tds:1, retention:5, dueDate:"2026-07-30", status:"Paid", paid:0 },
  { id:"INV-2004", raBill:"RA-09", client:"Hiranmayi Developers", project:"Zinnia", basic:2950000, gst:18, tds:2, retention:5, dueDate:"2026-08-20", status:"Outstanding", paid:0 },
  { id:"INV-2005", raBill:"RA-05", client:"Hiranmayi Developers", project:"Whispering Grooves", basic:5300000, gst:18, tds:1, retention:5, dueDate:"2026-08-05", status:"Overdue", paid:0 },
  { id:"INV-2006", raBill:"RA-16", client:"Hiranmayi Developers", project:"Zinnia", basic:7800000, gst:18, tds:1, retention:5, dueDate:"2026-09-01", status:"Paid", paid:0 },
  { id:"INV-2007", raBill:"RA-03", client:"Hiranmayi Developers", project:"Whispering Grooves", basic:3400000, gst:18, tds:1, retention:0, dueDate:"2026-07-15", status:"Paid", paid:0 },
];
INVOICES.forEach(inv=>{ if (inv.status==="Paid") inv.paid = invNet(inv); });

const PAYMENT_MODES = ["Bank Transfer", "Cheque", "UPI", "RTGS/NEFT"];
let PAYMENTS = [
  { id:"RCP-501", client:"Hiranmayi Developers", invoice:"INV-2003", amount:4100000*1.18*0.94, mode:"RTGS/NEFT", date:"2026-08-01" },
  { id:"RCP-502", client:"Hiranmayi Developers", invoice:"INV-2006", amount:7800000*1.18*0.94, mode:"Bank Transfer", date:"2026-08-06" },
  { id:"RCP-503", client:"Hiranmayi Developers", invoice:"INV-2007", amount:3400000*1.18*0.99, mode:"Cheque", date:"2026-07-20" },
];

/* ---------------------------- Clients & Vendors data ---------------------------- */
let CLIENTS = [
  { id:"CL-01", name:"Hiranmayi Developers - Owner", company:"Hiranmayi Developers", phone:"", email:"", projects:["Zinnia","Whispering Grooves","Genial"] },
];

const VENDOR_CATEGORIES = ["Cement & Building Material", "Steel & Metal", "Electrical", "Sanitaryware & Plumbing", "Tiles & Flooring", "Paint & Finishing", "Aluminium & Glazing"];
let VENDORS = [
  { id:"VN-01", name:"Shivaji Pawar", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-02", name:"Sagar Pawar", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-03", name:"Miscalneous", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-04", name:"Mahadev petrol Pump", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-05", name:"Shantai Traders ( Vihan Jain)", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-06", name:"Gorakh Chavan Beze Phata", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-07", name:"Departmental Work", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-08", name:"Hari Om cement Agencies", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-09", name:"Ravindra Jain", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-10", name:"PMC", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-11", name:"Devashish Construction", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-12", name:"Gorakh Chavan", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-13", name:"Raju kumavat Tile", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-14", name:"Diesel", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-15", name:"Departmental Payment", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-16", name:"Yashika Chemicals", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-17", name:"Gururaj Electrical", category:"Electrical", gstin:"", phone:"" },
  { id:"VN-18", name:"Sandip jadhav", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-19", name:"Transportation", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-20", name:"Mahesh Patil", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-21", name:"Balasaheb Sonawane", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-22", name:"Prashant Jachak", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-23", name:"Ankit Self Expense", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-24", name:"Verma Polish Work", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-25", name:"Dhiraj Sharma", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-26", name:"Ravi Patel", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-27", name:"Gorakh Gavali", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-28", name:"Mauli Generators", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-29", name:"Petty Cash", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-30", name:"Shantinath Marbles", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-31", name:"Jay Durga Earthmovers", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-32", name:"Gopal Bhau", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-33", name:"Datta Krupa Ent. ( Patil Fly Ash)", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-34", name:"Somnath Shirsagar", category:"Sanitaryware & Plumbing", gstin:"", phone:"" },
  { id:"VN-35", name:"Amol Gavali", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-36", name:"Bhandure InfraProjects", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-37", name:"Himalaya Agro", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-38", name:"Vihan Jain (Shantai Traders)", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-39", name:"MSEB", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-40", name:"Rafiq Khan", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-41", name:"Shravan Transport", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-42", name:"Transport", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-43", name:"Mohit", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-44", name:"santosh pandit", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-45", name:"mauli enterprices", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-46", name:"Raju Kumavat", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-47", name:"Vitthal Nursary", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-48", name:"Tukaram Shirasat", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-49", name:"Mohit Rawal", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-50", name:"Rajesh Lambe", category:"Tiles & Flooring", gstin:"", phone:"" },
  { id:"VN-51", name:"Electric Work", category:"Electrical", gstin:"", phone:"" },
  { id:"VN-52", name:"Dewashish Construction", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-53", name:"Kanhiya lal Pintu Bhai", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-54", name:"Bajirao Jadhav", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-55", name:"Pahade", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-56", name:"Pranay Shah", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-57", name:"Asif Bhai Painter", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-58", name:"Nivrutti Pagar", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-59", name:"Satija Stone Suppliers", category:"Cement & Building Material", gstin:"", phone:"" },
  { id:"VN-60", name:"Pappu Phadole", category:"Cement & Building Material", gstin:"", phone:"" }
];

/* ---------------------------- Site Management data ---------------------------- */
const ISSUE_SEV_META = {
  "Low": {fg:"#64748B", bg:"#F1F5F9"},
  "Medium": {fg:"#EA580C", bg:"#FFEDD5"},
  "High": {fg:"#DC2626", bg:"#FEE2E2"},
};
const ISSUE_STATUS_META = {
  "Open": {fg:"#2563EB", bg:"#DBEAFE"},
  "In Progress": {fg:"#EA580C", bg:"#FFEDD5"},
  "Resolved": {fg:"#16A34A", bg:"#DCFCE7"},
};
const WEATHER_OPTIONS = ["Clear", "Cloudy", "Rain", "Extreme Heat"];

let SITE_ENGINEERS = {
  "Zinnia": "Rohit Sharma",
  "Whispering Grooves": "Anita Deshmukh",
  "Genial": "Vikram Patil",
  "Zinnia": "Rohit Sharma",
  "Whispering Grooves": "Sneha Kulkarni",
  "Genial": "Anita Deshmukh",
  "Zinnia": "Vikram Patil",
  "Whispering Grooves": "Sneha Kulkarni",
};

let DPRS = [
  { id:"DPR-101", date:"2026-08-14", site:"Zinnia", weather:"Clear", manpower:30, workDone:"Completed shuttering for 3rd floor slab, started rebar tying for column C12-C18.", materialNotes:"120 cement bags, 8 Cum sand consumed", notes:"Minor delay due to concrete pump breakdown, resolved by evening." },
  { id:"DPR-102", date:"2026-08-14", site:"Genial", weather:"Cloudy", manpower:16, workDone:"Structural steel erection on Level 6 completed, welding inspection pending.", materialNotes:"2.5 Ton structural steel used", notes:"Welding inspector to visit tomorrow morning." },
  { id:"DPR-103", date:"2026-08-13", site:"Whispering Grooves", weather:"Rain", manpower:11, workDone:"Internal plastering paused due to rain, waterproofing check on terrace.", materialNotes:"No major consumption today", notes:"Site partially waterlogged near Block B entrance, pump deployed." },
  { id:"DPR-104", date:"2026-08-13", site:"Zinnia", weather:"Clear", manpower:14, workDone:"Vitrified tile laying completed for Tower 2, Floor 4.", materialNotes:"620 Sqm tiles, 40 bags tile adhesive", notes:"Quality check passed for grouting finish." },
  { id:"DPR-105", date:"2026-08-12", site:"Zinnia", weather:"Extreme Heat", manpower:20, workDone:"External painting first coat on North facade.", materialNotes:"180 Ltr emulsion paint used", notes:"Work paused 1-3pm due to heat, resumed evening shift." },
];

let ISSUES = [
  { id:"ISS-201", site:"Zinnia", title:"Scaffolding instability near Block A", category:"Safety Incident", severity:"High", status:"In Progress", reportedBy:"Rohit Sharma", date:"2026-08-13" },
  { id:"ISS-202", site:"Genial", title:"Delay in structural steel delivery", category:"Material Delay", severity:"Medium", status:"Open", reportedBy:"Vikram Patil", date:"2026-08-12" },
  { id:"ISS-203", site:"Whispering Grooves", title:"Water seepage near Block B basement", category:"Site Issue", severity:"Medium", status:"Open", reportedBy:"Anita Deshmukh", date:"2026-08-13" },
  { id:"ISS-204", site:"Whispering Grooves", title:"Worker minor injury - hand laceration", category:"Safety Incident", severity:"Low", status:"Resolved", reportedBy:"Sneha Kulkarni", date:"2026-08-05" },
  { id:"ISS-205", site:"Zinnia", title:"Crane operator certification expired", category:"Compliance", severity:"High", status:"Resolved", reportedBy:"Vikram Patil", date:"2026-08-01" },
];

/* ---------------------------- Documents data ---------------------------- */
const DOC_CATEGORIES = ["Contracts", "Drawings", "Approvals", "Compliance", "Site Photos", "Invoices & Billing"];
const DOC_TYPE_ICON = { pdf:"file-text", docx:"file-text", xlsx:"file-spreadsheet", dwg:"ruler", jpg:"image", png:"image" };
const DOC_TYPE_TINT = { pdf:{fg:"#DC2626",bg:"#FEE2E2"}, docx:{fg:"#2563EB",bg:"#DBEAFE"}, xlsx:{fg:"#16A34A",bg:"#DCFCE7"}, dwg:{fg:"#EA580C",bg:"#FFEDD5"}, jpg:{fg:"#7C3AED",bg:"#EDE9FE"}, png:{fg:"#7C3AED",bg:"#EDE9FE"} };

let DOCUMENTS = [
  { id:"DOC-001", name:"Zinnia - Construction Agreement.pdf", project:"Zinnia", category:"Contracts", type:"pdf", size:"2.4 MB", uploadedBy:"Rohit Sharma", date:"2024-01-18" },
  { id:"DOC-002", name:"GPR Structural Drawings - Rev 3.dwg", project:"Zinnia", category:"Drawings", type:"dwg", size:"18.6 MB", uploadedBy:"Rohit Sharma", date:"2024-03-02" },
  { id:"DOC-003", name:"Environmental Clearance Certificate.pdf", project:"Zinnia", category:"Compliance", type:"pdf", size:"1.1 MB", uploadedBy:"Admin User", date:"2024-01-25" },
  { id:"DOC-004", name:"Whispering Grooves - Sale Agreement Template.docx", project:"Whispering Grooves", category:"Contracts", type:"docx", size:"340 KB", uploadedBy:"Anita Deshmukh", date:"2023-08-10" },
  { id:"DOC-005", name:"Site Progress - August Week 2.jpg", project:"Whispering Grooves", category:"Site Photos", type:"jpg", size:"3.2 MB", uploadedBy:"Anita Deshmukh", date:"2026-08-13" },
  { id:"DOC-006", name:"Genial - Structural Steel BOQ.xlsx", project:"Genial", category:"Approvals", type:"xlsx", size:"210 KB", uploadedBy:"Vikram Patil", date:"2024-04-15" },
  { id:"DOC-007", name:"Fire NOC - Genial.pdf", project:"Genial", category:"Compliance", type:"pdf", size:"890 KB", uploadedBy:"Vikram Patil", date:"2024-05-01" },
  { id:"DOC-008", name:"Zinnia - Tile Layout Plan.dwg", project:"Zinnia", category:"Drawings", type:"dwg", size:"9.4 MB", uploadedBy:"Rohit Sharma", date:"2024-06-20" },
  { id:"DOC-009", name:"Whispering Grooves - RA Bill 05.pdf", project:"Whispering Grooves", category:"Invoices & Billing", type:"pdf", size:"640 KB", uploadedBy:"Sneha Kulkarni", date:"2026-08-05" },
  { id:"DOC-010", name:"Zinnia - Facade Elevation.png", project:"Zinnia", category:"Drawings", type:"png", size:"4.8 MB", uploadedBy:"Vikram Patil", date:"2024-07-11" },
  { id:"DOC-011", name:"Zinnia - Client MoU.pdf", project:"Zinnia", category:"Contracts", type:"pdf", size:"1.6 MB", uploadedBy:"Admin User", date:"2023-06-08" },
  { id:"DOC-012", name:"Whispering Grooves - Completion Certificate.pdf", project:"Whispering Grooves", category:"Compliance", type:"pdf", size:"720 KB", uploadedBy:"Sneha Kulkarni", date:"2024-06-18" },
];

/* ---------------------------- HR & Payroll data ---------------------------- */
const ROLES = ["Super Admin", "Admin", "Project Manager", "Site Engineer", "Accountant", "Purchase Manager", "HR", "Supervisor"];
const DEPARTMENTS = ["Management", "Site Operations", "Finance", "Procurement", "Human Resources"];
const PAYROLL_STATUS_META = {
  "Paid": {fg:"#16A34A", bg:"#DCFCE7"},
  "Pending": {fg:"#EA580C", bg:"#FFEDD5"},
};

let EMPLOYEES = [
  { id:"EMP-001", name:"Rohit Sharma", role:"Project Manager", department:"Site Operations", project:"Zinnia", phone:"+91 98110 22334", email:"rohit.sharma@buildpro.in", joinDate:"2021-04-12", salary:95000 },
  { id:"EMP-002", name:"Anita Deshmukh", role:"Project Manager", department:"Site Operations", project:"Whispering Grooves", phone:"+91 98220 33445", email:"anita.deshmukh@buildpro.in", joinDate:"2020-11-03", salary:98000 },
  { id:"EMP-003", name:"Vikram Patil", role:"Site Engineer", department:"Site Operations", project:"Genial", phone:"+91 98330 44556", email:"vikram.patil@buildpro.in", joinDate:"2022-02-18", salary:68000 },
  { id:"EMP-004", name:"Sneha Kulkarni", role:"Site Engineer", department:"Site Operations", project:"Whispering Grooves", phone:"+91 98440 55667", email:"sneha.kulkarni@buildpro.in", joinDate:"2022-07-25", salary:70000 },
  { id:"EMP-005", name:"Admin User", role:"Super Admin", department:"Management", project:"—", phone:"+91 98550 66778", email:"admin@buildpro.in", joinDate:"2019-01-15", salary:150000 },
  { id:"EMP-006", name:"Priya Nair", role:"Accountant", department:"Finance", project:"—", phone:"+91 98660 77889", email:"priya.nair@buildpro.in", joinDate:"2021-09-08", salary:52000 },
  { id:"EMP-007", name:"Rahul Joshi", role:"Purchase Manager", department:"Procurement", project:"—", phone:"+91 98770 88990", email:"rahul.joshi@buildpro.in", joinDate:"2022-01-10", salary:58000 },
  { id:"EMP-008", name:"Kavita Rane", role:"HR", department:"Human Resources", project:"—", phone:"+91 98880 99001", email:"kavita.rane@buildpro.in", joinDate:"2023-03-05", salary:48000 },
  { id:"EMP-009", name:"Suresh Pawar", role:"Supervisor", department:"Site Operations", project:"Zinnia", phone:"+91 98990 00112", email:"suresh.pawar@buildpro.in", joinDate:"2023-06-14", salary:38000 },
];

function payrollDeductions(basic){ return { pf: basic*0.12, tds: basic>75000 ? basic*0.05 : 0 }; }
function payrollNet(basic, allowances){ const d = payrollDeductions(basic); return basic + allowances - d.pf - d.tds; }

let PAYROLL = EMPLOYEES.map((e,i)=>({
  id:`PAY-${String(i+1).padStart(3,"0")}`, empId:e.id, name:e.name, role:e.role,
  month:"August 2026", basic:e.salary, allowances:Math.round(e.salary*0.15),
  status: i%4===0 ? "Pending" : "Paid",
}));

const state = {
  active: "Dashboard",
  proj: { view:"table", query:"", status:"All", sort:"name", page:1, pageSize:5 },
  boq: { query:"", project:"All", status:"All", page:1, pageSize:6 },
  purchase: { tab:"po", query:"", status:"All", page:1, pageSize:6 },
  labour: { tab:"attendance", query:"", page:1, pageSize:6 },
  billing: { tab:"invoices", query:"", status:"All", page:1, pageSize:6 },
  parties: { tab:"clients", query:"" },
  site: { tab:"overview", query:"" },
  reports: { active:"cost", project:"All" },
  docs: { query:"", project:"All", category:"All", page:1, pageSize:8 },
  hr: { tab:"employees", query:"" },
  equip: { query:"", status:"All", page:1, pageSize:6 },
  ai: { section:"risk" },
  settings: { tab:"company" },
};

/* ---------------------------- Settings data ---------------------------- */
const ALL_ROLES = [...ROLES, "Client"];
let COMPANY_PROFILE = {
  name:"BuildPro Constructions Pvt. Ltd.",
  gstin:"27AABCB1234C1Z5",
  address:"4th Floor, Skyline Business Hub, Baner Road, Pune, Maharashtra 411045",
  phone:"+91 20 4567 8900",
  email:"info@buildproerp.in",
  fy:"FY 2025-26",
  currency:"INR (₹)",
};

let SYSTEM_USERS = [
  { id:"USR-01", name:"Admin User", email:"admin@buildpro.in", role:"Super Admin", status:"Active" },
  { id:"USR-02", name:"Rohit Sharma", email:"rohit.sharma@buildpro.in", role:"Project Manager", status:"Active" },
  { id:"USR-03", name:"Anita Deshmukh", email:"anita.deshmukh@buildpro.in", role:"Project Manager", status:"Active" },
  { id:"USR-04", name:"Vikram Patil", email:"vikram.patil@buildpro.in", role:"Site Engineer", status:"Active" },
  { id:"USR-05", name:"Priya Nair", email:"priya.nair@buildpro.in", role:"Accountant", status:"Active" },
  { id:"USR-06", name:"Rahul Joshi", email:"rahul.joshi@buildpro.in", role:"Purchase Manager", status:"Active" },
  { id:"USR-07", name:"Kavita Rane", email:"kavita.rane@buildpro.in", role:"HR", status:"Inactive" },
  { id:"USR-08", name:"Hiranmayi Developers", email:"owner@hiranmayi.in", role:"Client", status:"Active" },
];

let NOTIF_PREFS = [
  { key:"costOverrun", label:"Cost Overrun Alerts", desc:"Notify when a project risks exceeding its budget", on:true },
  { key:"projectDelay", label:"Project Delay Alerts", desc:"Notify when a project falls behind schedule", on:true },
  { key:"lowStock", label:"Low Stock Alerts", desc:"Notify when inventory falls below reorder level", on:true },
  { key:"invoiceOverdue", label:"Invoice Overdue Reminders", desc:"Notify when client invoices become overdue", on:true },
  { key:"paymentReceived", label:"Payment Received", desc:"Notify when a payment is recorded", on:false },
  { key:"boqApproval", label:"BOQ Approval Requests", desc:"Notify when a BOQ needs approval", on:true },
  { key:"purchaseApproval", label:"Purchase Approval Requests", desc:"Notify when a PO needs approval", on:false },
  { key:"safetyIncident", label:"Safety Incidents", desc:"Notify immediately on safety incidents", on:true },
];

/* ---------------------------- Equipment data ---------------------------- */
const EQUIP_CATEGORIES = ["Excavator", "Tower Crane", "Mobile Crane", "Concrete Mixer", "JCB / Backhoe", "Dumper", "Generator", "Scaffolding", "Compactor"];
const EQUIP_STATUS_META = {
  "Deployed": {fg:"#16A34A", bg:"#DCFCE7"},
  "Idle": {fg:"#64748B", bg:"#F1F5F9"},
  "Under Maintenance": {fg:"#EA580C", bg:"#FFEDD5"},
};

let EQUIPMENT = [
  { id:"EQ-01", name:"Tower Crane TC-5013", category:"Tower Crane", project:"Zinnia", status:"Deployed", operator:"Mahesh Yadav", ownership:"Owned", lastService:"2026-07-10", nextService:"2026-09-10" },
  { id:"EQ-02", name:"Excavator JS-220", category:"Excavator", project:"Genial", status:"Deployed", operator:"Ganesh More", ownership:"Rented", lastService:"2026-06-28", nextService:"2026-08-28" },
  { id:"EQ-03", name:"JCB 3DX Backhoe", category:"JCB / Backhoe", project:"Whispering Grooves", status:"Under Maintenance", operator:"—", ownership:"Owned", lastService:"2026-08-01", nextService:"2026-08-16" },
  { id:"EQ-04", name:"Concrete Mixer CM-500", category:"Concrete Mixer", project:"Whispering Grooves", status:"Deployed", operator:"Ravi Kadam", ownership:"Owned", lastService:"2026-07-20", nextService:"2026-09-20" },
  { id:"EQ-05", name:"Mobile Crane 25T", category:"Mobile Crane", project:"Zinnia", status:"Deployed", operator:"Sanjay Bhosale", ownership:"Rented", lastService:"2026-07-05", nextService:"2026-09-05" },
  { id:"EQ-06", name:"Diesel Generator 125kVA", category:"Generator", project:"Zinnia", status:"Deployed", operator:"—", ownership:"Owned", lastService:"2026-06-15", nextService:"2026-08-15" },
  { id:"EQ-07", name:"Dumper Truck DT-12", category:"Dumper", project:"Zinnia", status:"Idle", operator:"—", ownership:"Owned", lastService:"2026-05-30", nextService:"2026-08-30" },
  { id:"EQ-08", name:"Plate Compactor PC-90", category:"Compactor", project:"Whispering Grooves", status:"Idle", operator:"—", ownership:"Owned", lastService:"2026-05-10", nextService:"2026-08-10" },
  { id:"EQ-09", name:"Steel Scaffolding Set A", category:"Scaffolding", project:"Genial", status:"Idle", operator:"—", ownership:"Rented", lastService:"2026-04-22", nextService:"2026-09-22" },
];


/* ---------------------------- sidebar render ---------------------------- */
function renderNav(){
  [["sidebarNav",false],["sidebarNavMobile",true]].forEach(([id,isMobile])=>{
    const wrap = document.getElementById(id);
    wrap.innerHTML = "";
    NAV.forEach(item=>{
      const btn = el(`<button class="nav-item ${state.active===item.label?"active":""}">
        <i data-lucide="${item.icon}"></i><span>${item.label}</span></button>`);
      btn.addEventListener("click", ()=>{
        state.active = item.label;
        if (isMobile) document.getElementById("mobileNavOverlay").classList.remove("open");
        renderAll();
      });
      wrap.appendChild(btn);
    });
  });
}

/* ---------------------------- dashboard sections ---------------------------- */
function kpiCardNode(c){
  const tint = TINT[c.tint];
  const node = el(`
    <button class="card kpi-card">
      <div class="kpi-top">
        <div class="kpi-icon" style="background:${tint.bg};color:${tint.fg}"><i data-lucide="${c.icon}"></i></div>
        <span class="kpi-trend ${c.up?'up':'down'}">${c.trend}</span>
      </div>
      <p class="kpi-value">${c.value}</p>
      <p class="kpi-label">${c.label} · ${c.sub}</p>
      <div class="kpi-bar"><div style="width:${55+(c.key.length*7)%40}%;background:${tint.fg}"></div></div>
    </button>`);
  node.addEventListener("click", ()=> showToast(`Opening ${c.label} report…`));
  return node;
}

function legendRow(color,label,value,compact){
  return `<div class="flex-between" style="padding:2px 0">
    <span class="flex gap-2" style="align-items:center;font-size:${compact?11:11.5}px;color:#475569">
      <span style="width:8px;height:8px;border-radius:50%;background:${color};display:inline-block"></span>${label}
    </span>
    <span class="bold" style="font-size:${compact?11:12}px">${value}</span>
  </div>`;
}

function moduleCardNode(m){
  const node = el(`
    <div class="card module-card">
      <div class="module-head">
        <div class="module-icon"><i data-lucide="${m.icon}"></i></div>
        <h4 style="font-size:13px;font-weight:600;margin:0;color:#1e293b">${m.title}</h4>
      </div>
      <div class="module-rows">
        ${m.rows.map(([k,v])=>`<div><p class="k">${k}</p><p class="v">${v}</p></div>`).join("")}
      </div>
      <button class="link-btn mt-3" style="align-self:flex-start">View All <i data-lucide="arrow-right" style="width:13px;height:13px"></i></button>
    </div>`);
  node.querySelector(".link-btn").addEventListener("click", ()=>{ state.active = m.title; renderAll(); });
  return node;
}

function renderDashboard(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <section class="grid grid-5" id="kpiRow"></section>

    <section class="grid split-2-1" id="featuredRow"></section>

    <section class="grid grid-5" id="moduleRow"></section>

    <section class="grid split-1-2">
      <div class="card" style="padding:16px">
        <div class="flex-between mt-0"><h3 class="section-title">Project Progress Overview</h3>
          <select style="font-size:11px;border:1px solid #E2E8F0;border-radius:6px;padding:3px 6px"><option>FY 2025-26</option></select></div>
        <div style="position:relative;height:180px;margin-top:6px"><canvas id="progressChart"></canvas>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none">
            <span style="font-size:20px;font-weight:700">24</span><span class="tiny muted">Total Projects</span>
          </div>
        </div>
        <div class="grid grid-2 mt-3" id="progressLegend"></div>
      </div>
      <div class="card" style="padding:16px">
        <div class="flex-between"><h3 class="section-title">Cash Flow Overview</h3>
          <button class="link-btn" id="cashflowReportBtn">View Report <i data-lucide="arrow-right" style="width:12px;height:12px"></i></button></div>
        <div style="height:220px;margin-top:8px"><canvas id="cashflowChart"></canvas></div>
      </div>
    </section>

    <section class="grid split-2-1">
      <div class="card" style="padding:16px">
        <div class="flex-between"><h3 class="section-title">Project Profitability</h3>
          <button class="link-btn" id="profitReportBtn">View Report <i data-lucide="arrow-right" style="width:12px;height:12px"></i></button></div>
        <div style="height:220px;margin-top:8px"><canvas id="profitChart"></canvas></div>
      </div>
      <div class="card" style="padding:16px">
        <h3 class="section-title mt-0">Top Project Snapshot</h3>
        <div class="flex-col gap-3 mt-3" id="topProjects"></div>
      </div>
    </section>

    <section class="card" style="padding:16px">
      <h3 class="section-title">Quick Actions</h3>
      <div class="grid grid-4 mt-3" id="quickActions"></div>
    </section>

    <section class="grid grid-6" id="bottomKpis"></section>
  `;

  // KPI row
  const kpiRow = document.getElementById("kpiRow");
  KPI_CARDS.forEach(c=> kpiRow.appendChild(kpiCardNode(c)));

  // Featured project + AI alerts
  const featuredRow = document.getElementById("featuredRow");
  featuredRow.appendChild(el(`
    <div class="card" style="overflow:hidden">
      <div class="featured-hero" style="background-image:linear-gradient(0deg, rgba(11,29,58,.88) 0%, rgba(11,29,58,.35) 60%, rgba(11,29,58,.1) 100%), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop')">
        <div class="featured-hero-inner">
          <div>
            <span class="pill" style="color:#d1fae5;background:rgba(16,185,129,.2);margin-bottom:8px"><span class="dot-sm" style="background:#6ee7b7"></span>On Track</span>
            <h3 style="color:#fff;font-size:19px;margin:0;font-weight:600">Genial</h3>
            <p style="color:#e2e8f0;font-size:12px;margin:2px 0 0">Hiranmayi Developers · Maharashtra</p>
          </div>
          <div class="hide-mobile" style="text-align:right;color:rgba(255,255,255,.9);font-size:11.5px">
            <p style="margin:0">Coordinator: Gopal Bhau</p>
            <p style="margin:2px 0 0;color:rgba(255,255,255,.6)">11 Jan 2023 → 3 May 2026</p>
          </div>
        </div>
      </div>
      <div class="featured-body">
        <div style="position:relative;width:96px;height:96px;flex-shrink:0"><canvas id="featuredDonut"></canvas>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;font-weight:700">1,516</span></div>
        </div>
        <div style="flex:1;min-width:180px">
          <p class="tiny bold" style="margin:0 0 6px">Expense Status · ₹9.87 Cr Recorded</p>
          ${legendRow("#16A34A","Paid to Suppliers","55%")}
          ${legendRow("#2563EB","Pending Payments","45%")}
          ${legendRow("#CBD5E1","Line Items","1,516")}
        </div>
        <button class="link-btn" id="openProjectBtn" style="margin-left:auto">Open Project <i data-lucide="arrow-right" style="width:13px;height:13px"></i></button>
      </div>
    </div>`));

  const alertsCard = el(`
    <div class="card" style="padding:16px;display:flex;flex-direction:column">
      <div class="flex gap-2" style="align-items:center;margin-bottom:14px">
        <div class="module-icon" style="background:#eef2ff;color:#4f46e5"><i data-lucide="sparkles"></i></div>
        <h3 class="section-title">AI Smart Alerts</h3>
        <span class="tiny" style="margin-left:auto;color:#4f46e5;background:#eef2ff;padding:2px 8px;border-radius:99px">AI</span>
      </div>
      <div class="flex-col gap-2" id="alertsList"></div>
    </div>`);
  featuredRow.appendChild(alertsCard);
  const alertsList = alertsCard.querySelector("#alertsList");
  ALERTS.forEach(a=>{
    const s = SEV[a.sev];
    const item = el(`
      <div class="alert-item" style="background:${s.bg}">
        <i data-lucide="${a.icon}" style="color:${s.fg}"></i>
        <div style="flex:1;min-width:0">
          <p class="alert-title">${a.title}</p>
          <p class="alert-desc">${a.desc}</p>
          <button class="alert-link" style="color:${s.fg}">View Details →</button>
        </div>
      </div>`);
    item.querySelector(".alert-link").addEventListener("click", ()=> showToast(`Viewing details — ${a.title}`));
    alertsList.appendChild(item);
  });

  document.getElementById("openProjectBtn").addEventListener("click", ()=>{ state.active="Projects"; renderAll(); });

  // module cards
  const moduleRow = document.getElementById("moduleRow");
  MODULE_CARDS.forEach(m=> moduleRow.appendChild(moduleCardNode(m)));

  // progress legend
  const progressLegend = document.getElementById("progressLegend");
  PROGRESS_DATA.forEach(d=> progressLegend.insertAdjacentHTML("beforeend", legendRow(d.color, d.name, d.value, true)));

  // top projects
  const topProjectsWrap = document.getElementById("topProjects");
  const maxItems = Math.max(...TOP_PROJECTS.map(p=>p.margin));
  TOP_PROJECTS.forEach((p,i)=>{
    topProjectsWrap.insertAdjacentHTML("beforeend", `
      <div>
        <div class="flex-between" style="margin-bottom:4px">
          <div class="flex gap-2" style="align-items:center;min-width:0">
            <span style="width:20px;height:20px;border-radius:50%;background:#F1F5F9;font-size:10px;font-weight:600;color:#475569;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</span>
            <div style="min-width:0">
              <p style="font-size:12px;font-weight:600;margin:0" class="truncate">${p.name}</p>
              <p style="font-size:10.5px;color:#64748b;margin:0">${p.loc}</p>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <p style="font-size:12px;font-weight:600;margin:0">${p.profit}</p>
            <p style="font-size:10.5px;color:#059669;margin:0">${p.margin} entries</p>
          </div>
        </div>
        <div class="progress-track"><div style="width:${(p.margin/maxItems*100).toFixed(0)}%"></div></div>
      </div>`);
  });

  // quick actions
  const qaWrap = document.getElementById("quickActions");
  QUICK_ACTIONS.forEach(a=>{
    const btn = el(`<button class="qa-btn"><div class="qa-icon"><i data-lucide="${a.icon}"></i></div><span class="qa-label">${a.label}</span></button>`);
    btn.addEventListener("click", ()=> openQuickActionModal(a));
    qaWrap.appendChild(btn);
  });

  // bottom kpis
  const bottomWrap = document.getElementById("bottomKpis");
  BOTTOM_KPIS.forEach(k=>{
    bottomWrap.insertAdjacentHTML("beforeend", `
      <div class="card mini-kpi">
        <div class="mini-kpi-icon"><i data-lucide="${k.icon}"></i></div>
        <div><p class="mini-kpi-value">${k.value}</p><p class="mini-kpi-label">${k.label}</p></div>
      </div>`);
  });

  document.getElementById("cashflowReportBtn").addEventListener("click", ()=> showToast("Opening Cash Flow report…"));
  document.getElementById("profitReportBtn").addEventListener("click", ()=> showToast("Opening Profitability report…"));

  icons();
  drawDashboardCharts();
}

/* ---------------------------- charts (Chart.js) ---------------------------- */
let chartRefs = {};
function destroyCharts(){ Object.values(chartRefs).forEach(c=>c && c.destroy()); chartRefs = {}; }

function drawDashboardCharts(){
  destroyCharts();

  chartRefs.featuredDonut = new Chart(document.getElementById("featuredDonut"), {
    type:"doughnut",
    data:{ datasets:[{ data:[55,45], backgroundColor:["#16A34A","#2563EB"], borderWidth:0 }] },
    options:{ cutout:"68%", plugins:{ legend:{display:false}, tooltip:{enabled:false} } }
  });

  chartRefs.progressChart = new Chart(document.getElementById("progressChart"), {
    type:"doughnut",
    data:{ labels:PROGRESS_DATA.map(d=>d.name), datasets:[{ data:PROGRESS_DATA.map(d=>d.value), backgroundColor:PROGRESS_DATA.map(d=>d.color), borderWidth:2, borderColor:"#fff" }] },
    options:{ cutout:"62%", plugins:{ legend:{display:false}, tooltip:{callbacks:{label:(ctx)=>`${ctx.parsed} projects`}} } }
  });

  chartRefs.cashflowChart = new Chart(document.getElementById("cashflowChart"), {
    type:"line",
    data:{
      labels: CASHFLOW_LABELS,
      datasets:[
        { label:"Cash Inflow", data:CASHFLOW_IN, borderColor:"#2563EB", backgroundColor:"rgba(37,99,235,.12)", fill:true, tension:.35, pointRadius:0 },
        { label:"Cash Outflow", data:CASHFLOW_OUT, borderColor:"#EA580C", backgroundColor:"rgba(234,88,12,.10)", fill:true, tension:.35, pointRadius:0 },
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{position:"top", labels:{boxWidth:10, font:{size:11}}},
        tooltip:{callbacks:{label:(ctx)=>`${ctx.dataset.label}: ₹${ctx.parsed.y} Cr`}} },
      scales:{ x:{grid:{display:false}, ticks:{font:{size:10.5}}}, y:{grid:{color:"#F1F5F9"}, ticks:{font:{size:10.5}, callback:(v)=>`₹${v}Cr`}} }
    }
  });

  chartRefs.profitChart = new Chart(document.getElementById("profitChart"), {
    type:"bar",
    data:{ labels:PROFIT_LABELS, datasets:[{ data:PROFIT_VALUES, backgroundColor:PROFIT_VALUES.map(v=> v>=0 ? "#16A34A" : "#DC2626"), borderRadius:5, maxBarThickness:34 }] },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{callbacks:{label:(ctx)=> `₹${ctx.parsed.y} L ${ctx.parsed.y>=0?"Profit":"Loss"}`}} },
      scales:{ x:{grid:{display:false}, ticks:{font:{size:11}}}, y:{grid:{color:"#F1F5F9"}, ticks:{font:{size:10.5}, callback:(v)=>`₹${v}L`}} }
    }
  });
}

/* ---------------------------- quick action modal ---------------------------- */
function openQuickActionModal(action){
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-head">
          <div class="modal-head-left"><div class="modal-icon"><i data-lucide="${action.icon}"></i></div><h3>${action.label}</h3></div>
          <button class="icon-btn" id="closeQA"><i data-lucide="x"></i></button>
        </div>
        <div class="modal-body">
          ${action.fields.map(f=>`<div class="field"><label>${f}</label><input type="text" placeholder="Enter ${f.toLowerCase()}"/></div>`).join("")}
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelQA">Cancel</button>
          <button class="btn-primary" id="saveQA">Save ${action.label}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeQA").addEventListener("click", closeModal);
  node.querySelector("#cancelQA").addEventListener("click", closeModal);
  node.querySelector("#saveQA").addEventListener("click", ()=>{ closeModal(); showToast(`${action.label} saved successfully`); });
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  openModalNode(node);
}

/* ---------------------------- Projects module ---------------------------- */
function statusPillHTML(status){
  const m = STATUS_META[status] || STATUS_META["On Track"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${status}</span>`;
}

function getFilteredProjects(){
  const { query, status, sort } = state.proj;
  let rows = PROJECTS.filter(p =>
    (status==="All" || p.status===status) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.client.toLowerCase().includes(query.toLowerCase()))
  );
  rows = [...rows].sort((a,b)=>{
    if (sort==="contract") return b.contract - a.contract;
    if (sort==="completion") return b.completion - a.completion;
    return a.name.localeCompare(b.name);
  });
  return rows;
}

function renderProjectsModule(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <div class="toolbar">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="projSearch" placeholder="Search by project or client…" value="${state.proj.query}"/></div>
      <select id="projStatusFilter"></select>
      <select id="projSort">
        <option value="name">Sort: Name</option>
        <option value="contract">Sort: Contract Value</option>
        <option value="completion">Sort: Completion</option>
      </select>
      <div class="view-toggle">
        <button data-view="table"><i data-lucide="list"></i></button>
        <button data-view="card"><i data-lucide="layout-grid"></i></button>
      </div>
      <button class="btn-primary" id="newProjectBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Project</button>
    </div>
    <p class="tiny muted" id="resultCount"></p>
    <div id="projListWrap"></div>
    <div class="pagination" id="pagination" style="display:none">
      <p class="tiny muted" id="pageInfo"></p>
      <div class="flex gap-2">
        <button class="pg-btn" id="prevPage"><i data-lucide="chevron-left"></i></button>
        <button class="pg-btn" id="nextPage"><i data-lucide="chevron-right"></i></button>
      </div>
    </div>
  `;

  const statusSelect = document.getElementById("projStatusFilter");
  statusSelect.innerHTML = `<option>All</option>` + Object.keys(STATUS_META).map(s=>`<option>${s}</option>`).join("");
  statusSelect.value = state.proj.status;
  document.getElementById("projSort").value = state.proj.sort;

  document.getElementById("projSearch").addEventListener("input", (e)=>{ state.proj.query = e.target.value; state.proj.page=1; renderProjectsList(); });
  statusSelect.addEventListener("change", (e)=>{ state.proj.status = e.target.value; state.proj.page=1; renderProjectsList(); });
  document.getElementById("projSort").addEventListener("change", (e)=>{ state.proj.sort = e.target.value; renderProjectsList(); });
  document.querySelectorAll(".view-toggle button").forEach(b=>{
    b.addEventListener("click", ()=>{ state.proj.view = b.dataset.view; renderProjectsList(); });
  });
  document.getElementById("newProjectBtn").addEventListener("click", ()=> openProjectFormModal(null));

  renderProjectsList();
  icons();
}

function renderProjectsList(){
  const wrap = document.getElementById("projListWrap");
  const filtered = getFilteredProjects();
  const { pageSize } = state.proj;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.proj.page > totalPages) state.proj.page = totalPages;
  const pageRows = filtered.slice((state.proj.page-1)*pageSize, state.proj.page*pageSize);

  document.getElementById("resultCount").textContent = `${filtered.length} projects found`;
  document.querySelectorAll(".view-toggle button").forEach(b=> b.classList.toggle("active", b.dataset.view===state.proj.view));

  if (state.proj.view === "table"){
    wrap.innerHTML = `
      <div class="card" style="overflow-x:auto">
        <table>
          <thead><tr>
            <th>Project</th><th>Client</th><th>PM</th><th>Status</th><th>Contract Value</th><th>Completion</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody id="projTbody"></tbody>
        </table>
      </div>`;
    const tbody = document.getElementById("projTbody");
    if (pageRows.length===0){
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No projects match your filters.</td></tr>`;
    }
    pageRows.forEach(p=>{
      const tr = el(`<tr>
        <td><p style="font-weight:600;margin:0;color:#1e293b">${p.name}</p><p style="font-size:11px;color:#64748b;margin:0">${p.location}</p></td>
        <td>${p.client}</td>
        <td>${p.pm}</td>
        <td>${statusPillHTML(p.status)}</td>
        <td style="font-weight:600">${fmtINR(p.contract)}</td>
        <td><div class="progress-cell"><div class="progress-track"><div style="width:${p.completion}%"></div></div><span class="tiny muted">${p.completion}%</span></div></td>
        <td><div class="row-actions">
          <button class="icon-action edit" data-id="${p.id}" data-act="edit"><i data-lucide="pencil"></i></button>
          <button class="icon-action del" data-id="${p.id}" data-act="del"><i data-lucide="trash-2"></i></button>
        </div></td>
      </tr>`);
      tbody.appendChild(tr);
    });
  } else {
    wrap.innerHTML = `<div class="grid grid-3" id="projCards"></div>`;
    const cardsWrap = document.getElementById("projCards");
    pageRows.forEach(p=>{
      cardsWrap.appendChild(el(`
        <div class="card proj-card">
          <div class="flex-between" style="align-items:flex-start;margin-bottom:6px">
            <div><p style="font-weight:600;font-size:13px;margin:0">${p.name}</p><p style="font-size:11px;color:#64748b;margin:0">${p.location}</p></div>
            ${statusPillHTML(p.status)}
          </div>
          <p class="tiny muted" style="margin:0 0 10px">${p.client} · PM ${p.pm}</p>
          <div class="progress-cell" style="width:100%"><div class="progress-track"><div style="width:${p.completion}%"></div></div><span class="tiny muted">${p.completion}%</span></div>
          <p class="small" style="margin:10px 0 0"><span class="bold">${fmtINR(p.contract)}</span> <span class="muted">contract</span></p>
          <div class="row-actions mt-3" style="border-top:1px solid #F1F5F9;padding-top:10px">
            <button class="icon-action edit" data-id="${p.id}" data-act="edit"><i data-lucide="pencil"></i></button>
            <button class="icon-action del" data-id="${p.id}" data-act="del"><i data-lucide="trash-2"></i></button>
          </div>
        </div>`));
    });
  }

  wrap.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openProjectFormModal(PROJECTS.find(p=>p.id===b.dataset.id))));
  wrap.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=> openConfirmDelete(b.dataset.id)));

  // pagination
  const pag = document.getElementById("pagination");
  if (totalPages > 1){
    pag.style.display = "flex";
    document.getElementById("pageInfo").textContent = `Page ${state.proj.page} of ${totalPages}`;
    const prev = document.getElementById("prevPage"), next = document.getElementById("nextPage");
    prev.disabled = state.proj.page===1; next.disabled = state.proj.page===totalPages;
    prev.onclick = ()=>{ state.proj.page--; renderProjectsList(); icons(); };
    next.onclick = ()=>{ state.proj.page++; renderProjectsList(); icons(); };
  } else { pag.style.display = "none"; }

  icons();
}

function openProjectFormModal(project){
  const isEdit = !!project;
  const f = project || { name:"", client:"", pm:"", location:"", status:"On Track", start:"", end:"", contract:"", billed:"", completion:"" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Project" : "New Project"}</h3><button class="icon-btn" id="closePF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field col-span-2"><label>Project Name</label><input id="f_name" value="${f.name}"/></div>
          <div class="field"><label>Client</label><input id="f_client" value="${f.client}"/></div>
          <div class="field"><label>Project Manager</label><input id="f_pm" value="${f.pm}"/></div>
          <div class="field"><label>Location</label><input id="f_location" value="${f.location}"/></div>
          <div class="field"><label>Status</label>
            <select id="f_status">${Object.keys(STATUS_META).map(s=>`<option ${s===f.status?"selected":""}>${s}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Start Date</label><input type="date" id="f_start" value="${f.start}"/></div>
          <div class="field"><label>End Date</label><input type="date" id="f_end" value="${f.end}"/></div>
          <div class="field"><label>Contract Value (₹)</label><input type="number" id="f_contract" value="${f.contract}"/></div>
          <div class="field"><label>Billed Amount (₹)</label><input type="number" id="f_billed" value="${f.billed}"/></div>
          <div class="field"><label>Completion (%)</label><input type="number" id="f_completion" value="${f.completion}"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelPF">Cancel</button>
          <button class="btn-primary" id="savePF">${isEdit ? "Save Changes" : "Create Project"}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closePF").addEventListener("click", closeModal);
  node.querySelector("#cancelPF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#savePF").addEventListener("click", ()=>{
    const payload = {
      name: node.querySelector("#f_name").value.trim() || "Untitled Project",
      client: node.querySelector("#f_client").value.trim(),
      pm: node.querySelector("#f_pm").value.trim(),
      location: node.querySelector("#f_location").value.trim(),
      status: node.querySelector("#f_status").value,
      start: node.querySelector("#f_start").value,
      end: node.querySelector("#f_end").value,
      contract: Number(node.querySelector("#f_contract").value) || 0,
      billed: Number(node.querySelector("#f_billed").value) || 0,
      completion: Number(node.querySelector("#f_completion").value) || 0,
    };
    if (isEdit){
      Object.assign(project, payload);
      showToast(`${payload.name} updated`);
    } else {
      const id = `PRJ-${String(PROJECTS.length+1).padStart(3,"0")}`;
      PROJECTS = [{ id, ...payload }, ...PROJECTS];
      showToast(`${payload.name} created`);
      state.proj.page = 1;
    }
    closeModal();
    renderProjectsList();
  });
  openModalNode(node);
}

function openConfirmDelete(id){
  const p = PROJECTS.find(x=>x.id===id);
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box" style="max-width:380px">
        <div style="padding:20px 20px 0">
          <div class="flex gap-2" style="align-items:center;margin-bottom:8px">
            <div class="modal-icon" style="background:#FEE2E2;color:#DC2626"><i data-lucide="alert-circle"></i></div>
            <h3 style="font-size:15px;margin:0">Delete this project?</h3>
          </div>
          <p class="small muted" style="margin:0 0 16px">This will permanently remove <span class="bold">${p?p.name:""}</span> and its linked records from this view.</p>
        </div>
        <div class="modal-foot" style="border-top:none">
          <button class="btn-secondary" id="cancelDel">Cancel</button>
          <button class="btn-danger" id="confirmDel">Delete</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#cancelDel").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#confirmDel").addEventListener("click", ()=>{
    PROJECTS = PROJECTS.filter(x=>x.id!==id);
    closeModal();
    showToast(`${p?p.name:"Project"} deleted`);
    renderProjectsList();
  });
  openModalNode(node);
}

/* ---------------------------- BOQ & Estimation module ---------------------------- */
function boqPillHTML(status){
  const m = BOQ_STATUS_META[status] || BOQ_STATUS_META["Draft"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${status}</span>`;
}
function boqEstAmount(b){ return b.qty * b.rate; }
function boqVariance(b){ return (b.actual || 0) - boqEstAmount(b); }

function getFilteredBoqs(){
  const { query, project, status } = state.boq;
  return BOQS.filter(b =>
    (project==="All" || b.project===project) &&
    (status==="All" || b.status===status) &&
    (b.item.toLowerCase().includes(query.toLowerCase()) || b.id.toLowerCase().includes(query.toLowerCase()))
  );
}

function renderBoqModule(){
  const main = document.getElementById("mainContent");
  const projectNames = [...new Set(BOQS.map(b=>b.project))];
  const totalEst = BOQS.reduce((s,b)=> s + boqEstAmount(b), 0);
  const totalActual = BOQS.reduce((s,b)=> s + (b.actual||0), 0);
  const approvedCount = BOQS.filter(b=>b.status==="Approved").length;

  main.innerHTML = `
    <section class="grid grid-4" id="boqSummary"></section>

    <div class="toolbar">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="boqSearch" placeholder="Search by BOQ number or item…" value="${state.boq.query}"/></div>
      <select id="boqProjectFilter"></select>
      <select id="boqStatusFilter"></select>
      <button class="btn-secondary" id="boqImportBtn"><i data-lucide="upload" style="width:14px;height:14px"></i> Import</button>
      <button class="btn-secondary" id="boqExportBtn"><i data-lucide="download" style="width:14px;height:14px"></i> Export</button>
      <button class="btn-primary" id="newBoqBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>Create BOQ</button>
    </div>
    <p class="tiny muted" id="boqResultCount"></p>

    <div class="card" style="overflow-x:auto">
      <table>
        <thead><tr>
          <th>BOQ No.</th><th>Project / Item</th><th>Unit</th><th>Qty</th><th>Rate</th>
          <th>Estimated</th><th>Actual</th><th>Variance</th><th>Status</th><th style="text-align:right">Actions</th>
        </tr></thead>
        <tbody id="boqTbody"></tbody>
      </table>
    </div>

    <div class="pagination" id="boqPagination" style="display:none">
      <p class="tiny muted" id="boqPageInfo"></p>
      <div class="flex gap-2">
        <button class="pg-btn" id="boqPrevPage"><i data-lucide="chevron-left"></i></button>
        <button class="pg-btn" id="boqNextPage"><i data-lucide="chevron-right"></i></button>
      </div>
    </div>
  `;

  // summary strip
  const summaryWrap = document.getElementById("boqSummary");
  [
    { label:"Total BOQs", value:BOQS.length, icon:"calculator", tint:"blue" },
    { label:"Approved", value:approvedCount, icon:"check-circle-2", tint:"green" },
    { label:"Estimated Value", value:fmtINR(totalEst), icon:"file-text", tint:"navy" },
    { label:"Variance (Actual - Est.)", value:fmtINR(totalActual-totalEst), icon:(totalActual-totalEst>=0?"trending-up":"trending-down"), tint:(totalActual-totalEst>=0?"orange":"green") },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="flex gap-2" style="align-items:center;margin-bottom:8px">
          <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg}"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        </div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  const projectFilter = document.getElementById("boqProjectFilter");
  projectFilter.innerHTML = `<option>All</option>` + projectNames.map(p=>`<option>${p}</option>`).join("");
  projectFilter.value = state.boq.project;
  const statusFilter = document.getElementById("boqStatusFilter");
  statusFilter.innerHTML = `<option>All</option>` + Object.keys(BOQ_STATUS_META).map(s=>`<option>${s}</option>`).join("");
  statusFilter.value = state.boq.status;

  document.getElementById("boqSearch").addEventListener("input", (e)=>{ state.boq.query = e.target.value; state.boq.page=1; renderBoqList(); });
  projectFilter.addEventListener("change", (e)=>{ state.boq.project = e.target.value; state.boq.page=1; renderBoqList(); });
  statusFilter.addEventListener("change", (e)=>{ state.boq.status = e.target.value; state.boq.page=1; renderBoqList(); });
  document.getElementById("boqImportBtn").addEventListener("click", ()=> showToast("Import BOQ — CSV upload coming soon"));
  document.getElementById("boqExportBtn").addEventListener("click", ()=> showToast(`Exported ${getFilteredBoqs().length} BOQ line items`));
  document.getElementById("newBoqBtn").addEventListener("click", ()=> openBoqFormModal(null));

  renderBoqList();
  icons();
}

function renderBoqList(){
  const filtered = getFilteredBoqs();
  const { pageSize } = state.boq;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.boq.page > totalPages) state.boq.page = totalPages;
  const pageRows = filtered.slice((state.boq.page-1)*pageSize, state.boq.page*pageSize);

  document.getElementById("boqResultCount").textContent = `${filtered.length} BOQ line items found`;

  const tbody = document.getElementById("boqTbody");
  tbody.innerHTML = "";
  if (pageRows.length===0){
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No BOQ items match your filters.</td></tr>`;
  }
  pageRows.forEach(b=>{
    const est = boqEstAmount(b);
    const variance = boqVariance(b);
    const varColor = variance > 0 ? "#DC2626" : (variance < 0 ? "#16A34A" : "#64748B");
    const tr = el(`<tr>
      <td style="font-weight:600;color:#1e293b">${b.id}</td>
      <td><p style="font-weight:600;margin:0;font-size:12.5px">${b.item}</p><p style="font-size:11px;color:#64748b;margin:0">${b.project}</p></td>
      <td>${b.unit}</td>
      <td>${b.qty.toLocaleString("en-IN")}</td>
      <td>₹${b.rate.toLocaleString("en-IN")}</td>
      <td style="font-weight:600">${fmtINR(est)}</td>
      <td>${b.actual ? fmtINR(b.actual) : '<span class="tiny muted">—</span>'}</td>
      <td style="color:${varColor};font-weight:600">${b.actual ? (variance>0?"+":"") + fmtINR(variance) : '<span class="tiny muted" style="color:#94a3b8">—</span>'}</td>
      <td>${boqPillHTML(b.status)}</td>
      <td><div class="row-actions">
        ${b.status!=="Approved" ? `<button class="icon-action" data-id="${b.id}" data-act="approve" title="Approve"><i data-lucide="check" style="color:#16A34A"></i></button>` : ""}
        <button class="icon-action edit" data-id="${b.id}" data-act="edit"><i data-lucide="pencil"></i></button>
        <button class="icon-action del" data-id="${b.id}" data-act="del"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>`);
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("[data-act='edit']").forEach(btn=> btn.addEventListener("click", ()=> openBoqFormModal(BOQS.find(b=>b.id===btn.dataset.id))));
  tbody.querySelectorAll("[data-act='del']").forEach(btn=> btn.addEventListener("click", ()=> openBoqConfirmDelete(btn.dataset.id)));
  tbody.querySelectorAll("[data-act='approve']").forEach(btn=> btn.addEventListener("click", ()=>{
    const b = BOQS.find(x=>x.id===btn.dataset.id);
    b.status = "Approved";
    showToast(`${b.id} approved`);
    renderBoqList();
  }));

  const pag = document.getElementById("boqPagination");
  if (totalPages > 1){
    pag.style.display = "flex";
    document.getElementById("boqPageInfo").textContent = `Page ${state.boq.page} of ${totalPages}`;
    const prev = document.getElementById("boqPrevPage"), next = document.getElementById("boqNextPage");
    prev.disabled = state.boq.page===1; next.disabled = state.boq.page===totalPages;
    prev.onclick = ()=>{ state.boq.page--; renderBoqList(); icons(); };
    next.onclick = ()=>{ state.boq.page++; renderBoqList(); icons(); };
  } else { pag.style.display = "none"; }

  icons();
}

function openBoqFormModal(boq){
  const isEdit = !!boq;
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const f = boq || { project:projectNames[0]||"", item:"", description:"", unit:"Cum", qty:"", rate:"", actual:"", remarks:"", status:"Draft" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit BOQ Item" : "Create BOQ Item"}</h3><button class="icon-btn" id="closeBF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field"><label>Project</label>
            <select id="b_project">${projectNames.map(p=>`<option ${p===f.project?"selected":""}>${p}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Status</label>
            <select id="b_status">${Object.keys(BOQ_STATUS_META).map(s=>`<option ${s===f.status?"selected":""}>${s}</option>`).join("")}</select>
          </div>
          <div class="field col-span-2"><label>Item</label><input id="b_item" value="${f.item}"/></div>
          <div class="field col-span-2"><label>Description</label><input id="b_description" value="${f.description}"/></div>
          <div class="field"><label>Unit</label>
            <select id="b_unit">${UNITS.map(u=>`<option ${u===f.unit?"selected":""}>${u}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Quantity</label><input type="number" id="b_qty" value="${f.qty}"/></div>
          <div class="field"><label>Rate (₹)</label><input type="number" id="b_rate" value="${f.rate}"/></div>
          <div class="field"><label>Estimated Amount</label><input type="text" id="b_est" value="${f.qty&&f.rate?fmtINR(f.qty*f.rate):"₹0"}" disabled style="background:#F8FAFC;color:#64748b"/></div>
          <div class="field"><label>Actual Amount (₹)</label><input type="number" id="b_actual" value="${f.actual||""}"/></div>
          <div class="field col-span-2"><label>Remarks</label><input id="b_remarks" value="${f.remarks}"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelBF">Cancel</button>
          <button class="btn-primary" id="saveBF">${isEdit ? "Save Changes" : "Create BOQ"}</button>
        </div>
      </div>
    </div>`);

  const qtyInput = node.querySelector("#b_qty"), rateInput = node.querySelector("#b_rate"), estInput = node.querySelector("#b_est");
  const recalc = ()=>{
    const q = Number(qtyInput.value)||0, r = Number(rateInput.value)||0;
    estInput.value = fmtINR(q*r);
  };
  qtyInput.addEventListener("input", recalc);
  rateInput.addEventListener("input", recalc);

  node.querySelector("#closeBF").addEventListener("click", closeModal);
  node.querySelector("#cancelBF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveBF").addEventListener("click", ()=>{
    const payload = {
      project: node.querySelector("#b_project").value,
      item: node.querySelector("#b_item").value.trim() || "Untitled Item",
      description: node.querySelector("#b_description").value.trim(),
      unit: node.querySelector("#b_unit").value,
      qty: Number(node.querySelector("#b_qty").value) || 0,
      rate: Number(node.querySelector("#b_rate").value) || 0,
      actual: Number(node.querySelector("#b_actual").value) || 0,
      remarks: node.querySelector("#b_remarks").value.trim(),
      status: node.querySelector("#b_status").value,
    };
    if (isEdit){
      Object.assign(boq, payload);
      showToast(`${boq.id} updated`);
    } else {
      const id = `BOQ-${String(BOQS.length+1).padStart(4,"0")}`;
      BOQS = [{ id, ...payload }, ...BOQS];
      showToast(`${id} created`);
      state.boq.page = 1;
    }
    closeModal();
    renderBoqModule();
  });
  openModalNode(node);
}

function openBoqConfirmDelete(id){
  const b = BOQS.find(x=>x.id===id);
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box" style="max-width:380px">
        <div style="padding:20px 20px 0">
          <div class="flex gap-2" style="align-items:center;margin-bottom:8px">
            <div class="modal-icon" style="background:#FEE2E2;color:#DC2626"><i data-lucide="alert-circle"></i></div>
            <h3 style="font-size:15px;margin:0">Delete this BOQ item?</h3>
          </div>
          <p class="small muted" style="margin:0 0 16px">This will permanently remove <span class="bold">${b?b.item:""}</span> (${id}) from the BOQ list.</p>
        </div>
        <div class="modal-foot" style="border-top:none">
          <button class="btn-secondary" id="cancelBDel">Cancel</button>
          <button class="btn-danger" id="confirmBDel">Delete</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#cancelBDel").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#confirmBDel").addEventListener("click", ()=>{
    BOQS = BOQS.filter(x=>x.id!==id);
    closeModal();
    showToast(`${id} deleted`);
    renderBoqModule();
  });
  openModalNode(node);
}

/* ---------------------------- Purchase & Material module ---------------------------- */
function poPillHTML(status){
  const m = PO_STATUS_META[status] || PO_STATUS_META["Draft"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${status}</span>`;
}
function poTotal(po){ const base = po.qty * po.rate; return base + base * (po.gst/100); }
function invAvailable(i){ return i.opening + i.received - i.consumed; }
function invLowStock(i){ return invAvailable(i) <= i.reorder; }

function getFilteredPOs(){
  const { query, status } = state.purchase;
  return PURCHASE_ORDERS.filter(p =>
    (status==="All" || p.status===status) &&
    (p.material.toLowerCase().includes(query.toLowerCase()) || p.vendor.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase()))
  );
}
function getFilteredInventory(){
  const { query } = state.purchase;
  return INVENTORY.filter(i => i.material.toLowerCase().includes(query.toLowerCase()));
}

function renderPurchaseModule(){
  const main = document.getElementById("mainContent");
  const openPOs = PURCHASE_ORDERS.filter(p=>p.status==="Open").length;
  const totalPOValue = PURCHASE_ORDERS.reduce((s,p)=> s + poTotal(p), 0);
  const lowStockCount = INVENTORY.filter(invLowStock).length;

  main.innerHTML = `
    <section class="grid grid-4" id="purchaseSummary"></section>

    <div class="tab-row" id="purchaseTabs">
      <button class="btn-secondary" data-tab="po" id="tabPO">Purchase Orders</button>
      <button class="btn-secondary" data-tab="inventory" id="tabInventory">Inventory</button>
    </div>

    <div id="purchaseTabBody"></div>
  `;

  const summaryWrap = document.getElementById("purchaseSummary");
  [
    { label:"Total Purchase Orders", value:PURCHASE_ORDERS.length, icon:"shopping-cart", tint:"blue" },
    { label:"Open POs", value:openPOs, icon:"clock", tint:"navy" },
    { label:"Total PO Value", value:fmtINR(totalPOValue), icon:"indian-rupee", tint:"green" },
    { label:"Low Stock Items", value:lowStockCount, icon:"package-x", tint:"orange" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  document.getElementById("tabPO").addEventListener("click", ()=>{ state.purchase.tab="po"; state.purchase.query=""; state.purchase.status="All"; state.purchase.page=1; renderPurchaseTab(); });
  document.getElementById("tabInventory").addEventListener("click", ()=>{ state.purchase.tab="inventory"; state.purchase.query=""; state.purchase.page=1; renderPurchaseTab(); });

  renderPurchaseTab();
  icons();
}

function renderPurchaseTab(){
  document.getElementById("tabPO").classList.toggle("btn-primary", state.purchase.tab==="po");
  document.getElementById("tabPO").classList.toggle("btn-secondary", state.purchase.tab!=="po");
  document.getElementById("tabInventory").classList.toggle("btn-primary", state.purchase.tab==="inventory");
  document.getElementById("tabInventory").classList.toggle("btn-secondary", state.purchase.tab!=="inventory");
  if (state.purchase.tab === "po") renderPOTab(); else renderInventoryTab();
  icons();
}

function renderPOTab(){
  const body = document.getElementById("purchaseTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="poSearch" placeholder="Search by PO number, vendor, or material…" value="${state.purchase.query}"/></div>
      <select id="poStatusFilter"></select>
      <button class="btn-primary" id="newPOBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Purchase Order</button>
    </div>
    <p class="tiny muted mt-2" id="poResultCount"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr>
          <th>PO No.</th><th>Vendor / Material</th><th>Project</th><th>Qty</th><th>Rate</th><th>GST</th><th>Total</th><th>Delivery</th><th>Status</th><th style="text-align:right">Actions</th>
        </tr></thead>
        <tbody id="poTbody"></tbody>
      </table>
    </div>
    <div class="pagination" id="poPagination" style="display:none">
      <p class="tiny muted" id="poPageInfo"></p>
      <div class="flex gap-2"><button class="pg-btn" id="poPrevPage"><i data-lucide="chevron-left"></i></button><button class="pg-btn" id="poNextPage"><i data-lucide="chevron-right"></i></button></div>
    </div>
  `;
  const statusFilter = document.getElementById("poStatusFilter");
  statusFilter.innerHTML = `<option>All</option>` + Object.keys(PO_STATUS_META).map(s=>`<option>${s}</option>`).join("");
  statusFilter.value = state.purchase.status;

  document.getElementById("poSearch").addEventListener("input", (e)=>{ state.purchase.query=e.target.value; state.purchase.page=1; renderPOList(); });
  statusFilter.addEventListener("change", (e)=>{ state.purchase.status=e.target.value; state.purchase.page=1; renderPOList(); });
  document.getElementById("newPOBtn").addEventListener("click", ()=> openPOFormModal(null));

  renderPOList();
  icons();
}

function renderPOList(){
  const filtered = getFilteredPOs();
  const { pageSize } = state.purchase;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.purchase.page > totalPages) state.purchase.page = totalPages;
  const pageRows = filtered.slice((state.purchase.page-1)*pageSize, state.purchase.page*pageSize);

  document.getElementById("poResultCount").textContent = `${filtered.length} purchase orders found`;
  const tbody = document.getElementById("poTbody");
  tbody.innerHTML = "";
  if (pageRows.length===0){
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No purchase orders match your filters.</td></tr>`;
  }
  pageRows.forEach(p=>{
    tbody.appendChild(el(`<tr>
      <td style="font-weight:600;color:#1e293b">${p.id}</td>
      <td><p style="font-weight:600;margin:0;font-size:12.5px">${p.material}</p><p style="font-size:11px;color:#64748b;margin:0">${p.vendor}</p></td>
      <td>${p.project}</td>
      <td>${p.qty.toLocaleString("en-IN")} ${p.unit}</td>
      <td>₹${p.rate.toLocaleString("en-IN")}</td>
      <td>${p.gst}%</td>
      <td style="font-weight:600">${fmtINR(poTotal(p))}</td>
      <td class="tiny">${p.delivery}</td>
      <td>${poPillHTML(p.status)}</td>
      <td><div class="row-actions">
        <button class="icon-action edit" data-id="${p.id}" data-act="edit"><i data-lucide="pencil"></i></button>
        <button class="icon-action del" data-id="${p.id}" data-act="del"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>`));
  });
  tbody.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openPOFormModal(PURCHASE_ORDERS.find(p=>p.id===b.dataset.id))));
  tbody.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=> openPOConfirmDelete(b.dataset.id)));

  const pag = document.getElementById("poPagination");
  if (totalPages > 1){
    pag.style.display = "flex";
    document.getElementById("poPageInfo").textContent = `Page ${state.purchase.page} of ${totalPages}`;
    const prev = document.getElementById("poPrevPage"), next = document.getElementById("poNextPage");
    prev.disabled = state.purchase.page===1; next.disabled = state.purchase.page===totalPages;
    prev.onclick = ()=>{ state.purchase.page--; renderPOList(); icons(); };
    next.onclick = ()=>{ state.purchase.page++; renderPOList(); icons(); };
  } else { pag.style.display = "none"; }
  icons();
}

function openPOFormModal(po){
  const isEdit = !!po;
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const f = po || { vendor:"", project:projectNames[0]||"", material:"", qty:"", unit:"Bag", rate:"", gst:18, delivery:"", status:"Draft" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Purchase Order" : "New Purchase Order"}</h3><button class="icon-btn" id="closePOF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field"><label>Vendor</label><input id="po_vendor" value="${f.vendor}"/></div>
          <div class="field"><label>Project</label><select id="po_project">${projectNames.map(p=>`<option ${p===f.project?"selected":""}>${p}</option>`).join("")}</select></div>
          <div class="field col-span-2"><label>Material</label><input id="po_material" value="${f.material}"/></div>
          <div class="field"><label>Quantity</label><input type="number" id="po_qty" value="${f.qty}"/></div>
          <div class="field"><label>Unit</label><select id="po_unit">${UNITS.map(u=>`<option ${u===f.unit?"selected":""}>${u}</option>`).join("")}</select></div>
          <div class="field"><label>Rate (₹)</label><input type="number" id="po_rate" value="${f.rate}"/></div>
          <div class="field"><label>GST (%)</label><select id="po_gst">${GST_RATES.map(g=>`<option ${g===f.gst?"selected":""}>${g}</option>`).join("")}</select></div>
          <div class="field"><label>Total (incl. GST)</label><input type="text" id="po_total" value="${f.qty&&f.rate?fmtINR(f.qty*f.rate*(1+f.gst/100)):"₹0"}" disabled style="background:#F8FAFC;color:#64748b"/></div>
          <div class="field"><label>Delivery Date</label><input type="date" id="po_delivery" value="${f.delivery}"/></div>
          <div class="field"><label>Status</label><select id="po_status">${Object.keys(PO_STATUS_META).map(s=>`<option ${s===f.status?"selected":""}>${s}</option>`).join("")}</select></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelPOF">Cancel</button>
          <button class="btn-primary" id="savePOF">${isEdit ? "Save Changes" : "Create Purchase Order"}</button>
        </div>
      </div>
    </div>`);

  const qtyI = node.querySelector("#po_qty"), rateI = node.querySelector("#po_rate"), gstI = node.querySelector("#po_gst"), totalI = node.querySelector("#po_total");
  const recalc = ()=>{ const q=Number(qtyI.value)||0, r=Number(rateI.value)||0, g=Number(gstI.value)||0; totalI.value = fmtINR(q*r*(1+g/100)); };
  qtyI.addEventListener("input", recalc); rateI.addEventListener("input", recalc); gstI.addEventListener("change", recalc);

  node.querySelector("#closePOF").addEventListener("click", closeModal);
  node.querySelector("#cancelPOF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#savePOF").addEventListener("click", ()=>{
    const payload = {
      vendor: node.querySelector("#po_vendor").value.trim() || "Unnamed Vendor",
      project: node.querySelector("#po_project").value,
      material: node.querySelector("#po_material").value.trim() || "Untitled Material",
      qty: Number(node.querySelector("#po_qty").value) || 0,
      unit: node.querySelector("#po_unit").value,
      rate: Number(node.querySelector("#po_rate").value) || 0,
      gst: Number(node.querySelector("#po_gst").value) || 0,
      delivery: node.querySelector("#po_delivery").value,
      status: node.querySelector("#po_status").value,
    };
    if (isEdit){
      Object.assign(po, payload);
      showToast(`${po.id} updated`);
    } else {
      const id = `PO-${1001 + PURCHASE_ORDERS.length}`;
      PURCHASE_ORDERS = [{ id, ...payload }, ...PURCHASE_ORDERS];
      showToast(`${id} created`);
      state.purchase.page = 1;
    }
    closeModal();
    renderPurchaseModule();
  });
  openModalNode(node);
}

function openPOConfirmDelete(id){
  const p = PURCHASE_ORDERS.find(x=>x.id===id);
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box" style="max-width:380px">
        <div style="padding:20px 20px 0">
          <div class="flex gap-2" style="align-items:center;margin-bottom:8px">
            <div class="modal-icon" style="background:#FEE2E2;color:#DC2626"><i data-lucide="alert-circle"></i></div>
            <h3 style="font-size:15px;margin:0">Delete this purchase order?</h3>
          </div>
          <p class="small muted" style="margin:0 0 16px">This will permanently remove <span class="bold">${p?p.material:""}</span> (${id}) from the PO list.</p>
        </div>
        <div class="modal-foot" style="border-top:none">
          <button class="btn-secondary" id="cancelPODel">Cancel</button>
          <button class="btn-danger" id="confirmPODel">Delete</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#cancelPODel").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#confirmPODel").addEventListener("click", ()=>{
    PURCHASE_ORDERS = PURCHASE_ORDERS.filter(x=>x.id!==id);
    closeModal();
    showToast(`${id} deleted`);
    renderPurchaseModule();
  });
  openModalNode(node);
}

function renderInventoryTab(){
  const body = document.getElementById("purchaseTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="invSearch" placeholder="Search material…" value="${state.purchase.query}"/></div>
      <button class="btn-primary" id="newReceiptBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>Material Receipt</button>
    </div>
    <p class="tiny muted mt-2" id="invResultCount"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr>
          <th>Material</th><th>Opening</th><th>Received</th><th>Consumed</th><th>Available</th><th>Reorder Level</th><th>Alert</th>
        </tr></thead>
        <tbody id="invTbody"></tbody>
      </table>
    </div>
  `;
  document.getElementById("invSearch").addEventListener("input", (e)=>{ state.purchase.query=e.target.value; renderInventoryList(); });
  document.getElementById("newReceiptBtn").addEventListener("click", ()=> openMaterialReceiptModal());
  renderInventoryList();
  icons();
}

function renderInventoryList(){
  const filtered = getFilteredInventory();
  document.getElementById("invResultCount").textContent = `${filtered.length} materials tracked`;
  const tbody = document.getElementById("invTbody");
  tbody.innerHTML = "";
  if (filtered.length===0){
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No materials match your search.</td></tr>`;
  }
  filtered.forEach(i=>{
    const avail = invAvailable(i);
    const low = invLowStock(i);
    tbody.appendChild(el(`<tr>
      <td style="font-weight:600">${i.material}</td>
      <td>${i.opening.toLocaleString("en-IN")} ${i.unit}</td>
      <td>${i.received.toLocaleString("en-IN")} ${i.unit}</td>
      <td>${i.consumed.toLocaleString("en-IN")} ${i.unit}</td>
      <td style="font-weight:600;color:${low?'#DC2626':'#1e293b'}">${avail.toLocaleString("en-IN")} ${i.unit}</td>
      <td class="tiny muted">${i.reorder.toLocaleString("en-IN")} ${i.unit}</td>
      <td>${low ? `<span class="pill" style="color:#DC2626;background:#FEE2E2"><span class="dot-sm" style="background:#DC2626"></span>Low Stock</span>` : `<span class="pill" style="color:#16A34A;background:#DCFCE7"><span class="dot-sm" style="background:#16A34A"></span>OK</span>`}</td>
    </tr>`));
  });
  icons();
}

function openMaterialReceiptModal(){
  const materialNames = INVENTORY.map(i=>i.material);
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-head"><h3>Material Receipt</h3><button class="icon-btn" id="closeMR"><i data-lucide="x"></i></button></div>
        <div class="modal-body">
          <div class="field"><label>Material</label><select id="mr_material">${materialNames.map(m=>`<option>${m}</option>`).join("")}</select></div>
          <div class="field"><label>Received Quantity</label><input type="number" id="mr_qty" placeholder="Enter quantity"/></div>
          <div class="field"><label>PO Number (optional)</label><input type="text" id="mr_po" placeholder="e.g. PO-1001"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelMR">Cancel</button>
          <button class="btn-primary" id="saveMR">Save Receipt</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeMR").addEventListener("click", closeModal);
  node.querySelector("#cancelMR").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveMR").addEventListener("click", ()=>{
    const matName = node.querySelector("#mr_material").value;
    const qty = Number(node.querySelector("#mr_qty").value) || 0;
    const item = INVENTORY.find(i=>i.material===matName);
    if (item && qty>0) item.received += qty;
    closeModal();
    showToast(`Material receipt saved — ${matName}`);
    if (state.purchase.tab==="inventory") renderInventoryList();
  });
  openModalNode(node);
}

/* ---------------------------- Labour & Contractor module ---------------------------- */
function attWage(a, contractor){
  const c = CONTRACTORS.find(x=>x.name===a.contractor) || contractor;
  const rate = c ? c.dayRate : 0;
  const otRate = rate / 8 * 1.5;
  return a.present * rate + a.otHours * otRate;
}

function getFilteredAttendance(){
  const { query } = state.labour;
  return [...ATTENDANCE].filter(a => a.contractor.toLowerCase().includes(query.toLowerCase()) || a.project.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b)=> b.date.localeCompare(a.date));
}
function getFilteredContractors(){
  const { query } = state.labour;
  return CONTRACTORS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.trade.toLowerCase().includes(query.toLowerCase()));
}

function renderLabourModule(){
  const main = document.getElementById("mainContent");
  const totalWorkers = CONTRACTORS.reduce((s,c)=> s+c.workers, 0);
  const todayAtt = ATTENDANCE.filter(a=>a.date==="2026-08-14");
  const presentToday = todayAtt.reduce((s,a)=> s+a.present, 0);
  const absentToday = todayAtt.reduce((s,a)=> s+a.absent, 0);
  const totalOutstanding = CONTRACTORS.reduce((s,c)=> s+c.outstanding, 0);

  main.innerHTML = `
    <section class="grid grid-4" id="labourSummary"></section>
    <div class="tab-row" id="labourTabs">
      <button class="btn-secondary" id="tabAttendance">Attendance</button>
      <button class="btn-secondary" id="tabContractors">Contractors</button>
    </div>
    <div id="labourTabBody"></div>
  `;

  const summaryWrap = document.getElementById("labourSummary");
  [
    { label:"Total Labour", value:totalWorkers, icon:"hard-hat", tint:"blue" },
    { label:"Present Today", value:presentToday, icon:"check-circle-2", tint:"green" },
    { label:"Absent Today", value:absentToday, icon:"clock", tint:"orange" },
    { label:"Contractor Outstanding", value:fmtINR(totalOutstanding), icon:"indian-rupee", tint:"navy" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  document.getElementById("tabAttendance").addEventListener("click", ()=>{ state.labour.tab="attendance"; state.labour.query=""; state.labour.page=1; renderLabourTab(); });
  document.getElementById("tabContractors").addEventListener("click", ()=>{ state.labour.tab="contractors"; state.labour.query=""; state.labour.page=1; renderLabourTab(); });

  renderLabourTab();
  icons();
}

function renderLabourTab(){
  document.getElementById("tabAttendance").classList.toggle("btn-primary", state.labour.tab==="attendance");
  document.getElementById("tabAttendance").classList.toggle("btn-secondary", state.labour.tab!=="attendance");
  document.getElementById("tabContractors").classList.toggle("btn-primary", state.labour.tab==="contractors");
  document.getElementById("tabContractors").classList.toggle("btn-secondary", state.labour.tab!=="contractors");
  if (state.labour.tab === "attendance") renderAttendanceTab(); else renderContractorsTab();
  icons();
}

function renderAttendanceTab(){
  const body = document.getElementById("labourTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="attSearch" placeholder="Search by contractor or project…" value="${state.labour.query}"/></div>
      <button class="btn-primary" id="markAttendanceBtn"><i data-lucide="clipboard-list" style="width:15px;height:15px"></i>Mark Attendance</button>
    </div>
    <p class="tiny muted mt-2" id="attResultCount"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr><th>Date</th><th>Contractor</th><th>Project</th><th>Present</th><th>Absent</th><th>OT Hours</th><th>Wage Payable</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody id="attTbody"></tbody>
      </table>
    </div>
    <div class="pagination" id="attPagination" style="display:none">
      <p class="tiny muted" id="attPageInfo"></p>
      <div class="flex gap-2"><button class="pg-btn" id="attPrevPage"><i data-lucide="chevron-left"></i></button><button class="pg-btn" id="attNextPage"><i data-lucide="chevron-right"></i></button></div>
    </div>
  `;
  document.getElementById("attSearch").addEventListener("input", (e)=>{ state.labour.query=e.target.value; state.labour.page=1; renderAttendanceList(); });
  document.getElementById("markAttendanceBtn").addEventListener("click", ()=> openAttendanceFormModal(null));
  renderAttendanceList();
  icons();
}

function renderAttendanceList(){
  const filtered = getFilteredAttendance();
  const { pageSize } = state.labour;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.labour.page > totalPages) state.labour.page = totalPages;
  const pageRows = filtered.slice((state.labour.page-1)*pageSize, state.labour.page*pageSize);

  document.getElementById("attResultCount").textContent = `${filtered.length} attendance records found`;
  const tbody = document.getElementById("attTbody");
  tbody.innerHTML = "";
  if (pageRows.length===0){
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No attendance records match your search.</td></tr>`;
  }
  pageRows.forEach(a=>{
    tbody.appendChild(el(`<tr>
      <td class="tiny">${a.date}</td>
      <td style="font-weight:600">${a.contractor}</td>
      <td>${a.project}</td>
      <td style="color:#16A34A;font-weight:600">${a.present}</td>
      <td style="color:#DC2626;font-weight:600">${a.absent}</td>
      <td>${a.otHours} hrs</td>
      <td style="font-weight:600">${fmtINR(attWage(a))}</td>
      <td><div class="row-actions">
        <button class="icon-action edit" data-id="${a.id}" data-act="edit"><i data-lucide="pencil"></i></button>
        <button class="icon-action del" data-id="${a.id}" data-act="del"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>`));
  });
  tbody.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openAttendanceFormModal(ATTENDANCE.find(a=>a.id===b.dataset.id))));
  tbody.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    ATTENDANCE = ATTENDANCE.filter(a=>a.id!==b.dataset.id);
    showToast("Attendance record deleted");
    renderAttendanceList();
  }));

  const pag = document.getElementById("attPagination");
  if (totalPages > 1){
    pag.style.display = "flex";
    document.getElementById("attPageInfo").textContent = `Page ${state.labour.page} of ${totalPages}`;
    const prev = document.getElementById("attPrevPage"), next = document.getElementById("attNextPage");
    prev.disabled = state.labour.page===1; next.disabled = state.labour.page===totalPages;
    prev.onclick = ()=>{ state.labour.page--; renderAttendanceList(); icons(); };
    next.onclick = ()=>{ state.labour.page++; renderAttendanceList(); icons(); };
  } else { pag.style.display = "none"; }
  icons();
}

function openAttendanceFormModal(att){
  const isEdit = !!att;
  const contractorNames = CONTRACTORS.map(c=>c.name);
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const f = att || { date:"2026-08-15", contractor:contractorNames[0]||"", project:projectNames[0]||"", present:"", absent:"", otHours:"" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Attendance" : "Mark Labour Attendance"}</h3><button class="icon-btn" id="closeAF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field"><label>Date</label><input type="date" id="a_date" value="${f.date}"/></div>
          <div class="field"><label>Project</label><select id="a_project">${projectNames.map(p=>`<option ${p===f.project?"selected":""}>${p}</option>`).join("")}</select></div>
          <div class="field col-span-2"><label>Contractor</label><select id="a_contractor">${contractorNames.map(c=>`<option ${c===f.contractor?"selected":""}>${c}</option>`).join("")}</select></div>
          <div class="field"><label>Present Count</label><input type="number" id="a_present" value="${f.present}"/></div>
          <div class="field"><label>Absent Count</label><input type="number" id="a_absent" value="${f.absent}"/></div>
          <div class="field"><label>Overtime Hours</label><input type="number" id="a_ot" value="${f.otHours}"/></div>
          <div class="field"><label>Wage Payable</label><input type="text" id="a_wage" disabled style="background:#F8FAFC;color:#64748b"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelAF">Cancel</button>
          <button class="btn-primary" id="saveAF">${isEdit ? "Save Changes" : "Save Attendance"}</button>
        </div>
      </div>
    </div>`);

  const presentI = node.querySelector("#a_present"), otI = node.querySelector("#a_ot"), contractorSel = node.querySelector("#a_contractor"), wageI = node.querySelector("#a_wage");
  const recalcWage = ()=>{
    const c = CONTRACTORS.find(x=>x.name===contractorSel.value);
    const rate = c ? c.dayRate : 0;
    const present = Number(presentI.value)||0, ot = Number(otI.value)||0;
    wageI.value = fmtINR(present*rate + ot*(rate/8*1.5));
  };
  presentI.addEventListener("input", recalcWage); otI.addEventListener("input", recalcWage); contractorSel.addEventListener("change", recalcWage);
  recalcWage();

  node.querySelector("#closeAF").addEventListener("click", closeModal);
  node.querySelector("#cancelAF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveAF").addEventListener("click", ()=>{
    const payload = {
      date: node.querySelector("#a_date").value,
      project: node.querySelector("#a_project").value,
      contractor: contractorSel.value,
      present: Number(node.querySelector("#a_present").value) || 0,
      absent: Number(node.querySelector("#a_absent").value) || 0,
      otHours: Number(node.querySelector("#a_ot").value) || 0,
    };
    if (isEdit){
      Object.assign(att, payload);
      showToast("Attendance updated");
    } else {
      const id = `ATT-${String(ATTENDANCE.length+1).padStart(3,"0")}`;
      ATTENDANCE = [{ id, ...payload }, ...ATTENDANCE];
      showToast("Attendance saved");
      state.labour.page = 1;
    }
    closeModal();
    renderAttendanceList();
  });
  openModalNode(node);
}

function renderContractorsTab(){
  const body = document.getElementById("labourTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="ctrSearch" placeholder="Search contractor or trade…" value="${state.labour.query}"/></div>
      <button class="btn-primary" id="newContractorBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Contractor</button>
    </div>
    <p class="tiny muted mt-2" id="ctrResultCount"></p>
    <div class="grid grid-3 mt-2" id="ctrCards"></div>
  `;
  document.getElementById("ctrSearch").addEventListener("input", (e)=>{ state.labour.query=e.target.value; renderContractorsList(); });
  document.getElementById("newContractorBtn").addEventListener("click", ()=> openContractorFormModal(null));
  renderContractorsList();
  icons();
}

function renderContractorsList(){
  const filtered = getFilteredContractors();
  document.getElementById("ctrResultCount").textContent = `${filtered.length} contractors found`;
  const wrap = document.getElementById("ctrCards");
  wrap.innerHTML = "";
  filtered.forEach(c=>{
    wrap.appendChild(el(`
      <div class="card proj-card">
        <div class="flex-between" style="align-items:flex-start;margin-bottom:6px">
          <div><p style="font-weight:600;font-size:13px;margin:0">${c.name}</p><p style="font-size:11px;color:#64748b;margin:0">${c.trade} · ${c.project}</p></div>
        </div>
        <div class="module-rows" style="margin:10px 0">
          <div><p class="k">Workers</p><p class="v">${c.workers}</p></div>
          <div><p class="k">Day Rate</p><p class="v">₹${c.dayRate}</p></div>
          <div><p class="k">Total Billed</p><p class="v">${fmtINR(c.totalBilled)}</p></div>
          <div><p class="k">Outstanding</p><p class="v" style="color:#DC2626">${fmtINR(c.outstanding)}</p></div>
        </div>
        <div class="flex gap-2 mt-2">
          <button class="btn-secondary" style="flex:1;padding:7px" data-act="pay" data-id="${c.id}">Record Payment</button>
        </div>
        <div class="row-actions mt-2" style="border-top:1px solid #F1F5F9;padding-top:8px">
          <button class="icon-action edit" data-act="edit" data-id="${c.id}"><i data-lucide="pencil"></i></button>
          <button class="icon-action del" data-act="del" data-id="${c.id}"><i data-lucide="trash-2"></i></button>
        </div>
      </div>`));
  });
  wrap.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openContractorFormModal(CONTRACTORS.find(c=>c.id===b.dataset.id))));
  wrap.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    CONTRACTORS = CONTRACTORS.filter(c=>c.id!==b.dataset.id);
    showToast("Contractor removed");
    renderContractorsList();
  }));
  wrap.querySelectorAll("[data-act='pay']").forEach(b=> b.addEventListener("click", ()=> openContractorPaymentModal(CONTRACTORS.find(c=>c.id===b.dataset.id))));
  icons();
}

function openContractorFormModal(contractor){
  const isEdit = !!contractor;
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const f = contractor || { name:"", trade:TRADES[0], project:projectNames[0]||"", workers:"", dayRate:"", totalBilled:"", advance:"", outstanding:"" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Contractor" : "New Contractor"}</h3><button class="icon-btn" id="closeCF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field col-span-2"><label>Contractor Name</label><input id="c_name" value="${f.name}"/></div>
          <div class="field"><label>Trade</label><select id="c_trade">${TRADES.map(t=>`<option ${t===f.trade?"selected":""}>${t}</option>`).join("")}</select></div>
          <div class="field"><label>Project</label><select id="c_project">${projectNames.map(p=>`<option ${p===f.project?"selected":""}>${p}</option>`).join("")}</select></div>
          <div class="field"><label>Workers</label><input type="number" id="c_workers" value="${f.workers}"/></div>
          <div class="field"><label>Day Rate (₹)</label><input type="number" id="c_dayRate" value="${f.dayRate}"/></div>
          <div class="field"><label>Total Billed (₹)</label><input type="number" id="c_totalBilled" value="${f.totalBilled}"/></div>
          <div class="field"><label>Advance Paid (₹)</label><input type="number" id="c_advance" value="${f.advance}"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelCF">Cancel</button>
          <button class="btn-primary" id="saveCF">${isEdit ? "Save Changes" : "Create Contractor"}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeCF").addEventListener("click", closeModal);
  node.querySelector("#cancelCF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveCF").addEventListener("click", ()=>{
    const totalBilled = Number(node.querySelector("#c_totalBilled").value) || 0;
    const advance = Number(node.querySelector("#c_advance").value) || 0;
    const payload = {
      name: node.querySelector("#c_name").value.trim() || "Unnamed Contractor",
      trade: node.querySelector("#c_trade").value,
      project: node.querySelector("#c_project").value,
      workers: Number(node.querySelector("#c_workers").value) || 0,
      dayRate: Number(node.querySelector("#c_dayRate").value) || 0,
      totalBilled, advance,
      outstanding: Math.max(0, totalBilled - advance),
    };
    if (isEdit){
      Object.assign(contractor, payload);
      showToast(`${contractor.name} updated`);
    } else {
      const id = `CTR-${String(CONTRACTORS.length+1).padStart(2,"0")}`;
      CONTRACTORS = [{ id, ...payload }, ...CONTRACTORS];
      showToast(`${payload.name} added`);
    }
    closeModal();
    renderContractorsList();
  });
  openModalNode(node);
}

function openContractorPaymentModal(contractor){
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-head"><h3>Record Payment — ${contractor.name}</h3><button class="icon-btn" id="closePM"><i data-lucide="x"></i></button></div>
        <div class="modal-body">
          <div class="field"><label>Outstanding Amount</label><input type="text" value="${fmtINR(contractor.outstanding)}" disabled style="background:#F8FAFC;color:#64748b"/></div>
          <div class="field"><label>Payment Amount (₹)</label><input type="number" id="pm_amount" placeholder="Enter amount"/></div>
          <div class="field"><label>Payment Type</label><select id="pm_type"><option>Advance</option><option>Bill Settlement</option></select></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelPM">Cancel</button>
          <button class="btn-primary" id="savePM">Save Payment</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closePM").addEventListener("click", closeModal);
  node.querySelector("#cancelPM").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#savePM").addEventListener("click", ()=>{
    const amt = Number(node.querySelector("#pm_amount").value) || 0;
    contractor.advance += amt;
    contractor.outstanding = Math.max(0, contractor.totalBilled - contractor.advance);
    closeModal();
    showToast(`Payment of ${fmtINR(amt)} recorded for ${contractor.name}`);
    renderContractorsList();
  });
  openModalNode(node);
}

/* ---------------------------- Billing & Accounts module ---------------------------- */
function invPillHTML(status){
  const m = INV_STATUS_META[status] || INV_STATUS_META["Outstanding"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${status}</span>`;
}
function invBalance(inv){ return Math.max(0, invNet(inv) - inv.paid); }

function getFilteredInvoices(){
  const { query, status } = state.billing;
  return INVOICES.filter(inv =>
    (status==="All" || inv.status===status) &&
    (inv.client.toLowerCase().includes(query.toLowerCase()) || inv.project.toLowerCase().includes(query.toLowerCase()) || inv.id.toLowerCase().includes(query.toLowerCase()))
  );
}
function getFilteredPayments(){
  const { query } = state.billing;
  return [...PAYMENTS].filter(p => p.client.toLowerCase().includes(query.toLowerCase()) || p.invoice.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b)=> b.date.localeCompare(a.date));
}

function renderBillingModule(){
  const main = document.getElementById("mainContent");
  const totalInvoiced = INVOICES.reduce((s,i)=> s+invNet(i), 0);
  const totalPaid = INVOICES.reduce((s,i)=> s+i.paid, 0);
  const totalOutstanding = INVOICES.reduce((s,i)=> s+invBalance(i), 0);
  const overdueCount = INVOICES.filter(i=>i.status==="Overdue").length;

  main.innerHTML = `
    <section class="grid grid-4" id="billingSummary"></section>
    <div class="tab-row" id="billingTabs">
      <button class="btn-secondary" id="tabInvoices">Client Invoices</button>
      <button class="btn-secondary" id="tabPayments">Payments Received</button>
    </div>
    <div id="billingTabBody"></div>
  `;

  const summaryWrap = document.getElementById("billingSummary");
  [
    { label:"Total Invoiced", value:fmtINR(totalInvoiced), icon:"file-text", tint:"blue" },
    { label:"Collected", value:fmtINR(totalPaid), icon:"check-circle-2", tint:"green" },
    { label:"Outstanding", value:fmtINR(totalOutstanding), icon:"clock", tint:"navy" },
    { label:"Overdue Invoices", value:overdueCount, icon:"alert-circle", tint:"orange" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  document.getElementById("tabInvoices").addEventListener("click", ()=>{ state.billing.tab="invoices"; state.billing.query=""; state.billing.status="All"; state.billing.page=1; renderBillingTab(); });
  document.getElementById("tabPayments").addEventListener("click", ()=>{ state.billing.tab="payments"; state.billing.query=""; state.billing.page=1; renderBillingTab(); });

  renderBillingTab();
  icons();
}

function renderBillingTab(){
  document.getElementById("tabInvoices").classList.toggle("btn-primary", state.billing.tab==="invoices");
  document.getElementById("tabInvoices").classList.toggle("btn-secondary", state.billing.tab!=="invoices");
  document.getElementById("tabPayments").classList.toggle("btn-primary", state.billing.tab==="payments");
  document.getElementById("tabPayments").classList.toggle("btn-secondary", state.billing.tab!=="payments");
  if (state.billing.tab === "invoices") renderInvoicesTab(); else renderPaymentsTab();
  icons();
}

function renderInvoicesTab(){
  const body = document.getElementById("billingTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="invSearch2" placeholder="Search by invoice, client, or project…" value="${state.billing.query}"/></div>
      <select id="invStatusFilter"></select>
      <button class="btn-primary" id="newInvoiceBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Invoice</button>
    </div>
    <p class="tiny muted mt-2" id="invResultCount2"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr>
          <th>Invoice / RA Bill</th><th>Client / Project</th><th>Basic Amount</th><th>GST</th><th>TDS</th><th>Retention</th><th>Net Payable</th><th>Balance Due</th><th>Due Date</th><th>Status</th><th style="text-align:right">Actions</th>
        </tr></thead>
        <tbody id="invTbody2"></tbody>
      </table>
    </div>
    <div class="pagination" id="invPagination2" style="display:none">
      <p class="tiny muted" id="invPageInfo2"></p>
      <div class="flex gap-2"><button class="pg-btn" id="invPrevPage2"><i data-lucide="chevron-left"></i></button><button class="pg-btn" id="invNextPage2"><i data-lucide="chevron-right"></i></button></div>
    </div>
  `;
  const statusFilter = document.getElementById("invStatusFilter");
  statusFilter.innerHTML = `<option>All</option>` + Object.keys(INV_STATUS_META).map(s=>`<option>${s}</option>`).join("");
  statusFilter.value = state.billing.status;

  document.getElementById("invSearch2").addEventListener("input", (e)=>{ state.billing.query=e.target.value; state.billing.page=1; renderInvoicesList(); });
  statusFilter.addEventListener("change", (e)=>{ state.billing.status=e.target.value; state.billing.page=1; renderInvoicesList(); });
  document.getElementById("newInvoiceBtn").addEventListener("click", ()=> openInvoiceFormModal(null));

  renderInvoicesList();
  icons();
}

function renderInvoicesList(){
  const filtered = getFilteredInvoices();
  const { pageSize } = state.billing;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.billing.page > totalPages) state.billing.page = totalPages;
  const pageRows = filtered.slice((state.billing.page-1)*pageSize, state.billing.page*pageSize);

  document.getElementById("invResultCount2").textContent = `${filtered.length} invoices found`;
  const tbody = document.getElementById("invTbody2");
  tbody.innerHTML = "";
  if (pageRows.length===0){
    tbody.innerHTML = `<tr><td colspan="11" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No invoices match your filters.</td></tr>`;
  }
  pageRows.forEach(inv=>{
    const net = invNet(inv), bal = invBalance(inv);
    tbody.appendChild(el(`<tr>
      <td><p style="font-weight:600;margin:0;color:#1e293b">${inv.id}</p><p class="tiny muted" style="margin:0">${inv.raBill}</p></td>
      <td><p style="font-weight:600;margin:0;font-size:12.5px">${inv.client}</p><p class="tiny muted" style="margin:0">${inv.project}</p></td>
      <td>${fmtINR(inv.basic)}</td>
      <td>${inv.gst}%</td>
      <td>${inv.tds}%</td>
      <td>${inv.retention}%</td>
      <td style="font-weight:600">${fmtINR(net)}</td>
      <td style="font-weight:600;color:${bal>0?'#DC2626':'#16A34A'}">${fmtINR(bal)}</td>
      <td class="tiny">${inv.dueDate}</td>
      <td>${invPillHTML(inv.status)}</td>
      <td><div class="row-actions">
        ${bal>0 ? `<button class="icon-action" data-id="${inv.id}" data-act="pay" title="Record Payment"><i data-lucide="credit-card" style="color:#2563EB"></i></button>` : ""}
        <button class="icon-action edit" data-id="${inv.id}" data-act="edit"><i data-lucide="pencil"></i></button>
        <button class="icon-action del" data-id="${inv.id}" data-act="del"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>`));
  });
  tbody.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openInvoiceFormModal(INVOICES.find(i=>i.id===b.dataset.id))));
  tbody.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    INVOICES = INVOICES.filter(i=>i.id!==b.dataset.id);
    showToast(`${b.dataset.id} deleted`);
    renderInvoicesList();
  }));
  tbody.querySelectorAll("[data-act='pay']").forEach(b=> b.addEventListener("click", ()=> openPaymentReceivedModal(INVOICES.find(i=>i.id===b.dataset.id))));

  const pag = document.getElementById("invPagination2");
  if (totalPages > 1){
    pag.style.display = "flex";
    document.getElementById("invPageInfo2").textContent = `Page ${state.billing.page} of ${totalPages}`;
    const prev = document.getElementById("invPrevPage2"), next = document.getElementById("invNextPage2");
    prev.disabled = state.billing.page===1; next.disabled = state.billing.page===totalPages;
    prev.onclick = ()=>{ state.billing.page--; renderInvoicesList(); icons(); };
    next.onclick = ()=>{ state.billing.page++; renderInvoicesList(); icons(); };
  } else { pag.style.display = "none"; }
  icons();
}

function openInvoiceFormModal(inv){
  const isEdit = !!inv;
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const clientMap = { "Zinnia":"Hiranmayi Developers","Whispering Grooves":"Hiranmayi Developers","Genial":"Hiranmayi Developers","Zinnia":"Hiranmayi Developers","Whispering Grooves":"Hiranmayi Developers","Zinnia":"Hiranmayi Developers","Whispering Grooves":"Hiranmayi Developers","Genial":"Godrej Properties" };
  const f = inv || { raBill:"", client:"", project:projectNames[0]||"", basic:"", gst:18, tds:1, retention:5, dueDate:"", status:"Outstanding" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Invoice" : "New Invoice"}</h3><button class="icon-btn" id="closeIF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field"><label>RA Bill No.</label><input id="i_raBill" value="${f.raBill}"/></div>
          <div class="field"><label>Project</label><select id="i_project">${projectNames.map(p=>`<option ${p===f.project?"selected":""}>${p}</option>`).join("")}</select></div>
          <div class="field col-span-2"><label>Client</label><input id="i_client" value="${f.client}"/></div>
          <div class="field"><label>Basic Amount (₹)</label><input type="number" id="i_basic" value="${f.basic}"/></div>
          <div class="field"><label>GST (%)</label><select id="i_gst">${GST_RATES.map(g=>`<option ${g===f.gst?"selected":""}>${g}</option>`).join("")}</select></div>
          <div class="field"><label>TDS (%)</label><input type="number" id="i_tds" value="${f.tds}"/></div>
          <div class="field"><label>Retention (%)</label><input type="number" id="i_retention" value="${f.retention}"/></div>
          <div class="field"><label>Net Payable</label><input type="text" id="i_net" disabled style="background:#F8FAFC;color:#64748b"/></div>
          <div class="field"><label>Due Date</label><input type="date" id="i_dueDate" value="${f.dueDate}"/></div>
          <div class="field"><label>Status</label><select id="i_status">${Object.keys(INV_STATUS_META).map(s=>`<option ${s===f.status?"selected":""}>${s}</option>`).join("")}</select></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelIF">Cancel</button>
          <button class="btn-primary" id="saveIF">${isEdit ? "Save Changes" : "Create Invoice"}</button>
        </div>
      </div>
    </div>`);

  const projSel = node.querySelector("#i_project"), clientI = node.querySelector("#i_client");
  if (!isEdit) clientI.value = clientMap[projSel.value] || "";
  projSel.addEventListener("change", ()=>{ if(!isEdit) clientI.value = clientMap[projSel.value] || ""; });

  const basicI = node.querySelector("#i_basic"), gstI = node.querySelector("#i_gst"), tdsI = node.querySelector("#i_tds"), retI = node.querySelector("#i_retention"), netI = node.querySelector("#i_net");
  const recalc = ()=>{
    const basic = Number(basicI.value)||0, gst=Number(gstI.value)||0, tds=Number(tdsI.value)||0, ret=Number(retI.value)||0;
    netI.value = fmtINR(basic + basic*(gst/100) - basic*(tds/100) - basic*(ret/100));
  };
  [basicI,gstI,tdsI,retI].forEach(i=> i.addEventListener("input", recalc));
  gstI.addEventListener("change", recalc);
  recalc();

  node.querySelector("#closeIF").addEventListener("click", closeModal);
  node.querySelector("#cancelIF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveIF").addEventListener("click", ()=>{
    const payload = {
      raBill: node.querySelector("#i_raBill").value.trim(),
      client: clientI.value.trim() || "Unnamed Client",
      project: projSel.value,
      basic: Number(basicI.value) || 0,
      gst: Number(gstI.value) || 0,
      tds: Number(tdsI.value) || 0,
      retention: Number(retI.value) || 0,
      dueDate: node.querySelector("#i_dueDate").value,
      status: node.querySelector("#i_status").value,
    };
    if (isEdit){
      Object.assign(inv, payload);
      if (payload.status==="Paid") inv.paid = invNet(inv);
      showToast(`${inv.id} updated`);
    } else {
      const id = `INV-${2001 + INVOICES.length}`;
      const newInv = { id, ...payload, paid: payload.status==="Paid" ? invNet(payload) : 0 };
      INVOICES = [newInv, ...INVOICES];
      showToast(`${id} created`);
      state.billing.page = 1;
    }
    closeModal();
    renderInvoicesList();
  });
  openModalNode(node);
}

function openPaymentReceivedModal(inv){
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box">
        <div class="modal-head"><h3>Payment Received — ${inv.id}</h3><button class="icon-btn" id="closePR"><i data-lucide="x"></i></button></div>
        <div class="modal-body">
          <div class="field"><label>Client</label><input type="text" value="${inv.client}" disabled style="background:#F8FAFC;color:#64748b"/></div>
          <div class="field"><label>Balance Due</label><input type="text" value="${fmtINR(invBalance(inv))}" disabled style="background:#F8FAFC;color:#64748b"/></div>
          <div class="field"><label>Amount Received (₹)</label><input type="number" id="pr_amount" placeholder="Enter amount"/></div>
          <div class="field"><label>Mode</label><select id="pr_mode">${PAYMENT_MODES.map(m=>`<option>${m}</option>`).join("")}</select></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelPR">Cancel</button>
          <button class="btn-primary" id="savePR">Save Payment</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closePR").addEventListener("click", closeModal);
  node.querySelector("#cancelPR").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#savePR").addEventListener("click", ()=>{
    const amt = Number(node.querySelector("#pr_amount").value) || 0;
    const mode = node.querySelector("#pr_mode").value;
    inv.paid += amt;
    if (invBalance(inv) <= 0) inv.status = "Paid";
    PAYMENTS = [{ id:`RCP-${501+PAYMENTS.length}`, client:inv.client, invoice:inv.id, amount:amt, mode, date:"2026-08-15" }, ...PAYMENTS];
    closeModal();
    showToast(`Payment of ${fmtINR(amt)} recorded for ${inv.id}`);
    renderInvoicesList();
  });
  openModalNode(node);
}

function renderPaymentsTab(){
  const body = document.getElementById("billingTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="paySearch" placeholder="Search by client or invoice…" value="${state.billing.query}"/></div>
    </div>
    <p class="tiny muted mt-2" id="payResultCount"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr><th>Receipt No.</th><th>Client</th><th>Invoice Ref.</th><th>Amount</th><th>Mode</th><th>Date</th></tr></thead>
        <tbody id="payTbody"></tbody>
      </table>
    </div>
  `;
  document.getElementById("paySearch").addEventListener("input", (e)=>{ state.billing.query=e.target.value; renderPaymentsList(); });
  renderPaymentsList();
  icons();
}

function renderPaymentsList(){
  const filtered = getFilteredPayments();
  document.getElementById("payResultCount").textContent = `${filtered.length} receipts found`;
  const tbody = document.getElementById("payTbody");
  tbody.innerHTML = "";
  if (filtered.length===0){
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No payment receipts match your search.</td></tr>`;
  }
  filtered.forEach(p=>{
    tbody.appendChild(el(`<tr>
      <td style="font-weight:600">${p.id}</td>
      <td>${p.client}</td>
      <td>${p.invoice}</td>
      <td style="font-weight:600;color:#16A34A">${fmtINR(p.amount)}</td>
      <td>${p.mode}</td>
      <td class="tiny">${p.date}</td>
    </tr>`));
  });
  icons();
}

/* ---------------------------- Clients & Vendors module ---------------------------- */
function clientOutstanding(client){
  return INVOICES.filter(i=> i.client===client.company).reduce((s,i)=> s + invBalance(i), 0);
}
function clientContractValue(client){
  return PROJECTS.filter(p=> client.projects.includes(p.name)).reduce((s,p)=> s + p.contract, 0);
}
function vendorOutstanding(vendor){
  return PURCHASE_ORDERS.filter(p=> p.vendor===vendor.name && p.status!=="Cancelled").reduce((s,p)=> s + (p.status==="Delivered" ? 0 : poTotal(p)), 0);
}
function vendorPurchaseTotal(vendor){
  return PURCHASE_ORDERS.filter(p=> p.vendor===vendor.name).reduce((s,p)=> s + poTotal(p), 0);
}
function vendorPOCount(vendor){
  return PURCHASE_ORDERS.filter(p=> p.vendor===vendor.name).length;
}

function getFilteredClients(){
  const { query } = state.parties;
  return CLIENTS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.company.toLowerCase().includes(query.toLowerCase()));
}
function getFilteredVendors(){
  const { query } = state.parties;
  return VENDORS.filter(v => v.name.toLowerCase().includes(query.toLowerCase()) || v.category.toLowerCase().includes(query.toLowerCase()));
}

function renderPartiesModule(){
  const main = document.getElementById("mainContent");
  const totalClientOutstanding = CLIENTS.reduce((s,c)=> s + clientOutstanding(c), 0);
  const totalVendorOutstanding = VENDORS.reduce((s,v)=> s + vendorOutstanding(v), 0);

  main.innerHTML = `
    <section class="grid grid-4" id="partiesSummary"></section>
    <div class="tab-row" id="partiesTabs">
      <button class="btn-secondary" id="tabClients">Clients</button>
      <button class="btn-secondary" id="tabVendors">Vendors</button>
    </div>
    <div id="partiesTabBody"></div>
  `;

  const summaryWrap = document.getElementById("partiesSummary");
  [
    { label:"Total Clients", value:CLIENTS.length, icon:"building-2", tint:"blue" },
    { label:"Client Outstanding", value:fmtINR(totalClientOutstanding), icon:"indian-rupee", tint:"orange" },
    { label:"Total Vendors", value:VENDORS.length, icon:"truck", tint:"navy" },
    { label:"Vendor Outstanding", value:fmtINR(totalVendorOutstanding), icon:"clock", tint:"green" },
  ].forEach(c=>{
    const tint = TINT[c.tint] || TINT.blue;
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  document.getElementById("tabClients").addEventListener("click", ()=>{ state.parties.tab="clients"; state.parties.query=""; renderPartiesTab(); });
  document.getElementById("tabVendors").addEventListener("click", ()=>{ state.parties.tab="vendors"; state.parties.query=""; renderPartiesTab(); });

  renderPartiesTab();
  icons();
}

function renderPartiesTab(){
  document.getElementById("tabClients").classList.toggle("btn-primary", state.parties.tab==="clients");
  document.getElementById("tabClients").classList.toggle("btn-secondary", state.parties.tab!=="clients");
  document.getElementById("tabVendors").classList.toggle("btn-primary", state.parties.tab==="vendors");
  document.getElementById("tabVendors").classList.toggle("btn-secondary", state.parties.tab!=="vendors");
  if (state.parties.tab === "vendors") renderVendorsTab(); else renderClientsTab();
  icons();
}

function renderClientsTab(){
  const body = document.getElementById("partiesTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="clientSearch" placeholder="Search client or company…" value="${state.parties.query}"/></div>
      <button class="btn-primary" id="newClientBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Client</button>
    </div>
    <p class="tiny muted mt-2" id="clientResultCount"></p>
    <div class="grid grid-3 mt-2" id="clientCards"></div>
  `;
  document.getElementById("clientSearch").addEventListener("input", (e)=>{ state.parties.query=e.target.value; renderClientsList(); });
  document.getElementById("newClientBtn").addEventListener("click", ()=> openClientFormModal(null));
  renderClientsList();
  icons();
}

function renderClientsList(){
  const filtered = getFilteredClients();
  document.getElementById("clientResultCount").textContent = `${filtered.length} clients found`;
  const wrap = document.getElementById("clientCards");
  wrap.innerHTML = "";
  filtered.forEach(c=>{
    const outstanding = clientOutstanding(c);
    const contractValue = clientContractValue(c);
    wrap.appendChild(el(`
      <div class="card proj-card">
        <div class="flex-between" style="align-items:flex-start;margin-bottom:6px">
          <div><p style="font-weight:600;font-size:13px;margin:0">${c.company}</p><p style="font-size:11px;color:#64748b;margin:0">${c.name}</p></div>
        </div>
        <p class="tiny muted" style="margin:0 0 10px">${c.phone} · ${c.email}</p>
        <div class="module-rows" style="margin:0 0 10px">
          <div><p class="k">Projects</p><p class="v" style="font-size:12px">${c.projects.join(", ")||"—"}</p></div>
          <div><p class="k">Contract Value</p><p class="v">${fmtINR(contractValue)}</p></div>
        </div>
        <p class="small"><span class="muted">Outstanding:</span> <span class="bold" style="color:${outstanding>0?'#DC2626':'#16A34A'}">${fmtINR(outstanding)}</span></p>
        <div class="row-actions mt-2" style="border-top:1px solid #F1F5F9;padding-top:8px">
          <button class="icon-action" data-act="history" data-id="${c.id}" title="Payment History"><i data-lucide="history"></i></button>
          <button class="icon-action edit" data-act="edit" data-id="${c.id}"><i data-lucide="pencil"></i></button>
          <button class="icon-action del" data-act="del" data-id="${c.id}"><i data-lucide="trash-2"></i></button>
        </div>
      </div>`));
  });
  wrap.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openClientFormModal(CLIENTS.find(c=>c.id===b.dataset.id))));
  wrap.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    CLIENTS = CLIENTS.filter(c=>c.id!==b.dataset.id);
    showToast("Client removed");
    renderClientsList();
  }));
  wrap.querySelectorAll("[data-act='history']").forEach(b=> b.addEventListener("click", ()=> openClientHistoryModal(CLIENTS.find(c=>c.id===b.dataset.id))));
  icons();
}

function openClientFormModal(client){
  const isEdit = !!client;
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const f = client || { name:"", company:"", phone:"", email:"", projects:[] };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Client" : "New Client"}</h3><button class="icon-btn" id="closeCLF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field"><label>Contact Name</label><input id="cl_name" value="${f.name}"/></div>
          <div class="field"><label>Company</label><input id="cl_company" value="${f.company}"/></div>
          <div class="field"><label>Phone</label><input id="cl_phone" value="${f.phone}"/></div>
          <div class="field"><label>Email</label><input id="cl_email" value="${f.email}"/></div>
          <div class="field col-span-2"><label>Project</label>
            <select id="cl_project">${projectNames.map(p=>`<option ${f.projects.includes(p)?"selected":""}>${p}</option>`).join("")}</select>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelCLF">Cancel</button>
          <button class="btn-primary" id="saveCLF">${isEdit ? "Save Changes" : "Add Client"}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeCLF").addEventListener("click", closeModal);
  node.querySelector("#cancelCLF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveCLF").addEventListener("click", ()=>{
    const payload = {
      name: node.querySelector("#cl_name").value.trim() || "Unnamed Contact",
      company: node.querySelector("#cl_company").value.trim() || "Unnamed Company",
      phone: node.querySelector("#cl_phone").value.trim(),
      email: node.querySelector("#cl_email").value.trim(),
      projects: [node.querySelector("#cl_project").value],
    };
    if (isEdit){
      Object.assign(client, payload);
      showToast(`${client.company} updated`);
    } else {
      const id = `CL-${String(CLIENTS.length+1).padStart(2,"0")}`;
      CLIENTS = [{ id, ...payload }, ...CLIENTS];
      showToast(`${payload.company} added`);
    }
    closeModal();
    renderClientsList();
  });
  openModalNode(node);
}

function openClientHistoryModal(client){
  const invs = INVOICES.filter(i=> i.client===client.company);
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>Payment History — ${client.company}</h3><button class="icon-btn" id="closeCH"><i data-lucide="x"></i></button></div>
        <div class="modal-body">
          ${invs.length===0 ? `<p class="small muted">No invoices recorded for this client yet.</p>` :
            `<div style="overflow-x:auto"><table>
              <thead><tr><th>Invoice</th><th>Project</th><th>Net Payable</th><th>Balance</th><th>Status</th></tr></thead>
              <tbody>${invs.map(i=>`<tr>
                <td style="font-weight:600">${i.id}</td><td>${i.project}</td><td>${fmtINR(invNet(i))}</td>
                <td style="color:${invBalance(i)>0?'#DC2626':'#16A34A'}">${fmtINR(invBalance(i))}</td><td>${invPillHTML(i.status)}</td>
              </tr>`).join("")}</tbody>
            </table></div>`}
        </div>
        <div class="modal-foot"><button class="btn-secondary" id="closeCH2">Close</button></div>
      </div>
    </div>`);
  node.querySelector("#closeCH").addEventListener("click", closeModal);
  node.querySelector("#closeCH2").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  openModalNode(node);
  icons();
}

function renderVendorsTab(){
  const body = document.getElementById("partiesTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="vendorSearch" placeholder="Search vendor or category…" value="${state.parties.query}"/></div>
      <button class="btn-primary" id="newVendorBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Vendor</button>
    </div>
    <p class="tiny muted mt-2" id="vendorResultCount"></p>
    <div class="grid grid-3 mt-2" id="vendorCards"></div>
  `;
  document.getElementById("vendorSearch").addEventListener("input", (e)=>{ state.parties.query=e.target.value; renderVendorsList(); });
  document.getElementById("newVendorBtn").addEventListener("click", ()=> openVendorFormModal(null));
  renderVendorsList();
  icons();
}

function renderVendorsList(){
  const filtered = getFilteredVendors();
  document.getElementById("vendorResultCount").textContent = `${filtered.length} vendors found`;
  const wrap = document.getElementById("vendorCards");
  wrap.innerHTML = "";
  filtered.forEach(v=>{
    const outstanding = vendorOutstanding(v);
    const total = vendorPurchaseTotal(v);
    wrap.appendChild(el(`
      <div class="card proj-card">
        <div class="flex-between" style="align-items:flex-start;margin-bottom:6px">
          <div><p style="font-weight:600;font-size:13px;margin:0">${v.name}</p><p style="font-size:11px;color:#64748b;margin:0">${v.category}</p></div>
        </div>
        <p class="tiny muted" style="margin:0 0 10px">GSTIN: ${v.gstin} · ${v.phone}</p>
        <div class="module-rows" style="margin:0 0 10px">
          <div><p class="k">Purchase Orders</p><p class="v">${vendorPOCount(v)}</p></div>
          <div><p class="k">Purchase Value</p><p class="v">${fmtINR(total)}</p></div>
        </div>
        <p class="small"><span class="muted">Outstanding:</span> <span class="bold" style="color:${outstanding>0?'#DC2626':'#16A34A'}">${fmtINR(outstanding)}</span></p>
        <div class="row-actions mt-2" style="border-top:1px solid #F1F5F9;padding-top:8px">
          <button class="icon-action" data-act="history" data-id="${v.id}" title="Purchase History"><i data-lucide="history"></i></button>
          <button class="icon-action edit" data-act="edit" data-id="${v.id}"><i data-lucide="pencil"></i></button>
          <button class="icon-action del" data-act="del" data-id="${v.id}"><i data-lucide="trash-2"></i></button>
        </div>
      </div>`));
  });
  wrap.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openVendorFormModal(VENDORS.find(v=>v.id===b.dataset.id))));
  wrap.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    VENDORS = VENDORS.filter(v=>v.id!==b.dataset.id);
    showToast("Vendor removed");
    renderVendorsList();
  }));
  wrap.querySelectorAll("[data-act='history']").forEach(b=> b.addEventListener("click", ()=> openVendorHistoryModal(VENDORS.find(v=>v.id===b.dataset.id))));
  icons();
}

function openVendorFormModal(vendor){
  const isEdit = !!vendor;
  const f = vendor || { name:"", category:VENDOR_CATEGORIES[0], gstin:"", phone:"" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Vendor" : "New Vendor"}</h3><button class="icon-btn" id="closeVF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field col-span-2"><label>Vendor Name</label><input id="v_name" value="${f.name}"/></div>
          <div class="field"><label>Category</label><select id="v_category">${VENDOR_CATEGORIES.map(c=>`<option ${c===f.category?"selected":""}>${c}</option>`).join("")}</select></div>
          <div class="field"><label>Phone</label><input id="v_phone" value="${f.phone}"/></div>
          <div class="field col-span-2"><label>GSTIN</label><input id="v_gstin" value="${f.gstin}"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelVF">Cancel</button>
          <button class="btn-primary" id="saveVF">${isEdit ? "Save Changes" : "Add Vendor"}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeVF").addEventListener("click", closeModal);
  node.querySelector("#cancelVF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveVF").addEventListener("click", ()=>{
    const payload = {
      name: node.querySelector("#v_name").value.trim() || "Unnamed Vendor",
      category: node.querySelector("#v_category").value,
      phone: node.querySelector("#v_phone").value.trim(),
      gstin: node.querySelector("#v_gstin").value.trim(),
    };
    if (isEdit){
      Object.assign(vendor, payload);
      showToast(`${vendor.name} updated`);
    } else {
      const id = `VN-${String(VENDORS.length+1).padStart(2,"0")}`;
      VENDORS = [{ id, ...payload }, ...VENDORS];
      showToast(`${payload.name} added`);
    }
    closeModal();
    renderVendorsList();
  });
  openModalNode(node);
}

function openVendorHistoryModal(vendor){
  const pos = PURCHASE_ORDERS.filter(p=> p.vendor===vendor.name);
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>Purchase History — ${vendor.name}</h3><button class="icon-btn" id="closeVH"><i data-lucide="x"></i></button></div>
        <div class="modal-body">
          ${pos.length===0 ? `<p class="small muted">No purchase orders recorded for this vendor yet.</p>` :
            `<div style="overflow-x:auto"><table>
              <thead><tr><th>PO No.</th><th>Material</th><th>Project</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>${pos.map(p=>`<tr>
                <td style="font-weight:600">${p.id}</td><td>${p.material}</td><td>${p.project}</td>
                <td>${fmtINR(poTotal(p))}</td><td>${poPillHTML(p.status)}</td>
              </tr>`).join("")}</tbody>
            </table></div>`}
        </div>
        <div class="modal-foot"><button class="btn-secondary" id="closeVH2">Close</button></div>
      </div>
    </div>`);
  node.querySelector("#closeVH").addEventListener("click", closeModal);
  node.querySelector("#closeVH2").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  openModalNode(node);
  icons();
}

/* ---------------------------- Site Management module ---------------------------- */
function issueSevPillHTML(sev){
  const m = ISSUE_SEV_META[sev] || ISSUE_SEV_META["Low"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${sev}</span>`;
}
function issueStatusPillHTML(status){
  const m = ISSUE_STATUS_META[status] || ISSUE_STATUS_META["Open"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${status}</span>`;
}
function siteLastDPR(siteName){
  const rows = DPRS.filter(d=>d.site===siteName).sort((a,b)=> b.date.localeCompare(a.date));
  return rows[0] || null;
}
function siteOpenIssues(siteName){
  return ISSUES.filter(i=> i.site===siteName && i.status!=="Resolved").length;
}
function siteTodayManpower(siteName){
  const rows = ATTENDANCE.filter(a=> a.project===siteName && a.date==="2026-08-14");
  return rows.reduce((s,a)=> s+a.present, 0);
}

function getFilteredDPRs(){
  const { query } = state.site;
  return [...DPRS].filter(d=> d.site.toLowerCase().includes(query.toLowerCase())).sort((a,b)=> b.date.localeCompare(a.date));
}
function getFilteredIssues(){
  const { query } = state.site;
  return [...ISSUES].filter(i=> i.site.toLowerCase().includes(query.toLowerCase()) || i.title.toLowerCase().includes(query.toLowerCase())).sort((a,b)=> b.date.localeCompare(a.date));
}

function renderSiteModule(){
  const main = document.getElementById("mainContent");
  const totalSites = Object.keys(SITE_ENGINEERS).length;
  const openIssues = ISSUES.filter(i=>i.status!=="Resolved").length;
  const highSevIssues = ISSUES.filter(i=>i.severity==="High" && i.status!=="Resolved").length;
  const dprToday = DPRS.filter(d=>d.date==="2026-08-14").length;

  main.innerHTML = `
    <section class="grid grid-4" id="siteSummary"></section>
    <div class="tab-row" id="siteTabs">
      <button class="btn-secondary" id="tabOverview">Sites Overview</button>
      <button class="btn-secondary" id="tabDPR">Daily Progress Reports</button>
      <button class="btn-secondary" id="tabIssues">Issues & Safety</button>
    </div>
    <div id="siteTabBody"></div>
  `;

  const summaryWrap = document.getElementById("siteSummary");
  [
    { label:"Total Sites", value:totalSites, icon:"map-pin", tint:"blue" },
    { label:"DPRs Filed Today", value:dprToday, icon:"clipboard-list", tint:"green" },
    { label:"Open Issues", value:openIssues, icon:"alert-circle", tint:"navy" },
    { label:"High Severity Open", value:highSevIssues, icon:"shield-alert", tint:"orange" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  document.getElementById("tabOverview").addEventListener("click", ()=>{ state.site.tab="overview"; state.site.query=""; renderSiteTab(); });
  document.getElementById("tabDPR").addEventListener("click", ()=>{ state.site.tab="dpr"; state.site.query=""; renderSiteTab(); });
  document.getElementById("tabIssues").addEventListener("click", ()=>{ state.site.tab="issues"; state.site.query=""; renderSiteTab(); });

  renderSiteTab();
  icons();
}

function renderSiteTab(){
  ["tabOverview","tabDPR","tabIssues"].forEach(id=>{
    const tabKey = id==="tabOverview"?"overview": id==="tabDPR"?"dpr":"issues";
    document.getElementById(id).classList.toggle("btn-primary", state.site.tab===tabKey);
    document.getElementById(id).classList.toggle("btn-secondary", state.site.tab!==tabKey);
  });
  if (state.site.tab==="overview") renderSiteOverviewTab();
  else if (state.site.tab==="dpr") renderDPRTab();
  else renderIssuesTab();
  icons();
}

function renderSiteOverviewTab(){
  const body = document.getElementById("siteTabBody");
  body.innerHTML = `<div class="grid grid-3 mt-3" id="siteCards"></div>`;
  const wrap = document.getElementById("siteCards");
  Object.entries(SITE_ENGINEERS).forEach(([site, engineer])=>{
    const last = siteLastDPR(site);
    const openIssues = siteOpenIssues(site);
    const manpower = siteTodayManpower(site);
    wrap.appendChild(el(`
      <div class="card proj-card">
        <div class="flex-between" style="align-items:flex-start;margin-bottom:6px">
          <div><p style="font-weight:600;font-size:13px;margin:0">${site}</p><p style="font-size:11px;color:#64748b;margin:0">Engineer: ${engineer}</p></div>
          ${openIssues>0 ? `<span class="pill" style="color:#DC2626;background:#FEE2E2"><span class="dot-sm" style="background:#DC2626"></span>${openIssues} issue${openIssues>1?"s":""}</span>` : `<span class="pill" style="color:#16A34A;background:#DCFCE7"><span class="dot-sm" style="background:#16A34A"></span>Clear</span>`}
        </div>
        <div class="module-rows" style="margin:10px 0">
          <div><p class="k">Manpower Today</p><p class="v">${manpower}</p></div>
          <div><p class="k">Last DPR</p><p class="v" style="font-size:12px">${last ? last.date : "—"}</p></div>
        </div>
        ${last ? `<p class="tiny muted" style="margin:0 0 10px;line-height:1.4">${last.workDone.slice(0,90)}${last.workDone.length>90?"…":""}</p>` : `<p class="tiny muted" style="margin:0 0 10px">No progress report filed yet.</p>`}
        <button class="link-btn" data-act="viewdpr" data-site="${site}">View Reports <i data-lucide="arrow-right" style="width:13px;height:13px"></i></button>
      </div>`));
  });
  wrap.querySelectorAll("[data-act='viewdpr']").forEach(b=> b.addEventListener("click", ()=>{
    state.site.tab="dpr"; state.site.query=b.dataset.site; renderSiteTab();
  }));
  icons();
}

function renderDPRTab(){
  const body = document.getElementById("siteTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="dprSearch" placeholder="Search by site…" value="${state.site.query}"/></div>
      <button class="btn-primary" id="newDPRBtn"><i data-lucide="camera" style="width:15px;height:15px"></i>Site Upload / New DPR</button>
    </div>
    <p class="tiny muted mt-2" id="dprResultCount"></p>
    <div class="flex-col gap-3 mt-2" id="dprList"></div>
  `;
  document.getElementById("dprSearch").addEventListener("input", (e)=>{ state.site.query=e.target.value; renderDPRList(); });
  document.getElementById("newDPRBtn").addEventListener("click", ()=> openDPRFormModal());
  renderDPRList();
  icons();
}

function renderDPRList(){
  const filtered = getFilteredDPRs();
  document.getElementById("dprResultCount").textContent = `${filtered.length} daily progress reports found`;
  const wrap = document.getElementById("dprList");
  wrap.innerHTML = "";
  if (filtered.length===0){
    wrap.innerHTML = `<div class="card" style="padding:24px;text-align:center;color:#94a3b8;font-size:13px">No progress reports match your search.</div>`;
  }
  filtered.forEach(d=>{
    wrap.appendChild(el(`
      <div class="card" style="padding:16px">
        <div class="flex-between" style="align-items:flex-start">
          <div>
            <p style="font-weight:600;font-size:13px;margin:0">${d.site}</p>
            <p class="tiny muted" style="margin:2px 0 0">${d.date} · ${d.weather} · ${d.manpower} workers on site</p>
          </div>
          <button class="icon-action del" data-id="${d.id}"><i data-lucide="trash-2"></i></button>
        </div>
        <p class="small" style="margin:10px 0 6px"><span class="bold">Work Completed:</span> ${d.workDone}</p>
        <p class="small muted" style="margin:0 0 6px"><span class="bold" style="color:#475569">Material Consumption:</span> ${d.materialNotes}</p>
        <p class="small muted" style="margin:0"><span class="bold" style="color:#475569">Engineer Notes:</span> ${d.notes}</p>
      </div>`));
  });
  wrap.querySelectorAll(".icon-action.del").forEach(b=> b.addEventListener("click", ()=>{
    DPRS = DPRS.filter(d=>d.id!==b.dataset.id);
    showToast("Progress report deleted");
    renderDPRList();
  }));
  icons();
}

function openDPRFormModal(){
  const siteNames = Object.keys(SITE_ENGINEERS);
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>New Daily Progress Report</h3><button class="icon-btn" id="closeDF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field"><label>Site / Project</label><select id="d_site">${siteNames.map(s=>`<option>${s}</option>`).join("")}</select></div>
          <div class="field"><label>Date</label><input type="date" id="d_date" value="2026-08-15"/></div>
          <div class="field"><label>Weather</label><select id="d_weather">${WEATHER_OPTIONS.map(w=>`<option>${w}</option>`).join("")}</select></div>
          <div class="field"><label>Manpower on Site</label><input type="number" id="d_manpower" placeholder="e.g. 25"/></div>
          <div class="field col-span-2"><label>Work Completed Today</label><input id="d_workDone" placeholder="Describe today's progress"/></div>
          <div class="field col-span-2"><label>Material Consumption</label><input id="d_materialNotes" placeholder="e.g. 100 cement bags, 5 Cum sand"/></div>
          <div class="field col-span-2"><label>Engineer Notes</label><input id="d_notes" placeholder="Any observations, delays, or remarks"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelDF">Cancel</button>
          <button class="btn-primary" id="saveDF">Save Report</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeDF").addEventListener("click", closeModal);
  node.querySelector("#cancelDF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveDF").addEventListener("click", ()=>{
    const site = node.querySelector("#d_site").value;
    const payload = {
      site,
      date: node.querySelector("#d_date").value,
      weather: node.querySelector("#d_weather").value,
      manpower: Number(node.querySelector("#d_manpower").value) || 0,
      workDone: node.querySelector("#d_workDone").value.trim() || "No details provided.",
      materialNotes: node.querySelector("#d_materialNotes").value.trim() || "—",
      notes: node.querySelector("#d_notes").value.trim() || "—",
    };
    const id = `DPR-${101 + DPRS.length}`;
    DPRS = [{ id, ...payload }, ...DPRS];
    closeModal();
    showToast(`Progress report saved for ${site}`);
    if (state.site.tab==="dpr") renderDPRList();
  });
  openModalNode(node);
}

function renderIssuesTab(){
  const body = document.getElementById("siteTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="issueSearch" placeholder="Search by site or issue…" value="${state.site.query}"/></div>
      <button class="btn-primary" id="newIssueBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>Report Issue</button>
    </div>
    <p class="tiny muted mt-2" id="issueResultCount"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr><th>Site</th><th>Issue</th><th>Category</th><th>Severity</th><th>Status</th><th>Reported By</th><th>Date</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody id="issueTbody"></tbody>
      </table>
    </div>
  `;
  document.getElementById("issueSearch").addEventListener("input", (e)=>{ state.site.query=e.target.value; renderIssuesList(); });
  document.getElementById("newIssueBtn").addEventListener("click", ()=> openIssueFormModal());
  renderIssuesList();
  icons();
}

function renderIssuesList(){
  const filtered = getFilteredIssues();
  document.getElementById("issueResultCount").textContent = `${filtered.length} issues found`;
  const tbody = document.getElementById("issueTbody");
  tbody.innerHTML = "";
  if (filtered.length===0){
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No issues match your search.</td></tr>`;
  }
  filtered.forEach(i=>{
    tbody.appendChild(el(`<tr>
      <td style="font-weight:600">${i.site}</td>
      <td>${i.title}</td>
      <td class="tiny">${i.category}</td>
      <td>${issueSevPillHTML(i.severity)}</td>
      <td>${issueStatusPillHTML(i.status)}</td>
      <td class="tiny">${i.reportedBy}</td>
      <td class="tiny">${i.date}</td>
      <td><div class="row-actions">
        ${i.status!=="Resolved" ? `<button class="icon-action" data-id="${i.id}" data-act="resolve" title="Mark Resolved"><i data-lucide="check" style="color:#16A34A"></i></button>` : ""}
        <button class="icon-action del" data-id="${i.id}" data-act="del"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>`));
  });
  tbody.querySelectorAll("[data-act='resolve']").forEach(b=> b.addEventListener("click", ()=>{
    const issue = ISSUES.find(i=>i.id===b.dataset.id);
    issue.status = "Resolved";
    showToast(`${issue.id} marked resolved`);
    renderIssuesList();
  }));
  tbody.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    ISSUES = ISSUES.filter(i=>i.id!==b.dataset.id);
    showToast("Issue removed");
    renderIssuesList();
  }));
  icons();
}

function openIssueFormModal(){
  const siteNames = Object.keys(SITE_ENGINEERS);
  const categories = ["Safety Incident", "Material Delay", "Site Issue", "Compliance", "Quality"];
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>Report Issue</h3><button class="icon-btn" id="closeISF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field"><label>Site / Project</label><select id="is_site">${siteNames.map(s=>`<option>${s}</option>`).join("")}</select></div>
          <div class="field"><label>Category</label><select id="is_category">${categories.map(c=>`<option>${c}</option>`).join("")}</select></div>
          <div class="field col-span-2"><label>Issue Title</label><input id="is_title" placeholder="Briefly describe the issue"/></div>
          <div class="field"><label>Severity</label><select id="is_severity">${Object.keys(ISSUE_SEV_META).map(s=>`<option>${s}</option>`).join("")}</select></div>
          <div class="field"><label>Reported By</label><input id="is_reportedBy" placeholder="Engineer / Supervisor name"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelISF">Cancel</button>
          <button class="btn-primary" id="saveISF">Save Issue</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeISF").addEventListener("click", closeModal);
  node.querySelector("#cancelISF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveISF").addEventListener("click", ()=>{
    const payload = {
      site: node.querySelector("#is_site").value,
      title: node.querySelector("#is_title").value.trim() || "Untitled Issue",
      category: node.querySelector("#is_category").value,
      severity: node.querySelector("#is_severity").value,
      status: "Open",
      reportedBy: node.querySelector("#is_reportedBy").value.trim() || "Unknown",
      date: "2026-08-15",
    };
    const id = `ISS-${201 + ISSUES.length}`;
    ISSUES = [{ id, ...payload }, ...ISSUES];
    closeModal();
    showToast(`Issue reported for ${payload.site}`);
    if (state.site.tab==="issues") renderIssuesList();
  });
  openModalNode(node);
}

/* ---------------------------- Reports & Analytics module ---------------------------- */
const REPORT_DEFS = [
  {
    id:"cost", title:"Project Cost Report", icon:"indian-rupee",
    desc:"Contract value vs billed amount and completion by project.",
    columns:[["name","Project"],["client","Client"],["contract","Contract Value",true],["billed","Billed Amount",true],["completion","Completion %"]],
    rows:()=> PROJECTS.map(p=>({ name:p.name, client:p.client, project:p.name, contract:p.contract, billed:p.billed, completion:p.completion+"%" })),
  },
  {
    id:"profit", title:"Profitability Report", icon:"trending-up",
    desc:"Estimated profit or loss per project (₹ Lakh).",
    columns:[["name","Project"],["profitL","Profit / Loss (₹ L)"],["margin","Margin %"]],
    rows:()=> PROJECTS.map((p,i)=>{ const val = PROFIT_VALUES[i % PROFIT_VALUES.length]; return { name:p.name, project:p.name, profitL:(val>=0?"+":"")+val+" L", margin:((val*100000)/p.contract*100).toFixed(1)+"%" }; }),
  },
  {
    id:"boq", title:"BOQ Variance", icon:"calculator",
    desc:"Estimated vs actual cost by BOQ line item.",
    columns:[["id","BOQ No."],["item","Item"],["project","Project"],["est","Estimated",true],["actual","Actual",true],["variance","Variance",true]],
    rows:()=> BOQS.map(b=>({ id:b.id, item:b.item, project:b.project, est:boqEstAmount(b), actual:b.actual||0, variance:boqVariance(b) })),
  },
  {
    id:"purchase", title:"Purchase Report", icon:"shopping-cart",
    desc:"All purchase orders with value and status.",
    columns:[["id","PO No."],["vendor","Vendor"],["project","Project"],["material","Material"],["total","Total Value",true],["status","Status"]],
    rows:()=> PURCHASE_ORDERS.map(p=>({ id:p.id, vendor:p.vendor, project:p.project, material:p.material, total:poTotal(p), status:p.status })),
  },
  {
    id:"inventory", title:"Inventory Report", icon:"boxes",
    desc:"Stock position and low-stock materials.",
    columns:[["material","Material"],["available","Available"],["reorder","Reorder Level"],["flag","Status"]],
    rows:()=> INVENTORY.map(i=>({ material:i.material, available:invAvailable(i)+" "+i.unit, reorder:i.reorder+" "+i.unit, flag: invLowStock(i) ? "Low Stock" : "OK" })),
  },
  {
    id:"labour", title:"Labour Report", icon:"hard-hat",
    desc:"Attendance and wage payable by contractor and date.",
    columns:[["date","Date"],["contractor","Contractor"],["project","Project"],["present","Present"],["absent","Absent"],["wage","Wage Payable",true]],
    rows:()=> ATTENDANCE.map(a=>({ date:a.date, contractor:a.contractor, project:a.project, present:a.present, absent:a.absent, wage:attWage(a) })),
  },
  {
    id:"contractor", title:"Contractor Report", icon:"users",
    desc:"Billing, advances, and outstanding by contractor.",
    columns:[["name","Contractor"],["trade","Trade"],["project","Project"],["totalBilled","Total Billed",true],["advance","Advance Paid",true],["outstanding","Outstanding",true]],
    rows:()=> CONTRACTORS.map(c=>({ name:c.name, trade:c.trade, project:c.project, totalBilled:c.totalBilled, advance:c.advance, outstanding:c.outstanding })),
  },
  {
    id:"billing", title:"Billing Report", icon:"file-text",
    desc:"All client invoices with GST, TDS, and retention.",
    columns:[["id","Invoice"],["client","Client"],["project","Project"],["basic","Basic Amount",true],["net","Net Payable",true],["status","Status"]],
    rows:()=> INVOICES.map(i=>({ id:i.id, client:i.client, project:i.project, basic:i.basic, net:invNet(i), status:i.status })),
  },
  {
    id:"collection", title:"Collection Report", icon:"credit-card",
    desc:"All payments received from clients.",
    columns:[["id","Receipt No."],["client","Client"],["invoice","Invoice Ref."],["amount","Amount",true],["mode","Mode"],["date","Date"]],
    rows:()=> PAYMENTS.map(p=>({ id:p.id, client:p.client, invoice:p.invoice, amount:p.amount, mode:p.mode, date:p.date })),
  },
  {
    id:"outstanding", title:"Outstanding Report", icon:"clock",
    desc:"Invoices with a pending balance, oldest first.",
    columns:[["id","Invoice"],["client","Client"],["project","Project"],["balance","Balance Due",true],["dueDate","Due Date"],["status","Status"]],
    rows:()=> INVOICES.filter(i=> invBalance(i)>0).sort((a,b)=> a.dueDate.localeCompare(b.dueDate)).map(i=>({ id:i.id, client:i.client, project:i.project, balance:invBalance(i), dueDate:i.dueDate, status:i.status })),
  },
  {
    id:"cashflow", title:"Cash Flow Report", icon:"trending-up",
    desc:"Monthly cash inflow vs outflow (₹ Crore).",
    columns:[["month","Month"],["inflow","Inflow (₹ Cr)"],["outflow","Outflow (₹ Cr)"],["net","Net (₹ Cr)"]],
    rows:()=> CASHFLOW_LABELS.map((m,i)=>({ month:m, inflow:CASHFLOW_IN[i], outflow:CASHFLOW_OUT[i], net:(CASHFLOW_IN[i]-CASHFLOW_OUT[i]).toFixed(2) })),
  },
  {
    id:"gst", title:"GST Report", icon:"file-text",
    desc:"Output GST (sales) vs Input GST (purchases).",
    columns:[["ref","Reference"],["party","Party"],["type","Type"],["taxable","Taxable Value",true],["gstAmt","GST Amount",true]],
    rows:()=> [
      ...INVOICES.map(i=>({ ref:i.id, party:i.client, type:"Output (Sales)", taxable:i.basic, gstAmt:i.basic*(i.gst/100) })),
      ...PURCHASE_ORDERS.map(p=>({ ref:p.id, party:p.vendor, type:"Input (Purchase)", taxable:p.qty*p.rate, gstAmt:p.qty*p.rate*(p.gst/100) })),
    ],
  },
  {
    id:"expense", title:"Expense Report", icon:"wallet",
    desc:"Material and labour cost by project (approx.).",
    columns:[["project","Project"],["materialCost","Material Cost",true],["labourCost","Labour Cost",true],["total","Total Expense",true]],
    rows:()=> [...new Set(PROJECTS.map(p=>p.name))].map(proj=>{
      const materialCost = PURCHASE_ORDERS.filter(p=>p.project===proj).reduce((s,p)=> s+poTotal(p), 0);
      const labourCost = CONTRACTORS.filter(c=>c.project===proj).reduce((s,c)=> s+c.totalBilled, 0);
      return { project:proj, materialCost, labourCost, total:materialCost+labourCost };
    }),
  },
];

function reportFmtCell(val, isCurrency){
  if (isCurrency) return fmtINR(Number(val)||0);
  return val;
}

function getReportDef(id){ return REPORT_DEFS.find(r=>r.id===id) || REPORT_DEFS[0]; }

function renderReportsModule(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <div class="card" style="padding:16px">
      <h3 class="section-title mt-0">Management Dashboard</h3>
      <p class="tiny muted" style="margin:4px 0 12px">Top-level snapshot across all modules</p>
      <div class="grid grid-6" id="mgmtKpis"></div>
    </div>

    <div class="reports-layout" id="reportsLayout">
      <div class="card reports-nav" id="reportListWrap" style="padding:10px"></div>
      <div style="flex:1;min-width:0" id="reportBody"></div>
    </div>
  `;

  const mgmtWrap = document.getElementById("mgmtKpis");
  [
    { label:"Contract Value", value:fmtINR(PROJECTS.reduce((s,p)=>s+p.contract,0)), icon:"indian-rupee" },
    { label:"Billed Amount", value:fmtINR(PROJECTS.reduce((s,p)=>s+p.billed,0)), icon:"file-text" },
    { label:"Outstanding", value:fmtINR(INVOICES.reduce((s,i)=>s+invBalance(i),0)), icon:"clock" },
    { label:"Purchase Value", value:fmtINR(PURCHASE_ORDERS.reduce((s,p)=>s+poTotal(p),0)), icon:"shopping-cart" },
    { label:"Contractor Outstanding", value:fmtINR(CONTRACTORS.reduce((s,c)=>s+c.outstanding,0)), icon:"hard-hat" },
    { label:"Open Site Issues", value:ISSUES.filter(i=>i.status!=="Resolved").length, icon:"alert-circle" },
  ].forEach(k=>{
    mgmtWrap.insertAdjacentHTML("beforeend", `
      <div class="mini-kpi" style="border:1px solid #F1F5F9;border-radius:12px">
        <div class="mini-kpi-icon"><i data-lucide="${k.icon}"></i></div>
        <div><p class="mini-kpi-value">${k.value}</p><p class="mini-kpi-label">${k.label}</p></div>
      </div>`);
  });

  const listWrap = document.getElementById("reportListWrap");
  REPORT_DEFS.forEach(r=>{
    const btn = el(`<button class="nav-item" style="color:#334155" data-id="${r.id}"><i data-lucide="${r.icon}"></i><span>${r.title}</span></button>`);
    btn.addEventListener("click", ()=>{ state.reports.active = r.id; renderReportBody(); });
    listWrap.appendChild(btn);
  });

  renderReportBody();
  icons();
}

function renderReportBody(){
  document.querySelectorAll("#reportListWrap .nav-item").forEach(b=>{
    b.classList.toggle("active", b.dataset.id===state.reports.active);
    b.style.color = b.dataset.id===state.reports.active ? "#fff" : "#334155";
  });

  const def = getReportDef(state.reports.active);
  const allRows = def.rows();
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const hasProjectCol = allRows.length>0 && "project" in allRows[0];
  const filteredRows = (hasProjectCol && state.reports.project!=="All")
    ? allRows.filter(r=> r.project===state.reports.project)
    : allRows;

  const body = document.getElementById("reportBody");
  body.innerHTML = `
    <div class="card" style="padding:16px">
      <div class="flex-between" style="align-items:flex-start;flex-wrap:wrap;gap:10px">
        <div>
          <h3 class="section-title" style="margin:0">${def.title}</h3>
          <p class="tiny muted" style="margin:4px 0 0">${def.desc}</p>
        </div>
        <div class="flex gap-2" style="flex-wrap:wrap">
          ${hasProjectCol ? `<select id="reportProjectFilter"><option>All</option>${projectNames.map(p=>`<option ${p===state.reports.project?"selected":""}>${p}</option>`).join("")}</select>` : ""}
          <select id="reportFY"><option>FY 2025-26</option><option>FY 2024-25</option></select>
          <button class="btn-secondary" id="reportPdfBtn"><i data-lucide="file-down" style="width:14px;height:14px"></i> PDF</button>
          <button class="btn-secondary" id="reportExcelBtn"><i data-lucide="download" style="width:14px;height:14px"></i> Excel</button>
          <button class="btn-secondary" id="reportPrintBtn"><i data-lucide="printer" style="width:14px;height:14px"></i> Print</button>
        </div>
      </div>
      <p class="tiny muted mt-3" id="reportRowCount"></p>
      <div style="overflow-x:auto" class="mt-2">
        <table id="reportTable">
          <thead><tr>${def.columns.map(([,label])=>`<th>${label}</th>`).join("")}</tr></thead>
          <tbody id="reportTbody"></tbody>
        </table>
      </div>
    </div>
  `;

  if (hasProjectCol){
    document.getElementById("reportProjectFilter").addEventListener("change", (e)=>{ state.reports.project = e.target.value; renderReportBody(); });
  }
  document.getElementById("reportPdfBtn").addEventListener("click", ()=> showToast(`${def.title} exported as PDF`));
  document.getElementById("reportExcelBtn").addEventListener("click", ()=> showToast(`${def.title} exported as Excel`));
  document.getElementById("reportPrintBtn").addEventListener("click", ()=> window.print());

  document.getElementById("reportRowCount").textContent = `${filteredRows.length} records`;
  const tbody = document.getElementById("reportTbody");
  tbody.innerHTML = "";
  if (filteredRows.length===0){
    tbody.innerHTML = `<tr><td colspan="${def.columns.length}" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No records for this filter.</td></tr>`;
  }
  filteredRows.forEach(row=>{
    const tds = def.columns.map(([key,,isCurrency])=> `<td>${reportFmtCell(row[key], isCurrency)}</td>`).join("");
    tbody.insertAdjacentHTML("beforeend", `<tr>${tds}</tr>`);
  });
  icons();
}

/* ---------------------------- Documents module ---------------------------- */
function getFilteredDocuments(){
  const { query, project, category } = state.docs;
  return [...DOCUMENTS].filter(d =>
    (project==="All" || d.project===project) &&
    (category==="All" || d.category===category) &&
    d.name.toLowerCase().includes(query.toLowerCase())
  ).sort((a,b)=> b.date.localeCompare(a.date));
}

function renderDocumentsModule(){
  const main = document.getElementById("mainContent");
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const totalSize = DOCUMENTS.length;
  const categoryCount = new Set(DOCUMENTS.map(d=>d.category)).size;
  const recentUploads = DOCUMENTS.filter(d=> d.date >= "2026-08-01").length;

  main.innerHTML = `
    <section class="grid grid-4" id="docsSummary"></section>

    <div class="toolbar">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="docSearch" placeholder="Search documents by name…" value="${state.docs.query}"/></div>
      <select id="docProjectFilter"></select>
      <select id="docCategoryFilter"></select>
      <button class="btn-primary" id="uploadDocBtn"><i data-lucide="upload" style="width:15px;height:15px"></i>Upload Document</button>
    </div>
    <p class="tiny muted" id="docResultCount"></p>

    <div class="grid grid-4" id="docCards" style="align-items:stretch"></div>

    <div class="pagination" id="docPagination" style="display:none">
      <p class="tiny muted" id="docPageInfo"></p>
      <div class="flex gap-2"><button class="pg-btn" id="docPrevPage"><i data-lucide="chevron-left"></i></button><button class="pg-btn" id="docNextPage"><i data-lucide="chevron-right"></i></button></div>
    </div>
  `;

  const summaryWrap = document.getElementById("docsSummary");
  [
    { label:"Total Documents", value:totalSize, icon:"file-text", tint:"blue" },
    { label:"Categories", value:categoryCount, icon:"folder-kanban", tint:"navy" },
    { label:"Uploaded This Month", value:recentUploads, icon:"upload", tint:"green" },
    { label:"Linked Projects", value:projectNames.length, icon:"building-2", tint:"orange" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  const projFilter = document.getElementById("docProjectFilter");
  projFilter.innerHTML = `<option>All</option>` + projectNames.map(p=>`<option>${p}</option>`).join("");
  projFilter.value = state.docs.project;
  const catFilter = document.getElementById("docCategoryFilter");
  catFilter.innerHTML = `<option>All</option>` + DOC_CATEGORIES.map(c=>`<option>${c}</option>`).join("");
  catFilter.value = state.docs.category;

  document.getElementById("docSearch").addEventListener("input", (e)=>{ state.docs.query=e.target.value; state.docs.page=1; renderDocumentsList(); });
  projFilter.addEventListener("change", (e)=>{ state.docs.project=e.target.value; state.docs.page=1; renderDocumentsList(); });
  catFilter.addEventListener("change", (e)=>{ state.docs.category=e.target.value; state.docs.page=1; renderDocumentsList(); });
  document.getElementById("uploadDocBtn").addEventListener("click", ()=> openDocUploadModal());

  renderDocumentsList();
  icons();
}

function renderDocumentsList(){
  const filtered = getFilteredDocuments();
  const { pageSize } = state.docs;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.docs.page > totalPages) state.docs.page = totalPages;
  const pageRows = filtered.slice((state.docs.page-1)*pageSize, state.docs.page*pageSize);

  document.getElementById("docResultCount").textContent = `${filtered.length} documents found`;
  const wrap = document.getElementById("docCards");
  wrap.innerHTML = "";
  if (pageRows.length===0){
    wrap.innerHTML = `<div class="card" style="padding:36px;text-align:center;color:#94a3b8;font-size:13px;grid-column:1/-1">No documents match your filters.</div>`;
  }
  pageRows.forEach(d=>{
    const tint = DOC_TYPE_TINT[d.type] || DOC_TYPE_TINT.pdf;
    const icon = DOC_TYPE_ICON[d.type] || "file-text";
    wrap.appendChild(el(`
      <div class="card" style="padding:14px;display:flex;flex-direction:column">
        <div class="flex gap-2" style="align-items:flex-start;margin-bottom:10px">
          <div class="kpi-icon" style="width:36px;height:36px;background:${tint.bg};color:${tint.fg};flex-shrink:0"><i data-lucide="${icon}" style="width:17px;height:17px"></i></div>
          <div style="min-width:0">
            <p style="font-size:12.5px;font-weight:600;margin:0;line-height:1.3;word-break:break-word">${d.name}</p>
          </div>
        </div>
        <p class="tiny muted" style="margin:0 0 2px">${d.project}</p>
        <span class="pill" style="color:#475569;background:#F1F5F9;align-self:flex-start;margin:4px 0 8px">${d.category}</span>
        <div class="flex-between tiny muted" style="margin-top:auto;padding-top:8px;border-top:1px solid #F1F5F9">
          <span>${d.size}</span><span>${d.date}</span>
        </div>
        <p class="tiny muted" style="margin:4px 0 8px">By ${d.uploadedBy}</p>
        <div class="row-actions">
          <button class="icon-action" data-act="download" data-id="${d.id}" title="Download"><i data-lucide="download"></i></button>
          <button class="icon-action del" data-act="del" data-id="${d.id}" title="Delete"><i data-lucide="trash-2"></i></button>
        </div>
      </div>`));
  });
  wrap.querySelectorAll("[data-act='download']").forEach(b=> b.addEventListener("click", ()=>{
    const d = DOCUMENTS.find(x=>x.id===b.dataset.id);
    showToast(`Downloading ${d.name}`);
  }));
  wrap.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    const d = DOCUMENTS.find(x=>x.id===b.dataset.id);
    DOCUMENTS = DOCUMENTS.filter(x=>x.id!==b.dataset.id);
    showToast(`${d.name} deleted`);
    renderDocumentsList();
  }));

  const pag = document.getElementById("docPagination");
  if (totalPages > 1){
    pag.style.display = "flex";
    document.getElementById("docPageInfo").textContent = `Page ${state.docs.page} of ${totalPages}`;
    const prev = document.getElementById("docPrevPage"), next = document.getElementById("docNextPage");
    prev.disabled = state.docs.page===1; next.disabled = state.docs.page===totalPages;
    prev.onclick = ()=>{ state.docs.page--; renderDocumentsList(); icons(); };
    next.onclick = ()=>{ state.docs.page++; renderDocumentsList(); icons(); };
  } else { pag.style.display = "none"; }
  icons();
}

function openDocUploadModal(){
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>Upload Document</h3><button class="icon-btn" id="closeDU"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field col-span-2"><label>File Name</label><input id="du_name" placeholder="e.g. Contract Agreement.pdf"/></div>
          <div class="field"><label>Project</label><select id="du_project">${projectNames.map(p=>`<option>${p}</option>`).join("")}</select></div>
          <div class="field"><label>Category</label><select id="du_category">${DOC_CATEGORIES.map(c=>`<option>${c}</option>`).join("")}</select></div>
          <div class="field"><label>File Type</label><select id="du_type">${Object.keys(DOC_TYPE_ICON).map(t=>`<option>${t}</option>`).join("")}</select></div>
          <div class="field"><label>Uploaded By</label><input id="du_by" value="Admin User"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelDU">Cancel</button>
          <button class="btn-primary" id="saveDU">Upload</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeDU").addEventListener("click", closeModal);
  node.querySelector("#cancelDU").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveDU").addEventListener("click", ()=>{
    const type = node.querySelector("#du_type").value;
    let name = node.querySelector("#du_name").value.trim() || `Untitled.${type}`;
    if (!name.toLowerCase().endsWith("."+type)) name += "."+type;
    const payload = {
      name,
      project: node.querySelector("#du_project").value,
      category: node.querySelector("#du_category").value,
      type,
      size: (Math.random()*8+0.2).toFixed(1)+" MB",
      uploadedBy: node.querySelector("#du_by").value.trim() || "Admin User",
      date: "2026-08-15",
    };
    const id = `DOC-${String(DOCUMENTS.length+1).padStart(3,"0")}`;
    DOCUMENTS = [{ id, ...payload }, ...DOCUMENTS];
    closeModal();
    showToast(`${payload.name} uploaded`);
    state.docs.page = 1;
    renderDocumentsList();
  });
  openModalNode(node);
}

/* ---------------------------- HR & Payroll module ---------------------------- */
function payrollPillHTML(status){
  const m = PAYROLL_STATUS_META[status] || PAYROLL_STATUS_META["Pending"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${status}</span>`;
}
function getFilteredEmployees(){
  const { query } = state.hr;
  return EMPLOYEES.filter(e => e.name.toLowerCase().includes(query.toLowerCase()) || e.role.toLowerCase().includes(query.toLowerCase()));
}
function getFilteredPayroll(){
  const { query } = state.hr;
  return PAYROLL.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.role.toLowerCase().includes(query.toLowerCase()));
}

function renderHRModule(){
  const main = document.getElementById("mainContent");
  const totalPayroll = PAYROLL.reduce((s,p)=> s + payrollNet(p.basic,p.allowances), 0);
  const pendingCount = PAYROLL.filter(p=>p.status==="Pending").length;

  main.innerHTML = `
    <section class="grid grid-4" id="hrSummary"></section>
    <div class="tab-row" id="hrTabs">
      <button class="btn-secondary" id="tabEmployees">Employees</button>
      <button class="btn-secondary" id="tabPayroll">Payroll</button>
    </div>
    <div id="hrTabBody"></div>
  `;

  const summaryWrap = document.getElementById("hrSummary");
  [
    { label:"Total Employees", value:EMPLOYEES.length, icon:"user-cog", tint:"blue" },
    { label:"Roles", value:new Set(EMPLOYEES.map(e=>e.role)).size, icon:"users", tint:"navy" },
    { label:"Monthly Payroll", value:fmtINR(totalPayroll), icon:"indian-rupee", tint:"green" },
    { label:"Pending Payouts", value:pendingCount, icon:"clock", tint:"orange" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  document.getElementById("tabEmployees").addEventListener("click", ()=>{ state.hr.tab="employees"; state.hr.query=""; renderHRTab(); });
  document.getElementById("tabPayroll").addEventListener("click", ()=>{ state.hr.tab="payroll"; state.hr.query=""; renderHRTab(); });

  renderHRTab();
  icons();
}

function renderHRTab(){
  document.getElementById("tabEmployees").classList.toggle("btn-primary", state.hr.tab==="employees");
  document.getElementById("tabEmployees").classList.toggle("btn-secondary", state.hr.tab!=="employees");
  document.getElementById("tabPayroll").classList.toggle("btn-primary", state.hr.tab==="payroll");
  document.getElementById("tabPayroll").classList.toggle("btn-secondary", state.hr.tab!=="payroll");
  if (state.hr.tab === "payroll") renderPayrollTab(); else renderEmployeesTab();
  icons();
}

function renderEmployeesTab(){
  const body = document.getElementById("hrTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="empSearch" placeholder="Search by name or role…" value="${state.hr.query}"/></div>
      <button class="btn-primary" id="newEmployeeBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Employee</button>
    </div>
    <p class="tiny muted mt-2" id="empResultCount"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr><th>Employee</th><th>Role</th><th>Department</th><th>Project</th><th>Contact</th><th>Monthly Salary</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody id="empTbody"></tbody>
      </table>
    </div>
  `;
  document.getElementById("empSearch").addEventListener("input", (e)=>{ state.hr.query=e.target.value; renderEmployeesList(); });
  document.getElementById("newEmployeeBtn").addEventListener("click", ()=> openEmployeeFormModal(null));
  renderEmployeesList();
  icons();
}

function renderEmployeesList(){
  const filtered = getFilteredEmployees();
  document.getElementById("empResultCount").textContent = `${filtered.length} employees found`;
  const tbody = document.getElementById("empTbody");
  tbody.innerHTML = "";
  if (filtered.length===0){
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No employees match your search.</td></tr>`;
  }
  filtered.forEach(e=>{
    tbody.appendChild(el(`<tr>
      <td><p style="font-weight:600;margin:0">${e.name}</p><p class="tiny muted" style="margin:0">${e.id} · Joined ${e.joinDate}</p></td>
      <td><span class="pill" style="color:#2563EB;background:#DBEAFE">${e.role}</span></td>
      <td>${e.department}</td>
      <td class="tiny">${e.project}</td>
      <td class="tiny">${e.phone}<br/><span class="muted">${e.email}</span></td>
      <td style="font-weight:600">${fmtINR(e.salary)}</td>
      <td><div class="row-actions">
        <button class="icon-action edit" data-id="${e.id}" data-act="edit"><i data-lucide="pencil"></i></button>
        <button class="icon-action del" data-id="${e.id}" data-act="del"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>`));
  });
  tbody.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openEmployeeFormModal(EMPLOYEES.find(e=>e.id===b.dataset.id))));
  tbody.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    EMPLOYEES = EMPLOYEES.filter(e=>e.id!==b.dataset.id);
    PAYROLL = PAYROLL.filter(p=>p.empId!==b.dataset.id);
    showToast("Employee removed");
    renderEmployeesList();
  }));
  icons();
}

function openEmployeeFormModal(emp){
  const isEdit = !!emp;
  const projectNames = ["—", ...new Set(PROJECTS.map(p=>p.name))];
  const f = emp || { name:"", role:ROLES[0], department:DEPARTMENTS[0], project:"—", phone:"", email:"", joinDate:"", salary:"" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Employee" : "New Employee"}</h3><button class="icon-btn" id="closeEF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field col-span-2"><label>Full Name</label><input id="e_name" value="${f.name}"/></div>
          <div class="field"><label>Role</label><select id="e_role">${ROLES.map(r=>`<option ${r===f.role?"selected":""}>${r}</option>`).join("")}</select></div>
          <div class="field"><label>Department</label><select id="e_department">${DEPARTMENTS.map(d=>`<option ${d===f.department?"selected":""}>${d}</option>`).join("")}</select></div>
          <div class="field"><label>Assigned Project</label><select id="e_project">${projectNames.map(p=>`<option ${p===f.project?"selected":""}>${p}</option>`).join("")}</select></div>
          <div class="field"><label>Monthly Salary (₹)</label><input type="number" id="e_salary" value="${f.salary}"/></div>
          <div class="field"><label>Phone</label><input id="e_phone" value="${f.phone}"/></div>
          <div class="field"><label>Email</label><input id="e_email" value="${f.email}"/></div>
          <div class="field col-span-2"><label>Join Date</label><input type="date" id="e_joinDate" value="${f.joinDate}"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelEF">Cancel</button>
          <button class="btn-primary" id="saveEF">${isEdit ? "Save Changes" : "Add Employee"}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeEF").addEventListener("click", closeModal);
  node.querySelector("#cancelEF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveEF").addEventListener("click", ()=>{
    const payload = {
      name: node.querySelector("#e_name").value.trim() || "Unnamed Employee",
      role: node.querySelector("#e_role").value,
      department: node.querySelector("#e_department").value,
      project: node.querySelector("#e_project").value,
      salary: Number(node.querySelector("#e_salary").value) || 0,
      phone: node.querySelector("#e_phone").value.trim(),
      email: node.querySelector("#e_email").value.trim(),
      joinDate: node.querySelector("#e_joinDate").value,
    };
    if (isEdit){
      Object.assign(emp, payload);
      showToast(`${emp.name} updated`);
    } else {
      const id = `EMP-${String(EMPLOYEES.length+1).padStart(3,"0")}`;
      EMPLOYEES = [{ id, ...payload }, ...EMPLOYEES];
      PAYROLL = [{ id:`PAY-${String(PAYROLL.length+1).padStart(3,"0")}`, empId:id, name:payload.name, role:payload.role, month:"August 2026", basic:payload.salary, allowances:Math.round(payload.salary*0.15), status:"Pending" }, ...PAYROLL];
      showToast(`${payload.name} added`);
    }
    closeModal();
    renderEmployeesList();
  });
  openModalNode(node);
}

function renderPayrollTab(){
  const body = document.getElementById("hrTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="paySearch2" placeholder="Search by name or role…" value="${state.hr.query}"/></div>
      <button class="btn-primary" id="runPayrollBtn"><i data-lucide="play" style="width:15px;height:15px"></i>Run Payroll</button>
    </div>
    <p class="tiny muted mt-2" id="payResultCount2"></p>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr><th>Employee</th><th>Role</th><th>Month</th><th>Basic</th><th>Allowances</th><th>PF (12%)</th><th>TDS</th><th>Net Pay</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody id="payTbody2"></tbody>
      </table>
    </div>
  `;
  document.getElementById("paySearch2").addEventListener("input", (e)=>{ state.hr.query=e.target.value; renderPayrollList(); });
  document.getElementById("runPayrollBtn").addEventListener("click", ()=>{
    let count = 0;
    PAYROLL.forEach(p=>{ if (p.status==="Pending"){ p.status="Paid"; count++; } });
    showToast(count>0 ? `Payroll processed for ${count} employees` : "All payroll already processed");
    renderPayrollList();
  });
  renderPayrollList();
  icons();
}

function renderPayrollList(){
  const filtered = getFilteredPayroll();
  document.getElementById("payResultCount2").textContent = `${filtered.length} payroll records found`;
  const tbody = document.getElementById("payTbody2");
  tbody.innerHTML = "";
  if (filtered.length===0){
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">No payroll records match your search.</td></tr>`;
  }
  filtered.forEach(p=>{
    const d = payrollDeductions(p.basic);
    const net = payrollNet(p.basic, p.allowances);
    tbody.appendChild(el(`<tr>
      <td style="font-weight:600">${p.name}</td>
      <td class="tiny">${p.role}</td>
      <td class="tiny">${p.month}</td>
      <td>${fmtINR(p.basic)}</td>
      <td>${fmtINR(p.allowances)}</td>
      <td style="color:#DC2626">-${fmtINR(d.pf)}</td>
      <td style="color:#DC2626">${d.tds>0?"-"+fmtINR(d.tds):"—"}</td>
      <td style="font-weight:600">${fmtINR(net)}</td>
      <td>${payrollPillHTML(p.status)}</td>
      <td><div class="row-actions">
        ${p.status==="Pending" ? `<button class="icon-action" data-id="${p.id}" data-act="pay" title="Mark Paid"><i data-lucide="check" style="color:#16A34A"></i></button>` : ""}
      </div></td>
    </tr>`));
  });
  tbody.querySelectorAll("[data-act='pay']").forEach(b=> b.addEventListener("click", ()=>{
    const p = PAYROLL.find(x=>x.id===b.dataset.id);
    p.status = "Paid";
    showToast(`Payroll marked paid for ${p.name}`);
    renderPayrollList();
  }));
  icons();
}

/* ---------------------------- Equipment module ---------------------------- */
function equipPillHTML(status){
  const m = EQUIP_STATUS_META[status] || EQUIP_STATUS_META["Idle"];
  return `<span class="pill" style="color:${m.fg};background:${m.bg}"><span class="dot-sm" style="background:${m.fg}"></span>${status}</span>`;
}
function equipServiceDue(item){ return item.nextService <= "2026-08-20"; }

function getFilteredEquipment(){
  const { query, status } = state.equip;
  return EQUIPMENT.filter(e =>
    (status==="All" || e.status===status) &&
    (e.name.toLowerCase().includes(query.toLowerCase()) || e.category.toLowerCase().includes(query.toLowerCase()) || e.project.toLowerCase().includes(query.toLowerCase()))
  );
}

function renderEquipmentModule(){
  const main = document.getElementById("mainContent");
  const deployed = EQUIPMENT.filter(e=>e.status==="Deployed").length;
  const maintenance = EQUIPMENT.filter(e=>e.status==="Under Maintenance").length;
  const dueSoon = EQUIPMENT.filter(equipServiceDue).length;

  main.innerHTML = `
    <section class="grid grid-4" id="equipSummary"></section>
    <div class="toolbar">
      <div class="search-wrap"><i data-lucide="search"></i><input type="text" id="equipSearch" placeholder="Search equipment, category, or project…" value="${state.equip.query}"/></div>
      <select id="equipStatusFilter"></select>
      <button class="btn-primary" id="newEquipBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New Equipment</button>
    </div>
    <p class="tiny muted" id="equipResultCount"></p>
    <div class="grid grid-3" id="equipCards"></div>
    <div class="pagination" id="equipPagination" style="display:none">
      <p class="tiny muted" id="equipPageInfo"></p>
      <div class="flex gap-2"><button class="pg-btn" id="equipPrevPage"><i data-lucide="chevron-left"></i></button><button class="pg-btn" id="equipNextPage"><i data-lucide="chevron-right"></i></button></div>
    </div>
  `;

  const summaryWrap = document.getElementById("equipSummary");
  [
    { label:"Total Equipment", value:EQUIPMENT.length, icon:"wrench", tint:"blue" },
    { label:"Deployed", value:deployed, icon:"check-circle-2", tint:"green" },
    { label:"Under Maintenance", value:maintenance, icon:"alert-circle", tint:"orange" },
    { label:"Service Due Soon", value:dueSoon, icon:"clock", tint:"navy" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  const statusFilter = document.getElementById("equipStatusFilter");
  statusFilter.innerHTML = `<option>All</option>` + Object.keys(EQUIP_STATUS_META).map(s=>`<option>${s}</option>`).join("");
  statusFilter.value = state.equip.status;

  document.getElementById("equipSearch").addEventListener("input", (e)=>{ state.equip.query=e.target.value; state.equip.page=1; renderEquipmentList(); });
  statusFilter.addEventListener("change", (e)=>{ state.equip.status=e.target.value; state.equip.page=1; renderEquipmentList(); });
  document.getElementById("newEquipBtn").addEventListener("click", ()=> openEquipmentFormModal(null));

  renderEquipmentList();
  icons();
}

function renderEquipmentList(){
  const filtered = getFilteredEquipment();
  const { pageSize } = state.equip;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.equip.page > totalPages) state.equip.page = totalPages;
  const pageRows = filtered.slice((state.equip.page-1)*pageSize, state.equip.page*pageSize);

  document.getElementById("equipResultCount").textContent = `${filtered.length} equipment items found`;
  const wrap = document.getElementById("equipCards");
  wrap.innerHTML = "";
  if (pageRows.length===0){
    wrap.innerHTML = `<div class="card" style="padding:36px;text-align:center;color:#94a3b8;font-size:13px;grid-column:1/-1">No equipment matches your filters.</div>`;
  }
  pageRows.forEach(e=>{
    const dueSoon = equipServiceDue(e);
    wrap.appendChild(el(`
      <div class="card proj-card">
        <div class="flex-between" style="align-items:flex-start;margin-bottom:6px">
          <div><p style="font-weight:600;font-size:13px;margin:0">${e.name}</p><p style="font-size:11px;color:#64748b;margin:0">${e.category}</p></div>
          ${equipPillHTML(e.status)}
        </div>
        <p class="tiny muted" style="margin:0 0 10px">${e.project} · ${e.ownership}${e.operator!=="—" ? " · Operator: "+e.operator : ""}</p>
        <div class="module-rows" style="margin:0 0 10px">
          <div><p class="k">Last Service</p><p class="v" style="font-size:12px">${e.lastService}</p></div>
          <div><p class="k">Next Service</p><p class="v" style="font-size:12px;color:${dueSoon?'#DC2626':'#1e293b'}">${e.nextService}</p></div>
        </div>
        ${dueSoon ? `<span class="pill" style="color:#DC2626;background:#FEE2E2;margin-bottom:8px"><span class="dot-sm" style="background:#DC2626"></span>Service Due Soon</span>` : ""}
        <div class="row-actions mt-2" style="border-top:1px solid #F1F5F9;padding-top:8px">
          <button class="icon-action edit" data-act="edit" data-id="${e.id}"><i data-lucide="pencil"></i></button>
          <button class="icon-action del" data-act="del" data-id="${e.id}"><i data-lucide="trash-2"></i></button>
        </div>
      </div>`));
  });
  wrap.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openEquipmentFormModal(EQUIPMENT.find(e=>e.id===b.dataset.id))));
  wrap.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    EQUIPMENT = EQUIPMENT.filter(e=>e.id!==b.dataset.id);
    showToast("Equipment removed");
    renderEquipmentList();
  }));

  const pag = document.getElementById("equipPagination");
  if (totalPages > 1){
    pag.style.display = "flex";
    document.getElementById("equipPageInfo").textContent = `Page ${state.equip.page} of ${totalPages}`;
    const prev = document.getElementById("equipPrevPage"), next = document.getElementById("equipNextPage");
    prev.disabled = state.equip.page===1; next.disabled = state.equip.page===totalPages;
    prev.onclick = ()=>{ state.equip.page--; renderEquipmentList(); icons(); };
    next.onclick = ()=>{ state.equip.page++; renderEquipmentList(); icons(); };
  } else { pag.style.display = "none"; }
  icons();
}

function openEquipmentFormModal(item){
  const isEdit = !!item;
  const projectNames = [...new Set(PROJECTS.map(p=>p.name))];
  const f = item || { name:"", category:EQUIP_CATEGORIES[0], project:projectNames[0]||"", status:"Idle", operator:"", ownership:"Owned", lastService:"", nextService:"" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit Equipment" : "New Equipment"}</h3><button class="icon-btn" id="closeEQF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field col-span-2"><label>Equipment Name</label><input id="eq_name" value="${f.name}"/></div>
          <div class="field"><label>Category</label><select id="eq_category">${EQUIP_CATEGORIES.map(c=>`<option ${c===f.category?"selected":""}>${c}</option>`).join("")}</select></div>
          <div class="field"><label>Project</label><select id="eq_project">${projectNames.map(p=>`<option ${p===f.project?"selected":""}>${p}</option>`).join("")}</select></div>
          <div class="field"><label>Status</label><select id="eq_status">${Object.keys(EQUIP_STATUS_META).map(s=>`<option ${s===f.status?"selected":""}>${s}</option>`).join("")}</select></div>
          <div class="field"><label>Ownership</label><select id="eq_ownership"><option ${f.ownership==="Owned"?"selected":""}>Owned</option><option ${f.ownership==="Rented"?"selected":""}>Rented</option></select></div>
          <div class="field"><label>Operator</label><input id="eq_operator" value="${f.operator}" placeholder="Leave blank if unassigned"/></div>
          <div class="field"><label>Last Service Date</label><input type="date" id="eq_lastService" value="${f.lastService}"/></div>
          <div class="field"><label>Next Service Date</label><input type="date" id="eq_nextService" value="${f.nextService}"/></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelEQF">Cancel</button>
          <button class="btn-primary" id="saveEQF">${isEdit ? "Save Changes" : "Add Equipment"}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeEQF").addEventListener("click", closeModal);
  node.querySelector("#cancelEQF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveEQF").addEventListener("click", ()=>{
    const payload = {
      name: node.querySelector("#eq_name").value.trim() || "Unnamed Equipment",
      category: node.querySelector("#eq_category").value,
      project: node.querySelector("#eq_project").value,
      status: node.querySelector("#eq_status").value,
      ownership: node.querySelector("#eq_ownership").value,
      operator: node.querySelector("#eq_operator").value.trim() || "—",
      lastService: node.querySelector("#eq_lastService").value,
      nextService: node.querySelector("#eq_nextService").value,
    };
    if (isEdit){
      Object.assign(item, payload);
      showToast(`${item.name} updated`);
    } else {
      const id = `EQ-${String(EQUIPMENT.length+1).padStart(2,"0")}`;
      EQUIPMENT = [{ id, ...payload }, ...EQUIPMENT];
      showToast(`${payload.name} added`);
      state.equip.page = 1;
    }
    closeModal();
    renderEquipmentList();
  });
  openModalNode(node);
}

/* ---------------------------- AI Insights module ---------------------------- */
const TODAY = "2026-08-15";
function daysBetween(d1,d2){ return (new Date(d2) - new Date(d1)) / 86400000; }

function projectBoqVariancePct(projectName){
  const items = BOQS.filter(b=> b.project===projectName && b.actual>0);
  if (items.length===0) return 0;
  const totalEst = items.reduce((s,b)=> s+boqEstAmount(b), 0);
  const totalVar = items.reduce((s,b)=> s+boqVariance(b), 0);
  return totalEst>0 ? (totalVar/totalEst*100) : 0;
}
function projectTimelineProgress(p){
  const total = daysBetween(p.start, p.end);
  const elapsed = daysBetween(p.start, TODAY);
  if (total<=0) return 0;
  return Math.max(0, Math.min(100, (elapsed/total)*100));
}
function projectOpenIssues(projectName){
  return ISSUES.filter(i=> i.site===projectName && i.status!=="Resolved").length;
}
function projectOverdueInvoice(projectName){
  return INVOICES.some(i=> i.project===projectName && i.status==="Overdue");
}
function computeRiskScore(p){
  const timelineProgress = projectTimelineProgress(p);
  const completionGap = Math.max(0, timelineProgress - p.completion);
  const variancePct = Math.max(0, projectBoqVariancePct(p.name));
  const openIssues = projectOpenIssues(p.name);
  const overdue = projectOverdueInvoice(p.name);
  let score = completionGap*0.7 + variancePct*1.1 + openIssues*9 + (overdue?15:0);
  score = Math.round(Math.max(3, Math.min(96, score)));
  return { score, timelineProgress, completionGap, variancePct, openIssues, overdue };
}
function riskLabel(score){
  if (score<=33) return { label:"Low Risk", fg:"#16A34A", bg:"#DCFCE7" };
  if (score<=66) return { label:"Medium Risk", fg:"#EA580C", bg:"#FFEDD5" };
  return { label:"High Risk", fg:"#DC2626", bg:"#FEE2E2" };
}
function predictedFinalCost(p, variancePct){
  return p.contract * (1 + (variancePct/100)*0.6);
}
function delayLabel(gap){
  if (gap<=5) return { label:"On Schedule", fg:"#16A34A", bg:"#DCFCE7" };
  if (gap<=15) return { label:"At Risk", fg:"#EA580C", bg:"#FFEDD5" };
  return { label:"Likely Delayed", fg:"#DC2626", bg:"#FEE2E2" };
}
function invWeeklyRate(item){ return item.consumed / 26; }
function invWeeksToStockout(item){
  const rate = invWeeklyRate(item);
  const avail = invAvailable(item);
  if (rate<=0) return null;
  return Math.max(0, Math.round(avail/rate));
}

function renderAIModule(){
  const main = document.getElementById("mainContent");
  const risks = PROJECTS.map(p=> ({ p, r: computeRiskScore(p) }));
  const highRiskCount = risks.filter(x=> x.r.score>66).length;
  const avgScore = Math.round(risks.reduce((s,x)=> s+x.r.score,0) / risks.length);
  const delayedCount = risks.filter(x=> x.r.completionGap>15).length;

  main.innerHTML = `
    <section class="grid grid-4" id="aiSummary"></section>
    <div class="tab-row" id="aiTabs">
      <button class="btn-secondary" id="tabRisk">Risk Scoring</button>
      <button class="btn-secondary" id="tabPredictions">Predictions</button>
      <button class="btn-secondary" id="tabForecast">Forecasting</button>
    </div>
    <div id="aiTabBody"></div>
  `;

  const summaryWrap = document.getElementById("aiSummary");
  [
    { label:"Avg. Risk Score", value:avgScore+" / 100", icon:"sparkles", tint:"blue" },
    { label:"High Risk Projects", value:highRiskCount, icon:"alert-circle", tint:"orange" },
    { label:"Likely Delayed", value:delayedCount, icon:"clock", tint:"navy" },
    { label:"Low Stock Materials", value:INVENTORY.filter(invLowStock).length, icon:"package-x", tint:"green" },
  ].forEach(c=>{
    const tint = TINT[c.tint];
    summaryWrap.insertAdjacentHTML("beforeend", `
      <div class="card" style="padding:14px">
        <div class="kpi-icon" style="width:32px;height:32px;background:${tint.bg};color:${tint.fg};margin-bottom:8px"><i data-lucide="${c.icon}" style="width:15px;height:15px"></i></div>
        <p style="font-size:17px;font-weight:700;margin:0">${c.value}</p>
        <p class="tiny muted" style="margin:2px 0 0">${c.label}</p>
      </div>`);
  });

  document.getElementById("tabRisk").addEventListener("click", ()=>{ state.ai.section="risk"; renderAITab(); });
  document.getElementById("tabPredictions").addEventListener("click", ()=>{ state.ai.section="predictions"; renderAITab(); });
  document.getElementById("tabForecast").addEventListener("click", ()=>{ state.ai.section="forecast"; renderAITab(); });

  renderAITab();
  icons();
}

function renderAITab(){
  ["tabRisk","tabPredictions","tabForecast"].forEach(id=>{
    const key = id==="tabRisk"?"risk": id==="tabPredictions"?"predictions":"forecast";
    document.getElementById(id).classList.toggle("btn-primary", state.ai.section===key);
    document.getElementById(id).classList.toggle("btn-secondary", state.ai.section!==key);
  });
  if (state.ai.section==="risk") renderRiskSection();
  else if (state.ai.section==="predictions") renderPredictionsSection();
  else renderForecastSection();
  icons();
}

function renderRiskSection(){
  const body = document.getElementById("aiTabBody");
  body.innerHTML = `
    <div class="flex gap-2" style="align-items:center;margin:14px 0 4px">
      <div class="module-icon" style="background:#eef2ff;color:#4f46e5"><i data-lucide="sparkles"></i></div>
      <p class="tiny muted" style="margin:0">AI-generated risk score (0–100) per project, based on schedule slippage, BOQ cost variance, open site issues, and overdue billing.</p>
    </div>
    <div class="grid grid-3 mt-2" id="riskCards"></div>
  `;
  const wrap = document.getElementById("riskCards");
  PROJECTS.forEach(p=>{
    const r = computeRiskScore(p);
    const lvl = riskLabel(r.score);
    wrap.appendChild(el(`
      <div class="card" style="padding:16px">
        <div class="flex-between" style="align-items:flex-start;margin-bottom:10px">
          <div><p style="font-weight:600;font-size:13px;margin:0">${p.name}</p><p class="tiny muted" style="margin:2px 0 0">${p.location}</p></div>
        </div>
        <div class="flex-between" style="align-items:center;margin-bottom:8px">
          <span style="font-size:22px;font-weight:700">${r.score}</span>
          <span class="tiny muted">/ 100</span>
          <span class="pill" style="color:${lvl.fg};background:${lvl.bg};margin-left:auto">${lvl.label}</span>
        </div>
        <div class="kpi-bar" style="height:6px;margin-bottom:12px"><div style="width:${r.score}%;background:${lvl.fg};opacity:1"></div></div>
        <div class="flex" style="flex-wrap:wrap;gap:6px">
          <span class="pill" style="color:#475569;background:#F1F5F9">Schedule gap: ${r.completionGap.toFixed(0)}%</span>
          <span class="pill" style="color:#475569;background:#F1F5F9">Cost variance: ${r.variancePct.toFixed(1)}%</span>
          <span class="pill" style="color:#475569;background:#F1F5F9">Open issues: ${r.openIssues}</span>
          ${r.overdue ? `<span class="pill" style="color:#DC2626;background:#FEE2E2">Overdue billing</span>` : ""}
        </div>
      </div>`));
  });
}

function renderPredictionsSection(){
  const body = document.getElementById("aiTabBody");
  body.innerHTML = `
    <div class="card mt-3" style="padding:16px;overflow-x:auto">
      <h3 class="section-title mt-0">Cost, Delay & Profit Predictions</h3>
      <p class="tiny muted" style="margin:4px 0 12px">Projected final cost, schedule outlook, and profit margin per project.</p>
      <table>
        <thead><tr><th>Project</th><th>Contract Value</th><th>Predicted Final Cost</th><th>Schedule Outlook</th><th>Profit Prediction</th></tr></thead>
        <tbody id="predTbody"></tbody>
      </table>
    </div>
  `;
  const tbody = document.getElementById("predTbody");
  PROJECTS.forEach((p,i)=>{
    const r = computeRiskScore(p);
    const finalCost = predictedFinalCost(p, r.variancePct);
    const dLabel = delayLabel(r.completionGap);
    const val = PROFIT_VALUES[i % PROFIT_VALUES.length];
    tbody.insertAdjacentHTML("beforeend", `<tr>
      <td style="font-weight:600">${p.name}</td>
      <td>${fmtINR(p.contract)}</td>
      <td style="font-weight:600;color:${finalCost>p.contract?'#DC2626':'#16A34A'}">${fmtINR(finalCost)}</td>
      <td><span class="pill" style="color:${dLabel.fg};background:${dLabel.bg}">${dLabel.label}</span></td>
      <td style="font-weight:600;color:${val>=0?'#16A34A':'#DC2626'}">${(val>=0?"+":"")+val} L</td>
    </tr>`);
  });
  icons();
}

function renderForecastSection(){
  const body = document.getElementById("aiTabBody");
  body.innerHTML = `
    <div class="grid split-13-1" style="margin-top:14px" id="forecastGrid">
      <div class="card" style="padding:16px">
        <h3 class="section-title mt-0">Cash Flow Forecast — Next 3 Months</h3>
        <p class="tiny muted" style="margin:4px 0 12px">Projected using recent inflow/outflow trend.</p>
        <div style="height:220px"><canvas id="forecastChart"></canvas></div>
      </div>
      <div class="card" style="padding:16px">
        <h3 class="section-title mt-0">Material Forecasting</h3>
        <p class="tiny muted" style="margin:4px 0 12px">Estimated weeks until stock runs out.</p>
        <div class="flex-col gap-2" id="materialForecastList"></div>
      </div>
    </div>
  `;

  const avgDeltaIn = (CASHFLOW_IN[11]-CASHFLOW_IN[8])/3;
  const avgDeltaOut = (CASHFLOW_OUT[11]-CASHFLOW_OUT[8])/3;
  const futureLabels = ["Apr+1","May+1","Jun+1"];
  const futureIn = [1,2,3].map(i=> +(CASHFLOW_IN[11] + avgDeltaIn*i).toFixed(2));
  const futureOut = [1,2,3].map(i=> +(CASHFLOW_OUT[11] + avgDeltaOut*i).toFixed(2));

  destroyCharts();
  chartRefs.forecastChart = new Chart(document.getElementById("forecastChart"), {
    type:"line",
    data:{
      labels: [...CASHFLOW_LABELS.slice(-4), ...futureLabels],
      datasets:[
        { label:"Actual Inflow", data:[...CASHFLOW_IN.slice(-4), null,null,null], borderColor:"#2563EB", backgroundColor:"rgba(37,99,235,.1)", tension:.35, pointRadius:2 },
        { label:"Forecast Inflow", data:[null,null,null,CASHFLOW_IN[11], ...futureIn], borderColor:"#2563EB", borderDash:[6,4], backgroundColor:"transparent", tension:.35, pointRadius:2 },
        { label:"Actual Outflow", data:[...CASHFLOW_OUT.slice(-4), null,null,null], borderColor:"#EA580C", backgroundColor:"rgba(234,88,12,.08)", tension:.35, pointRadius:2 },
        { label:"Forecast Outflow", data:[null,null,null,CASHFLOW_OUT[11], ...futureOut], borderColor:"#EA580C", borderDash:[6,4], backgroundColor:"transparent", tension:.35, pointRadius:2 },
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{position:"top", labels:{boxWidth:10, font:{size:10}}} },
      scales:{ x:{grid:{display:false}, ticks:{font:{size:10}}}, y:{grid:{color:"#F1F5F9"}, ticks:{font:{size:10}, callback:(v)=>`₹${v}Cr`}} }
    }
  });

  const matWrap = document.getElementById("materialForecastList");
  INVENTORY.forEach(item=>{
    const weeks = invWeeksToStockout(item);
    const low = weeks!==null && weeks<=4;
    matWrap.insertAdjacentHTML("beforeend", `
      <div class="flex-between" style="padding:8px 0;border-bottom:1px solid #F1F5F9">
        <div>
          <p style="font-size:12.5px;font-weight:600;margin:0">${item.material}</p>
          <p class="tiny muted" style="margin:0">${invAvailable(item)} ${item.unit} available</p>
        </div>
        <span class="pill" style="color:${low?'#DC2626':'#16A34A'};background:${low?'#FEE2E2':'#DCFCE7'}">${weeks===null ? "Stable" : weeks+" wks left"}</span>
      </div>`);
  });
  icons();
}

/* ---------------------------- Settings module ---------------------------- */
function renderSettingsModule(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <div class="tab-row" id="settingsTabs">
      <button class="btn-secondary" id="tabCompany">Company Profile</button>
      <button class="btn-secondary" id="tabUsers">Users & Roles</button>
      <button class="btn-secondary" id="tabPrefs">Notifications</button>
    </div>
    <div id="settingsTabBody"></div>
  `;
  document.getElementById("tabCompany").addEventListener("click", ()=>{ state.settings.tab="company"; renderSettingsTab(); });
  document.getElementById("tabUsers").addEventListener("click", ()=>{ state.settings.tab="users"; renderSettingsTab(); });
  document.getElementById("tabPrefs").addEventListener("click", ()=>{ state.settings.tab="prefs"; renderSettingsTab(); });
  renderSettingsTab();
  icons();
}

function renderSettingsTab(){
  document.getElementById("tabCompany").classList.toggle("btn-primary", state.settings.tab==="company");
  document.getElementById("tabCompany").classList.toggle("btn-secondary", state.settings.tab!=="company");
  document.getElementById("tabUsers").classList.toggle("btn-primary", state.settings.tab==="users");
  document.getElementById("tabUsers").classList.toggle("btn-secondary", state.settings.tab!=="users");
  document.getElementById("tabPrefs").classList.toggle("btn-primary", state.settings.tab==="prefs");
  document.getElementById("tabPrefs").classList.toggle("btn-secondary", state.settings.tab!=="prefs");
  if (state.settings.tab==="company") renderCompanyTab();
  else if (state.settings.tab==="users") renderUsersTab();
  else renderPrefsTab();
  icons();
}

function renderCompanyTab(){
  const body = document.getElementById("settingsTabBody");
  const c = COMPANY_PROFILE;
  body.innerHTML = `
    <div class="card mt-3" style="padding:20px;max-width:640px">
      <div class="flex gap-2" style="align-items:center;margin-bottom:16px">
        <div class="brand-mark" style="width:44px;height:44px;font-size:18px">B</div>
        <div><p style="font-weight:600;font-size:14px;margin:0">BuildPro ERP</p><p class="tiny muted" style="margin:0">Build Better. Manage Smarter.</p></div>
      </div>
      <div class="modal-body grid2" style="padding:0">
        <div class="field col-span-2"><label>Company Name</label><input id="s_name" value="${c.name}"/></div>
        <div class="field"><label>GSTIN</label><input id="s_gstin" value="${c.gstin}"/></div>
        <div class="field"><label>Phone</label><input id="s_phone" value="${c.phone}"/></div>
        <div class="field col-span-2"><label>Registered Address</label><input id="s_address" value="${c.address}"/></div>
        <div class="field"><label>Email</label><input id="s_email" value="${c.email}"/></div>
        <div class="field"><label>Currency</label><select id="s_currency"><option ${c.currency.includes("INR")?"selected":""}>INR (₹)</option><option>USD ($)</option></select></div>
        <div class="field col-span-2"><label>Default Financial Year</label>
          <select id="s_fy"><option ${c.fy==="FY 2025-26"?"selected":""}>FY 2025-26</option><option ${c.fy==="FY 2024-25"?"selected":""}>FY 2024-25</option></select>
        </div>
      </div>
      <div class="flex-between mt-3">
        <p class="tiny muted">Last updated just now</p>
        <button class="btn-primary" id="saveCompanyBtn">Save Changes</button>
      </div>
    </div>
  `;
  document.getElementById("saveCompanyBtn").addEventListener("click", ()=>{
    COMPANY_PROFILE = {
      name: document.getElementById("s_name").value.trim() || c.name,
      gstin: document.getElementById("s_gstin").value.trim(),
      address: document.getElementById("s_address").value.trim(),
      phone: document.getElementById("s_phone").value.trim(),
      email: document.getElementById("s_email").value.trim(),
      fy: document.getElementById("s_fy").value,
      currency: document.getElementById("s_currency").value,
    };
    showToast("Company profile updated");
  });
}

function renderUsersTab(){
  const body = document.getElementById("settingsTabBody");
  body.innerHTML = `
    <div class="toolbar mt-3">
      <p class="tiny muted" style="flex:1">Manage who can log in and what they can access.</p>
      <button class="btn-primary" id="newUserBtn"><i data-lucide="plus" style="width:15px;height:15px"></i>New User</button>
    </div>
    <div class="card mt-2" style="overflow-x:auto">
      <table>
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody id="usersTbody"></tbody>
      </table>
    </div>
  `;
  document.getElementById("newUserBtn").addEventListener("click", ()=> openUserFormModal(null));
  renderUsersList();
  icons();
}

function renderUsersList(){
  const tbody = document.getElementById("usersTbody");
  tbody.innerHTML = "";
  SYSTEM_USERS.forEach(u=>{
    const active = u.status==="Active";
    tbody.appendChild(el(`<tr>
      <td style="font-weight:600">${u.name}</td>
      <td class="tiny">${u.email}</td>
      <td><span class="pill" style="color:#2563EB;background:#DBEAFE">${u.role}</span></td>
      <td><span class="pill" style="color:${active?'#16A34A':'#64748B'};background:${active?'#DCFCE7':'#F1F5F9'}"><span class="dot-sm" style="background:${active?'#16A34A':'#64748B'}"></span>${u.status}</span></td>
      <td><div class="row-actions">
        <button class="icon-action" data-act="toggle" data-id="${u.id}" title="${active?'Deactivate':'Activate'}"><i data-lucide="${active?'user-x':'user-check'}"></i></button>
        <button class="icon-action edit" data-act="edit" data-id="${u.id}"><i data-lucide="pencil"></i></button>
        <button class="icon-action del" data-act="del" data-id="${u.id}"><i data-lucide="trash-2"></i></button>
      </div></td>
    </tr>`));
  });
  tbody.querySelectorAll("[data-act='edit']").forEach(b=> b.addEventListener("click", ()=> openUserFormModal(SYSTEM_USERS.find(u=>u.id===b.dataset.id))));
  tbody.querySelectorAll("[data-act='del']").forEach(b=> b.addEventListener("click", ()=>{
    SYSTEM_USERS = SYSTEM_USERS.filter(u=>u.id!==b.dataset.id);
    showToast("User removed");
    renderUsersList();
  }));
  tbody.querySelectorAll("[data-act='toggle']").forEach(b=> b.addEventListener("click", ()=>{
    const u = SYSTEM_USERS.find(x=>x.id===b.dataset.id);
    u.status = u.status==="Active" ? "Inactive" : "Active";
    showToast(`${u.name} ${u.status==="Active"?"activated":"deactivated"}`);
    renderUsersList();
  }));
  icons();
}

function openUserFormModal(user){
  const isEdit = !!user;
  const f = user || { name:"", email:"", role:ALL_ROLES[0], status:"Active" };
  const node = el(`
    <div class="modal-backdrop">
      <div class="modal-box wide">
        <div class="modal-head"><h3>${isEdit ? "Edit User" : "New User"}</h3><button class="icon-btn" id="closeUF"><i data-lucide="x"></i></button></div>
        <div class="modal-body grid2">
          <div class="field col-span-2"><label>Full Name</label><input id="u_name" value="${f.name}"/></div>
          <div class="field col-span-2"><label>Email</label><input id="u_email" value="${f.email}"/></div>
          <div class="field"><label>Role</label><select id="u_role">${ALL_ROLES.map(r=>`<option ${r===f.role?"selected":""}>${r}</option>`).join("")}</select></div>
          <div class="field"><label>Status</label><select id="u_status"><option ${f.status==="Active"?"selected":""}>Active</option><option ${f.status==="Inactive"?"selected":""}>Inactive</option></select></div>
        </div>
        <div class="modal-foot">
          <button class="btn-secondary" id="cancelUF">Cancel</button>
          <button class="btn-primary" id="saveUF">${isEdit ? "Save Changes" : "Add User"}</button>
        </div>
      </div>
    </div>`);
  node.querySelector("#closeUF").addEventListener("click", closeModal);
  node.querySelector("#cancelUF").addEventListener("click", closeModal);
  node.addEventListener("click", (e)=>{ if(e.target===node) closeModal(); });
  node.querySelector("#saveUF").addEventListener("click", ()=>{
    const payload = {
      name: node.querySelector("#u_name").value.trim() || "Unnamed User",
      email: node.querySelector("#u_email").value.trim(),
      role: node.querySelector("#u_role").value,
      status: node.querySelector("#u_status").value,
    };
    if (isEdit){
      Object.assign(user, payload);
      showToast(`${user.name} updated`);
    } else {
      const id = `USR-${String(SYSTEM_USERS.length+1).padStart(2,"0")}`;
      SYSTEM_USERS = [{ id, ...payload }, ...SYSTEM_USERS];
      showToast(`${payload.name} added`);
    }
    closeModal();
    renderUsersList();
  });
  openModalNode(node);
}

function renderPrefsTab(){
  const body = document.getElementById("settingsTabBody");
  body.innerHTML = `
    <div class="card mt-3" style="padding:16px;max-width:640px">
      <h3 class="section-title mt-0">Notification Preferences</h3>
      <p class="tiny muted" style="margin:4px 0 14px">Choose which alerts trigger a notification.</p>
      <div class="flex-col gap-3" id="prefsList"></div>
    </div>
  `;
  const wrap = document.getElementById("prefsList");
  NOTIF_PREFS.forEach(p=>{
    wrap.insertAdjacentHTML("beforeend", `
      <div class="flex-between" style="padding:10px 0;border-bottom:1px solid #F1F5F9">
        <div style="max-width:420px">
          <p style="font-size:13px;font-weight:600;margin:0">${p.label}</p>
          <p class="tiny muted" style="margin:2px 0 0">${p.desc}</p>
        </div>
        <button class="btn-secondary" data-key="${p.key}" style="min-width:70px;${p.on?'background:#DCFCE7;color:#16A34A;border-color:#DCFCE7':''}">${p.on?"On":"Off"}</button>
      </div>`);
  });
  wrap.querySelectorAll("button[data-key]").forEach(b=> b.addEventListener("click", ()=>{
    const pref = NOTIF_PREFS.find(p=>p.key===b.dataset.key);
    pref.on = !pref.on;
    renderPrefsTab();
    showToast(`${pref.label} turned ${pref.on?"on":"off"}`);
  }));
}

/* ---------------------------- module placeholder ---------------------------- */
function renderPlaceholder(title){
  const item = NAV.find(n=>n.label===title) || NAV[0];
  document.getElementById("mainContent").innerHTML = `
    <div class="placeholder-wrap">
      <div class="placeholder-box">
        <div class="icon"><i data-lucide="${item.icon}"></i></div>
        <h2>${title}</h2>
        <p>This module is being built out on the shared BuildPro design system. The core Dashboard and Projects module are fully wired up first — every other module follows the same components and data model.</p>
      </div>
    </div>`;
  icons();
}

/* ---------------------------- router / top-level render ---------------------------- */
function renderAll(){
  document.getElementById("pageTitle").textContent = state.active;
  destroyCharts();
  renderNav();
  if (state.active === "Dashboard") renderDashboard();
  else if (state.active === "Projects") renderProjectsModule();
  else if (state.active === "BOQ & Estimation") renderBoqModule();
  else if (state.active === "Purchase & Material") renderPurchaseModule();
  else if (state.active === "Labour & Contractor") renderLabourModule();
  else if (state.active === "Billing & Accounts") renderBillingModule();
  else if (state.active === "Clients & Vendors") renderPartiesModule();
  else if (state.active === "Site Management") renderSiteModule();
  else if (state.active === "Reports & Analytics") renderReportsModule();
  else if (state.active === "Documents") renderDocumentsModule();
  else if (state.active === "HR & Payroll") renderHRModule();
  else if (state.active === "Equipment") renderEquipmentModule();
  else if (state.active === "AI Insights") renderAIModule();
  else if (state.active === "Settings") renderSettingsModule();
  else renderPlaceholder(state.active);
  icons();
}

/* ---------------------------- global chrome events ---------------------------- */
document.getElementById("openMobileNav").addEventListener("click", ()=> document.getElementById("mobileNavOverlay").classList.add("open"));
document.getElementById("closeMobileNav").addEventListener("click", ()=> document.getElementById("mobileNavOverlay").classList.remove("open"));
document.getElementById("mobileNavOverlay").addEventListener("click", (e)=>{ if(e.target.id==="mobileNavOverlay") e.currentTarget.classList.remove("open"); });
document.getElementById("notifBtn").addEventListener("click", ()=> showToast("3 new notifications"));

/* ---------------------------- Authentication ---------------------------- */
let currentUser = null;

function authShell(title, sub, bodyHTML, footerHTML){
  return `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="auth-brand">
          <div class="brand-mark">B</div>
          <div><p style="font-weight:700;font-size:15px;margin:0;color:#0B1D3A">BuildPro ERP</p><p class="tiny muted" style="margin:0">Contractor Management</p></div>
        </div>
        <p class="auth-title">${title}</p>
        <p class="auth-sub">${sub}</p>
        ${bodyHTML}
        ${footerHTML || ""}
      </div>
    </div>`;
}

function renderLoginScreen(){
  const root = document.getElementById("authRoot");
  root.innerHTML = authShell(
    "Welcome back",
    "Log in to your BuildPro ERP account",
    `
    <div id="loginError"></div>
    <div class="auth-field"><label>Email</label><input type="email" id="login_email" placeholder="you@company.com" value="admin@buildpro.in"/></div>
    <div class="auth-field"><label>Password</label><input type="password" id="login_password" placeholder="Enter password" value="••••••••"/></div>
    <button class="auth-btn" id="loginBtn">Log In</button>
    <div class="auth-links">
      <a id="goForgot">Forgot password?</a>
      <a id="goRegister">Create account</a>
    </div>`,
    `<p class="auth-footer">Demo build — any email &amp; password logs you in.</p>`
  );
  document.getElementById("goForgot").addEventListener("click", renderForgotScreen);
  document.getElementById("goRegister").addEventListener("click", renderRegisterScreen);
  document.getElementById("loginBtn").addEventListener("click", ()=>{
    const email = document.getElementById("login_email").value.trim();
    const pass = document.getElementById("login_password").value.trim();
    if (!email || !pass){
      document.getElementById("loginError").innerHTML = `<div class="auth-error">Please enter both email and password.</div>`;
      return;
    }
    const matched = SYSTEM_USERS.find(u=> u.email.toLowerCase()===email.toLowerCase());
    currentUser = matched || { name:"Admin User", email, role:"Super Admin", status:"Active" };
    enterApp();
  });
}

function renderRegisterScreen(){
  const root = document.getElementById("authRoot");
  root.innerHTML = authShell(
    "Create your account",
    "Register a new BuildPro ERP user",
    `
    <div id="regError"></div>
    <div class="auth-field"><label>Full Name</label><input type="text" id="reg_name" placeholder="Your name"/></div>
    <div class="auth-field"><label>Email</label><input type="email" id="reg_email" placeholder="you@company.com"/></div>
    <div class="auth-field"><label>Password</label><input type="password" id="reg_password" placeholder="Create a password"/></div>
    <div class="auth-field"><label>Role</label><select id="reg_role">${ALL_ROLES.map(r=>`<option>${r}</option>`).join("")}</select></div>
    <button class="auth-btn" id="registerBtn">Create Account</button>`,
    `<p class="auth-footer">Already have an account? <a id="goLogin">Log in</a></p>`
  );
  document.getElementById("goLogin").addEventListener("click", renderLoginScreen);
  document.getElementById("registerBtn").addEventListener("click", ()=>{
    const name = document.getElementById("reg_name").value.trim();
    const email = document.getElementById("reg_email").value.trim();
    const pass = document.getElementById("reg_password").value.trim();
    const role = document.getElementById("reg_role").value;
    if (!name || !email || !pass){
      document.getElementById("regError").innerHTML = `<div class="auth-error">Please fill in all fields.</div>`;
      return;
    }
    const id = `USR-${String(SYSTEM_USERS.length+1).padStart(2,"0")}`;
    const newUser = { id, name, email, role, status:"Active" };
    SYSTEM_USERS = [newUser, ...SYSTEM_USERS];
    currentUser = newUser;
    enterApp();
  });
}

function renderForgotScreen(){
  const root = document.getElementById("authRoot");
  root.innerHTML = authShell(
    "Forgot password",
    "Enter your email and we'll send a reset link",
    `
    <div id="forgotMsg"></div>
    <div class="auth-field"><label>Email</label><input type="email" id="forgot_email" placeholder="you@company.com"/></div>
    <button class="auth-btn" id="forgotBtn">Send Reset Link</button>`,
    `<p class="auth-footer"><a id="backToLogin1">← Back to log in</a></p>`
  );
  document.getElementById("backToLogin1").addEventListener("click", renderLoginScreen);
  document.getElementById("forgotBtn").addEventListener("click", ()=>{
    const email = document.getElementById("forgot_email").value.trim();
    if (!email){
      document.getElementById("forgotMsg").innerHTML = `<div class="auth-error">Please enter your email.</div>`;
      return;
    }
    renderResetScreen(email);
  });
}

function renderResetScreen(email){
  const root = document.getElementById("authRoot");
  root.innerHTML = authShell(
    "Reset password",
    `A reset code was sent to ${email || "your email"} (demo — just set a new password below)`,
    `
    <div id="resetMsg"></div>
    <div class="auth-field"><label>New Password</label><input type="password" id="reset_pass1" placeholder="New password"/></div>
    <div class="auth-field"><label>Confirm New Password</label><input type="password" id="reset_pass2" placeholder="Confirm password"/></div>
    <button class="auth-btn" id="resetBtn">Reset Password</button>`,
    `<p class="auth-footer"><a id="backToLogin2">← Back to log in</a></p>`
  );
  document.getElementById("backToLogin2").addEventListener("click", renderLoginScreen);
  document.getElementById("resetBtn").addEventListener("click", ()=>{
    const p1 = document.getElementById("reset_pass1").value;
    const p2 = document.getElementById("reset_pass2").value;
    if (!p1 || p1!==p2){
      document.getElementById("resetMsg").innerHTML = `<div class="auth-error">Passwords are empty or do not match.</div>`;
      return;
    }
    renderLoginScreen();
    showToastPending = "Password reset successfully. Please log in.";
  });
}

let showToastPending = null;

function enterApp(){
  document.getElementById("authRoot").innerHTML = "";
  document.getElementById("appRoot").style.display = "flex";
  if (currentUser){
    const nameEl = document.querySelector(".profile-name");
    const roleEl = document.querySelector(".profile-role");
    if (nameEl) nameEl.textContent = currentUser.name;
    if (roleEl) roleEl.textContent = currentUser.role;
    document.querySelector(".avatar").textContent = currentUser.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  }
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.onclick = ()=>{
    document.getElementById("appRoot").style.display = "none";
    currentUser = null;
    renderLoginScreen();
  };
  renderAll();
  if (showToastPending){ showToast(showToastPending); showToastPending = null; }
  else showToast(`Welcome back, ${currentUser ? currentUser.name.split(" ")[0] : "Admin"}!`);
}

/* ---------------------------- init ---------------------------- */
renderLoginScreen();
