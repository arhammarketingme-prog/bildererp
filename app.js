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
  { key:"projects", label:"Total Projects", value:"24", sub:"Active Projects", icon:"folder-kanban", tint:"blue", trend:"+3 this FY", up:true },
  { key:"contract", label:"Contract Value", value:"₹48.75 Cr", sub:"Total Value", icon:"indian-rupee", tint:"navy", trend:"+12.4%", up:true },
  { key:"billed", label:"Billed Amount", value:"₹31.20 Cr", sub:"Till Date", icon:"file-text", tint:"green", trend:"64% of contract", up:true },
  { key:"outstanding", label:"Outstanding", value:"₹17.55 Cr", sub:"From Clients", icon:"clock", tint:"orange", trend:"8 overdue", up:false },
  { key:"pnl", label:"Profit / Loss", value:"₹4.75 Cr", sub:"This FY Profit", icon:"trending-up", tint:"green", trend:"+9.8% margin", up:true },
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
  { title:"Projects", icon:"folder-kanban", rows:[["All Projects",24],["Active",18],["Completed",4],["On Hold",2]] },
  { title:"BOQ & Estimation", icon:"calculator", rows:[["Total BOQs",35],["Approved",28],["Under Approval",5],["Draft",2]] },
  { title:"Purchase & Material", icon:"shopping-cart", rows:[["Total PO",56],["Open PO",18],["Material In Hand",125],["Low Stock Items",8]] },
  { title:"Labour & Contractor", icon:"hard-hat", rows:[["Total Labour",245],["Present Today",198],["Absent Today",47],["Contractors",32]] },
  { title:"Billing & Accounts", icon:"wallet", rows:[["Total Invoices",78],["Paid",45],["Outstanding",33],["Overdue",12]] },
];

const PROGRESS_DATA = [
  { name:"On Track", value:12, color:"#16A34A" },
  { name:"At Risk", value:6, color:"#EA580C" },
  { name:"Delayed", value:4, color:"#DC2626" },
  { name:"Not Started", value:2, color:"#94A3B8" },
];
const CASHFLOW_LABELS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const CASHFLOW_IN  = [2.1,2.6,2.4,3.1,3.4,2.9,3.6,3.9,4.2,3.7,4.0,4.6];
const CASHFLOW_OUT = [1.6,1.9,2.1,2.3,2.6,2.4,2.8,3.0,3.3,2.9,3.1,3.5];
const PROFIT_LABELS = ["P1","P2","P3","P4","P5","P6","P7","P8"];
const PROFIT_VALUES = [145,98,87,76,-22,41,-14,63];

const TOP_PROJECTS = [
  { name:"Green Park Residency", loc:"Pune", profit:"₹1,45,25,000", margin:18.6 },
  { name:"Sunrise Apartments", loc:"Mumbai", profit:"₹98,75,000", margin:16.3 },
  { name:"Blue Ridge Tower", loc:"Nagpur", profit:"₹87,40,000", margin:14.8 },
  { name:"Silver County", loc:"Nashik", profit:"₹76,20,000", margin:13.2 },
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
  { id:"PRJ-001", name:"Green Park Residency", client:"Kohinoor Group", pm:"Rohit Sharma", location:"Pune, MH", status:"On Track", start:"2024-01-15", end:"2025-12-30", contract:47500000, billed:32300000, completion:68 },
  { id:"PRJ-002", name:"Sunrise Apartments", client:"Lodha Developers", pm:"Anita Deshmukh", location:"Mumbai, MH", status:"On Track", start:"2023-08-01", end:"2025-06-30", contract:61200000, billed:44500000, completion:74 },
  { id:"PRJ-003", name:"Blue Ridge Tower", client:"Raheja Estates", pm:"Vikram Patil", location:"Nagpur, MH", status:"At Risk", start:"2024-03-10", end:"2026-02-28", contract:39800000, billed:18100000, completion:41 },
  { id:"PRJ-004", name:"Silver County", client:"Silver Homes", pm:"Rohit Sharma", location:"Nashik, MH", status:"On Track", start:"2024-05-20", end:"2025-11-15", contract:28600000, billed:21200000, completion:58 },
  { id:"PRJ-005", name:"Emerald Business Park", client:"Prestige Group", pm:"Sneha Kulkarni", location:"Pune, MH", status:"Delayed", start:"2023-11-01", end:"2025-05-31", contract:84300000, billed:39900000, completion:39 },
  { id:"PRJ-006", name:"Riverfront Villas", client:"Godrej Properties", pm:"Anita Deshmukh", location:"Nashik, MH", status:"On Hold", start:"2024-02-14", end:"2026-01-20", contract:52700000, billed:12100000, completion:18 },
  { id:"PRJ-007", name:"Metro Heights", client:"DLF Ltd", pm:"Vikram Patil", location:"Mumbai, MH", status:"On Track", start:"2023-06-05", end:"2025-04-30", contract:96500000, billed:71200000, completion:82 },
  { id:"PRJ-008", name:"Palm Grove Estate", client:"Sobha Ltd", pm:"Sneha Kulkarni", location:"Aurangabad, MH", status:"Completed", start:"2022-09-01", end:"2024-06-15", contract:34200000, billed:34200000, completion:100 },
];

