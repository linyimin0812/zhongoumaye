export interface User{
    username: String,
    realname: String,
    password: String,
    rawpassword: String,
    contact: {
        tel: String,
        email: String
    }
    type: Number                // 用户类型
}