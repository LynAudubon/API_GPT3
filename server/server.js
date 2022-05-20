import app from './app.js';
import 'dotenv/config';

const Port = process.env.PORT || 3333;

//for running server locally and listening for connections
app.listen(Port, () => console.log('Server running on port', Port));
