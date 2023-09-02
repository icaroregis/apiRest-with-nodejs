import mongoose from 'mongoose';

//senha mongo: EVCK0gCAb61wSZzc
mongoose.connect(process.env.STRING_CONNEXAO_DB);

const db = mongoose.connection;

export default db;
