
# CryptoAnalysis

CryptoAnalysis is a lightweight, **static** web application that aggregates live cryptocurrency prices, technical charts, and the latest news headlines.

## Features

- **Top 10 Coins** by market capitalization via [CoinGecko API](https://www.coingecko.com/en/api).
- **Interactive TradingView chart** (default Bitcoin; users can change the symbol).
- **Curated News** using NewsAPI (configurable).
- **Referral Program**: share a unique link and track referrals.
- **Responsive Design** with dark theme.

## Setup

1. **Clone** the repository:
   ```bash
   git clone https://github.com/your-username/CryptoAnalysis.git
   cd CryptoAnalysis
   ```
2. **Configure News API** (optional but recommended):
   - Sign up at [NewsAPI.org](https://newsapi.org).
   - Open `script.js` and replace `YOUR_NEWSAPI_KEY` with your key.

3. **Run Locally**:
   Simply open `index.html` in your browser, or serve with a lightweight server:
   ```bash
   python -m http.server
   ```

## Deploy on GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings › Pages**.
3. Select the `main` branch and the **root** folder.
4. Save – your site will be available at:
   ```
   https://<username>.github.io/CryptoAnalysis
   ```

## License

MIT
