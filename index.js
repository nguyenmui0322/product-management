const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system");
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

// app.set("views", "./views");
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Flash
app.use(cookieParser("asdjflk"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// app.use(express.static("public"));
app.use(express.static(`${__dirname}/public`));

// Route
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
