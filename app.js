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

/* ---------------------------- state ---------------------------- */
const state = {
  active: "Dashboard",
  proj: { view:"table", query:"", status:"All", sort:"name", page:1, pageSize:5 },
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
