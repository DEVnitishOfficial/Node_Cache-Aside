import app from "./app.js";
import connectToDB from "./config/mongo.js";


const PORT = 5000;

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