/* ---------------------------- BOQ data ---------------------------- */
const BOQ_STATUS_META = {
  "Draft": {fg:"#64748B", bg:"#F1F5F9"},
  "Under Approval": {fg:"#EA580C", bg:"#FFEDD5"},
  "Approved": {fg:"#16A34A", bg:"#DCFCE7"},
};
const UNITS = ["Cum","Sqm","Rmt","Kg","Ton","Nos","Bag","Ltr"];

let BOQS = [
  { id:"BOQ-0001", project:"Green Park Residency", item:"Excavation for Foundation", description:"Earthwork excavation in ordinary soil up to 1.5m depth", unit:"Cum", qty:1250, rate:185, actual:238000, remarks:"Rocky patch found, minor overrun", status:"Approved" },
  { id:"BOQ-0002", project:"Green Park Residency", item:"RCC M25 Footing", description:"Reinforced cement concrete M25 grade for isolated footings", unit:"Cum", qty:340, rate:8200, actual:2820000, remarks:"", status:"Approved" },
  { id:"BOQ-0003", project:"Sunrise Apartments", item:"Brick Masonry 230mm", description:"Class-A brick masonry in CM 1:6 for external walls", unit:"Sqm", qty:2100, rate:850, actual:1750000, remarks:"", status:"Approved" },
  { id:"BOQ-0004", project:"Sunrise Apartments", item:"Internal Plastering 12mm", description:"Cement plaster 1:4 on internal walls", unit:"Sqm", qty:4800, rate:145, actual:0, remarks:"Awaiting site readiness", status:"Under Approval" },
  { id:"BOQ-0005", project:"Blue Ridge Tower", item:"Structural Steel Fabrication", description:"Fabrication and erection of structural steel members", unit:"Ton", qty:85, rate:92000, actual:8100000, remarks:"Rate escalation applied", status:"Approved" },
  { id:"BOQ-0006", project:"Blue Ridge Tower", item:"Aluminium Window Frames", description:"Powder-coated aluminium window frames with glazing", unit:"Sqm", qty:620, rate:3400, actual:0, remarks:"", status:"Draft" },
  { id:"BOQ-0007", project:"Silver County", item:"Vitrified Flooring 600x600", description:"Vitrified tile flooring including bedding and grouting", unit:"Sqm", qty:3100, rate:780, actual:2380000, remarks:"", status:"Approved" },
  { id:"BOQ-0008", project:"Emerald Business Park", item:"Waterproofing Terrace", description:"APP membrane waterproofing on terrace slab", unit:"Sqm", qty:980, rate:410, actual:0, remarks:"Vendor quote pending", status:"Under Approval" },
  { id:"BOQ-0009", project:"Metro Heights", item:"External Painting", description:"Exterior emulsion paint, two coats with primer", unit:"Sqm", qty:5200, rate:95, actual:520000, remarks:"", status:"Draft" },
];

/* ---------------------------- Purchase & Material data ---------------------------- */
const PO_STATUS_META = {
  "Draft": {fg:"#64748B", bg:"#F1F5F9"},
  "Open": {fg:"#2563EB", bg:"#DBEAFE"},
  "Delivered": {fg:"#16A34A", bg:"#DCFCE7"},
  "Cancelled": {fg:"#DC2626", bg:"#FEE2E2"},
};

