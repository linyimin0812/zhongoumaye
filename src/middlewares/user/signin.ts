import { User } from "../../interface/user-list";
import { UserList } from "../../models/user-list";
import * as crypto from "crypto";
import { GeneralResult } from "../../interface/general-result";
const hash = crypto.createHash('sha256');
function signin(req, res) {
    if(req.session.user){
        return res.json(req.session.user)
    }
    let username: string = req.query.username;
    let password: string = req.query.password;
    UserList.findByUsername(username).then(function (result) {
        if (result && result.length > 0) {
            let rawpassword: string = hash.update(password).digest('hex');
            if (rawpassword === result[0].rawpassword) {
                let userInfo: User = result[0];
                userInfo.password = "";
                userInfo.rawpassword = "";
                req.session.user = userInfo;
                let returnModel: GeneralResult = {
                    result: true,
                    reason: null,
                    data: userInfo
                }
                return res.json(returnModel);
            }
        }
        let returnModel: GeneralResult = {
            result: false,
            reason: "用户名不存在或密码错误",
            data: null
        }
        return res.json(returnModel);
    }).catch((err) => {
        console.log(err);
    });
}

export{signin}