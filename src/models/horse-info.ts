import {Schema, Model, Document, model} from "mongoose";
const HorseInfoSchema: Schema = new Schema({
    name: {type: String},
    title: {type: String},
    age: {type: String},
    level: {type: String},
    gender: {type: String},
    pedigree:{type: String},
    color: {type: String},
    withers: {type: String},
    price: {type: String},
    isXrayCheck: {type: String},
    isDiagnosis: {type: String},
    createAt: {type: Date, default: Date.now}
});
class Horse{
    static HorseInfoModel: Model<Document> = model("HorseInfo", HorseInfoSchema);
    /**
     * 根据类型查找马匹的信息
     * @param type 
     */
    static async findByType(type: String): Promise<any>{
        return new Promise((resolve, reject) => {
            Horse.HorseInfoModel.find({type: type}, (err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }

    /**
     * 查找所有的马匹信息
     */
    static async findAll(): Promise<any>{
        return new Promise((resolve, reject) => {
            Horse.HorseInfoModel.find((err, results) => {
                if(err){
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }

    /**
     * 进行分页查找
     * @param isPage 
     * @param pageSize 
     * @param pageNo 
     * @param lastIndex 
     */
    static async find(condition?: any, isPage?: boolean, pageSize?: number, pageNo?: number): Promise<any>{
        if(!condition){
            condition = {};
        }
        return new Promise((resolve, reject) => {
            Horse.HorseInfoModel.find(condition, (err, results) => {
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
            Horse.HorseInfoModel.count(condition, (err, count) => {
                if(err){
                    return reject(err);
                }
                return resolve(count);
            });
        });
    }
}

export {Horse}