let PURCHASE_ORDERS = [
  { id:"PO-1001", vendor:"Ambuja Cement Dealers", project:"Green Park Residency", material:"OPC 53 Grade Cement", qty:800, unit:"Bag", rate:395, gst:18, delivery:"2026-08-25", status:"Open" },
  { id:"PO-1002", vendor:"Tata Steel Distributors", project:"Blue Ridge Tower", material:"TMT Bars Fe500 12mm", qty:45, unit:"Ton", rate:58500, gst:18, delivery:"2026-08-20", status:"Open" },
  { id:"PO-1003", vendor:"Ultratech Building Supplies", project:"Sunrise Apartments", material:"River Sand", qty:220, unit:"Cum", rate:1650, gst:5, delivery:"2026-08-18", status:"Delivered" },
  { id:"PO-1004", vendor:"Jindal Aluminium Co.", project:"Blue Ridge Tower", material:"Aluminium Window Frames", qty:620, unit:"Sqm", rate:3350, gst:18, delivery:"2026-09-05", status:"Draft" },
  { id:"PO-1005", vendor:"Asian Paints Trading", project:"Metro Heights", material:"Exterior Emulsion Paint", qty:180, unit:"Ltr", rate:410, gst:18, delivery:"2026-08-30", status:"Open" },
  { id:"PO-1006", vendor:"Kajaria Tiles Depot", project:"Silver County", material:"Vitrified Tiles 600x600", qty:3100, unit:"Sqm", rate:775, gst:12, delivery:"2026-08-22", status:"Delivered" },
  { id:"PO-1007", vendor:"Jaquar Sanitaryware", project:"Green Park Residency", material:"CP Fittings Set", qty:96, unit:"Nos", rate:4200, gst:18, delivery:"2026-09-10", status:"Cancelled" },
  { id:"PO-1008", vendor:"Ambuja Cement Dealers", project:"Emerald Business Park", material:"PPC Cement", qty:1200, unit:"Bag", rate:378, gst:18, delivery:"2026-08-28", status:"Open" },
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
  { id:"CTR-01", name:"Shivaji Labour Suppliers", trade:"Mason", project:"Green Park Residency", workers:32, dayRate:750, totalBilled:1840000, advance:220000, outstanding:1620000 },
  { id:"CTR-02", name:"Patil Construction Labour", trade:"Bar Bender", project:"Blue Ridge Tower", workers:18, dayRate:820, totalBilled:1120000, advance:150000, outstanding:970000 },
  { id:"CTR-03", name:"Deshmukh Electrical Works", trade:"Electrician", project:"Sunrise Apartments", workers:12, dayRate:900, totalBilled:640000, advance:80000, outstanding:560000 },
  { id:"CTR-04", name:"Karad Carpentry Group", trade:"Carpenter", project:"Silver County", workers:15, dayRate:780, totalBilled:580000, advance:60000, outstanding:520000 },
  { id:"CTR-05", name:"Om Sai Painting Contractors", trade:"Painter", project:"Metro Heights", workers:22, dayRate:680, totalBilled:410000, advance:40000, outstanding:370000 },
  { id:"CTR-06", name:"Bhosale Plumbing Services", trade:"Plumber", project:"Green Park Residency", workers:9, dayRate:850, totalBilled:295000, advance:35000, outstanding:260000 },
];

