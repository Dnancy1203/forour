/* OurLove · 回复心意提示（独立模块）
 * 与 index.html 同目录，由 index.html 自动加载。
 * 不覆盖原有字卡管理，只在同一个弹窗里增加「回复心意」侧栏。
 */
(function () {
  'use strict';

  const KEY = 'ourlove_reply_mood_hints_v3';
  const ACTIVATION_KEY = 'ourlove_reply_mood_hints_activation_v1';

  const DEFAULT_DATA = {
    mood: {
      '喜悦与正向':['开心','快乐','愉悦','高兴','满足','幸福','安心','放松','轻松','温暖','舒心','欣慰','愉快','期待','兴奋','惊喜','雀跃','满足感','充实','踏实','安心感','幸运','庆幸','感激','感动','欣喜','释然'],
      '亲近与爱意':['喜欢','在意','珍惜','信任','依赖','亲近','眷恋','想念','思念','牵挂','心软','心疼','怜惜','宠溺','偏爱','包容','纵容','依恋','舍不得','想靠近','想陪伴','想照顾','想保护','想了解','想回应'],
      '悲伤与低落':['难过','伤心','失落','遗憾','孤单','孤独','寂寞','委屈','无奈','疲惫','疲倦','低落','沮丧','失望','心酸','苦涩','空虚','迷茫','迷失','沉重','压抑','痛苦','悲伤','哀伤','落寞'],
      '愤怒与不满':['生气','愤怒','恼火','烦躁','不耐烦','不满','厌烦','抗拒','排斥','恼怒','气恼','不甘','嫉妒','吃醋','愤懑','委屈','赌气','冷淡','疏离'],
      '不安与恐惧':['害怕','恐惧','担心','忧虑','焦虑','紧张','不安','慌张','慌乱','害怕失去','忐忑','不知所措','心慌','压力','担忧','敏感'],
      '害羞与社交情绪':['害羞','不好意思','脸红','羞涩','尴尬','拘谨','腼腆','害臊','紧张','小心翼翼','不自然','犹豫','迟疑','想说又停下'],
      '思考与复杂情绪':['疑惑','困惑','好奇','惊讶','意外','震惊','犹豫','纠结','矛盾','迟疑','怀疑','不确定','复杂','说不清','想不明白','若有所思','沉思','认真','专注'],
      '自我情绪':['骄傲','自豪','自信','满足','羞愧','自责','后悔','内疚','不甘心','委屈自己','怀疑自己','失落感','无力','疲惫感','释怀','接受','放下'],
      '克制与隐藏':['平静','冷静','克制','忍耐','沉默','压下情绪','隐藏情绪','假装平静','表面平静','心里在意','偷偷开心','偷偷难过','默默期待','默默守护','不愿表达','不知道怎么说'],
      '中性与日常':['普通','平常','淡然','随意','自然','放空','发呆','安静','专注','认真','观察','等待','好奇','期待中','没有特别情绪'],
      '特殊表达情绪':['想被理解','想被看见','想确认','想解释','想安慰你','想陪着你','想靠近一点','舍不得离开','放心了','安心下来','松了一口气','忍不住开心','忍不住在意','藏着心事','有话想说','不知道怎么表达']
    },
    heart: {
      '陪伴与守护 🤍':['陪伴','陪着你','我在这里','安静陪你','想和你一起','不用一个人','待在你身边','不会离开','想陪你走下去','想和你待一会'],
      '分享与交流 💬':['分享','想告诉你','想和你聊聊','想让你知道','想听你的想法','想看看你的反应','想把这个分享给你','想和你交换想法'],
      '关心与照顾 🌱':['关心','想照顾你','希望你好好的','记得休息','不要太累','想确认你没事','希望你开心','想让你轻松一点'],
      '思念与靠近 🌙':['想念','想到你','想靠近一点','想见你','想和你在一起','想听你说话','想知道你在做什么','舍不得离开'],
      '理解与回应 🔔':['回应','我听到了','我明白','我知道','我记住了','我理解','收到你的话','想回应你'],
      '鼓励与支持 ✨':['支持','相信你','陪你努力','为你加油','认可你','为你感到骄傲','希望你坚持','我支持你的选择'],
      '邀请与互动 🎁':['邀请','想和你一起','想听你说','想和你讨论','等你加入','想一起分享','想和你做同一件事'],
      '记录与珍惜 📖':['记录','想记住','保存这一刻','珍惜现在','留下回忆','这个瞬间很重要','想收藏这份感觉'],
      '特殊表达 🌟':['想被理解','想被看见','有话想说','不知道怎么表达','藏着一点心事','想确认你的心意','舍不得表达']
    },
    specialHeart: {
      '特殊心意 · 珍惜 🌟':['想记住这个瞬间','这个时刻很特别','想保存这份感觉','不想忘记'],
      '特殊心意 · 连接 🔗':['想一直保持联系','想继续陪你交流','想知道你的消息','想和你一直说话'],
      '特殊心意 · 信任 🤍':['愿意告诉你','相信你','可以放心交给你','接受你的样子'],
      '特殊心意 · 默契 🌌':['你懂我的','不用说太多','我们之间有默契','这个感觉只有你懂']
    },
    intent: {
      '回应 🤍':['回应你','听到了','收到','我在听','想回答你','认真听你说','想回应你'],
      '分享 💬':['想分享','想告诉你','想聊聊','有事情想说','想让你知道','想和你说说'],
      '倾听 👂':['想听你说','等待你的回应','想知道你的想法','想听听你的意见','想看看你的反应'],
      '靠近 🌙':['想靠近','想陪着你','想和你待一会','想一起聊聊','想留在这里'],
      '了解 🔍':['想问问你','想了解','有点好奇','想知道更多','想认识你'],
      '安慰 🌱':['想安慰你','想陪陪你','希望你好一点','想让你安心','想照顾你'],
      '表达 🌟':['想表达','有话想说','想让你懂','希望你理解','想告诉你一些事'],
      '整理 🌫':['正在想','想一想','不知道怎么说','慢慢整理','还在思考']
    }
  };

  const layerNames = {mood:'情绪',heart:'心意',intent:'交流意图'};
  const state = {enabled:true,layers:{mood:true,heart:true,intent:true},items:{},data:JSON.parse(JSON.stringify(DEFAULT_DATA))};
  let currentLayer='mood';
  let panel=null;
  let activationAt=0;
  function ensureActivation(){
    try {
      const raw=localStorage.getItem(ACTIVATION_KEY);
      if(raw && Number(raw)>0){ activationAt=Number(raw); return; }
      activationAt=Date.now();
      localStorage.setItem(ACTIVATION_KEY,String(activationAt));
    } catch(e) { activationAt=Date.now(); }
  }
  function shouldAnnotateMessage(msg){
    if(!msg || !activationAt) return false;
    const t=new Date(msg.timestamp).getTime();
    return Number.isFinite(t) && t >= activationAt;
  }

  const clone = x => JSON.parse(JSON.stringify(x));
  const esc = s => String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const idOf = (layer,group,text) => layer+'|'+group+'|'+text;

  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  function mergeData(base, incoming){
    Object.keys(base).forEach(layer=>{
      if (incoming && incoming[layer] && typeof incoming[layer]==='object') {
        Object.keys(incoming[layer]).forEach(group=>{
          if(Array.isArray(incoming[layer][group])) base[layer][group]=incoming[layer][group];
        });
      }
    });
  }
  function load(){
    try{
      const raw=localStorage.getItem(KEY); if(!raw)return;
      const x=JSON.parse(raw); if(!x)return;
      state.enabled=x.enabled!==false;
      state.layers=Object.assign(state.layers,x.layers||{});
      mergeData(state.data,x.data||{});
      state.items=x.items||{};
    }catch(e){}
  }

  function entries(layer){
    const out=[];
    const groups = layer==='heart' ? ['heart','specialHeart'] : [layer];
    groups.forEach(src=>Object.keys(state.data[src]||{}).forEach(group=>{
      (state.data[src][group]||[]).forEach(text=>out.push({layer:'heart'===src||'specialHeart'===src?'heart':layer,source:src,group,text,on:state.items[idOf(src,group,text)]!==false}));
    }));
    return out;
  }
  function pick(layer){
    if(!state.enabled || !state.layers[layer])return null;
    const a=entries(layer).filter(x=>x.on);
    return a.length?a[Math.floor(Math.random()*a.length)]:null;
  }
  function generateHints(){
    if(!state.enabled)return [];
    const out=[];
    if(state.layers.mood && Math.random()<0.70){const x=pick('mood');if(x)out.push({type:'mood',text:x.text,group:x.group});}
    if(state.layers.heart && Math.random()<0.40){const x=pick('heart');if(x)out.push({type:'heart',text:x.text,group:x.group});}
    if(state.layers.intent && Math.random()<0.40){const x=pick('intent');if(x)out.push({type:'intent',text:x.text,group:x.group});}
    return out;
  }

  function add(layer,group,text){
    text=String(text||'').trim();group=String(group||'').trim();if(!text||!group)return false;
    const target=layer==='heart'&&group.indexOf('特殊心意 · ')===0?'specialHeart':layer;
    if(!state.data[target])state.data[target]={};if(!state.data[target][group])state.data[target][group]=[];
    state.data[target][group].push(text);save();return true;
  }
  function edit(layer,source,group,oldText,newText){
    newText=String(newText||'').trim();const a=state.data[source]?.[group];if(!a||!newText)return false;
    const i=a.indexOf(oldText);if(i<0)return false;a[i]=newText;delete state.items[idOf(source,group,oldText)];save();return true;
  }
  function remove(layer,source,group,text){const a=state.data[source]?.[group];if(!a)return false;state.data[source][group]=a.filter(x=>x!==text);delete state.items[idOf(source,group,text)];save();return true;}
  function toggle(source,group,text,on){state.items[idOf(source,group,text)]=!!on;save();}

  function ensurePanel(){
    const main=document.querySelector('#custom-replies-modal .modal-main-view');if(!main)return null;
    if(panel && panel.isConnected)return panel;
    panel=document.createElement('div');panel.id='ourlove-rmh-panel';
    panel.style.cssText='position:absolute;inset:0;z-index:20;display:none;flex-direction:column;min-width:0;max-width:100%;width:100%;height:100%;overflow:hidden;background:var(--primary-bg);box-sizing:border-box;';
    main.appendChild(panel);
    return panel;
  }

  function renderList(layer){
    currentLayer=layer;
    const sources=layer==='heart'?['heart','specialHeart']:[layer];
    let html='';
    sources.forEach(source=>Object.keys(state.data[source]||{}).forEach(group=>{
      html+=`<section style="margin:0 0 14px;"><div style="display:flex;justify-content:space-between;align-items:center;padding:7px 3px;font-size:12px;color:var(--text-secondary);font-weight:600;"><span>${esc(group)}</span><span>${state.data[source][group].length}</span></div>`;
      state.data[source][group].forEach(text=>{
        const on=state.items[idOf(source,group,text)]!==false;
        html+=`<div class="rmh-item" data-source="${esc(source)}" data-group="${esc(group)}" data-text="${esc(text)}" style="display:flex;align-items:center;gap:7px;padding:10px 11px;margin:0 0 6px;border:1px solid var(--border-color);border-radius:12px;background:var(--secondary-bg);box-sizing:border-box;opacity:${on?1:.48};"><span style="flex:1;min-width:0;overflow-wrap:anywhere;font-size:13px;color:var(--text-primary);">${esc(text)}</span><button class="rmh-edit" title="修改" style="flex:0 0 auto;border:0;background:none;color:var(--text-secondary);padding:6px;cursor:pointer;"><i class="fas fa-pen"></i></button><button class="rmh-toggle" title="启用/停用" style="flex:0 0 auto;border:0;background:none;color:${on?'var(--accent-color)':'var(--text-secondary)'};padding:6px;cursor:pointer;"><i class="fas ${on?'fa-eye':'fa-eye-slash'}"></i></button><button class="rmh-delete" title="删除" style="flex:0 0 auto;border:0;background:none;color:var(--text-secondary);padding:6px;cursor:pointer;"><i class="fas fa-trash"></i></button></div>`;
      });
      html+='</section>';
    }));
    return html;
  }

  function renderPanel(){
    const p=ensurePanel();if(!p)return;
    const counts={mood:entries('mood').length,heart:entries('heart').length,intent:entries('intent').length};
    p.innerHTML=`<div style="height:100%;width:100%;max-width:100%;display:flex;flex-direction:column;min-width:0;box-sizing:border-box;overflow:hidden;">
      <div style="flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--border-color);background:var(--secondary-bg);box-sizing:border-box;min-width:0;">
        <button id="rmh-back" type="button" title="返回回复库" style="flex:0 0 auto;border:0;background:transparent;color:var(--text-secondary);padding:7px 8px;border-radius:9px;cursor:pointer;font-size:14px;"><i class="fas fa-chevron-left"></i></button>
        <i class="fas fa-heart" style="color:var(--accent-color);"></i><strong style="font-size:16px;">回复心意</strong><span style="margin-left:auto;font-size:11px;color:var(--text-secondary);">独立模块</span>
        <button id="rmh-close" type="button" title="关闭" style="flex:0 0 auto;border:0;background:transparent;color:var(--text-secondary);padding:7px 8px;border-radius:9px;cursor:pointer;font-size:15px;"><i class="fas fa-times"></i></button>
      </div>
      <div style="flex:0 0 auto;padding:11px 14px;border-bottom:1px solid var(--border-color);background:var(--secondary-bg);display:flex;align-items:center;gap:10px;min-width:0;box-sizing:border-box;"><div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:600;">回复下方显示心意提示</div><div style="font-size:11px;color:var(--text-secondary);margin-top:3px;line-height:1.4;">随机生成，不参与 TA 实际回复内容</div></div><button id="rmh-global" style="flex:0 0 auto;border:0;border-radius:20px;padding:7px 12px;background:${state.enabled?'var(--accent-color)':'var(--border-color)'};color:${state.enabled?'#fff':'var(--text-secondary)'};cursor:pointer;white-space:nowrap;">${state.enabled?'已开启':'已关闭'}</button></div>
      <div style="flex:0 0 auto;display:flex;gap:7px;padding:10px 12px 8px;overflow-x:auto;background:var(--secondary-bg);box-sizing:border-box;min-width:0;">${['mood','heart','intent'].map(k=>`<button class="rmh-layer" data-layer="${k}" style="flex:0 0 auto;white-space:nowrap;border:1px solid var(--border-color);border-radius:20px;padding:7px 11px;background:${currentLayer===k?'var(--primary-bg)':'transparent'};color:${state.layers[k]?'var(--text-primary)':'var(--text-secondary)'};cursor:pointer;">${layerNames[k]} ${counts[k]}</button>`).join('')}</div>
      <div id="rmh-list" style="flex:1 1 auto;min-height:0;min-width:0;overflow-y:auto;overflow-x:hidden;padding:8px 12px 12px;background:var(--primary-bg);box-sizing:border-box;-webkit-overflow-scrolling:touch;">${renderList(currentLayer)}</div>
      <div style="flex:0 0 auto;padding:10px 12px;border-top:1px solid var(--border-color);background:var(--secondary-bg);box-sizing:border-box;"><button id="rmh-add" style="width:100%;padding:10px;border:1px solid var(--accent-color);border-radius:12px;background:transparent;color:var(--accent-color);font-family:var(--font-family);cursor:pointer;"><i class="fas fa-plus"></i> 添加${layerNames[currentLayer]}</button></div>
    </div>`;
    bindPanel(p);
  }

  function dialog(title,body,ok){
    const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:rgba(0,0,0,.35);';
    ov.innerHTML=`<div style="width:min(92vw,430px);max-width:100%;max-height:86vh;overflow:auto;box-sizing:border-box;background:var(--secondary-bg);border:1px solid var(--border-color);border-radius:18px;padding:18px;box-shadow:var(--shadow);"><div style="font-size:16px;font-weight:600;margin-bottom:14px;">${title}</div>${body}<div style="display:flex;gap:8px;margin-top:16px;"><button id="rmh-cancel" style="flex:1;padding:10px;border:1px solid var(--border-color);border-radius:12px;background:none;color:var(--text-secondary);cursor:pointer;">取消</button><button id="rmh-ok" style="flex:1;padding:10px;border:0;border-radius:12px;background:var(--accent-color);color:#fff;cursor:pointer;">确定</button></div></div>`;
    document.body.appendChild(ov);ov.querySelector('#rmh-cancel').onclick=()=>ov.remove();ov.onclick=e=>{if(e.target===ov)ov.remove();};ov.querySelector('#rmh-ok').onclick=()=>{if(ok(ov)!==false)ov.remove();};
  }
  function addDialog(layer){
    const sources=layer==='heart'?['heart','specialHeart']:[layer];const groups=[];sources.forEach(s=>Object.keys(state.data[s]||{}).forEach(g=>groups.push({source:s,group:g})));
    dialog('添加'+layerNames[layer],`<label style="font-size:12px;color:var(--text-secondary);">分类</label><select id="rmh-group" style="width:100%;box-sizing:border-box;padding:10px;margin:6px 0 12px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);">${groups.map(x=>`<option value="${esc(x.source+'||'+x.group)}">${esc(x.group)}</option>`).join('')}<option value="__new">＋新建分类</option></select><input id="rmh-newgroup" placeholder="新分类名称（选择新建分类时填写）" style="display:none;width:100%;box-sizing:border-box;padding:10px;margin-bottom:10px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);"><input id="rmh-text" placeholder="输入内容" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);">`,ov=>{const s=ov.querySelector('#rmh-group'),ng=ov.querySelector('#rmh-newgroup');s.onchange=()=>ng.style.display=s.value==='__new'?'block':'none';let g=s.value;let source=layer;if(g==='__new'){g=ng.value.trim();if(layer==='heart'&&g.indexOf('特殊心意 · ')===0)source='specialHeart';}else{const parts=g.split('||');source=parts[0];g=parts.slice(1).join('||');}return add(source==='specialHeart'?'heart':layer,g,ov.querySelector('#rmh-text').value);});
  }
  function editDialog(source,group,text){dialog('修改'+layerNames[source==='specialHeart'?'heart':source],`<div style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">${esc(group)}</div><input id="rmh-text" value="${esc(text)}" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);">`,ov=>edit(source==='specialHeart'?'heart':source,source,group,text,ov.querySelector('#rmh-text').value));}

  function bindPanel(p){
    const modal=document.getElementById('custom-replies-modal');
    const back=p.querySelector('#rmh-back');
    const close=p.querySelector('#rmh-close');
    if(back) back.onclick=()=>closePanel();
    if(close) close.onclick=()=>{
      closePanel();
      if(modal && typeof hideModal==='function') hideModal(modal);
      else if(modal) modal.classList.remove('active');
    };
    p.querySelector('#rmh-global').onclick=()=>{state.enabled=!state.enabled;save();renderPanel();};
    p.querySelectorAll('.rmh-layer').forEach(b=>b.onclick=()=>{currentLayer=b.dataset.layer;renderPanel();});
    p.querySelector('#rmh-add').onclick=()=>addDialog(currentLayer);
    p.querySelectorAll('.rmh-item').forEach(row=>{
      const source=row.dataset.source,group=row.dataset.group,text=row.dataset.text;
      row.querySelector('.rmh-toggle').onclick=()=>{toggle(source,group,text,state.items[idOf(source,group,text)]===false);renderPanel();};
      row.querySelector('.rmh-delete').onclick=()=>{if(confirm('确定删除这条内容吗？')){remove(source==='specialHeart'?'heart':source,source,group,text);renderPanel();}};
      row.querySelector('.rmh-edit').onclick=()=>editDialog(source,group,text);
    });
  }

  function hideOriginal(main){
    [...main.children].forEach(el=>{if(el!==panel){if(!el.dataset.rmhOldDisplay)el.dataset.rmhOldDisplay=el.style.display||'';el.style.display='none';}});
  }
  function restoreOriginal(main){
    [...main.children].forEach(el=>{if(el!==panel&&el.dataset.rmhOldDisplay!==undefined){el.style.display=el.dataset.rmhOldDisplay;delete el.dataset.rmhOldDisplay;}});
    if(panel)panel.style.display='none';
  }
  function openPanel(){
    const modal=document.getElementById('custom-replies-modal'),main=modal?.querySelector('.modal-main-view');if(!main)return;
    const p=ensurePanel();if(!p)return;
    hideOriginal(main);p.style.display='flex';
    document.querySelectorAll('#custom-replies-modal .sidebar-btn').forEach(x=>x.classList.remove('active'));
    document.getElementById('ourlove-rmh-btn')?.classList.add('active');
    renderPanel();
  }
  function closePanel(){const main=document.querySelector('#custom-replies-modal .modal-main-view');if(main)restoreOriginal(main);document.getElementById('ourlove-rmh-btn')?.classList.remove('active');}

  function injectButton(){
    const side=document.querySelector('#custom-replies-modal .modal-sidebar');if(!side)return;
    let b=document.getElementById('ourlove-rmh-btn');
    if(!b){
      b=document.createElement('button');
      b.id='ourlove-rmh-btn';
      b.className='sidebar-btn';
      b.dataset.major='reply-mood-hints';
      b.type='button';
      b.innerHTML='<i class="fas fa-heart"></i><span>回复心意</span>';
      side.appendChild(b);
    }

    // 统一接管并列侧栏：不让“回复心意”把原回复库的切换逻辑卡死。
    if(side.dataset.rmhCaptureBound!=='2'){
      side.dataset.rmhCaptureBound='2';
      side.addEventListener('click',function(e){
        const btn=e.target.closest('.sidebar-btn');
        if(!btn || !side.contains(btn)) return;

        if(btn.id==='ourlove-rmh-btn'){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openPanel();
          return;
        }

        // 先恢复原来的主界面，再由我们明确执行原页面的切换。
        closePanel();
        document.querySelectorAll('#custom-replies-modal .sidebar-btn').forEach(x=>x.classList.toggle('active',x===btn));

        const major=btn.dataset.major;
        if(major==='reply'){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          try{
            currentMajorTab='reply'; currentSubTab='custom';
            _batchModeActive=false; _batchSelectedIndices.clear();
            _searchVisible=false; _searchQuery=''; _activeGroupFilter=null;
            const listArea=document.getElementById('custom-replies-list');
            const annPanel=document.getElementById('announcement-panel');
            const crToolbar=document.getElementById('cr-toolbar');
            const subTabs=document.getElementById('cr-sub-tabs');
            const addBtn=document.getElementById('add-custom-reply');
            const titleEl=document.getElementById('cr-modal-title');
            if(listArea)listArea.style.display=''; if(annPanel)annPanel.style.display='none';
            if(crToolbar)crToolbar.style.display=''; if(subTabs)subTabs.style.display=''; if(addBtn)addBtn.style.display='';
            if(titleEl)titleEl.textContent='内容管理';
            renderReplyLibrary();
          }catch(err){ console.error('[ReplyMoodHints] restore reply library failed',err); }
          return;
        }

        if(major==='atmosphere'){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          try{
            currentMajorTab='atmosphere';
            _batchModeActive=false; _batchSelectedIndices.clear();
            _searchVisible=false; _searchQuery=''; _activeGroupFilter=null;
            const listArea=document.getElementById('custom-replies-list');
            const annPanel=document.getElementById('announcement-panel');
            const crToolbar=document.getElementById('cr-toolbar');
            const subTabs=document.getElementById('cr-sub-tabs');
            const addBtn=document.getElementById('add-custom-reply');
            const titleEl=document.getElementById('cr-modal-title');
            if(listArea)listArea.style.display=''; if(annPanel)annPanel.style.display='none';
            if(crToolbar)crToolbar.style.display=''; if(subTabs)subTabs.style.display=''; if(addBtn)addBtn.style.display='';
            if(titleEl)titleEl.textContent='内容管理';
            currentSubTab=LIBRARY_CONFIG.atmosphere.tabs[0].id;
            renderReplyLibrary();
          }catch(err){ console.error('[ReplyMoodHints] restore atmosphere failed',err); }
          return;
        }

        if(major==='announcement'){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          try{
            currentMajorTab='announcement';
            currentSubTab='custom';
            _batchModeActive=false; _batchSelectedIndices.clear();
            _searchVisible=false; _searchQuery=''; _activeGroupFilter=null;
            const listArea=document.getElementById('custom-replies-list');
            const annPanel=document.getElementById('announcement-panel');
            const crToolbar=document.getElementById('cr-toolbar');
            const subTabs=document.getElementById('cr-sub-tabs');
            const addBtn=document.getElementById('add-custom-reply');
            const titleEl=document.getElementById('cr-modal-title');
            if(listArea)listArea.style.display='none';
            if(annPanel)annPanel.style.display='block';
            if(crToolbar)crToolbar.style.display='none';
            if(subTabs)subTabs.style.display='none';
            if(addBtn)addBtn.style.display='none';
            if(titleEl)titleEl.textContent='今日公告配置';
            if(typeof switchToAnnouncementPanel==='function') switchToAnnouncementPanel();
          }catch(err){ console.error('[ReplyMoodHints] switch announcement failed',err); }
          return;
        }

        // 公告仍交给原页面的 onclick / listener。
      },true);
    }
  }

  window.OurLoveReplyMoodHints={state,generateHints,shouldAnnotateMessage,getData:()=>clone(state.data),openPanel,closePanel,add,edit:(layer,source,group,oldText,newText)=>edit(layer,source,group,oldText,newText),remove,setItemEnabled:toggle};
  load();
  ensureActivation();
  const obs=new MutationObserver(injectButton);obs.observe(document.documentElement,{childList:true,subtree:true});
  injectButton();
})();
