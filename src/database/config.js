import mongoose from "mongoose";
export const dbConnection = async() => {
    mongoose.connect(process.env.DB_CNN_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Conectado a la base de datos');
      }).catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
      });
}