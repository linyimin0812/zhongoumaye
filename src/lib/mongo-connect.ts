import * as mongoose from 'mongoose';
import {config} from "../../config/default";
mongoose.connect(config.database.mongodb);
mongoose.connection.on("error", (error) => {
    console.error(error);
});
