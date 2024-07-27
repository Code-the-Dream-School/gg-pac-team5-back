const { PORT = 8000 } = process.env;
const app = require("./app");
const connectDB = require('./db/connect');

(async () => {
  try {
    await connectDB(process.env.MONGO_URI, console.log('Connected to the DB'));
    const listener = () => console.log(`Listening on Port ${PORT}!`);
    app.listen(PORT, listener);
  } catch (error) {
    console.log(error);
  }
})();
