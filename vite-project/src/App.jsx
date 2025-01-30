import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Form from './FormComponents'
import ThankYourPage from './ThankYourPage'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [userInfo, setUserInfo] = useState({ phone: '', name: '' })
  const [isReq, setReq] = useState(JSON.parse(localStorage.getItem("test")))
  const navigate = useNavigate()
 
 
  const handleFormSubmit = (phone, name) => {
  const phoneUser = parseFloat(phone)
    setUserInfo({ phone: phoneUser, name });
    responseData(phoneUser, name);
  }

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("test"))
    setReq(local)
  }, [])

  const resClear = () => {
    localStorage.setItem("test", JSON.stringify(false))
    setReq(false)
  }

  const responseData = async (phone, name) => {
    const requestBody = {
      stream_code: 'vv4uf',
      client: {
        phone: phone,
        name: name,
      },
    }

    try {
      const response = await fetch("https://order.drcash.sh/v1/order", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer RLPUUOQAMIKSAB2PSGUECA',
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      console.log(data)
      navigate('/thank-you')
      localStorage.setItem("test",JSON.stringify(true))
      setReq(true)
      return data
    } catch (error) {
      console.error('Ошибка запроса:', error)
    }
  }


  return (
    <>
    <Routes>
      <Route path="/" element={
        <>
          <Header />
          {isReq ? (
            <div>
              <h2>Вы уже оставили заявку!</h2>
              <button onClick={resClear}>Отправить повторно</button>
            </div>
          ) : (
            <Form userInfo={handleFormSubmit} />
          )}
        </>
      } />
      <Route path="/thank-you" element={<ThankYourPage />} />
    </Routes>
    </>
  )
}

export default App
