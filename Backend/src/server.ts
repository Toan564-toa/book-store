import "dotenv/config";

import app from "./app";
import connectDb from "./config/db";

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Book Store API is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect MongoDB:", error.message);
    process.exit(1);
  });
