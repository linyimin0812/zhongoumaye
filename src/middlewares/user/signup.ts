import { UserList } from "../../models/user-list";
import { GeneralResult } from "../../interface/general-result";
import { User } from "../../interface/user-list";
import * as crypto from "crypto";

const hash = crypto.createHash('sha256');

function signup(req, res) {
    let username: string = req.query.username;
    let password: string = req.query.password;
    UserList.findByUsername(username).then(function (user) {
        // 用户名存在
        if (user && user.length > 0) {
            let result: GeneralResult = {
                result: false,
                reason: "用户名已存在",
                data: null
            }
            return res.json(result)
        }
        // 用户名不存在,开始注册
        let userInfo: User = {
            username: username,
            realname: req.query.realname,
            password: password,
            rawpassword: hash.update(password).digest('hex'),
            contact: {
                tel: req.query.tel || null,
                email: req.query.email || null
            },
            type: 0,
            createAt: new Date()
        }
        // 将用户注册信息插入数据库，并完成登录
        UserList.insert(userInfo).then(() => {
            userInfo.password = "";
            userInfo.rawpassword = "";
            let result: GeneralResult = {
                result: true,
                reason: null,
                data: userInfo
            }
            req.session.user = userInfo;
            return res.json(result)
        }).catch((err) => {
            let result: GeneralResult = {
                result: false,
                reason: err.message,
                data: null
            }
            return res.json(result);
        });

    }).catch((err) => {
        console.log(err.message);
    });
}
export{signup}