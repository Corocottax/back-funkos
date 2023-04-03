require("dotenv").config();
const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
const { setError } = require("./config/error");
const cors = require("cors");
const { connectDb } = require("./config/db");

const PORT = process.env.PORT;

const app = express();

connectDb();
 
app.use(cors());

app.use(express.json());

app.use("/api/v1", indexRoutes);

app.use("*", (req, res, next) => {
    return next(setError(404, "Route not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
})

app.listen(PORT, () => {
    console.log("Servidor levantado en: http://localhost:" + PORT);
})