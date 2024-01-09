'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRef, useState, useEffect } from 'react'
import cn from 'classnames'

export default function Home() {
  const { handleSubmit, register } = useForm()
  const captRef = useRef(null)
  const [reCaptchaLoading, setReCaptchaLoading] = useState(true)
  const [prevVisibleChallengesCount, setPrevVisibleChallengesCount] = useState(0)
  // const [divColor, setDivColor] = useState('red')

  const callVerifyRecaptcha = () => {
    setReCaptchaLoading(true)
    captRef.current.execute()
  }

  const onSubmit = (data) => {
    console.log('form data: ', data)
    console.log('handle call submit api')
  }

  useEffect(() => {
    const handleDomChange = () => {
      console.log('dom change')
      const iframes = document.querySelectorAll('iframe[src*="recaptcha/api2/bframe"]')
      const containers = [...iframes].map((iframe) => iframe.parentNode.parentNode)
      console.log({ containers })
      const visibleContainersCount = containers.filter((el) => el.style.visibility === 'visible').length

      if (visibleContainersCount < prevVisibleChallengesCount) {
        setReCaptchaLoading(false)
      }

      setPrevVisibleChallengesCount(visibleContainersCount)
    }

    const domObserver = new MutationObserver(handleDomChange)
    domObserver.observe(document.body, { subtree: true, attributes: true })

    return () => {
      domObserver.disconnect()
    }
  }, [prevVisibleChallengesCount])

  return (
    <main className='min-h-screen p-6'>
      {/* <div>
        <button onClick={() => setDivColor((cur) => (cur === 'blue' ? 'red' : 'blue'))}>change div style</button>
        <div id='example-div-id' style={{ background: divColor }}>
          example div
        </div>
      </div> */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('input')} />
          <button
            type='button'
            onClick={callVerifyRecaptcha}
            disabled={reCaptchaLoading}
            className={cn('border border-black p-2', reCaptchaLoading && 'opacity-20')}
          >
            Submit button
          </button>
          <ReCAPTCHA
            size='invisible'
            ref={captRef}
            sitekey='6LdoikUpAAAAAHJim55nIAIHWaDhGJNVlDjX-zLd'
            onChange={() => {
              console.log('handle submit form here')
              handleSubmit(onSubmit)()
            }}
            onError={() => setReCaptchaLoading(false)}
            asyncScriptOnLoad={() => {
              // disable submit until asyncScript finish loading
              setReCaptchaLoading(false)
            }}
          />
        </form>
      </div>
    </main>
  )
}
