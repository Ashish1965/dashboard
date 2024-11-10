import mongoose from "mongoose";
async function connectMongo() {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });
}
export default connectMongo;
