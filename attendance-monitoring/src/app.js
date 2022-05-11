const express = require("express");

const { db, router } = require("./config");

const app = express();
const port = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

db.then(() => app.listen(port, () => console.info(`Server started on port ${port}`)));
