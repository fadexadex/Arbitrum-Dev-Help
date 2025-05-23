import express from "express";
import { connect, connection } from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors"
import router from "./routes";

dotenv.config();

export class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  private enableMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }));
  }
  private connectToDatabase() {
    connect(process.env.MONGO_DB_URL);
    connection.on("connected", () => {
      console.log("Connected to database");
    });
    connection.on("error", (error) => {
      console.error(`Error connecting to database: ${error}`);
    });
  }
  private configureRouting() {
    this.app.use("/api", router);
    this.app.use(errorHandler);
  }

  public startApp() {
    this.enableMiddlewares();
    this.configureRouting();
    this.connectToDatabase();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
