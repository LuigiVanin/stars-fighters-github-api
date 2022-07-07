import dotenv from "dotenv";
dotenv.config();
import app from "./app";

console.log("hello typescript");
const PORT = process.env.PORT;

console.log();

app.listen(PORT, () => {
    console.log(`I am listen do port ${PORT}`);
});
