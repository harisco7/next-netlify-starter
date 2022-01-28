import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Widget } from '@typeform/embed-react/build'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { User } from '../interfaces/types'

type UserProps = {
  user: User
}

const Acknowledgement = (({ user }: UserProps) => {
  const { isLoading, error } = useUser()
  
  if (error) {
    console.log(error)
  }
  
  if (isLoading) return (
    <div>Loading...</div>
  )

  if (!isLoading && user) {
    return (
      <div className={styles.container}>
      <Head>
          <title>VIV disclaimer and acknowledgement</title>
          <meta name="description" content="We'll ask you some questions, and check you understand, and are comfortable with them." />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <Widget id="AZmkJj61" chat style={{width: "100%", height: "100%"}} hidden={{email: user.email, auth_id: user.sub}} />
      </main>
      </div>
  )
}
    
})

export default Acknowledgement

export const getServerSideProps = withPageAuthRequired();