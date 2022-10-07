import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { Formik, Field, Form } from 'formik';
import React from 'react';
import { useForm } from 'react-hook-form';


export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  return (
    <div className={styles.container}>
      <Head>
        <title>TravElephant</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
     
      <br></br>
      <br></br>
        <div className="relative m-20">
        <h1 className="text-purple-600 font-semibold px-3 py-2 text-3xl hover:font-black text-center">Plan your next trip</h1>
        <br></br>
        <Formik
                  initialValues={{
                      username: '',
                      password: '',
                  }}
      
                  onSubmit={() => {
      
                  }}
              >
                  <Form className='border-solid border-2 p-3 text-center'>
                    <label>From: </label>
                      <Field id="departure" name="departure" placeholder="Departure" />
                      <label>To: </label>
                      <Field type="text" id="destination" name="password" placeholder="Destination" />
                      <button type="submit" className='color-purple-600'>Search Bus Lines</button>
                  </Form>
              </Formik>
      </div>
    </div>
  )
}
