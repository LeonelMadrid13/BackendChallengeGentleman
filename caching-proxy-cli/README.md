# 🚦 Caching Proxy Server

A beginner-friendly CLI tool and server that *forwards* requests to another server (the “origin”), caches the responses, and returns them even faster next time.

> "Somewhere, something incredible is waiting to be known… and sometimes, it’s already in the cache." — *Carl Sagan (probably)*

---

## 🌠 What is this?

This project lets you run your own caching proxy server. It sits between you and any API or website, speeding things up by keeping a local copy of every response. If you ask for the same thing again, you get a response instantly—no need to bother the original server.

---

## 🛠️ Features

* **Proxy**: Forwards all requests to the configured origin server.
* **Caching**: Stores the response for each request.
* **X-Cache Header**: Tells you if a response was served from the cache (HIT) or fetched fresh from the server (MISS).
* **CLI Usage**: Start the proxy on any port and point it to any origin.
* **Cache Clearing**: Easily clear the cache with a command.

---

## 🚀 Usage

Start the caching proxy with:

```bash
caching-proxy --port <number> --origin <url>
```

* `--port` is the port for your proxy server (e.g. `3000`).
* `--origin` is the base URL of the server you want to cache (e.g. `http://dummyjson.com`).

Example:

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

This will start your proxy at [http://localhost:3000](http://localhost:3000), forwarding all requests to [http://dummyjson.com](http://dummyjson.com).

---

### 🌌 How it Works

* Request: You call `GET http://localhost:3000/products`
* First time: The proxy fetches from `http://dummyjson.com/products`, returns it to you, and caches it.
* Next time: The proxy returns the cached response immediately!
* **Headers**:

  * `X-Cache: MISS` (on first request)
  * `X-Cache: HIT` (on subsequent, cached requests)

---

### 🔄 Clearing the Cache

If you need to clear all cached responses, just run:

```bash
caching-proxy --clear-cache
```

---

## 💡 Why build this?

* Understand the basics of HTTP proxies and caching.
* Learn about headers, request forwarding, and server design.
* Practice building a CLI with Node.js or your favorite language.

---

## 🌍 Example

Let’s say your origin is `http://dummyjson.com` and your proxy is running at `localhost:3000`:

```bash
curl -i http://localhost:3000/products
```

First request:

```
X-Cache: MISS
```

Second request:

```
X-Cache: HIT
```

---

## 🪐 Implementation Ideas

* Use Node.js (`http` or `express`) for the server.
* Use a simple in-memory JavaScript object for caching.
* Optionally, save cache to disk for persistence.
* Parse CLI arguments using a library like `commander` or with native `process.argv`.

---

## 📁 Example Structure

```
caching-proxy/
├── bin/
│   └── caching-proxy.js
├── lib/
│   ├── server.js
│   └── cache.js
├── package.json
└── README.md
```

---

## 🌌 Final Thoughts

> "The beauty of a cache is in its silence—answers arriving before the question is even fully formed."

Don’t forget to handle errors gracefully, and always let users know when their response is coming from the stars (the cache) or from a distant galaxy (the origin server).

---

Happy coding! 🚀
