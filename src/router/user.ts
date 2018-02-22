import * as express from "express";
import {signin} from "../middlewares/user/signin";
import {signup} from "../middlewares/user/signup";
import {signout} from "../middlewares/user/signout";
const router = express.Router();
// 登录
router.post("/signin", signin);
// 注册
router.post("/signup", signup);

// 退出
router.post("/signout", signout);


export{router}