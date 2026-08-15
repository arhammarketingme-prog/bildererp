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

const state = {
  active: "Dashboard",
  proj: { view:"table", query:"", status:"All", sort:"name", page:1, pageSize:5 },
  boq: { query:"", project:"All", status:"All", page:1, pageSize:6 },
  purchase: { tab:"po", query:"", status:"All", page:1, pageSize:6 },
  labour: { tab:"attendance", query:"", page:1, pageSize:6 },
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
