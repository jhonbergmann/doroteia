import { useState, useEffect } from 'react'

export default function useCountDown() {
  const [resendCooldownActive, setResendCooldownActive] = useState(true)
  const [timerCount, setTimer] = useState(60)

  useEffect(() => {
    if (resendCooldownActive) {
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval)
          return lastTimerCount - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [resendCooldownActive])

  useEffect(() => {
    if (timerCount === 0) {
      setTimer(60)
      setResendCooldownActive(false)
    }
  }, [timerCount])

  return { resendCooldownActive, setResendCooldownActive, timerCount, setTimer }
}
