const userDatabase = require("../Database.js");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    const { email, password } = req.body;
    const userInfo = userDatabase.filter(item => {
        return item.email == email
    })[0];

    if (!userInfo) {
        res.status(403).json("Not Authorized");
    }
    else {
        try {
            // accessToken 발급
            const accessToken = jwt.sign({
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email
            }, process.env.ACCESS_SECRET, {
                expiresIn: '1m',        // 시간
                issuer: 'About Tech'    // 발행자
            })
            // refreshToken 발급
            const refreshToken = jwt.sign({
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email
            }, process.env.REFRESH_SECRET, {
                expiresIn: '1h',        // 시간
                issuer: 'About Tech'    // 발행자
            })

            // token 전송
            res.cookie("accessToken", accessToken, {
                secure: false,   // true: htpps가 아닌 통신에서는 쿠키 전송 불가
                httpOnly: true  // js,http 어디서 접근 가능할지 지정  true: js로 접근불가
            })

            res.cookie("refreshToken", refreshToken, {
                secure: false,   // true: htpps가 아닌 통신에서는 쿠키 전송 불가
                httpOnly: true  // js,http 어디서 접근 가능할지 지정  true: js로 접근불가
            })

            res.status(200).json("login success");

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

}

const accessToken = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET); // 토큰 디코딩

        const userData = userDatabase.filter(item => {
            return item.email == data.email;
        })[0];

        const { password, ...rest } = userData;   // 구조분해할당 password를 제외한 나머지 rest 할당

        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json(error);
    }
}

const refreshToken = (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRESH_SECRET);

        const userData = userDatabase.filter(item => {
            return item.email == data.email;
        })[0];

        // accessToken 재발급
        const accessToken = jwt.sign({
            id: userData.id,
            username: userData.username,
            email: userData.email
        }, process.env.ACCESS_SECRET, {
            expiresIn: '1m',        // 시간
            issuer: 'About Tech'    // 발행자
        })

        res.cookie("accessToken", accessToken, {
            secure: false,   // true: htpps가 아닌 통신에서는 쿠키 전송 불가
            httpOnly: true  // js,http 어디서 접근 가능할지 지정  true: js로 접근불가
        })

        res.status(200).json("Access Token ReCreated")
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginSuccess = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userData = userDatabase.filter(item => {
            return item.email == data.email;
        })[0];

        if (!userData) {
            res.status(403).json("Not Authorized")
        }
        else {
            res.status(200).json(userData);
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const logout = (req, res) => {
    try {
        res.cookie('accessToken', '');
        res.status(200).json("Logout Success");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout
}