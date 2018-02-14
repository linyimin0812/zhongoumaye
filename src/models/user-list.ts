import {Schema, Model, model, Document} from "mongoose";
import {User} from "../interface/user-list";
const UserSchema: Schema = new Schema({
    username: {type: String, unique: true},
    realname: {type: String},
    password: {type: String},
    rawpassword: {type: String},
    contact: {
        tel: String,
        email: String
    },
    type: {type: Number},
    createAt: {type: Date, default: Date.now}
});


class UserList{
    static UserModel: Model<Document> = model("UserList", UserSchema);
    /**
     * 根据用户名查找用户信息
     * @param username 
     */
    static async findByUsername(username: String): Promise<any>{
        return new Promise((resolve, reject) => {
            UserList.UserModel.find({username: username}, (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }  
    /**
     * 插入用户信息
     * @param user 
     */
    static async insert(user: User): Promise<any>{
        return new Promise(function(resolve, reject){
            let temp: Document = new UserList.UserModel(user);
            temp.save((err, result) => {
                if(err){
                    return reject(err);
                }
                return resolve();
            });
        })
    }

    static remove(username?: String, tel?: String, email?: String){

    }

    /**
     * 进行分页查找
     * @param isPage 
     * @param pageSize 
     * @param pageNo 
     * @param lastIndex 
     */
    static async find(isPage: boolean, pageSize?: number, pageNo?: number): Promise<any>{
        return new Promise((resolve, reject) => {
            UserList.UserModel.find((err, results) => {
                if(err){
                    return reject(err);
                }
                if(isPage && pageSize && pageNo){
                    let start: number = (pageNo - 1) * pageSize;
                    let end: number = pageNo * pageSize
                    return resolve(results.slice(start, end));
                }
                return resolve(results);
            });
        });
    }

    /**
     * 计算页数
     * @param condition 
     */
    static async getCount(condition?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!condition){
                condition = {};
            }
            UserList.UserModel.count(condition, (err, count) => {
                if(err){
                    return reject(err);
                }
                return resolve(count);
            });
        });
    }

}

export {UserList};