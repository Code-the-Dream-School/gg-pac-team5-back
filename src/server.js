const { PORT = 8000 } = process.env;
const app = require("./app");
const connectDB = require('./db/connect');
const populateTestData = require('./utils/populateTestData');

(async () => {
  try {
    await connectDB(process.env.MONGO_URI, console.log('Connected to the DB'));
    await populateTestData();
    const listener = () => console.log(`Listening on Port ${PORT}!`);
    app.listen(PORT, listener);
  } catch (error) {
    console.log(error); 
  }
})();
