import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout"
import {useEffect, useState} from "react";

export default function Contact() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    (
        async () => {
            try {
                const response = await fetch('http://localhost:5196/user', {
                    credentials: 'include',
                });

                const content = await response.json();
                console.log(content);
                setAuth(true);
            } catch (e) {
                setAuth(false);
            }
        }
    )();
});
  return (
    <Layout auth={auth}>
      <h1>Contact</h1>

      
    </Layout>
  )
}
