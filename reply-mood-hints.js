/* OurLove · 回复心意提示（独立模块 · 完善版）
 * 与 index.html 同目录，由 index.html 自动加载。
 * 不覆盖原有字卡管理，只在同一个弹窗里增加「回复心意」侧栏。
 *
 * 完善点：
 * - 修复新建分类不显示输入框的 bug
 * - 屏蔽/启用后保持滚动位置，不再跳回顶部
 * - 分类可自由新建 / 重命名 / 删除（连同条目）
 * - 整分类一键启用/屏蔽 + 单个条目手动屏蔽
 * - 顶部三层（情绪/心意/意图）可重命名、可一键开关整层
 * - 多选 + 全选 + 批量删除 / 批量启用 / 批量屏蔽
 * - 搜索（内容或分类名）
 * - 本模块独立导入 / 导出 JSON
 * - 暴露 getExportPayload / importPayload 方便主程序整站导出导入
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

  // 默认层名称（可被用户重命名）
  const DEFAULT_LAYER_NAMES = { mood: '情绪', heart: '心意', intent: '交流意图' };

  const state = {
    enabled: true,
    layers: { mood: true, heart: true, intent: true },
    layerNames: Object.assign({}, DEFAULT_LAYER_NAMES),
    // 禁用的分类 key = source + '|' + group
    disabledGroups: {},
    // 条目启用状态：id = source|group|text → false 表示屏蔽
    items: {},
    data: JSON.parse(JSON.stringify(DEFAULT_DATA)),
    // UI 记忆
    expanded: {} // source|group → true/false，默认展开
  };

  let currentLayer = 'mood';
  let panel = null;
  let activationAt = 0;
  let searchQuery = '';
  let selectedIds = new Set(); // 多选：idOf(source,group,text)
  let lastScrollTop = 0;

  // ---------- 工具 ----------
  const clone = x => JSON.parse(JSON.stringify(x));
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const idOf = (source, group, text) => source + '|' + group + '|' + text;
  const groupKey = (source, group) => source + '|' + group;

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        enabled: state.enabled,
        layers: state.layers,
        layerNames: state.layerNames,
        disabledGroups: state.disabledGroups,
        items: state.items,
        data: state.data,
        expanded: state.expanded
      }));
    } catch (e) {}
  }

  function mergeData(base, incoming) {
    if (!incoming || typeof incoming !== 'object') return;
    Object.keys(incoming).forEach(layer => {
      if (incoming[layer] && typeof incoming[layer] === 'object') {
        if (!base[layer]) base[layer] = {};
        Object.keys(incoming[layer]).forEach(group => {
          if (Array.isArray(incoming[layer][group])) {
            base[layer][group] = incoming[layer][group];
          }
        });
      }
    });
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const x = JSON.parse(raw);
      if (!x) return;
      state.enabled = x.enabled !== false;
      state.layers = Object.assign({ mood: true, heart: true, intent: true }, x.layers || {});
      state.layerNames = Object.assign({}, DEFAULT_LAYER_NAMES, x.layerNames || {});
      state.disabledGroups = x.disabledGroups || {};
      state.items = x.items || {};
      state.expanded = x.expanded || {};
      mergeData(state.data, x.data || {});
    } catch (e) {}
  }

  function ensureActivation() {
    try {
      const raw = localStorage.getItem(ACTIVATION_KEY);
      if (raw && Number(raw) > 0) {
        activationAt = Number(raw);
        return;
      }
      activationAt = Date.now();
      localStorage.setItem(ACTIVATION_KEY, String(activationAt));
    } catch (e) {
      activationAt = Date.now();
    }
  }

  function shouldAnnotateMessage(msg) {
    if (!msg || !activationAt) return false;
    const t = new Date(msg.timestamp).getTime();
    return Number.isFinite(t) && t >= activationAt;
  }

  // ---------- 数据访问 ----------
  function sourcesOf(layer) {
    return layer === 'heart' ? ['heart', 'specialHeart'] : [layer];
  }

  function entries(layer) {
    const out = [];
    sourcesOf(layer).forEach(src => {
      Object.keys(state.data[src] || {}).forEach(group => {
        const gDisabled = !!state.disabledGroups[groupKey(src, group)];
        (state.data[src][group] || []).forEach(text => {
          const on = !gDisabled && state.items[idOf(src, group, text)] !== false;
          out.push({
            layer: src === 'specialHeart' ? 'heart' : layer,
            source: src,
            group,
            text,
            on,
            groupDisabled: gDisabled
          });
        });
      });
    });
    return out;
  }

  function pick(layer) {
    if (!state.enabled || !state.layers[layer]) return null;
    const a = entries(layer).filter(x => x.on);
    return a.length ? a[Math.floor(Math.random() * a.length)] : null;
  }

  function generateHints() {
    if (!state.enabled) return [];
    const out = [];
    if (state.layers.mood && Math.random() < 0.70) {
      const x = pick('mood');
      if (x) out.push({ type: 'mood', text: x.text, group: x.group });
    }
    if (state.layers.heart && Math.random() < 0.40) {
      const x = pick('heart');
      if (x) out.push({ type: 'heart', text: x.text, group: x.group });
    }
    if (state.layers.intent && Math.random() < 0.40) {
      const x = pick('intent');
      if (x) out.push({ type: 'intent', text: x.text, group: x.group });
    }
    return out;
  }

  // ---------- CRUD ----------
  function addItem(layer, group, text) {
    text = String(text || '').trim();
    group = String(group || '').trim();
    if (!text || !group) return false;
    const target = layer === 'heart' && group.indexOf('特殊心意 · ') === 0 ? 'specialHeart' : layer;
    if (!state.data[target]) state.data[target] = {};
    if (!state.data[target][group]) state.data[target][group] = [];
    if (state.data[target][group].indexOf(text) >= 0) return false; // 去重
    state.data[target][group].push(text);
    save();
    return true;
  }

  function editItem(source, group, oldText, newText) {
    newText = String(newText || '').trim();
    const a = state.data[source] && state.data[source][group];
    if (!a || !newText) return false;
    const i = a.indexOf(oldText);
    if (i < 0) return false;
    a[i] = newText;
    delete state.items[idOf(source, group, oldText)];
    save();
    return true;
  }

  function removeItem(source, group, text) {
    const a = state.data[source] && state.data[source][group];
    if (!a) return false;
    state.data[source][group] = a.filter(x => x !== text);
    delete state.items[idOf(source, group, text)];
    selectedIds.delete(idOf(source, group, text));
    save();
    return true;
  }

  function toggleItem(source, group, text, on) {
    state.items[idOf(source, group, text)] = !!on;
    save();
  }

  function setGroupDisabled(source, group, disabled) {
    const k = groupKey(source, group);
    if (disabled) state.disabledGroups[k] = true;
    else delete state.disabledGroups[k];
    save();
  }

  function isGroupDisabled(source, group) {
    return !!state.disabledGroups[groupKey(source, group)];
  }

  function renameGroup(source, oldName, newName) {
    newName = String(newName || '').trim();
    if (!newName || newName === oldName) return false;
    if (!state.data[source] || !state.data[source][oldName]) return false;
    if (state.data[source][newName]) return false; // 已存在
    state.data[source][newName] = state.data[source][oldName];
    delete state.data[source][oldName];
    // 迁移 items / disabled / expanded
    const oldGk = groupKey(source, oldName);
    const newGk = groupKey(source, newName);
    if (state.disabledGroups[oldGk]) {
      state.disabledGroups[newGk] = true;
      delete state.disabledGroups[oldGk];
    }
    if (state.expanded[oldGk] !== undefined) {
      state.expanded[newGk] = state.expanded[oldGk];
      delete state.expanded[oldGk];
    }
    Object.keys(state.items).forEach(id => {
      if (id.startsWith(source + '|' + oldName + '|')) {
        const text = id.slice((source + '|' + oldName + '|').length);
        state.items[idOf(source, newName, text)] = state.items[id];
        delete state.items[id];
      }
    });
    // 更新多选
    const nextSel = new Set();
    selectedIds.forEach(id => {
      if (id.startsWith(source + '|' + oldName + '|')) {
        const text = id.slice((source + '|' + oldName + '|').length);
        nextSel.add(idOf(source, newName, text));
      } else nextSel.add(id);
    });
    selectedIds = nextSel;
    save();
    return true;
  }

  function deleteGroup(source, group) {
    if (!state.data[source] || !state.data[source][group]) return false;
    // 清理 items
    (state.data[source][group] || []).forEach(text => {
      delete state.items[idOf(source, group, text)];
      selectedIds.delete(idOf(source, group, text));
    });
    delete state.data[source][group];
    delete state.disabledGroups[groupKey(source, group)];
    delete state.expanded[groupKey(source, group)];
    save();
    return true;
  }

  function createGroup(layer, groupName) {
    groupName = String(groupName || '').trim();
    if (!groupName) return false;
    const target = layer === 'heart' && groupName.indexOf('特殊心意 · ') === 0 ? 'specialHeart' : layer;
    if (!state.data[target]) state.data[target] = {};
    if (state.data[target][groupName]) return false;
    state.data[target][groupName] = [];
    state.expanded[groupKey(target, groupName)] = true;
    save();
    return true;
  }

  function moveItem(source, group, text, dir) {
    const a = state.data[source] && state.data[source][group];
    if (!a) return false;
    const i = a.indexOf(text);
    if (i < 0) return false;
    const j = i + dir;
    if (j < 0 || j >= a.length) return false;
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
    save();
    return true;
  }

  // ---------- 对话框 ----------
  function dialog(title, bodyHtml, onOk) {
    const ov = document.createElement('div');
    ov.style.cssText =
      'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:rgba(0,0,0,.35);';
    ov.innerHTML =
      `<div style="width:min(92vw,430px);max-width:100%;max-height:86vh;overflow:auto;box-sizing:border-box;background:var(--secondary-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:18px;padding:18px;box-shadow:0 12px 40px rgba(0,0,0,.15);">
        <div style="font-size:16px;font-weight:600;margin-bottom:14px;color:var(--text-primary,#111);">${title}</div>
        ${bodyHtml}
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button type="button" id="rmh-cancel" style="flex:1;padding:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:12px;background:none;color:var(--text-secondary,#666);cursor:pointer;">取消</button>
          <button type="button" id="rmh-ok" style="flex:1;padding:10px;border:0;border-radius:12px;background:var(--accent-color,#3b82f6);color:#fff;cursor:pointer;">确定</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    ov.querySelector('#rmh-cancel').onclick = () => ov.remove();
    ov.onclick = e => {
      if (e.target === ov) ov.remove();
    };
    ov.querySelector('#rmh-ok').onclick = () => {
      if (onOk(ov) !== false) ov.remove();
    };
    return ov;
  }

  function addItemDialog(layer) {
    const sources = sourcesOf(layer);
    const groups = [];
    sources.forEach(s =>
      Object.keys(state.data[s] || {}).forEach(g => groups.push({ source: s, group: g }))
    );
    const ov = dialog(
      '添加' + (state.layerNames[layer] || layer),
      `<label style="font-size:12px;color:var(--text-secondary,#666);">分类</label>
       <select id="rmh-group" style="width:100%;box-sizing:border-box;padding:10px;margin:6px 0 12px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);">
         ${groups.map(x => `<option value="${esc(x.source + '||' + x.group)}">${esc(x.group)}</option>`).join('')}
         <option value="__new">＋ 新建分类</option>
       </select>
       <input id="rmh-newgroup" placeholder="新分类名称" style="display:none;width:100%;box-sizing:border-box;padding:10px;margin-bottom:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);">
       <input id="rmh-text" placeholder="输入内容" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);">`,
      ov => {
        const sel = ov.querySelector('#rmh-group');
        const ng = ov.querySelector('#rmh-newgroup');
        const text = ov.querySelector('#rmh-text').value;
        let g = sel.value;
        let source = layer;
        if (g === '__new') {
          g = ng.value.trim();
          if (!g) {
            alert('请填写新分类名称');
            return false;
          }
          if (layer === 'heart' && g.indexOf('特殊心意 · ') === 0) source = 'specialHeart';
          else source = layer;
          if (!state.data[source]) state.data[source] = {};
          if (!state.data[source][g]) state.data[source][g] = [];
        } else {
          const parts = g.split('||');
          source = parts[0];
          g = parts.slice(1).join('||');
        }
        if (!addItem(source === 'specialHeart' ? 'heart' : layer, g, text)) {
          alert('添加失败（可能重复或内容为空）');
          return false;
        }
        renderPanel(true);
        return true;
      }
    );
    // 关键：立即绑定 onchange，新建分类输入框立刻显示
    const sel = ov.querySelector('#rmh-group');
    const ng = ov.querySelector('#rmh-newgroup');
    sel.onchange = () => {
      ng.style.display = sel.value === '__new' ? 'block' : 'none';
      if (sel.value === '__new') ng.focus();
    };
    setTimeout(() => ov.querySelector('#rmh-text').focus(), 50);
  }

  function createGroupDialog(layer) {
    const ov = dialog(
      '新建分类 · ' + (state.layerNames[layer] || layer),
      `<input id="rmh-gname" placeholder="分类名称" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);">
       <div style="font-size:11px;color:var(--text-secondary,#888);margin-top:8px;">提示：心意层下若名称以「特殊心意 · 」开头，会归入特殊心意</div>`,
      ov => {
        const name = ov.querySelector('#rmh-gname').value;
        if (!createGroup(layer, name)) {
          alert('创建失败（名称重复或为空）');
          return false;
        }
        renderPanel(true);
        return true;
      }
    );
    setTimeout(() => ov.querySelector('#rmh-gname').focus(), 50);
  }

  function renameGroupDialog(source, group) {
    const ov = dialog(
      '重命名分类',
      `<div style="font-size:12px;color:var(--text-secondary,#666);margin-bottom:8px;">原名称：${esc(group)}</div>
       <input id="rmh-gname" value="${esc(group)}" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);">`,
      ov => {
        const name = ov.querySelector('#rmh-gname').value;
        if (!renameGroup(source, group, name)) {
          alert('重命名失败（可能与已有分类重名）');
          return false;
        }
        renderPanel(true);
        return true;
      }
    );
    setTimeout(() => {
      const inp = ov.querySelector('#rmh-gname');
      inp.focus();
      inp.select();
    }, 50);
  }

  function renameLayerDialog(layer) {
    const ov = dialog(
      '重命名层',
      `<input id="rmh-lname" value="${esc(state.layerNames[layer] || layer)}" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);">
       <div style="font-size:11px;color:var(--text-secondary,#888);margin-top:8px;">仅改显示名称，不影响随机生成逻辑</div>`,
      ov => {
        const name = ov.querySelector('#rmh-lname').value.trim();
        if (!name) {
          alert('名称不能为空');
          return false;
        }
        state.layerNames[layer] = name;
        save();
        renderPanel(true);
        return true;
      }
    );
    setTimeout(() => {
      const inp = ov.querySelector('#rmh-lname');
      inp.focus();
      inp.select();
    }, 50);
  }

  function editItemDialog(source, group, text) {
    const ov = dialog(
      '修改内容',
      `<div style="font-size:11px;color:var(--text-secondary,#666);margin-bottom:8px;">${esc(group)}</div>
       <input id="rmh-text" value="${esc(text)}" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);">`,
      ov => {
        const v = ov.querySelector('#rmh-text').value;
        if (!editItem(source, group, text, v)) {
          alert('修改失败');
          return false;
        }
        renderPanel(true);
        return true;
      }
    );
    setTimeout(() => {
      const inp = ov.querySelector('#rmh-text');
      inp.focus();
      inp.select();
    }, 50);
  }

  // ---------- 导入导出 ----------
  function getExportPayload() {
    return {
      version: 3,
      type: 'ourlove_reply_mood_hints',
      exportedAt: new Date().toISOString(),
      enabled: state.enabled,
      layers: state.layers,
      layerNames: state.layerNames,
      disabledGroups: state.disabledGroups,
      items: state.items,
      data: state.data
    };
  }

  function importPayload(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.data) mergeData(state.data, payload.data);
    if (payload.layers) state.layers = Object.assign(state.layers, payload.layers);
    if (payload.layerNames) state.layerNames = Object.assign(state.layerNames, payload.layerNames);
    if (payload.disabledGroups) state.disabledGroups = Object.assign({}, state.disabledGroups, payload.disabledGroups);
    if (payload.items) state.items = Object.assign({}, state.items, payload.items);
    if (typeof payload.enabled === 'boolean') state.enabled = payload.enabled;
    save();
    return true;
  }

  function exportJson() {
    const json = JSON.stringify(getExportPayload(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reply-mood-hints-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importJson() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!importPayload(data)) {
            alert('导入失败：格式不正确');
            return;
          }
          selectedIds.clear();
          renderPanel(true);
          alert('导入成功');
        } catch (err) {
          alert('导入失败：' + (err.message || '解析错误'));
        }
      };
      reader.readAsText(file, 'UTF-8');
    };
    input.click();
  }

  // ---------- 渲染 ----------
  function ensurePanel() {
    const main = document.querySelector('#custom-replies-modal .modal-main-view');
    if (!main) return null;
    if (panel && panel.isConnected) return panel;
    panel = document.createElement('div');
    panel.id = 'ourlove-rmh-panel';
    panel.style.cssText =
      'position:absolute;inset:0;z-index:20;display:none;flex-direction:column;min-width:0;max-width:100%;width:100%;height:100%;overflow:hidden;background:var(--primary-bg,#f8fafc);box-sizing:border-box;';
    main.appendChild(panel);
    return panel;
  }

  function captureScroll() {
    const list = document.getElementById('rmh-list');
    if (list) lastScrollTop = list.scrollTop;
  }

  function restoreScroll() {
    const list = document.getElementById('rmh-list');
    if (list) {
      requestAnimationFrame(() => {
        list.scrollTop = lastScrollTop;
      });
    }
  }

  function matchSearch(text, group) {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return String(text).toLowerCase().includes(q) || String(group).toLowerCase().includes(q);
  }

  function renderList(layer) {
    const sources = sourcesOf(layer);
    let html = '';
    let visibleCount = 0;

    sources.forEach(source => {
      const groups = Object.keys(state.data[source] || {});
      groups.forEach(group => {
        const items = state.data[source][group] || [];
        const filtered = items.filter(t => matchSearch(t, group));
        if (searchQuery && filtered.length === 0) return;

        const gk = groupKey(source, group);
        const expanded = state.expanded[gk] !== false; // 默认展开
        const gDisabled = isGroupDisabled(source, group);
        const onCount = filtered.filter(t => state.items[idOf(source, group, t)] !== false).length;

        html += `<section class="rmh-group" data-source="${esc(source)}" data-group="${esc(group)}" style="margin:0 0 10px;border:1px solid var(--border-color,#e5e7eb);border-radius:14px;overflow:hidden;background:var(--secondary-bg,#fff);opacity:${gDisabled ? 0.55 : 1};">`;
        // 分类头
        html += `<div class="rmh-group-header" style="display:flex;align-items:center;gap:6px;padding:10px 10px;cursor:pointer;user-select:none;background:var(--secondary-bg,#fff);">
          <button type="button" class="rmh-expand" title="展开/收起" style="border:0;background:none;color:var(--text-secondary,#666);padding:4px;cursor:pointer;font-size:12px;width:22px;">${expanded ? '▼' : '▶'}</button>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:var(--text-primary,#111);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(group)}</div>
            <div style="font-size:11px;color:var(--text-secondary,#888);margin-top:2px;">${filtered.length} 条 · 启用 ${onCount}${gDisabled ? ' · 已整类屏蔽' : ''}</div>
          </div>
          <button type="button" class="rmh-g-toggle" title="${gDisabled ? '取消整类屏蔽' : '一键屏蔽本分类'}" style="border:0;background:none;color:${gDisabled ? 'var(--text-secondary,#999)' : 'var(--accent-color,#3b82f6)'};padding:6px;cursor:pointer;font-size:13px;">
            <i class="fas ${gDisabled ? 'fa-eye-slash' : 'fa-eye'}"></i>
          </button>
          <button type="button" class="rmh-g-rename" title="重命名分类" style="border:0;background:none;color:var(--text-secondary,#666);padding:6px;cursor:pointer;"><i class="fas fa-pen"></i></button>
          <button type="button" class="rmh-g-delete" title="删除分类（含全部条目）" style="border:0;background:none;color:#c0392b;padding:6px;cursor:pointer;"><i class="fas fa-trash"></i></button>
        </div>`;

        if (expanded) {
          html += `<div class="rmh-group-body" style="padding:0 8px 8px;">`;
          if (filtered.length === 0) {
            html += `<div style="padding:12px;text-align:center;font-size:12px;color:var(--text-secondary,#999);">暂无条目，点击下方添加</div>`;
          }
          filtered.forEach(text => {
            const id = idOf(source, group, text);
            const on = !gDisabled && state.items[id] !== false;
            const sel = selectedIds.has(id);
            visibleCount++;
            html += `<div class="rmh-item" data-id="${esc(id)}" data-source="${esc(source)}" data-group="${esc(group)}" data-text="${esc(text)}" style="display:flex;align-items:center;gap:8px;padding:9px 8px;margin:0 0 4px;border:1px solid var(--border-color,#e5e7eb);border-radius:10px;background:var(--primary-bg,#f8fafc);box-sizing:border-box;opacity:${on ? 1 : 0.45};">
              <label style="flex:0 0 auto;display:flex;align-items:center;cursor:pointer;">
                <input type="checkbox" class="rmh-check" ${sel ? 'checked' : ''} style="width:16px;height:16px;accent-color:var(--accent-color,#3b82f6);">
              </label>
              <span style="flex:1;min-width:0;overflow-wrap:anywhere;font-size:13px;color:var(--text-primary,#111);${on ? '' : 'text-decoration:line-through;'}">${esc(text)}</span>
              <button type="button" class="rmh-up" title="上移" style="border:0;background:none;color:var(--text-secondary,#666);padding:4px;cursor:pointer;font-size:11px;">↑</button>
              <button type="button" class="rmh-down" title="下移" style="border:0;background:none;color:var(--text-secondary,#666);padding:4px;cursor:pointer;font-size:11px;">↓</button>
              <button type="button" class="rmh-edit" title="修改" style="border:0;background:none;color:var(--text-secondary,#666);padding:4px;cursor:pointer;"><i class="fas fa-pen"></i></button>
              <button type="button" class="rmh-toggle" title="${on ? '屏蔽' : '取消屏蔽'}" style="border:0;background:none;color:${on ? 'var(--accent-color,#3b82f6)' : 'var(--text-secondary,#999)'};padding:4px;cursor:pointer;"><i class="fas ${on ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
              <button type="button" class="rmh-delete" title="删除" style="border:0;background:none;color:#c0392b;padding:4px;cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>`;
          });
          html += `</div>`;
        }
        html += `</section>`;
      });
    });

    if (!html) {
      html = `<div style="padding:40px 20px;text-align:center;color:var(--text-secondary,#999);font-size:13px;">
        ${searchQuery ? '没有匹配的内容' : '暂无分类，点击下方「新建分类」开始'}
      </div>`;
    }
    return { html, visibleCount };
  }

  function renderPanel(keepScroll) {
    if (keepScroll) captureScroll();
    const p = ensurePanel();
    if (!p) return;

    const counts = {
      mood: entries('mood').length,
      heart: entries('heart').length,
      intent: entries('intent').length
    };
    const { html: listHtml } = renderList(currentLayer);
    const selCount = selectedIds.size;

    p.innerHTML = `
    <div style="height:100%;width:100%;max-width:100%;display:flex;flex-direction:column;min-width:0;box-sizing:border-box;overflow:hidden;">
      <!-- 顶栏 -->
      <div style="flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--border-color,#e5e7eb);background:var(--secondary-bg,#fff);box-sizing:border-box;">
        <button id="rmh-back" type="button" title="返回回复库" style="flex:0 0 auto;border:0;background:transparent;color:var(--text-secondary,#666);padding:7px 8px;border-radius:9px;cursor:pointer;font-size:14px;"><i class="fas fa-chevron-left"></i></button>
        <i class="fas fa-heart" style="color:var(--accent-color,#3b82f6);"></i>
        <strong style="font-size:16px;color:var(--text-primary,#111);">回复心意</strong>
        <span style="margin-left:auto;font-size:11px;color:var(--text-secondary,#888);">独立模块</span>
        <button id="rmh-close" type="button" title="关闭" style="flex:0 0 auto;border:0;background:transparent;color:var(--text-secondary,#666);padding:7px 8px;border-radius:9px;cursor:pointer;font-size:15px;"><i class="fas fa-times"></i></button>
      </div>

      <!-- 全局开关 -->
      <div style="flex:0 0 auto;padding:10px 14px;border-bottom:1px solid var(--border-color,#e5e7eb);background:var(--secondary-bg,#fff);display:flex;align-items:center;gap:10px;">
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary,#111);">回复下方显示心意提示</div>
          <div style="font-size:11px;color:var(--text-secondary,#888);margin-top:2px;line-height:1.4;">随机生成，不参与 TA 实际回复内容</div>
        </div>
        <button id="rmh-global" type="button" style="flex:0 0 auto;border:0;border-radius:20px;padding:7px 12px;background:${state.enabled ? 'var(--accent-color,#3b82f6)' : 'var(--border-color,#e5e7eb)'};color:${state.enabled ? '#fff' : 'var(--text-secondary,#666)'};cursor:pointer;white-space:nowrap;font-size:13px;">${state.enabled ? '已开启' : '已关闭'}</button>
      </div>

      <!-- 搜索 -->
      <div style="flex:0 0 auto;padding:8px 12px;background:var(--secondary-bg,#fff);border-bottom:1px solid var(--border-color,#e5e7eb);">
        <input id="rmh-search" type="search" placeholder="搜索内容或分类名…" value="${esc(searchQuery)}" style="width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--border-color,#e5e7eb);border-radius:20px;background:var(--primary-bg,#f8fafc);color:var(--text-primary,#111);font-size:13px;outline:none;">
      </div>

      <!-- 层切换（可重命名 + 一键开关整层） -->
      <div style="flex:0 0 auto;display:flex;gap:6px;padding:8px 12px;overflow-x:auto;background:var(--secondary-bg,#fff);border-bottom:1px solid var(--border-color,#e5e7eb);">
        ${['mood', 'heart', 'intent']
          .map(
            k => `
          <div style="flex:0 0 auto;display:flex;align-items:center;gap:2px;">
            <button type="button" class="rmh-layer" data-layer="${k}" style="white-space:nowrap;border:1px solid var(--border-color,#e5e7eb);border-radius:20px 0 0 20px;padding:7px 10px;background:${currentLayer === k ? 'var(--primary-bg,#f8fafc)' : 'transparent'};color:${state.layers[k] ? 'var(--text-primary,#111)' : 'var(--text-secondary,#999)'};cursor:pointer;font-size:13px;">
              ${esc(state.layerNames[k] || k)} ${counts[k]}
            </button>
            <button type="button" class="rmh-layer-toggle" data-layer="${k}" title="${state.layers[k] ? '一键屏蔽整层' : '取消整层屏蔽'}" style="border:1px solid var(--border-color,#e5e7eb);border-left:0;border-radius:0;padding:7px 8px;background:transparent;color:${state.layers[k] ? 'var(--accent-color,#3b82f6)' : 'var(--text-secondary,#999)'};cursor:pointer;">
              <i class="fas ${state.layers[k] ? 'fa-eye' : 'fa-eye-slash'}"></i>
            </button>
            <button type="button" class="rmh-layer-rename" data-layer="${k}" title="重命名此层" style="border:1px solid var(--border-color,#e5e7eb);border-left:0;border-radius:0 20px 20px 0;padding:7px 8px;background:transparent;color:var(--text-secondary,#666);cursor:pointer;">
              <i class="fas fa-pen" style="font-size:11px;"></i>
            </button>
          </div>`
          )
          .join('')}
      </div>

      <!-- 列表 -->
      <div id="rmh-list" style="flex:1 1 auto;min-height:0;min-width:0;overflow-y:auto;overflow-x:hidden;padding:10px 12px 12px;background:var(--primary-bg,#f8fafc);box-sizing:border-box;-webkit-overflow-scrolling:touch;">
        ${listHtml}
      </div>

      <!-- 批量操作栏 -->
      <div id="rmh-batch" style="flex:0 0 auto;display:${selCount > 0 ? 'flex' : 'none'};align-items:center;gap:8px;padding:8px 12px;border-top:1px solid var(--border-color,#e5e7eb);background:var(--secondary-bg,#fff);">
        <span style="font-size:12px;color:var(--text-secondary,#666);">已选 ${selCount}</span>
        <button type="button" id="rmh-batch-enable" style="border:0;border-radius:16px;padding:6px 10px;background:#e8f5e9;color:#2e7d32;font-size:12px;cursor:pointer;">批量启用</button>
        <button type="button" id="rmh-batch-disable" style="border:0;border-radius:16px;padding:6px 10px;background:#fff3e0;color:#e65100;font-size:12px;cursor:pointer;">批量屏蔽</button>
        <button type="button" id="rmh-batch-delete" style="border:0;border-radius:16px;padding:6px 10px;background:#fce4ec;color:#c62828;font-size:12px;cursor:pointer;">批量删除</button>
        <button type="button" id="rmh-batch-clear" style="margin-left:auto;border:0;background:none;color:var(--text-secondary,#888);font-size:12px;cursor:pointer;">取消选择</button>
      </div>

      <!-- 底部操作 -->
      <div style="flex:0 0 auto;padding:10px 12px;border-top:1px solid var(--border-color,#e5e7eb);background:var(--secondary-bg,#fff);display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;gap:8px;">
          <button type="button" id="rmh-add-item" style="flex:1;padding:10px;border:1px solid var(--accent-color,#3b82f6);border-radius:12px;background:transparent;color:var(--accent-color,#3b82f6);font-family:var(--font-family,inherit);cursor:pointer;font-size:13px;"><i class="fas fa-plus"></i> 添加条目</button>
          <button type="button" id="rmh-add-group" style="flex:1;padding:10px;border:1px solid var(--border-color,#e5e7eb);border-radius:12px;background:transparent;color:var(--text-primary,#111);font-family:var(--font-family,inherit);cursor:pointer;font-size:13px;"><i class="fas fa-folder-plus"></i> 新建分类</button>
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" id="rmh-export" style="flex:1;padding:8px;border:1px solid var(--border-color,#e5e7eb);border-radius:12px;background:transparent;color:var(--text-secondary,#666);cursor:pointer;font-size:12px;"><i class="fas fa-download"></i> 导出</button>
          <button type="button" id="rmh-import" style="flex:1;padding:8px;border:1px solid var(--border-color,#e5e7eb);border-radius:12px;background:transparent;color:var(--text-secondary,#666);cursor:pointer;font-size:12px;"><i class="fas fa-upload"></i> 导入</button>
          <button type="button" id="rmh-select-all" style="flex:1;padding:8px;border:1px solid var(--border-color,#e5e7eb);border-radius:12px;background:transparent;color:var(--text-secondary,#666);cursor:pointer;font-size:12px;">全选本层</button>
        </div>
      </div>
    </div>`;

    bindPanel(p);
    if (keepScroll) restoreScroll();
  }

  function bindPanel(p) {
    const modal = document.getElementById('custom-replies-modal');

    p.querySelector('#rmh-back')?.addEventListener('click', () => closePanel());
    p.querySelector('#rmh-close')?.addEventListener('click', () => {
      closePanel();
      if (modal && typeof hideModal === 'function') hideModal(modal);
      else if (modal) modal.classList.remove('active');
    });

    p.querySelector('#rmh-global')?.addEventListener('click', () => {
      state.enabled = !state.enabled;
      save();
      renderPanel(true);
    });

    // 搜索（防抖）
    const searchInp = p.querySelector('#rmh-search');
    if (searchInp) {
      let t = null;
      searchInp.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          searchQuery = searchInp.value.trim();
          renderPanel(true);
        }, 180);
      });
    }

    // 层切换
    p.querySelectorAll('.rmh-layer').forEach(btn => {
      btn.addEventListener('click', () => {
        currentLayer = btn.dataset.layer;
        selectedIds.clear();
        renderPanel(false);
      });
    });
    // 整层一键屏蔽
    p.querySelectorAll('.rmh-layer-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const layer = btn.dataset.layer;
        state.layers[layer] = !state.layers[layer];
        save();
        renderPanel(true);
      });
    });
    // 重命名层
    p.querySelectorAll('.rmh-layer-rename').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        renameLayerDialog(btn.dataset.layer);
      });
    });

    // 分类头操作
    p.querySelectorAll('.rmh-group').forEach(sec => {
      const source = sec.dataset.source;
      const group = sec.dataset.group;
      const gk = groupKey(source, group);

      const toggleExpand = () => {
        const currentlyExpanded = state.expanded[gk] !== false;
        state.expanded[gk] = !currentlyExpanded;
        save();
        renderPanel(true);
      };

      sec.querySelector('.rmh-group-header')?.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        toggleExpand();
      });

      sec.querySelector('.rmh-expand')?.addEventListener('click', e => {
        e.stopPropagation();
        toggleExpand();
      });

      sec.querySelector('.rmh-g-toggle')?.addEventListener('click', e => {
        e.stopPropagation();
        setGroupDisabled(source, group, !isGroupDisabled(source, group));
        renderPanel(true);
      });

      sec.querySelector('.rmh-g-rename')?.addEventListener('click', e => {
        e.stopPropagation();
        renameGroupDialog(source, group);
      });

      sec.querySelector('.rmh-g-delete')?.addEventListener('click', e => {
        e.stopPropagation();
        if (confirm(`确定删除分类「${group}」？\n分类下的全部条目也会被删除，且无法恢复。`)) {
          deleteGroup(source, group);
          renderPanel(true);
        }
      });
    });

    // 条目操作
    p.querySelectorAll('.rmh-item').forEach(row => {
      const source = row.dataset.source;
      const group = row.dataset.group;
      const text = row.dataset.text;
      const id = row.dataset.id;

      row.querySelector('.rmh-check')?.addEventListener('change', e => {
        if (e.target.checked) selectedIds.add(id);
        else selectedIds.delete(id);
        // 只更新批量栏显示，避免整页刷新丢滚动
        const batch = document.getElementById('rmh-batch');
        if (batch) {
          batch.style.display = selectedIds.size > 0 ? 'flex' : 'none';
          const span = batch.querySelector('span');
          if (span) span.textContent = '已选 ' + selectedIds.size;
        }
      });

      row.querySelector('.rmh-edit')?.addEventListener('click', () => editItemDialog(source, group, text));
      row.querySelector('.rmh-toggle')?.addEventListener('click', () => {
        // 当前是否被单条屏蔽（false 表示屏蔽）
        const isOff = state.items[id] === false;
        toggleItem(source, group, text, isOff); // 屏蔽→启用，启用→屏蔽
        renderPanel(true);
      });
      row.querySelector('.rmh-delete')?.addEventListener('click', () => {
        if (confirm('确定删除这条内容吗？')) {
          removeItem(source, group, text);
          renderPanel(true);
        }
      });
      row.querySelector('.rmh-up')?.addEventListener('click', () => {
        moveItem(source, group, text, -1);
        renderPanel(true);
      });
      row.querySelector('.rmh-down')?.addEventListener('click', () => {
        moveItem(source, group, text, 1);
        renderPanel(true);
      });
    });

    // 底部按钮
    p.querySelector('#rmh-add-item')?.addEventListener('click', () => addItemDialog(currentLayer));
    p.querySelector('#rmh-add-group')?.addEventListener('click', () => createGroupDialog(currentLayer));
    p.querySelector('#rmh-export')?.addEventListener('click', exportJson);
    p.querySelector('#rmh-import')?.addEventListener('click', importJson);
    p.querySelector('#rmh-select-all')?.addEventListener('click', () => {
      const all = entries(currentLayer);
      const allOn = all.every(x => selectedIds.has(idOf(x.source, x.group, x.text)));
      if (allOn) {
        all.forEach(x => selectedIds.delete(idOf(x.source, x.group, x.text)));
      } else {
        all.forEach(x => {
          if (matchSearch(x.text, x.group)) selectedIds.add(idOf(x.source, x.group, x.text));
        });
      }
      renderPanel(true);
    });

    // 批量
    p.querySelector('#rmh-batch-enable')?.addEventListener('click', () => {
      selectedIds.forEach(id => {
        const [source, group, ...rest] = id.split('|');
        const text = rest.join('|');
        toggleItem(source, group, text, true);
      });
      selectedIds.clear();
      renderPanel(true);
    });
    p.querySelector('#rmh-batch-disable')?.addEventListener('click', () => {
      selectedIds.forEach(id => {
        const [source, group, ...rest] = id.split('|');
        const text = rest.join('|');
        toggleItem(source, group, text, false);
      });
      selectedIds.clear();
      renderPanel(true);
    });
    p.querySelector('#rmh-batch-delete')?.addEventListener('click', () => {
      if (!selectedIds.size) return;
      if (!confirm(`确定删除选中的 ${selectedIds.size} 条内容？`)) return;
      selectedIds.forEach(id => {
        const [source, group, ...rest] = id.split('|');
        const text = rest.join('|');
        removeItem(source, group, text);
      });
      selectedIds.clear();
      renderPanel(true);
    });
    p.querySelector('#rmh-batch-clear')?.addEventListener('click', () => {
      selectedIds.clear();
      renderPanel(true);
    });
  }

  // ---------- 面板开关 ----------
  function hideOriginal(main) {
    [...main.children].forEach(el => {
      if (el !== panel) {
        if (!el.dataset.rmhOldDisplay) el.dataset.rmhOldDisplay = el.style.display || '';
        el.style.display = 'none';
      }
    });
  }
  function restoreOriginal(main) {
    [...main.children].forEach(el => {
      if (el !== panel && el.dataset.rmhOldDisplay !== undefined) {
        el.style.display = el.dataset.rmhOldDisplay;
        delete el.dataset.rmhOldDisplay;
      }
    });
    if (panel) panel.style.display = 'none';
  }
  function openPanel() {
    const modal = document.getElementById('custom-replies-modal');
    const main = modal?.querySelector('.modal-main-view');
    if (!main) return;
    const p = ensurePanel();
    if (!p) return;
    hideOriginal(main);
    p.style.display = 'flex';
    document.querySelectorAll('#custom-replies-modal .sidebar-btn').forEach(x => x.classList.remove('active'));
    document.getElementById('ourlove-rmh-btn')?.classList.add('active');
    selectedIds.clear();
    searchQuery = '';
    renderPanel(false);
  }
  function closePanel() {
    const main = document.querySelector('#custom-replies-modal .modal-main-view');
    if (main) restoreOriginal(main);
    document.getElementById('ourlove-rmh-btn')?.classList.remove('active');
  }

  function injectButton() {
    const side = document.querySelector('#custom-replies-modal .modal-sidebar');
    if (!side) return;
    let b = document.getElementById('ourlove-rmh-btn');
    if (!b) {
      b = document.createElement('button');
      b.id = 'ourlove-rmh-btn';
      b.className = 'sidebar-btn';
      b.dataset.major = 'reply-mood-hints';
      b.type = 'button';
      b.innerHTML = '<i class="fas fa-heart"></i><span>回复心意</span>';
      side.appendChild(b);
    }

    if (side.dataset.rmhCaptureBound !== '3') {
      side.dataset.rmhCaptureBound = '3';
      side.addEventListener(
        'click',
        function (e) {
          const btn = e.target.closest('.sidebar-btn');
          if (!btn || !side.contains(btn)) return;

          if (btn.id === 'ourlove-rmh-btn') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openPanel();
            return;
          }

          closePanel();
          document.querySelectorAll('#custom-replies-modal .sidebar-btn').forEach(x => x.classList.toggle('active', x === btn));

          const major = btn.dataset.major;
          if (major === 'reply') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            try {
              currentMajorTab = 'reply';
              currentSubTab = 'custom';
              _batchModeActive = false;
              _batchSelectedIndices.clear();
              _searchVisible = false;
              _searchQuery = '';
              _activeGroupFilter = null;
              const listArea = document.getElementById('custom-replies-list');
              const annPanel = document.getElementById('announcement-panel');
              const crToolbar = document.getElementById('cr-toolbar');
              const subTabs = document.getElementById('cr-sub-tabs');
              const addBtn = document.getElementById('add-custom-reply');
              const titleEl = document.getElementById('cr-modal-title');
              if (listArea) listArea.style.display = '';
              if (annPanel) annPanel.style.display = 'none';
              if (crToolbar) crToolbar.style.display = '';
              if (subTabs) subTabs.style.display = '';
              if (addBtn) addBtn.style.display = '';
              if (titleEl) titleEl.textContent = '内容管理';
              renderReplyLibrary();
            } catch (err) {
              console.error('[ReplyMoodHints] restore reply library failed', err);
            }
            return;
          }

          if (major === 'atmosphere') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            try {
              currentMajorTab = 'atmosphere';
              _batchModeActive = false;
              _batchSelectedIndices.clear();
              _searchVisible = false;
              _searchQuery = '';
              _activeGroupFilter = null;
              const listArea = document.getElementById('custom-replies-list');
              const annPanel = document.getElementById('announcement-panel');
              const crToolbar = document.getElementById('cr-toolbar');
              const subTabs = document.getElementById('cr-sub-tabs');
              const addBtn = document.getElementById('add-custom-reply');
              const titleEl = document.getElementById('cr-modal-title');
              if (listArea) listArea.style.display = '';
              if (annPanel) annPanel.style.display = 'none';
              if (crToolbar) crToolbar.style.display = '';
              if (subTabs) subTabs.style.display = '';
              if (addBtn) addBtn.style.display = '';
              if (titleEl) titleEl.textContent = '内容管理';
              currentSubTab = LIBRARY_CONFIG.atmosphere.tabs[0].id;
              renderReplyLibrary();
            } catch (err) {
              console.error('[ReplyMoodHints] restore atmosphere failed', err);
            }
            return;
          }

          if (major === 'announcement') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            try {
              currentMajorTab = 'announcement';
              currentSubTab = 'custom';
              _batchModeActive = false;
              _batchSelectedIndices.clear();
              _searchVisible = false;
              _searchQuery = '';
              _activeGroupFilter = null;
              const listArea = document.getElementById('custom-replies-list');
              const annPanel = document.getElementById('announcement-panel');
              const crToolbar = document.getElementById('cr-toolbar');
              const subTabs = document.getElementById('cr-sub-tabs');
              const addBtn = document.getElementById('add-custom-reply');
              const titleEl = document.getElementById('cr-modal-title');
              if (listArea) listArea.style.display = 'none';
              if (annPanel) annPanel.style.display = 'block';
              if (crToolbar) crToolbar.style.display = 'none';
              if (subTabs) subTabs.style.display = 'none';
              if (addBtn) addBtn.style.display = 'none';
              if (titleEl) titleEl.textContent = '今日公告配置';
              if (typeof switchToAnnouncementPanel === 'function') switchToAnnouncementPanel();
            } catch (err) {
              console.error('[ReplyMoodHints] switch announcement failed', err);
            }
            return;
          }
        },
        true
      );
    }
  }

  // ---------- 对外 API ----------
  window.OurLoveReplyMoodHints = {
    state,
    generateHints,
    shouldAnnotateMessage,
    getData: () => clone(state.data),
    openPanel,
    closePanel,
    getExportPayload,
    importPayload,
    // 兼容旧调用
    add: (layer, group, text) => addItem(layer, group, text),
    edit: (layer, source, group, oldText, newText) => editItem(source, group, oldText, newText),
    remove: (layer, source, group, text) => removeItem(source, group, text),
    setItemEnabled: (source, group, text, on) => toggleItem(source, group, text, on)
  };

  load();
  ensureActivation();
  const obs = new MutationObserver(injectButton);
  obs.observe(document.documentElement, { childList: true, subtree: true });
  injectButton();
})();