let ATTENDANCE = [
  { id:"ATT-001", date:"2026-08-14", contractor:"Shivaji Labour Suppliers", project:"Green Park Residency", present:30, absent:2, otHours:24 },
  { id:"ATT-002", date:"2026-08-14", contractor:"Patil Construction Labour", project:"Blue Ridge Tower", present:16, absent:2, otHours:12 },
  { id:"ATT-003", date:"2026-08-14", contractor:"Deshmukh Electrical Works", project:"Sunrise Apartments", present:11, absent:1, otHours:6 },
  { id:"ATT-004", date:"2026-08-13", contractor:"Karad Carpentry Group", project:"Silver County", present:14, absent:1, otHours:8 },
  { id:"ATT-005", date:"2026-08-13", contractor:"Om Sai Painting Contractors", project:"Metro Heights", present:20, absent:2, otHours:16 },
  { id:"ATT-006", date:"2026-08-13", contractor:"Bhosale Plumbing Services", project:"Green Park Residency", present:8, absent:1, otHours:4 },
  { id:"ATT-007", date:"2026-08-12", contractor:"Shivaji Labour Suppliers", project:"Green Park Residency", present:29, absent:3, otHours:18 },
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
  { id:"INV-2001", raBill:"RA-14", client:"Kohinoor Group", project:"Green Park Residency", basic:8500000, gst:18, tds:1, retention:5, dueDate:"2026-08-10", status:"Overdue", paid:0 },
  { id:"INV-2002", raBill:"RA-11", client:"Lodha Developers", project:"Sunrise Apartments", basic:6200000, gst:18, tds:1, retention:5, dueDate:"2026-08-28", status:"Outstanding", paid:0 },
  { id:"INV-2003", raBill:"RA-08", client:"Raheja Estates", project:"Blue Ridge Tower", basic:4100000, gst:18, tds:1, retention:5, dueDate:"2026-07-30", status:"Paid", paid:0 },
  { id:"INV-2004", raBill:"RA-09", client:"Silver Homes", project:"Silver County", basic:2950000, gst:18, tds:2, retention:5, dueDate:"2026-08-20", status:"Outstanding", paid:0 },
  { id:"INV-2005", raBill:"RA-05", client:"Prestige Group", project:"Emerald Business Park", basic:5300000, gst:18, tds:1, retention:5, dueDate:"2026-08-05", status:"Overdue", paid:0 },
  { id:"INV-2006", raBill:"RA-16", client:"DLF Ltd", project:"Metro Heights", basic:7800000, gst:18, tds:1, retention:5, dueDate:"2026-09-01", status:"Paid", paid:0 },
  { id:"INV-2007", raBill:"RA-03", client:"Sobha Ltd", project:"Palm Grove Estate", basic:3400000, gst:18, tds:1, retention:0, dueDate:"2026-07-15", status:"Paid", paid:0 },
];
INVOICES.forEach(inv=>{ if (inv.status==="Paid") inv.paid = invNet(inv); });

const PAYMENT_MODES = ["Bank Transfer", "Cheque", "UPI", "RTGS/NEFT"];
let PAYMENTS = [
  { id:"RCP-501", client:"Raheja Estates", invoice:"INV-2003", amount:4100000*1.18*0.94, mode:"RTGS/NEFT", date:"2026-08-01" },
  { id:"RCP-502", client:"DLF Ltd", invoice:"INV-2006", amount:7800000*1.18*0.94, mode:"Bank Transfer", date:"2026-08-06" },
  { id:"RCP-503", client:"Sobha Ltd", invoice:"INV-2007", amount:3400000*1.18*0.99, mode:"Cheque", date:"2026-07-20" },
];

/* ---------------------------- Clients & Vendors data ---------------------------- */
let CLIENTS = [
  { id:"CL-01", name:"Ramesh Kohinoor", company:"Kohinoor Group", phone:"+91 98220 11223", email:"ramesh@kohinoorgroup.in", projects:["Green Park Residency"] },
  { id:"CL-02", name:"Sanjay Lodha", company:"Lodha Developers", phone:"+91 98330 44556", email:"sanjay@lodhagroup.in", projects:["Sunrise Apartments"] },
  { id:"CL-03", name:"Vivek Raheja", company:"Raheja Estates", phone:"+91 98440 77889", email:"vivek@rahejaestates.in", projects:["Blue Ridge Tower"] },
  { id:"CL-04", name:"Meera Shah", company:"Silver Homes", phone:"+91 98550 22334", email:"meera@silverhomes.in", projects:["Silver County"] },
  { id:"CL-05", name:"Arjun Mehta", company:"Prestige Group", phone:"+91 98660 55667", email:"arjun@prestigegroup.in", projects:["Emerald Business Park"] },
  { id:"CL-06", name:"Kunal Singhania", company:"DLF Ltd", phone:"+91 98770 88990", email:"kunal@dlf.in", projects:["Metro Heights"] },
  { id:"CL-07", name:"Priya Sobha", company:"Sobha Ltd", phone:"+91 98880 11002", email:"priya@sobhaltd.in", projects:["Palm Grove Estate"] },
];

