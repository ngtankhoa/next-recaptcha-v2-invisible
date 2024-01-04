import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <form id='demo-form' action='?' method='POST'>
          <button class='g-recaptcha' data-sitekey='6LfDT0UpAAAAAFX3C-7xAiaeg30GYKSMLUfXmyI5' data-callback='onSubmit'>
            Submit
          </button>
          <br />
        </form>
      </div>
    </main>
  )
}

// 6LfDT0UpAAAAAFX3C-7xAiaeg30GYKSMLUfXmyI5
