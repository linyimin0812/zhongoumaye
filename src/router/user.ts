import * as express from "express";
import {signin} from "../middlewares/user/signin";
import {signup} from "../middlewares/user/signup";
import {signout} from "../middlewares/user/signout";
import { Router } from "express";
const router:Router = express.Router();
// 登录
router.post("/signin", signin);
// 注册
router.post("/signup", signup);

// 退出
router.post("/signout", signout);


export{router}