const VENDOR_CATEGORIES = ["Cement & Building Material", "Steel & Metal", "Electrical", "Sanitaryware & Plumbing", "Tiles & Flooring", "Paint & Finishing", "Aluminium & Glazing"];
let VENDORS = [
  { id:"VN-01", name:"Ambuja Cement Dealers", category:"Cement & Building Material", gstin:"27AAACC1206D1ZY", phone:"+91 90210 11122" },
  { id:"VN-02", name:"Tata Steel Distributors", category:"Steel & Metal", gstin:"27AABCT3518Q1ZV", phone:"+91 90320 22233" },
  { id:"VN-03", name:"Ultratech Building Supplies", category:"Cement & Building Material", gstin:"27AAACL0140P1ZR", phone:"+91 90430 33344" },
  { id:"VN-04", name:"Jindal Aluminium Co.", category:"Aluminium & Glazing", gstin:"27AAACJ4323R1Z2", phone:"+91 90540 44455" },
  { id:"VN-05", name:"Asian Paints Trading", category:"Paint & Finishing", gstin:"27AAACA8022G1Z6", phone:"+91 90650 55566" },
  { id:"VN-06", name:"Kajaria Tiles Depot", category:"Tiles & Flooring", gstin:"27AAACK5090L1ZW", phone:"+91 90760 66677" },
  { id:"VN-07", name:"Jaquar Sanitaryware", category:"Sanitaryware & Plumbing", gstin:"27AAACJ7009F1Z8", phone:"+91 90870 77788" },
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
  "Green Park Residency": "Rohit Sharma",
  "Sunrise Apartments": "Anita Deshmukh",
  "Blue Ridge Tower": "Vikram Patil",
  "Silver County": "Rohit Sharma",
  "Emerald Business Park": "Sneha Kulkarni",
  "Riverfront Villas": "Anita Deshmukh",
  "Metro Heights": "Vikram Patil",
  "Palm Grove Estate": "Sneha Kulkarni",
};

let DPRS = [
  { id:"DPR-101", date:"2026-08-14", site:"Green Park Residency", weather:"Clear", manpower:30, workDone:"Completed shuttering for 3rd floor slab, started rebar tying for column C12-C18.", materialNotes:"120 cement bags, 8 Cum sand consumed", notes:"Minor delay due to concrete pump breakdown, resolved by evening." },
  { id:"DPR-102", date:"2026-08-14", site:"Blue Ridge Tower", weather:"Cloudy", manpower:16, workDone:"Structural steel erection on Level 6 completed, welding inspection pending.", materialNotes:"2.5 Ton structural steel used", notes:"Welding inspector to visit tomorrow morning." },
  { id:"DPR-103", date:"2026-08-13", site:"Sunrise Apartments", weather:"Rain", manpower:11, workDone:"Internal plastering paused due to rain, waterproofing check on terrace.", materialNotes:"No major consumption today", notes:"Site partially waterlogged near Block B entrance, pump deployed." },
  { id:"DPR-104", date:"2026-08-13", site:"Silver County", weather:"Clear", manpower:14, workDone:"Vitrified tile laying completed for Tower 2, Floor 4.", materialNotes:"620 Sqm tiles, 40 bags tile adhesive", notes:"Quality check passed for grouting finish." },
  { id:"DPR-105", date:"2026-08-12", site:"Metro Heights", weather:"Extreme Heat", manpower:20, workDone:"External painting first coat on North facade.", materialNotes:"180 Ltr emulsion paint used", notes:"Work paused 1-3pm due to heat, resumed evening shift." },
];

