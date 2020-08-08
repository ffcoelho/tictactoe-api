import { Router } from "express";
import bodyparser from "body-parser";
import { apiGet } from "./apiGet";
import { apiGetInfo } from "./apiGetInfo";
import { apiPostMatch } from "./apiPostMatch";
import { apiPostMatchJoin } from "./apiPostMatchJoin";

export const apiRouter = Router();

const jsonParser = bodyparser.json();

apiRouter.route("/").get(apiGet)
apiRouter.route("/info").get(apiGetInfo);
apiRouter.route("/match").post(apiPostMatch);
apiRouter.route("/join").post(jsonParser, apiPostMatchJoin);
