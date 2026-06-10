# Caching Proxy

A Flask-based caching proxy server that forwards requests to an origin server and caches responses in memory.

## Features

* Forward GET requests to an origin server
* In-memory response caching
* Configurable cache TTL
* Query parameter-aware cache keys
* Origin-aware cache keys
* Cache status headers:

  * `X-Cache: MISS`
  * `X-Cache: HIT`
* Runtime configuration via CLI arguments

## Installation

```bash
pip install -r requirements.txt
```

## Usage

Start the proxy server:

```bash
python app.py --port 3000 --origin https://dummyjson.com
```

Example request:

```text
http://localhost:3000/products
```

## Project Structure

```text
.
├── app.py
├── proxy.py
├── cache.py
├── config.py
├── requirements.txt
└── README.md
```

## Cache Behavior

* Responses are cached in memory.
* Cache entries expire after the configured TTL.
* Cache is cleared when the server stops.

## Technologies

* Python
* Flask
* Requests

```
```
