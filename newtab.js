/**
 * Linux Terminal Dashboard Pro
 * Developer: @FanAvranHolding
 * Version: 8.0.0
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    STORAGE_KEY: 'linux_terminal_pro',
    TEHRAN_TZ: 'Asia/Tehran',
    DEVELOPER: '@FanAvranHolding',
    VERSION: '8.0.0'
  };

  // Default colorful shortcuts with gradients
  const DEFAULT_SHORTCUTS = [
    { 
      name: 'Google', 
      url: 'https://google.com', 
      color: '#4285f4',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: 'https://www.google.com/favicon.ico'
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com', 
      color: '#ff0000',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: 'https://www.youtube.com/favicon.ico'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com', 
      color: '#24292e',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: 'https://github.com/favicon.ico'
    },
    { 
      name: 'Gmail', 
      url: 'https://mail.google.com', 
      color: '#ea4335',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: 'https://mail.google.com/favicon.ico'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com', 
      color: '#0077b5',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: 'https://www.linkedin.com/favicon.ico'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com', 
      color: '#1da1f2',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: 'https://twitter.com/favicon.ico'
    },
    { 
      name: 'Reddit', 
      url: 'https://reddit.com', 
      color: '#ff4500',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: 'https://www.reddit.com/favicon.ico'
    },
    { 
      name: 'Stack Overflow', 
      url: 'https://stackoverflow.com', 
      color: '#f48024',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      icon: 'https://stackoverflow.com/favicon.ico'
    },
    { 
      name: 'ChatGPT', 
      url: 'https://chat.openai.com', 
      color: '#10a37f',
      gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
      icon: 'https://chat.openai.com/favicon.ico'
    },
    { 
      name: 'WhatsApp', 
      url: 'https://web.whatsapp.com', 
      color: '#25d366',
      gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
      icon: 'https://web.whatsapp.com/favicon.ico'
    },
    { 
      name: 'Telegram', 
      url: 'https://web.telegram.org', 
      color: '#0088cc',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: 'https://web.telegram.org/favicon.ico'
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com', 
      color: '#e4405f',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: 'https://www.instagram.com/favicon.ico'
    }
  ];

  // Settings
  let settings = {
    theme: 'default',
    animations: true,
    effects: true,
    searchEngine: 'google',
    shortcuts: DEFAULT_SHORTCUTS,
    format24h: true,
    tabs: []
  };

  const searchEngines = {
    google: {
      url: 'https://www.google.com/search?q=',
      icon: 'https://www.google.com/favicon.ico'
    },
    duckduckgo: {
      url: 'https://duckduckgo.com/?q=',
      icon: 'https://duckduckgo.com/favicon.ico'
    },
    bing: {
      url: 'https://www.bing.com/search?q=',
      icon: 'https://www.bing.com/favicon.ico'
    },
    yahoo: {
      url: 'https://search.yahoo.com/search?p=',
      icon: 'https://www.yahoo.com/favicon.ico'
    }
  };

  // Initialize
  function init() {
    console.log(`Linux Terminal Dashboard Pro ${CONFIG.VERSION}`);
    console.log(`Developer: ${CONFIG.DEVELOPER}`);
    
    loadSettings();
    setupClock();
    setupSearch();
    setupShortcuts();
    setupDock();
    setupSettings();
    setupTerminal();
    setupSystemInfo();
    setupTabs();
    updateWeather();
    initMatrixRain();
    
    // Add animations
    document.querySelectorAll('.terminal-content > *').forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.animationDelay = `${i * 0.1}s`;
    });
  }

  // Enhanced Tab Management
  function setupTabs() {
    const tabsContainer = document.querySelector('.tabs-container');
    const newTabBtn = document.querySelector('.tab-new');
    
    // Setup existing tabs
    document.querySelectorAll('.tab').forEach(tab => {
      setupTabEvents(tab);
    });
    
    // New tab button
    if (newTabBtn) {
      newTabBtn.addEventListener('click', () => {
        createNewTab();
      });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        createNewTab();
      }
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        closeActiveTab();
      }
      if (e.ctrlKey && e.key === 'Tab') {
        e.preventDefault();
        switchToNextTab();
      }
    });
  }

  function setupTabEvents(tab) {
    tab.addEventListener('click', (e) => {
      // Handle close button
      if (e.target.classList.contains('tab-close')) {
        closeTab(tab);
        return;
      }
      
      // Switch to tab
      setActiveTab(tab);
      
      // Add ripple effect
      createRipple(e, tab);
    });
    
    // Make tab draggable
    tab.draggable = true;
    tab.addEventListener('dragstart', handleDragStart);
    tab.addEventListener('dragend', handleDragEnd);
    tab.addEventListener('dragover', handleDragOver);
    tab.addEventListener('drop', handleDrop);
  }

  function setActiveTab(tab) {
    // Remove active from all tabs
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
    });
    
    // Add active to selected tab
    tab.classList.add('active');
    
    // Update content based on tab
    const tabId = tab.dataset.tabId;
    updateTabContent(tabId);
  }

  function createNewTab() {
    const tabsContainer = document.querySelector('.tabs-container');
    const newTabBtn = document.querySelector('.tab-new');
    
    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.dataset.tabId = `tab-${Date.now()}`;
    newTab.innerHTML = `
      <div class="tab-content">
        <span class="tab-favicon">🆕</span>
        <span class="tab-title">New Tab</span>
        <span class="tab-close">×</span>
      </div>
    `;
    
    tabsContainer.insertBefore(newTab, newTabBtn);
    setupTabEvents(newTab);
    setActiveTab(newTab);
    
    // Animate
    newTab.style.animation = 'tab-appear 0.3s ease-out';
  }

  function closeTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    const wasActive = tab.classList.contains('active');
    
    // Animate out
    tab.style.animation = 'fadeOut 0.3s ease-out';
    
    setTimeout(() => {
      tab.remove();
      
      // If was active, activate another tab
      if (wasActive) {
        const remainingTabs = document.querySelectorAll('.tab');
        if (remainingTabs.length > 0) {
          setActiveTab(remainingTabs[0]);
        }
      }
    }, 300);
  }

  function closeActiveTab() {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
      closeTab(activeTab);
    }
  }

  function switchToNextTab() {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const activeIndex = tabs.findIndex(tab => tab.classList.contains('active'));
    
    if (activeIndex !== -1) {
      const nextIndex = (activeIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex]);
    }
  }

  function updateTabContent(tabId) {
    // Here you can update the content based on tab
    console.log(`Switched to tab: ${tabId}`);
  }

  // Drag and Drop for tabs
  let draggedTab = null;

  function handleDragStart(e) {
    draggedTab = this;
    this.style.opacity = '0.5';
  }

  function handleDragEnd(e) {
    this.style.opacity = '';
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    
    if (draggedTab !== this) {
      const tabsContainer = document.querySelector('.tabs-container');
      const allTabs = Array.from(tabsContainer.querySelectorAll('.tab'));
      const draggedIndex = allTabs.indexOf(draggedTab);
      const targetIndex = allTabs.indexOf(this);
      
      if (draggedIndex < targetIndex) {
        this.parentNode.insertBefore(draggedTab, this.nextSibling);
      } else {
        this.parentNode.insertBefore(draggedTab, this);
      }
    }
    
    return false;
  }

  // Ripple Effect
  function createRipple(e, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  // Load settings
  function loadSettings() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (stored) {
      try {
        settings = { ...settings, ...JSON.parse(stored) };
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }

  // Save settings
  function saveSettings() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(settings));
  }

  // Clock
  function setupClock() {
    const updateClock = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat('en-US', {
        timeZone: CONFIG.TEHRAN_TZ,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !settings.format24h
      }).formatToParts(now);
      
      const parts = {};
      time.forEach(part => {
        if (part.type !== 'literal') {
          parts[part.type] = part.value;
        }
      });
      
      document.getElementById('hours').textContent = parts.hour || '00';
      document.getElementById('minutes').textContent = parts.minute || '00';
      document.getElementById('seconds').textContent = parts.second || '00';
      
      // Update date
      const date = new Intl.DateTimeFormat('en-US', {
        timeZone: CONFIG.TEHRAN_TZ,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);
      
      const persianDate = new Intl.DateTimeFormat('fa-IR', {
        timeZone: CONFIG.TEHRAN_TZ,
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);
      
      document.getElementById('date').textContent = `${date} • ${persianDate}`;
      
      // Update status bar time
      document.getElementById('time-status').textContent = 
        `${parts.hour}:${parts.minute}`;
    };
    
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Search
  function setupSearch() {
    const input = document.getElementById('search-input');
    const engineIcon = document.getElementById('search-engine-icon');
    
    // Update search engine icon
    engineIcon.src = searchEngines[settings.searchEngine].icon;
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (!query) return;
        
        if (query.startsWith('http') || query.includes('.')) {
          window.location.href = query.startsWith('http') ? query : `https://${query}`;
        } else {
          window.location.href = searchEngines[settings.searchEngine].url + 
                                encodeURIComponent(query);
        }
      }
    });
    
    // Focus on /
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  // Shortcuts
  function setupShortcuts() {
    const container = document.getElementById('shortcuts-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    settings.shortcuts.forEach((shortcut, index) => {
      const item = document.createElement('a');
      item.href = shortcut.url;
      item.className = 'shortcut-item fade-in';
      item.style.animationDelay = `${index * 0.05}s`;
      
      const iconDiv = document.createElement('div');
      iconDiv.className = 'shortcut-icon';
      iconDiv.style.background = shortcut.gradient || shortcut.color;
      
      if (shortcut.icon) {
        iconDiv.innerHTML = `<img src="${shortcut.icon}" alt="${shortcut.name}">`;
      } else {
        iconDiv.textContent = shortcut.name[0].toUpperCase();
      }
      
      const nameDiv = document.createElement('div');
      nameDiv.className = 'shortcut-name';
      nameDiv.textContent = shortcut.name;
      
      item.appendChild(iconDiv);
      item.appendChild(nameDiv);
      
      // Right-click to delete
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (confirm(`Remove ${shortcut.name}?`)) {
          settings.shortcuts.splice(index, 1);
          saveSettings();
          setupShortcuts();
        }
      });
      
      container.appendChild(item);
    });
    
    // Add button
    const addBtn = document.createElement('div');
    addBtn.className = 'shortcut-item add-shortcut fade-in';
    addBtn.style.animationDelay = `${settings.shortcuts.length * 0.05}s`;
    addBtn.innerHTML = `
      <div class="shortcut-icon">+</div>
      <div class="shortcut-name">Add</div>
    `;
    addBtn.addEventListener('click', showAddDialog);
    container.appendChild(addBtn);
  }

  // Add shortcut dialog
  function showAddDialog() {
    const dialog = document.getElementById('shortcut-dialog');
    const form = dialog.querySelector('.dialog-form');
    const closeBtn = dialog.querySelector('.dialog-close');
    const cancelBtn = dialog.querySelector('.btn-cancel');
    
    dialog.showModal();
    
    closeBtn.onclick = () => dialog.close();
    cancelBtn.onclick = () => dialog.close();
    
    form.onsubmit = (e) => {
      e.preventDefault();
      
      const name = document.getElementById('shortcut-name').value;
      const url = document.getElementById('shortcut-url').value;
      const color = document.getElementById('shortcut-color').value;
      
      const newShortcut = {
        name,
        url,
        color,
        gradient: `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)`,
        icon: getFavicon(url)
      };
      
      settings.shortcuts.push(newShortcut);
      saveSettings();
      setupShortcuts();
      
      form.reset();
      dialog.close();
    };
  }

  // Get favicon
  function getFavicon(url) {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  }

  // Dock
  function setupDock() {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
      if (item.dataset.color) {
        item.addEventListener('mouseenter', () => {
          item.style.background = `linear-gradient(135deg, ${item.dataset.color}dd 0%, ${item.dataset.color}99 100%)`;
        });
        
        item.addEventListener('mouseleave', () => {
          if (!item.classList.contains('active')) {
            item.style.background = '';
          }
        });
      }
      
      item.addEventListener('click', () => {
        dockItems.forEach(i => {
          i.classList.remove('active');
          i.style.background = '';
        });
        item.classList.add('active');
        if (item.dataset.color) {
          item.style.background = `linear-gradient(135deg, ${item.dataset.color}dd 0%, ${item.dataset.color}99 100%)`;
        }
      });
    });
    
    // Settings button
    document.getElementById('settings-dock').addEventListener('click', () => {
      document.getElementById('settings-panel').classList.add('open');
    });
  }

  // Settings
  function setupSettings() {
    const panel = document.getElementById('settings-panel');
    const closeBtn = document.getElementById('close-settings');
    
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
    });
    
    // Theme
    const themeSelect = document.getElementById('theme-select');
    themeSelect.value = settings.theme;
    themeSelect.addEventListener('change', (e) => {
      settings.theme = e.target.value;
      saveSettings();
      document.body.className = `linux-pro theme-${settings.theme}`;
    });
    
    // Animations
    const animToggle = document.getElementById('animations-toggle');
    animToggle.checked = settings.animations;
    animToggle.addEventListener('change', (e) => {
      settings.animations = e.target.checked;
      saveSettings();
    });
    
    // Effects
    const effectsToggle = document.getElementById('effects-toggle');
    effectsToggle.checked = settings.effects;
    effectsToggle.addEventListener('change', (e) => {
      settings.effects = e.target.checked;
      saveSettings();
      
      const scanlines = document.querySelector('.scanlines');
      const grid = document.querySelector('.cyber-grid');
      if (scanlines) scanlines.style.display = e.target.checked ? 'block' : 'none';
      if (grid) grid.style.display = e.target.checked ? 'block' : 'none';
    });
    
    // Search engine
    const searchSelect = document.getElementById('search-engine-select');
    searchSelect.value = settings.searchEngine;
    searchSelect.addEventListener('change', (e) => {
      settings.searchEngine = e.target.value;
      saveSettings();
      document.getElementById('search-engine-icon').src = 
        searchEngines[settings.searchEngine].icon;
    });
    
    // Export/Import/Reset
    document.querySelector('.setting-btn.export').addEventListener('click', exportSettings);
    document.querySelector('.setting-btn.import').addEventListener('click', importSettings);
    document.querySelector('.setting-btn.reset').addEventListener('click', resetSettings);
  }

  // Terminal
  function setupTerminal() {
    const input = document.getElementById('command-input');
    const output = document.getElementById('terminal-output');
    
    const commands = {
      help: () => 'Available commands: help, clear, date, about, contact, newtab',
      clear: () => {
        output.innerHTML = '';
        return '';
      },
      date: () => new Date().toString(),
      about: () => `Linux Terminal Dashboard Pro ${CONFIG.VERSION}`,
      contact: () => `Developer: ${CONFIG.DEVELOPER} (Telegram)`,
      newtab: () => {
        createNewTab();
        return 'New tab created!';
      }
    };
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
          addOutput(`$ ${cmd}`);
          
          if (commands[cmd]) {
            const result = commands[cmd]();
            if (result) addOutput(result);
          } else {
            addOutput(`Command not found: ${cmd}`);
          }
          
          input.value = '';
        }
      }
    });
    
    function addOutput(text) {
      const line = document.createElement('div');
      line.textContent = text;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }
  }

  // System info
  function setupSystemInfo() {
    const updateStats = () => {
      document.getElementById('cpu-usage').textContent = 
        `${Math.floor(Math.random() * 40 + 30)}%`;
      document.getElementById('ram-usage').textContent = 
        `${(Math.random() * 3 + 2).toFixed(1)}GB`;
      document.getElementById('net-speed').textContent = 
        `${Math.floor(Math.random() * 200 + 50)}KB/s`;
      document.getElementById('sys-temp').textContent = 
        `${Math.floor(Math.random() * 15 + 45)}°C`;
    };
    
    updateStats();
    setInterval(updateStats, 3000);
    
    // Get IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        document.getElementById('ip-info').textContent = `IP: ${data.ip}`;
      })
      .catch(() => {
        document.getElementById('ip-info').textContent = 'IP: Private';
      });
  }

  // Weather
  async function updateWeather() {
    try {
      const response = await fetch('https://wttr.in/Tehran?format=%C+%t');
      const weather = await response.text();
      document.getElementById('weather').textContent = `🌤️ ${weather.trim()}`;
    } catch {
      document.getElementById('weather').textContent = '🌤️ Clear • 23°C';
    }
  }

  // Matrix rain
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(1);
    
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
    
    function draw() {
      ctx.fillStyle = 'rgba(15, 14, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '15px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Export settings
  function exportSettings() {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linux-terminal-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import settings
  function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          settings = { ...settings, ...imported };
          saveSettings();
          location.reload();
        } catch {
          alert('Invalid settings file');
        }
      };
      reader.readAsText(file);
    });
    
    input.click();
  }

  // Reset settings
  function resetSettings() {
    if (confirm('Reset all settings to default?')) {
      localStorage.removeItem(CONFIG.STORAGE_KEY);
      location.reload();
    }
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
