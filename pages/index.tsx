import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { fetchUsers } from '../src/stores/actions'

export type props = {
  data: any,
  err: string
}

const IndexPage = ({data, err }: props) => {
  const getUsers = useSelector(({getUsers}: any) => getUsers.data)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!getUsers) dispatch(fetchUsers());
  }, [getUsers])
  
  if (err) return <h1>Api Error something !</h1>
  console.log('>> ', data);
  return <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello 👋 {data?.login}</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <ul>
      {
        getUsers && getUsers.map((item: any,key: number) => 
          <li key={key}>{item.login}</li>
        )
      }
    </ul>
  </Layout>
}

export const getStaticProps = async () => {
  const res = await fetch('https://api.github.com/users/lllllllll')
  if (res.status === 200) return { props: { data: await res.json() }}
  if (res.status === 404) return { props: { err: 'Error' }}

  throw new Error(`Fetch for the embedded tweets of data failed with code: ${res.status}`);
};

export default IndexPage
