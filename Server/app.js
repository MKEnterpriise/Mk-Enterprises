const dotenv = require('dotenv').config({ path: "./.env" });

const express = require('express');
const sequelize = require('./config/db.config');
const app = express();
const passport = require("passport");
const cors = require('cors');

require('./config/passport')(passport);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors())

const PORT = process.env.PORT || 5000;

const productRoutes = require('./routes/product.routes');
const oauthRoutes = require('./routes/OAuth.routes');

app.use('/auth', oauthRoutes);
app.use('/api/products', productRoutes);

sequelize.authenticate()
    .then(() => {
        console.log("Connection Established");
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log("Database synced")
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log("DB Sync Error:", err));