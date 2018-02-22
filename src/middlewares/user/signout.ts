import { GeneralResult } from "../../interface/general-result";
function signout(req, res){
    if(req.session.user){
        let returnModel: GeneralResult = {
            result: true,
            reason: null,
            data: `${req.session.user.username} 成功退出`
        }
        req.session.user = null;
        return res.json(returnModel);
    }
    let returnModel: GeneralResult = {
        result: true,
        reason: null,
        data: "没有用户在线"
    }
    return res.json(returnModel);
}

export{signout}