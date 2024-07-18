const express = require("express");
const bodyParser = require('body-parser');
const flash=require("express-flash");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const methodOverride=require("method-override");

require('dotenv').config();

const database = require("./config/database");
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.router")
const systemConfig = require("./config/system");
const path= require('path');
database.connect();
const app = express();
const port = process.env.port;

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(cookieParser('HHKALKS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeClient.index(app);
routeAdmin.index(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});