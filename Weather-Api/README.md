# ☁️ Weather API Project

Build your own Weather API that fetches real-time weather data from a third-party provider, caches it for efficiency, and serves it to your users!

---

## 🌦️ Overview

In this project, you’ll create an API server that lets users request the weather for a specific city. Instead of storing weather data yourself, your API will **fetch data from a free weather provider** (like Visual Crossing or OpenWeather), then **cache the results in memory** (for example, with Redis) to speed up repeat requests and minimize calls to the third-party service.

You’ll learn about:

* Working with third-party APIs
* Handling environment variables (like API keys)
* Caching responses for efficiency (using Redis or similar)
* Error handling and rate limiting

---

## 🚀 How it Works

1. **Client sends a request** to your API, e.g. `GET /weather?city=London`.
2. **API checks the cache**: If the weather for London was recently fetched, it returns the cached result.
3. **If not cached**, your API requests weather data from the external weather service.
4. **API receives and parses the response** from the third-party provider.
5. **Response is saved in cache** (for a set time, like 12 hours), and then returned to the client.

---

### Architecture Diagram

This is the flow you’ll be building:

![Weather API Flow](https://assets.roadmap.sh/guest/weather-api-f8i1q.png)

1. Weather API checks the cache (Redis).
2. If data is found, returns it to the UI. If not, continues.
3. Makes a request to a 3rd Party Weather Service.
4. Receives the response.
5. Caches the result in Redis for next time, and returns it to the UI.

---

## 📁 Project Structure

```
weather-api/
├── routes/
│   └── weather.js
├── app.js
├── package.json
├── .env
└── README.md
```

---

## 🛠️ Features

* **Fetch weather by city** from a 3rd party API (you choose the provider)
* **In-memory cache** with expiration (e.g. Redis)
* **Environment variables** for API keys and sensitive config
* **Error handling** for invalid cities or external API issues
* **Rate limiting** to protect your server from abuse

---

## 📦 Dependencies

Install these packages (for Node.js/Express):

```
npm install express axios redis dotenv express-rate-limit
```

---

## 🧪 Getting Started

1. **Clone this repo and install dependencies**

   ```bash
   git clone https://github.com/yourusername/weather-api.git
   cd weather-api
   npm install
   ```

2. **Set up environment variables**

   * Create a `.env` file and add your API keys and Redis connection string:

    ```env
    WEATHER_API_KEY=your_api_key_here
    REDIS_URL=redis://localhost:6379
    ```

3. **Start the API server**

   ```bash
   npm start
   ```

4. **Test the API**

   Try:

   ```plaintext
   GET http://localhost:3000/weather?city=London
   ```

---

## ⚡ Example Response

```json
{
  "city": "London",
  "temperature": 15,
  "unit": "C",
  "description": "Partly cloudy",
  "fetchedAt": "2025-07-18T11:32:00Z"
}
```

---

## 🤝 Contributing

Pull requests and suggestions are always welcome! If you have improvements or bug fixes, feel free to open an issue or submit a PR.

---

## 🪐 License

This project is open source and available under the MIT License.

---

> “The beauty of an API is that, much like science itself, it stands on the shoulders of giants: we use data collected by others, repackage it, and share it anew. By caching, we conserve our cosmic resources.”
> — Carl Sagan (almost)

---

Happy building, and may your weather always be clear!
