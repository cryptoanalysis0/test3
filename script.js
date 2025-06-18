
/* =======================
   CryptoAnalysis Script
   ======================= */

// Simple helper to format large numbers
function abbreviateNumber(value) {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
  if (value >= 1e9)  return (value / 1e9 ).toFixed(2) + 'B';
  if (value >= 1e6)  return (value / 1e6 ).toFixed(2) + 'M';
  if (value >= 1e3)  return (value / 1e3 ).toFixed(2) + 'K';
  return value.toString();
}

async function loadMarkets() {
  const tbody = document.querySelector('#market-table tbody');
  tbody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
    const data = await res.json();
    tbody.innerHTML = '';
    data.forEach((coin, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${coin.image}" alt="${coin.name}" style="width:20px; vertical-align:middle; margin-right:6px;">${coin.name} (${coin.symbol.toUpperCase()})</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td style="color:${coin.price_change_percentage_24h >= 0 ? '#0f9d58': '#d93025'};">
            ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td>$${abbreviateNumber(coin.market_cap)}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5">Failed to load data.</td></tr>';
    console.error(err);
  }
}

async function loadNews() {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '<li>Loading news...</li>';

  /* 
     ⚠️ Replace 'YOUR_NEWSAPI_KEY' with a valid API key from https://newsapi.org
     You can also use CryptoPanic or other providers.
  */
  const apiKey = 'YOUR_NEWSAPI_KEY';
  if (apiKey === 'YOUR_NEWSAPI_KEY') {
    newsList.innerHTML = '<li>Configure your NewsAPI key in script.js to fetch news.</li>';
    return;
  }
  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=crypto&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`);
    const { articles } = await res.json();
    newsList.innerHTML = '';
    articles.forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${article.url}" target="_blank">${article.title}</a>
        <span> – ${new Date(article.publishedAt).toLocaleDateString()}</span>
      `;
      newsList.appendChild(li);
    });
  } catch (err) {
    newsList.innerHTML = '<li>Failed to load news.</li>';
    console.error(err);
  }
}

function initTradingView() {
  if (typeof TradingView === 'undefined') return;
  new TradingView.widget({
    "container_id": "chart-container",
    "width": "100%",
    "height": 400,
    "symbol": "BITSTAMP:BTCUSD",
    "interval": "D",
    "theme": "dark",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "hide_legend": false,
    "save_image": false,
    "studies": ["MACD@tv-basicstudies"],
    "allow_symbol_change": true
  });
}

function referralCopy() {
  const copyBtn = document.getElementById('copy-btn');
  const referralInput = document.getElementById('referral-link');
  const confirmation = document.getElementById('copy-confirmation');
  copyBtn.addEventListener('click', () => {
    referralInput.select();
    document.execCommand('copy');
    confirmation.classList.remove('hidden');
    setTimeout(() => confirmation.classList.add('hidden'), 2000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadMarkets();
  loadNews();
  initTradingView();
  referralCopy();
});