let ISSUES = [
  { id:"ISS-201", site:"Green Park Residency", title:"Scaffolding instability near Block A", category:"Safety Incident", severity:"High", status:"In Progress", reportedBy:"Rohit Sharma", date:"2026-08-13" },
  { id:"ISS-202", site:"Blue Ridge Tower", title:"Delay in structural steel delivery", category:"Material Delay", severity:"Medium", status:"Open", reportedBy:"Vikram Patil", date:"2026-08-12" },
  { id:"ISS-203", site:"Sunrise Apartments", title:"Water seepage near Block B basement", category:"Site Issue", severity:"Medium", status:"Open", reportedBy:"Anita Deshmukh", date:"2026-08-13" },
  { id:"ISS-204", site:"Emerald Business Park", title:"Worker minor injury - hand laceration", category:"Safety Incident", severity:"Low", status:"Resolved", reportedBy:"Sneha Kulkarni", date:"2026-08-05" },
  { id:"ISS-205", site:"Metro Heights", title:"Crane operator certification expired", category:"Compliance", severity:"High", status:"Resolved", reportedBy:"Vikram Patil", date:"2026-08-01" },
];

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
};

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

    <section class="grid" style="grid-template-columns:2fr 1fr;gap:20px" id="featuredRow"></section>

    <section class="grid grid-5" id="moduleRow"></section>

    <section class="grid" style="grid-template-columns:1fr 2fr;gap:20px">
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

    <section class="grid" style="grid-template-columns:2fr 1fr;gap:20px">
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
            <h3 style="color:#fff;font-size:19px;margin:0;font-weight:600">Green Park Residency</h3>
            <p style="color:#e2e8f0;font-size:12px;margin:2px 0 0">Residential Project · Pune, Maharashtra</p>
          </div>
          <div class="hide-mobile" style="text-align:right;color:rgba(255,255,255,.9);font-size:11.5px">
            <p style="margin:0">PM: Rohit Sharma</p>
            <p style="margin:2px 0 0;color:rgba(255,255,255,.6)">15 Jan 2024 → 30 Dec 2025</p>
          </div>
        </div>
      </div>
      <div class="featured-body">
        <div style="position:relative;width:96px;height:96px;flex-shrink:0"><canvas id="featuredDonut"></canvas>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;font-weight:700">68%</span></div>
        </div>
        <div style="flex:1;min-width:180px">
          <p class="tiny bold" style="margin:0 0 6px">Project Progress · 68% Overall</p>
          ${legendRow("#16A34A","Work Completed","68%")}
          ${legendRow("#2563EB","Work in Progress","20%")}
          ${legendRow("#CBD5E1","Pending Work","12%")}
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
            <p style="font-size:10.5px;color:#059669;margin:0">${p.margin}%</p>
          </div>
        </div>
        <div class="progress-track"><div style="width:${p.margin*4}%"></div></div>
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
    data:{ datasets:[{ data:[68,20,12], backgroundColor:["#16A34A","#2563EB","#E2E8F0"], borderWidth:0 }] },
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

    <div class="flex gap-2" id="purchaseTabs">
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
    <div class="flex gap-2" id="labourTabs">
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
    <div class="flex gap-2" id="billingTabs">
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
  const clientMap = { "Green Park Residency":"Kohinoor Group","Sunrise Apartments":"Lodha Developers","Blue Ridge Tower":"Raheja Estates","Silver County":"Silver Homes","Emerald Business Park":"Prestige Group","Metro Heights":"DLF Ltd","Palm Grove Estate":"Sobha Ltd","Riverfront Villas":"Godrej Properties" };
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
    <div class="flex gap-2" id="partiesTabs">
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
    <div class="flex gap-2" id="siteTabs">
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

    <div class="flex" style="gap:16px;align-items:flex-start" id="reportsLayout">
      <div class="card" id="reportListWrap" style="padding:10px;width:260px;flex-shrink:0"></div>
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
  else renderPlaceholder(state.active);
  icons();
}

/* ---------------------------- global chrome events ---------------------------- */
document.getElementById("openMobileNav").addEventListener("click", ()=> document.getElementById("mobileNavOverlay").classList.add("open"));
document.getElementById("closeMobileNav").addEventListener("click", ()=> document.getElementById("mobileNavOverlay").classList.remove("open"));
document.getElementById("mobileNavOverlay").addEventListener("click", (e)=>{ if(e.target.id==="mobileNavOverlay") e.currentTarget.classList.remove("open"); });
document.getElementById("notifBtn").addEventListener("click", ()=> showToast("3 new notifications"));

/* ---------------------------- init ---------------------------- */
renderAll();
