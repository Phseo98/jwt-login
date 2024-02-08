import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Mypage() {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = () => {
    axios({
      url: "http://localhost:8140/mypage",
      method: "GET",
      withCredentials: true
    }).then((result) => {
      if (result.status === 200) {
        console.log(result)
        setUserInfo(result.data);
        setLoading(false);
      }
    }).catch((error) => console.log(error));
  }

  useEffect(() => {
    // Mypage API 불러옴
    // useEffect 내에서 비동기 작업 수행 시 완료전에 렌더링 될수 있어서  jsx undefinded처리 or loading처리
    getUsers();
  }, [])

  return (
    <div>
      {loading ? <h2>Loading...</h2> :
        <div>
          {userInfo.map((value, index) => (
            <ul key={index}>
              <li>{value.id}</li>
              <li>{value.username}</li>
            </ul>
          ))}
        </div>}
    </div>
  )
}

export default Mypage
