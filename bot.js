
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("./models/User");
const Setting = require("./models/Setting");

let bot;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Fetch the bot token from MongoDB
    const botTokenData = await Setting.findOne();
    if (!botTokenData || !botTokenData.token) {
      throw new Error("Bot token not found in the database.");
    }

    // Initialize Telegram bot with fetched token
    bot = new TelegramBot(botTokenData.token, { polling: true });
    console.log("Telegram bot started successfully!");

    // Setup commands only after bot is initialized
    setupBotCommands();
  } catch (error) {
    console.error("Failed to start Telegram bot:", error.message);
  }
});

// Function to check if a user is blocked
const isUserBlocked = async (chatId) => {
  const user = await User.findOne({ chatId });
  return user && user.blocked;
};

// Function to setup bot commands
const setupBotCommands = () => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    if (await isUserBlocked(chatId)) {
      bot.sendMessage(chatId, "You have been blocked by the admin.");
      return;
    }

    const user = await User.findOne({ chatId });
    if (!user) {
      await User.create({ chatId });
      bot.sendMessage(
        chatId,
        "Welcome to the Weather Bot created by Tilak Talwekar! Use /subscribe city_name to get weather updates and /weather to get the weather afterwards."
      );
    } else {
      bot.sendMessage(
        chatId,
        "Welcome back! Use /subscribe city_name to update your city or use /weather to get weather update."
      );
    }
  });

  bot.onText(/\/subscribe (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (await isUserBlocked(chatId)) {
      bot.sendMessage(chatId, "You have been blocked by the admin.");
      return;
    }

    const city = match[1].trim();
    await User.findOneAndUpdate(
      { chatId },
      { city, subscribed: true },
      { upsert: true }
    );
    bot.sendMessage(
      chatId,
      `You have subscribed to weather updates for ${city}.`
    );
  });

  bot.onText(/\/unsubscribe/, async (msg) => {
    const chatId = msg.chat.id;
    if (await isUserBlocked(chatId)) {
      bot.sendMessage(chatId, "You have been blocked by the admin.");
      return;
    }

    const user = await User.findOneAndUpdate({ chatId }, { subscribed: false });
    if (user) {
      bot.sendMessage(chatId, "You have unsubscribed from weather updates.");
    } else {
      bot.sendMessage(chatId, "You are not subscribed yet.");
    }
  });

  bot.onText(/\/weather/, async (msg) => {
    const chatId = msg.chat.id;
    if (await isUserBlocked(chatId)) {
      bot.sendMessage(chatId, "You have been blocked by the admin.");
      return;
    }

    const user = await User.findOne({ chatId });
    if (user && user.city) {
      const weather = await getWeather(user.city);
      bot.sendMessage(chatId, `Current weather in ${user.city}:\n${weather}`);
    } else {
      bot.sendMessage(
        chatId,
        "Please subscribe with a city first using /subscribe city_name."
      );
    }
  });
};

// Fetch Weather
const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const data = response.data;
    return `Temperature: ${data.main.temp}°C\nDescription: ${data.weather[0].description}`;
  } catch (error) {
    console.error(error);
    return "Unable to fetch weather. Please check the city name.";
  }
};

// Send Periodic Updates
const sendWeatherUpdates = async () => {
  const users = await User.find({ subscribed: true });
  for (const user of users) {
    if (user.city) {
      const weather = await getWeather(user.city);
      bot.sendMessage(
        user.chatId,
        `Weather update for ${user.city}:\n${weather}`
      );
    }
  }
};

// Schedule Updates Every 6 Hours
setInterval(sendWeatherUpdates, 6 * 60 * 60 * 1000);
const app = express();

const port =  3000;  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


