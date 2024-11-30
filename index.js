const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const connectDaatabase = require("./config/database");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// Configure CORS
const allowedOrigins = [
  "http://localhost:3000", 
  "https://monal-frontend-admin.vercel.app", 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);

dotenv.config({ path: "./.env" });

// Connect to database
connectDaatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//importing routes
const categories= require('./routes/category');
const subcategories= require('./routes/subcategory');
const items= require('./routes/item');
const auth= require('./routes/auth');


app.use('/api', categories);
app.use('/api', subcategories);
app.use('/api', items);
app.use('/api', auth);
