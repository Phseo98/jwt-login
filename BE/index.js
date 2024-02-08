const express = require('express');
const dotenv = require('dotenv'); // 환경변수 관리 모듈
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
    mypage } = require('./controller');

const app = express();
dotenv.config();

// 기본설정
// cors설정은 서로 다른 도메인끼리 통신 할 수 있도록 해줌
// 브라우저는 하나의 서버 연결만 허용하도록 되어있음(주로자신서버)
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true // 서로다른 도메인에서 쿠키사용 여부 설정
}));

app.post('/login', login);
app.get('/accesstoken', accessToken);
app.get('/refreshtoken', refreshToken);
app.get('/login/success', loginSuccess);
app.post('/logout', logout);
app.get('/mypage', mypage)

app.listen(process.env.PORT, () => {
    console.log(`server is on ${process.env.PORT}`)
}) // app에 포트연결