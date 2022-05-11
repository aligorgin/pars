import type {NextPage} from 'next'
import Head from 'next/head'
import Equation from "../algorithms/Equation";
import App from "../App/App";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>js-land</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <App/>
        </div>
    )
}

export default Home
