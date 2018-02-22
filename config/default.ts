const config = {
                    "database": {
                        "mongodb": "mongodb://localhost:27017/myblog"
                    },
                    "session":{
                        "secret": "!@#$%^&*adsf",
                        "resave": true,
                        "saveUninitialized": true
                    },
                    "port": 8080
                }
export{config}