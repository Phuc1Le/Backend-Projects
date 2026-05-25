git clone https://github.com/Phuc1Le/Backend-Projects.git
cd Backend-Projects/web-crawler

Install dependencies:

```bash
npm install
```


Install Node.js if not already installed:
https://nodejs.org

Built using:
- Node.js
- `jsdom`
- Native `fetch` API

## Usage

Run the crawler using:

```bash
npm start <url>
```

Example:

```bash
npm start https://example.com
```

---

## Core Functions

### `crawlPage(baseUrl, currentUrl, pages)`

Recursively crawls pages within the same domain.

#### Responsibilities
- Prevents crawling external domains
- Prevents duplicate crawling
- Fetches page HTML
- Extracts links
- Recursively crawls discovered pages

---

### `getUrlFromHtml(htmlBody, baseUrl)`

Extracts URLs from HTML anchor tags.

#### Supports
- Relative URLs
- Absolute URLs
- Invalid URL handling

---

### `normalizeUrl(urlString)`

Normalizes URLs to avoid duplicate entries.

#### Example

```js
https://example.com/about/
https://example.com/about
```

Both become:

```text
example.com/about
```

---

## Technologies Used

- Node.js
- `jsdom`

---

## Error Handling

The crawler gracefully handles:
- Invalid URLs
- Non-HTML responses
- Failed fetch requests
- HTTP errors

---