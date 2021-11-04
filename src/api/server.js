require('dotenv').config();
const app = require('./app');

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));