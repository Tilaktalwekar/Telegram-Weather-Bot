### **README for Telegram Weather Bot**

---

# **Telegram Weather Bot**

A simple Telegram bot built with Node.js and MongoDB that provides weather updates for subscribed users. Users can subscribe to a city to receive periodic weather updates and query the current weather anytime.  

---

## **Features**
- **Subscribe to Weather Updates**: Users can subscribe to a specific city's weather updates using `/subscribe`.
- **Unsubscribe**: Stop receiving periodic weather updates using `/unsubscribe`.
- **Get Current Weather**: Fetch the latest weather information on demand using `/weather`.
- **Periodic Notifications**: Automatically sends weather updates every 6 hours to subscribed users.
- **Database Integration**: Uses MongoDB to store user data, including chat IDs, subscription status, and city preferences.

---

## **Technologies Used**
- **Node.js**: Backend development.
- **Telegram Bot API**: Communication with Telegram.
- **MongoDB**: Database to store user data.
- **Axios**: Fetching weather data from the OpenWeatherMap API.
- **Environment Variables**: Securely stores sensitive keys using `dotenv`.

---

## **Setup Instructions**

### **Prerequisites**
1. Node.js and npm installed on your system.
2. MongoDB Atlas account or a locally running MongoDB instance.
3. OpenWeatherMap API key.
4. Telegram bot token from [BotFather](https://core.telegram.org/bots#botfather).
5. A GitHub repository to store your code.

### **Steps to Run Locally**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Tilaktalwekar/Telegram-Weather-Bot.git
   cd Telegram-Weather-Bot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root and add the following:
   ```plaintext
   BOT_TOKEN=your_telegram_bot_token
   MONGO_URI=your_mongodb_connection_string
   WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. **Run the Bot**
   ```bash
   node bot.js
   ```
   The bot will start polling Telegram for messages.

---

## **Commands**
1. **`/start`**: Initialize the bot and store the user in the database.
2. **`/subscribe city_name`**: Subscribe to weather updates for a specific city.
3. **`/unsubscribe`**: Stop receiving periodic updates.
4. **`/weather`**: Get the current weather for the subscribed city.

---

## **Periodic Weather Updates**
The bot fetches weather updates every 6 hours for all subscribed users and sends the data to their Telegram chats.

---

## **Project Structure**
```plaintext
Telegram-Weather-Bot/
│
├── bot.js               # Main bot logic
├── models/
│   └── User.js          # Mongoose schema for user data
├── package.json         # Project dependencies
├── .env                 # Environment variables (not tracked by Git)
├── .gitignore           # Files to be ignored by Git
└── README.md            # Project documentation
```

---

## **Deployment**
To deploy the bot:
1. Use a cloud provider like [Railway](https://railway.app/) or [Render](https://render.com/).
2. Ensure your `.env` file is properly configured on the platform.
3. Set the bot to always run using their deployment settings.

---

## **Contributing**
Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## **License**
This project is open-source and available under the MIT License.

---

### **Author**
**Tilak Talwekar**  
[GitHub Profile](https://github.com/Tilaktalwekar)
