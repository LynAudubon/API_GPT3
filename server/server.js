import app from './app.js';
import 'dotenv/config';

const Port = process.env.PORT || 3333;

//run server locally and listen for connections
app.listen(Port, () => console.log('Server running on port', Port));
