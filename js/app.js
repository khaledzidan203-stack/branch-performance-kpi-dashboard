'use strict';

const state={
  daily:[],
  categories:[],
  activities:[],
  reminders:[],
  config:null,
  filters:{from:'',to:'',employee:'All',segment:'All'}
};

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const num=v=>Number(v)||0;
const div=(a,b)=>b?a/b:0;
const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'SAR',maximumFractionDigits:0}).format(v);
const pct=v=>(v*100).toFixed(1)+'%';

function parseCSV(text){
  const [head,...rows]=text.trim().split(/\r?\n/);
  const cols=head.split(',');
  return rows.map(r=>{
    const vals=r.split(',');
    return Object.fromEntries(cols.map((c,i)=>[c,vals[i]]));
  });
}

async function getText(path){
  const r=await fetch(path);
  if(!r.ok)throw Error(path);
  return r.text();
}

async function getJSON(path){
  const r=await fetch(path);
  if(!r.ok)throw Error(path);
  return r.json();
}

function calcRow(r){
  const total=num(r.total_sales);
  const covered_sales=num(r.covered_sales);
  const a=num(r.channel_a);
  const b=num(r.channel_b);
  const c=num(r.channel_c);
  const push=num(r.push_sales);
  const cc=num(r.total_customers);
  const scc=num(r.special_customers);
  const cash=total-(covered_sales+a+b+c);
  const core=cash+covered_sales;
  const special=total-core;
  const nwcc=cc-scc;

  return {
    ...r,total,covered_sales,a,b,c,push,cc,scc,cash,core,special,nwcc,
    basket:div(total,cc),
    coreBasket:div(core,nwcc),
    pushRate:div(push,core)
  };
}

function filteredRows(){
  return state.daily
    .map(calcRow)
    .filter(r=>
      (!state.filters.from||r.date>=state.filters.from)&&
      (!state.filters.to||r.date<=state.filters.to)&&
      (state.filters.employee==='All'||r.employee_id===state.filters.employee)
    );
}

function segmentValue(r){
  return state.filters.segment==='Core'
    ? r.core
    : state.filters.segment==='Special'
      ? r.special
      : r.total;
}

function segmentCustomers(r){
  return state.filters.segment==='Core'
    ? r.nwcc
    : state.filters.segment==='Special'
      ? r.scc
      : r.cc;
}

function salesStatus(achievement){
  const rules=state.config?.statusRules?.sales||{};
  const safe=num(rules.safe)||0.85;
  const watch=num(rules.watch)||0.80;
  return achievement>=safe?'SAFE':achievement>=watch?'WATCH':'DANGER';
}

function pointTargetStatus(actual,target){
  const multiplier=num(state.config?.statusRules?.operationalRate?.safe)||1;
  return actual>=target*multiplier?'SAFE':'DANGER';
}

function employeeMetrics(rows){
  const sales=rows.reduce((s,r)=>s+segmentValue(r),0);
  const customers=rows.reduce((s,r)=>s+segmentCustomers(r),0);
  const core=rows.reduce((s,r)=>s+r.core,0);
  const coreCustomers=rows.reduce((s,r)=>s+r.nwcc,0);
  const push=rows.reduce((s,r)=>s+r.push,0);

  return {
    sales,
    customers,
    basket:div(sales,customers),
    coreBasket:div(core,coreCustomers),
    pushRate:div(push,core)
  };
}

function summarize(){
  const rows=filteredRows();
  const dates=[...new Set(rows.filter(r=>segmentValue(r)>0).map(r=>r.date))];
  const total=rows.reduce((s,r)=>s+segmentValue(r),0);
  const cc=rows.reduce((s,r)=>s+segmentCustomers(r),0);
  const core=rows.reduce((s,r)=>s+r.core,0);
  const push=rows.reduce((s,r)=>s+r.push,0);
  const fullDays=state.daily.length?new Set(state.daily.map(r=>r.date)).size:1;
  const selectedDays=state.filters.from&&state.filters.to
    ?Math.round((new Date(state.filters.to)-new Date(state.filters.from))/86400000)+1
    :fullDays;

  let target=state.config.targets.sales*(selectedDays/fullDays);
  if(state.filters.segment==='Core'){
    target=state.config.targets.coreSales*(selectedDays/fullDays);
  }
  if(state.filters.segment==='Special'){
    target=Math.max(0,state.config.targets.sales-state.config.targets.coreSales)*(selectedDays/fullDays);
  }

  const ach=div(total,target);

  return {
    rows,total,cc,
    basket:div(total,cc),
    core,
    pushRate:div(push,core),
    target,
    ach,
    status:salesStatus(ach),
    activeDays:dates.length
  };
}

function setText(id,text){
  const el=$(id);
  if(el)el.textContent=text;
}

function renderKPIs(){
  const s=summarize();
  setText('#salesValue',money(s.total));
  setText('#salesSub',`Target ${money(s.target)}`);
  setText('#achievementValue',pct(s.ach));
  $('#achievementStatus').className='status '+s.status;
  setText('#achievementStatus',s.status);
  setText('#customerValue',s.cc.toLocaleString());
  setText('#basketValue',money(s.basket));
  setText('#pushValue',pct(s.pushRate));

  const ps=pointTargetStatus(s.pushRate,state.config.targets.pushRate);
  $('#pushStatus').className='status '+ps;
  setText('#pushStatus',ps);
  setText('#activeDays',s.activeDays+' days');
}

function groupByDate(rows){
  const m={};
  rows.forEach(r=>{m[r.date]=(m[r.date]||0)+segmentValue(r);});
  return Object.entries(m).sort();
}

