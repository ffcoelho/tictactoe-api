import { Router } from "express";
import bodyparser from "body-parser";
import { apiGetInfo } from "./apiGetInfo";
import { apiPostMatch } from "./apiPostMatch";
import { apiPostMatchJoin } from "./apiPostMatchJoin";
import { apiPostRooms } from "./apiPostRooms";

export const apiRouter = Router();

const jsonParser = bodyparser.json();

apiRouter.route("/")
  .get(apiGetInfo)
  .post(apiPostRooms);
apiRouter.route("/match").post(apiPostMatch);
apiRouter.route("/join").post(jsonParser, apiPostMatchJoin);
