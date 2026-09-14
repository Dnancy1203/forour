/* OurLove · 回复心意提示（独立模块）
 * 用法：把本文件上传到与 index.html 同目录，并在 </body> 前加入：
 * <script src="reply-mood-hints.js"></script>
 *
 * 本模块不修改 OurLove 原有 customReplies 数据。
 * 管理入口会自动出现在「字卡/回复库」弹窗的顶部。
 * 数据独立保存在 localStorage。
 */
(function () {
  'use strict';

  const KEY = 'ourlove_reply_mood_hints_v1';
  const DEFAULT_DATA = {"mood":{"喜悦与正向":["开心","快乐","愉悦","高兴","满足","幸福","安心","放松","轻松","温暖","舒心","欣慰","愉快","期待","兴奋","惊喜","雀跃","满足感","充实","踏实","安心感","幸运","庆幸","感激","感动","欣喜","释然"],"亲近与爱意":["喜欢","在意","珍惜","信任","依赖","亲近","眷恋","想念","思念","牵挂","心软","心疼","怜惜","宠溺","偏爱","包容","纵容","依恋","舍不得","想靠近","想陪伴","想照顾","想保护","想了解","想回应"],"悲伤与低落":["难过","伤心","失落","遗憾","孤单","孤独","寂寞","委屈","无奈","疲惫","疲倦","低落","沮丧","失望","心酸","苦涩","空虚","迷茫","迷失","沉重","压抑","痛苦","悲伤","哀伤","落寞"],"愤怒与不满":["生气","愤怒","恼火","烦躁","不耐烦","不满","厌烦","抗拒","排斥","恼怒","气恼","不甘","嫉妒","吃醋","愤懑","委屈","赌气","冷淡","疏离"],"不安与恐惧":["害怕","恐惧","担心","忧虑","焦虑","紧张","不安","慌张","慌乱","害怕失去","忐忑","不知所措","心慌","压力","担忧","敏感"],"害羞与社交情绪":["害羞","不好意思","脸红","羞涩","尴尬","拘谨","腼腆","害臊","紧张","小心翼翼","不自然","犹豫","迟疑","想说又停下"],"思考与复杂情绪":["疑惑","困惑","好奇","惊讶","意外","震惊","犹豫","纠结","矛盾","迟疑","怀疑","不确定","复杂","说不清","想不明白","若有所思","沉思","认真","专注"],"自我情绪":["骄傲","自豪","自信","满足","羞愧","自责","后悔","内疚","不甘心","委屈自己","怀疑自己","失落感","无力","疲惫感","释怀","接受","放下"],"克制与隐藏":["平静","冷静","克制","忍耐","沉默","压下情绪","隐藏情绪","假装平静","表面平静","心里在意","偷偷开心","偷偷难过","默默期待","默默守护","不愿表达","不知道怎么说"],"中性与日常":["普通","平常","淡然","随意","自然","放空","发呆","安静","专注","认真","观察","等待","好奇","期待中","没有特别情绪"],"特殊表达情绪":["想被理解","想被看见","想确认","想解释","想安慰你","想陪着你","想靠近一点","舍不得离开","放心了","安心下来","松了一口气","忍不住开心","忍不住在意","藏着心事","有话想说","不知道怎么表达"]},"heart":{"陪伴与守护 🤍":["陪伴","陪着你","我在这里","安静陪你","想和你一起","不用一个人","待在你身边","不会离开","想陪你走下去","想和你待一会"],"分享与交流 💬":["分享","想告诉你","想和你聊聊","想让你知道","想听你的想法","想看看你的反应","想把这个分享给你","想和你交换想法"],"关心与照顾 🌱":["关心","想照顾你","希望你好好的","记得休息","不要太累","想确认你没事","希望你开心","想让你轻松一点"],"思念与靠近 🌙":["想念","想到你","想靠近一点","想见你","想和你在一起","想听你说话","想知道你在做什么","舍不得离开"],"理解与回应 🔔":["回应","我听到了","我明白","我知道","我记住了","我理解","收到你的话","想回应你"],"鼓励与支持 ✨":["支持","相信你","陪你努力","为你加油","认可你","为你感到骄傲","希望你坚持","我支持你的选择"],"邀请与互动 🎁":["邀请","想和你一起","想听你说","想和你讨论","等你加入","想一起分享","想和你做同一件事"],"记录与珍惜 📖":["记录","想记住","保存这一刻","珍惜现在","留下回忆","这个瞬间很重要","想收藏这份感觉"],"特殊表达 🌟":["想被理解","想被看见","有话想说","不知道怎么表达","藏着一点心事","想确认你的心意","舍不得表达"]},"intent":{"回应 🤍":["回应你","听到了","收到","我在听","想回答你","认真听你说","想回应你"],"分享 💬":["想分享","想告诉你","想聊聊","有事情想说","想让你知道","想和你说说"],"倾听 👂":["想听你说","等待你的回应","想知道你的想法","想听听你的意见","想看看你的反应"],"靠近 🌙":["想靠近","想陪着你","想和你待一会","想一起聊聊","想留在这里"],"了解 🔍":["想问问你","想了解","有点好奇","想知道更多","想认识你"],"安慰 🌱":["想安慰你","想陪陪你","希望你好一点","想让你安心","想照顾你"],"表达 🌟":["想表达","有话想说","想让你懂","希望你理解","想告诉你一些事"],"整理 🌫":["正在想","想一想","不知道怎么说","慢慢整理","还在思考"]},"specialHeart":{"珍惜 🌟":["想记住这个瞬间","这个时刻很特别","想保存这份感觉","不想忘记"],"连接 🔗":["想一直保持联系","想继续陪你交流","想知道你的消息","想和你一直说话"],"信任 🤍":["愿意告诉你","相信你","可以放心交给你","接受你的样子"],"默契 🌌":["你懂我的","不用说太多","我们之间有默契","这个感觉只有你懂"]}};

  const state = {
    enabled: true,
    layers: { mood: true, heart: true, intent: true },
    items: {},
    data: JSON.parse(JSON.stringify(DEFAULT_DATA))
  };

  const layerNames = { mood: '情绪', heart: '心意', intent: '交流意图' };

  function uid() {
    return 'rmh_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const x = JSON.parse(raw);
      if (x && typeof x === 'object') {
        state.enabled = x.enabled !== false;
        state.layers = Object.assign(state.layers, x.layers || {});
        state.data = Object.assign({}, DEFAULT_DATA, x.data || {});
        state.items = x.items || {};
      }
    } catch (e) {}
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function flat(layer) {
    const out = [];
    Object.keys(state.data[layer] || {}).forEach(group => {
      (state.data[layer][group] || []).forEach(text => {
        const id = makeId(layer, group, text);
        out.push({id, layer, group, text, on: state.items[id] !== false});
      });
    });
    return out;
  }
  function makeId(layer, group, text) {
    return layer + '|' + group + '|' + text;
  }
  function allEntries(layer) { return flat(layer); }

  function pick(layer) {
    if (!state.enabled || !state.layers[layer]) return null;
    const arr = allEntries(layer).filter(x => x.on);
    return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
  }

  /* 纯随机：三层彼此独立。
   * 情绪沿用 Mochi 的基础 70% 概率；
   * 心意/交流意图沿用实际代码中的 40% 概率。
   * 取消原 Mochi 的「情绪→心意→意图」语义链。
   */
  function generateHints() {
    if (!state.enabled) return [];
    const out = [];
    if (state.layers.mood && Math.random() < 0.70) {
      const x = pick('mood'); if (x) out.push({type:'mood', text:x.text, group:x.group});
    }
    if (state.layers.heart && Math.random() < 0.40) {
      const x = pick('heart'); if (x) out.push({type:'heart', text:x.text, group:x.group});
    }
    if (state.layers.intent && Math.random() < 0.40) {
      const x = pick('intent'); if (x) out.push({type:'intent', text:x.text, group:x.group});
    }
    return out;
  }

  function add(layer, group, text) {
    text = String(text || '').trim(); group = String(group || '').trim();
    if (!text || !group || !state.data[layer]) return false;
    if (!state.data[layer][group]) state.data[layer][group] = [];
    state.data[layer][group].push(text);
    save(); return true;
  }
  function edit(layer, group, oldText, newText) {
    if (!state.data[layer] || !state.data[layer][group]) return false;
    const a = state.data[layer][group], i = a.indexOf(oldText);
    if (i < 0 || !String(newText || '').trim()) return false;
    a[i] = String(newText).trim();
    const oldId = makeId(layer, group, oldText);
    delete state.items[oldId];
    save(); return true;
  }
  function remove(layer, group, text) {
    if (!state.data[layer] || !state.data[layer][group]) return false;
    state.data[layer][group] = state.data[layer][group].filter(x => x !== text);
    delete state.items[makeId(layer, group, text)];
    save(); return true;
  }
  function setItemEnabled(layer, group, text, on) {
    state.items[makeId(layer, group, text)] = !!on;
    save();
  }

  function injectButton() {
    const side = document.querySelector('#custom-replies-modal .modal-sidebar');
    if (!side || document.getElementById('ourlove-rmh-btn')) return;
    const b = document.createElement('button');
    b.id = 'ourlove-rmh-btn';
    b.className = 'sidebar-btn';
    b.innerHTML = '<i class="fas fa-heart"></i><span>回复心意</span>';
    b.addEventListener('click', openPanel);
    side.appendChild(b);
  }

  function openPanel() {
    const modal = document.getElementById('custom-replies-modal');
    if (!modal) return;
    document.querySelectorAll('#custom-replies-modal .sidebar-btn').forEach(x => x.classList.remove('active'));
    const btn = document.getElementById('ourlove-rmh-btn'); if (btn) btn.classList.add('active');

    const main = modal.querySelector('.modal-main-view');
    if (!main) return;
    main.innerHTML = renderPanel();
    bindPanel(main);
  }

  function renderPanel() {
    const enabled = state.enabled;
    const counts = {
      mood: allEntries('mood').length,
      heart: allEntries('heart').length,
      intent: allEntries('intent').length
    };
    return `
      <div style="height:100%;display:flex;flex-direction:column;background:var(--secondary-bg);">
        <div class="modal-title" style="padding:15px 20px;font-size:16px;">
          <i class="fas fa-heart"></i> 回复心意
          <span style="margin-left:auto;font-size:11px;color:var(--text-secondary);">独立字卡模块</span>
        </div>
        <div style="padding:12px 20px;border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:10px;">
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;">回复下方显示心意提示</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:3px;">随机生成，不参与 TA 实际回复内容</div>
          </div>
          <button id="rmh-global" style="border:0;border-radius:20px;padding:7px 13px;background:${enabled?'var(--accent-color)':'var(--border-color)'};color:${enabled?'#fff':'var(--text-secondary)'};cursor:pointer;">
            ${enabled?'已开启':'已关闭'}
          </button>
        </div>
        <div style="display:flex;gap:7px;padding:12px 15px 8px;overflow:auto;">
          ${['mood','heart','intent'].map(k => `
            <button class="rmh-layer" data-layer="${k}" style="white-space:nowrap;border:1px solid var(--border-color);border-radius:20px;padding:7px 12px;background:${state.layers[k]?'var(--primary-bg)':'transparent'};color:${state.layers[k]?'var(--text-primary)':'var(--text-secondary)'};cursor:pointer;">
              ${layerNames[k]} <span style="font-size:10px;opacity:.65;">${counts[k]}</span>
            </button>`).join('')}
        </div>
        <div id="rmh-list" style="flex:1;overflow:auto;padding:8px 15px 70px;background:var(--primary-bg);">
          ${renderList('mood')}
        </div>
        <div style="padding:10px 15px;border-top:1px solid var(--border-color);background:var(--secondary-bg);">
          <button id="rmh-add" style="width:100%;padding:10px;border:1px solid var(--accent-color);border-radius:12px;background:transparent;color:var(--accent-color);font-family:var(--font-family);cursor:pointer;">
            <i class="fas fa-plus"></i> 添加${layerNames['mood']}
          </button>
        </div>
      </div>`;
  }

  let currentLayer = 'mood';

  function renderList(layer) {
    currentLayer = layer;
    return Object.keys(state.data[layer] || {}).map(group => `
      <div style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 2px;font-size:12px;color:var(--text-secondary);font-weight:600;">
          <span>${esc(group)}</span>
          <span>${(state.data[layer][group] || []).length}</span>
        </div>
        ${(state.data[layer][group] || []).map(text => {
          const on = state.items[makeId(layer,group,text)] !== false;
          return `<div class="rmh-item" data-group="${esc(group)}" data-text="${esc(text)}" style="display:flex;align-items:center;gap:8px;padding:10px 11px;margin-bottom:6px;border:1px solid var(--border-color);border-radius:12px;background:var(--secondary-bg);opacity:${on?1:.5};">
            <span style="flex:1;font-size:13px;color:var(--text-primary);">${esc(text)}</span>
            <button class="rmh-edit" title="修改" style="border:0;background:none;color:var(--text-secondary);cursor:pointer;"><i class="fas fa-pen"></i></button>
            <button class="rmh-toggle" title="启用/停用" style="border:0;background:none;color:${on?'var(--accent-color)':'var(--text-secondary)'};cursor:pointer;"><i class="fas ${on?'fa-eye':'fa-eye-slash'}"></i></button>
            <button class="rmh-delete" title="删除" style="border:0;background:none;color:var(--text-secondary);cursor:pointer;"><i class="fas fa-trash"></i></button>
          </div>`;
        }).join('')}
      </div>`).join('');
  }

  function bindPanel(main) {
    main.querySelector('#rmh-global').onclick = () => { state.enabled=!state.enabled; save(); openPanel(); };
    main.querySelectorAll('.rmh-layer').forEach(b => b.onclick = () => {
      const layer = b.dataset.layer;
      state.layers[layer] = !state.layers[layer]; save(); openPanel();
    });
    main.querySelector('#rmh-add').onclick = () => addDialog(currentLayer);
    bindItems(main);
  }

  function bindItems(main) {
    main.querySelectorAll('.rmh-item').forEach(row => {
      const group = row.dataset.group, text = row.dataset.text;
      row.querySelector('.rmh-toggle').onclick = () => { setItemEnabled(currentLayer,group,text,!isItemOn(currentLayer,group,text)); openPanel(); };
      row.querySelector('.rmh-delete').onclick = () => {
        if (confirm('确定删除这条内容吗？')) { remove(currentLayer,group,text); openPanel(); }
      };
      row.querySelector('.rmh-edit').onclick = () => editDialog(currentLayer,group,text);
    });
  }
  function isItemOn(layer,group,text) { return state.items[makeId(layer,group,text)] !== false; }

  function dialogBase(title, body, onOk) {
    const ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';
    ov.innerHTML=`<div style="width:min(92vw,430px);max-height:85vh;overflow:auto;background:var(--secondary-bg);border:1px solid var(--border-color);border-radius:18px;box-shadow:var(--shadow);padding:18px;">
      <div style="font-size:16px;font-weight:600;margin-bottom:14px;">${title}</div>${body}
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button id="rmh-cancel" style="flex:1;padding:10px;border:1px solid var(--border-color);border-radius:12px;background:none;color:var(--text-secondary);cursor:pointer;">取消</button>
        <button id="rmh-ok" style="flex:1;padding:10px;border:0;border-radius:12px;background:var(--accent-color);color:#fff;cursor:pointer;">确定</button>
      </div></div>`;
    document.body.appendChild(ov);
    ov.querySelector('#rmh-cancel').onclick=()=>ov.remove();
    ov.addEventListener('click',e=>{if(e.target===ov)ov.remove();});
    ov.querySelector('#rmh-ok').onclick=()=>{ if(onOk(ov)!==false) ov.remove(); };
  }
  function addDialog(layer) {
    const groups=Object.keys(state.data[layer]||{});
    dialogBase('添加'+layerNames[layer],`
      <label style="font-size:12px;color:var(--text-secondary);">分类</label>
      <select id="rmh-group" style="width:100%;padding:10px;margin:6px 0 12px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);">${groups.map(g=>`<option>${esc(g)}</option>`).join('')}<option value="__new">＋新建分类</option></select>
      <input id="rmh-newgroup" placeholder="新分类名称（选择新建分类时填写）" style="display:none;width:100%;padding:10px;margin-bottom:10px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);">
      <input id="rmh-text" placeholder="输入内容" style="width:100%;padding:10px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);">
    `,ov=>{
      const s=ov.querySelector('#rmh-group'), ng=ov.querySelector('#rmh-newgroup');
      s.onchange=()=>ng.style.display=s.value==='__new'?'block':'none';
      let g=s.value; if(g==='__new') g=ng.value.trim();
      return add(layer,g,ov.querySelector('#rmh-text').value);
    });
  }
  function editDialog(layer,group,text) {
    dialogBase('修改'+layerNames[layer],`
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">${esc(group)}</div>
      <input id="rmh-text" value="${esc(text)}" style="width:100%;padding:10px;border:1px solid var(--border-color);border-radius:10px;background:var(--primary-bg);color:var(--text-primary);">
    `,ov=>edit(layer,group,text,ov.querySelector('#rmh-text').value));
  }

  function hookChat() {
    if (window.OurLoveReplyMoodHints) return;
    window.OurLoveReplyMoodHints = {
      state, generateHints, add, edit, remove, setItemEnabled,
      getData:()=>JSON.parse(JSON.stringify(state.data))
    };

    /* 给 TA 消息提供一个可直接调用的渲染接口。
       你的回复生成代码只需要在「TA消息 DOM 已插入」后：
       OurLoveReplyMoodHints.renderForMessage(messageElement)
    */
    window.OurLoveReplyMoodHints.renderForMessage = function(messageEl) {
      if (!messageEl || messageEl.dataset.rmhDone === '1') return [];
      const hints = generateHints();
      messageEl.dataset.rmhDone='1';
      if (!hints.length) return hints;
      const box=document.createElement('div');
      box.className='ourlove-reply-mood-hints';
      box.style.cssText='display:flex;flex-wrap:wrap;gap:4px 10px;margin-top:5px;padding-top:5px;border-top:1px dashed var(--border-color);font-size:11px;color:var(--text-secondary);';
      const names={mood:'情绪',heart:'心意',intent:'交流意图'};
      hints.forEach(x=>{
        const item=document.createElement('span');
        item.innerHTML=`<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:99px;margin-right:4px;background:rgba(0,0,0,.07);">${names[x.type]}</span>${esc(x.text)}`;
        box.appendChild(item);
      });
      messageEl.appendChild(box);
      return hints;
    };
  }

  load();
  hookChat();

  const observer = new MutationObserver(() => injectButton());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  injectButton();

  window.OurLoveReplyMoodHints.openPanel = openPanel;
})();