function lineChart(elId,data){
  const el=$(elId);
  if(!el)return;
  const w=800,h=250,p=34,max=Math.max(1,...data.map(x=>x[1]));
  const pts=data.map((d,i)=>{
    const x=p+(i*(w-2*p)/Math.max(1,data.length-1));
    const y=h-p-(d[1]/max)*(h-2*p);
    return{x,y,d};
  });
  el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Sales trend"><line x1="${p}" y1="${h-p}" x2="${w-p}" y2="${h-p}" stroke="#cbd5e1"/><polyline fill="none" stroke="#2563eb" stroke-width="3" points="${pts.map(q=>q.x+','+q.y).join(' ')}"/>${pts.map(q=>`<circle cx="${q.x}" cy="${q.y}" r="4" fill="#2563eb"><title>${q.d[0]}: ${money(q.d[1])}</title></circle>`).join('')}</svg>`;
}

function renderTrend(){
  lineChart('#trendChart',groupByDate(filteredRows()));
}

function renderEmployees(){
  const rows=filteredRows();
  const ids=[...new Set(rows.map(r=>r.employee_id))];

  const body=ids.map(id=>{
    const rr=rows.filter(r=>r.employee_id===id);
    const name=rr[0]?.employee_name||id;
    const metrics=employeeMetrics(rr);
    const astTarget=state.config.targets.averageBasket;
    const pushTarget=state.config.targets.pushRate;
    const astStatus=pointTargetStatus(metrics.coreBasket,astTarget);
    const pushStatus=pointTargetStatus(metrics.pushRate,pushTarget);

    return `<tr>
      <td>${name}</td>
      <td>${money(metrics.sales)}</td>
      <td>${metrics.customers}</td>
      <td>${money(metrics.basket)}</td>
      <td>${money(metrics.coreBasket)}</td>
      <td><span class="status ${astStatus}">${astStatus}</span></td>
      <td>${pct(metrics.pushRate)}</td>
      <td><span class="status ${pushStatus}">${pushStatus}</span></td>
    </tr>`;
  }).join('');

  $('#employeeBody').innerHTML=body||'<tr><td colspan="8">No data</td></tr>';
}

function renderCategories(){
  $('#categoryBars').innerHTML=state.categories.map(x=>
    `<div class="barrow"><span>${x.category}</span><div class="bartrack"><div class="barfill" style="width:${Math.min(100,div(num(x.sales),num(x.target))*100)}%"></div></div><b>${pct(div(num(x.sales),num(x.target)))}</b></div>`
  ).join('');
}

function renderActivities(){
  $('#activityList').innerHTML=state.activities.map(a=>
    `<div class="activity"><b>${a.date}</b><span class="status ${a.priority==='High'?'DANGER':'WATCH'}">${a.type}</span><span>${a.title}</span><span class="muted">${a.owner}</span></div>`
  ).join('');

  $('#reminderList').innerHTML=state.reminders.map(r=>
    `<tr><td>${r.title}</td><td>${r.due}</td><td><span class="status ${r.status==='Open'?'WATCH':'SAFE'}">${r.status}</span></td></tr>`
  ).join('');
}

function renderAll(){
  renderKPIs();
  renderTrend();
  renderEmployees();
  renderCategories();
  renderActivities();
}

function bind(){
  $$('.nav button').forEach(b=>b.onclick=()=>{
    $$('.nav button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    $$('.page').forEach(p=>p.classList.remove('active'));
    $('#page-'+b.dataset.page).classList.add('active');
  });

  ['from','to','employee','segment'].forEach(k=>{
    $('#f-'+k).onchange=e=>{
      state.filters[k]=e.target.value;
      renderAll();
    };
  });
}

async function init(){
  try{
    const [daily,cats,acts,rems,config]=await Promise.all([
      getText('data/sample/daily_sales.csv'),
      getText('data/sample/category_sales.csv'),
      getJSON('data/sample/activities.json'),
      getJSON('data/sample/reminders.json'),
      getJSON('data/sample/config.json')
    ]);

    state.daily=parseCSV(daily);
    state.categories=parseCSV(cats);
    state.activities=acts;
    state.reminders=rems;
    state.config=config;

    const dates=state.daily.map(r=>r.date).sort();
    state.filters.from=dates[0];
    state.filters.to=dates.at(-1);

    $('#f-from').value=state.filters.from;
    $('#f-to').value=state.filters.to;
    $('#f-from').min=$('#f-to').min=dates[0];
    $('#f-from').max=$('#f-to').max=dates.at(-1);

    const emps=[...new Map(state.daily.map(r=>[r.employee_id,r.employee_name])).entries()];
    $('#f-employee').innerHTML='<option value="All">All Employees</option>'+
      emps.map(([id,n])=>`<option value="${id}">${n}</option>`).join('');

    setText('#branchName',config.branch);
    setText('#monthName',config.month);

    bind();
    renderAll();
  }catch(e){
    document.body.innerHTML='<main style="padding:40px;font-family:Arial"><h1>Local server required</h1><p>This demo loads synthetic CSV/JSON files. Start a local server from the repository folder, for example <code>python -m http.server 8000</code>, then open <code>http://localhost:8000</code>.</p></main>';
  }
}

if(typeof document!=='undefined'){
  document.addEventListener('DOMContentLoaded',init);
}

if(typeof module!=='undefined'&&module.exports){
  module.exports={
    state,
    num,
    div,
    parseCSV,
    calcRow,
    segmentValue,
    segmentCustomers,
    salesStatus,
    pointTargetStatus,
    employeeMetrics
  };
}
