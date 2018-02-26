import { UserList } from "../../models/user-list";
import { GeneralResult } from "../../interface/general-result";
import { User } from "../../interface/user-list";
import * as crypto from "crypto";

function signup(req, res) {
    let username: string = req.body.username;
    let password: string = req.body.password;
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
        let hash = crypto.createHash('sha256');
        let userInfo: User = {
            username: username,
            realname: req.body.realname !== undefined ? req.body.realname : null,
            password: password,
            rawpassword: hash.update(password).digest('hex'),
            contact: {
                tel: req.body.tel !== undefined ? req.body.tel : null,
                email: req.body.email !== undefined ? req.body.email : null
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


function isExist(req, res){
    let username: string = req.body.username;
    UserList.findByUsername(username).then((results) => {
        if(results && results.length > 0){
            return res.json(true);
        }
        return res.json(false);
    });
}
export{signup, isExist}