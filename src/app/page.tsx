"use client"; // This is a client component 👈🏽

import { useState } from 'react';
import Image from 'next/image'

import { SelectHTMLAttributes } from 'react';
import Select, {StylesConfig}  from 'react-select'; // Import the Select component from your component library
import React from 'react';
import Header from './components/Header'

const isDev = process.env.NODE_ENV === 'development';

function DevView() {
  type Option = {
    value:string;
    label:string;
  }

  interface MDSDataTableSimpleProps {
    data: Array<{
      name: string;
      price: number;
      location: string;
    }>;
  }
  

  const connectToDB :string = 'http://localhost:4000/get_db'
  const satellites = [
    {value: "satellite 1", label: "satellite 1"},
    {value: "satellite 2", label: "satellite 2"},
    {value: "satellite 3", label: "satellite 3"}

  ];

  const [rawSateliteResponse, setrawSateliteResponse] = useState<any>(null);
  const [satelliteData, setSatelliteData] = useState<{ location: string; price: number } | null>(null);

  const [selectedSatellite, setSelectedSatellite] = useState<Option | null>(null);

  const handleSatelliteChange = (event: Option | null) => {
    setSelectedSatellite(event);
  };

  const handleSubmit = async () => {
    console.log("submit");
    console.log(selectedSatellite);
    if (selectedSatellite != null) {
      fetch(connectToDB, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          satellite: selectedSatellite.value
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("this is the data");
        console.log(data);
        if (data.length > 0) {
          const price = data[0]['price'];
          const location = data[0]['location'];
    
          setSatelliteData({ price, location });
        }
    
        //setrawSateliteResponse(data);
      });
    }
  };

  return (
    <div>


      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-10">

        <label>Satellite Name  </label>
        <Select
        id = "satSelect"
        options = {satellites}
        value = {selectedSatellite}
        onChange={handleSatelliteChange}        
        />
        <button onClick={handleSubmit} className="mt-3 px-4 py-2 bg-blue-500 text-green rounded-md">
          Submit
        </button>
        </div>

        <div>
        <h1>My App</h1>
        {satelliteData ? (
        <>
          <h2>Price: {satelliteData.price}</h2>
          <h2>Location: {satelliteData.location}</h2>
        </>
        ) : (
        <p>Loading satellite data...</p>
        )}
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </div>
  )
}
export default function Home() {

  
  

  return (
    <>
    <Header />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      

      <div className="grid justify-items-center flex flex-col before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <div>
          <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/starlink-2621.svg"
          alt="Satelitedx logo"
          width={180}
          height={37}
          priority
        />
        </div>
        <div className='py-6 mb-2 text-6xl font-bold text-white- font-sans'>SatelliteDX </div>
        <div className='italic text-2xl font-semibold text-grey-400 font-sans'>shop a satellite with us </div>
      </div>

      

      { isDev && <DevView /> }

    </main>
    </>
  )
}
