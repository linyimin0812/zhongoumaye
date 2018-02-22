export interface User{
    username: string,
    realname: string,
    password: string,
    rawpassword: string,
    contact: {
        tel: string,
        email: string
    },
    type: Number,           // 用户类型
    createAt: Date          // 创建时间
}