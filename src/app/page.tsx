"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import charactersData from "./data/characters.json";
import Footer from "./Footer/index";

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = second * 6;

  const hourHand = document.querySelector("#hourHand");
  const minuteHand = document.querySelector("#minuteHand");
  const secondHand = document.querySelector("#secondHand");

  if (hourHand && minuteHand && secondHand) {
    hourHand.setAttribute("transform", `rotate(${hourAngle}, 100, 100)`);
    minuteHand.setAttribute("transform", `rotate(${minuteAngle}, 100, 100)`);
    secondHand.setAttribute("transform", `rotate(${secondAngle}, 100, 100)`);
  }
}

export default function Home() {
  const title = "Next.js page";
  const [secondstate, setSecondstate] = useState<number>(0);

  const handleMouseOver = () => {
    const now = new Date();
    const second = now.getSeconds();
    setSecondstate(second);
  };

  useEffect(() => {
    // Initial call to update clock
    updateClock();

    // Update clock every second
    const intervalId = setInterval(updateClock, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId); //clearInterval(関数)止める
  }, []);

  return (
    <div>
      <div className="isolate h-screen bg-[url('/images/hexagons.svg')] bg-cover p-4">
        <Head>
          <title>{title}</title>
        </Head>
        <div className="flex flex-col items-center justify-center">
          <svg
            className="peer"
            id="clock"
            width="200"
            height="200"
            onMouseOver={handleMouseOver}
          >
            <circle
              className="face hover:stroke-pink-500"
              cx="100"
              cy="100"
              r="90"
              fill="white"
              stroke="black"
              strokeWidth="3"
            />
            {/* Harry Potterロゴ */}
            <image
              xlinkHref="/images/harry_potter_logo.svg"
              x="60"
              y="95"
              width="80"
              height="80"
            />
            {/* フクロウロゴ */}
            <image
              className="animate-myWiggle"
              xlinkHref="/images/icons8-hedwig.svg"
              x="25"
              y="20"
              width="80"
              height="80"
            />
            {/* テキストを追加 */}
            <text
              className="fill-black stroke-pink-500 stroke-1 font-serif font-bold hover:stroke-gray-500"
              x="10"
              y="15"
              fontSize="10px"
            >
              <tspan x="10" dy="1.2em">
                Hover
              </tspan>
              <tspan x="10" dy="1.2em">
                me!
              </tspan>
            </text>
            <g className="ticks" stroke="black" strokeWidth="2">
              <line x1="100" y1="10" x2="100" y2="20" />
              <line x1="100" y1="190" x2="100" y2="180" />
            </g>
            <line
              id="hourHand"
              className="hands"
              x1="100"
              y1="100"
              x2="100"
              y2="60"
              stroke="blue"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              id="minuteHand"
              className="hands"
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="green"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              id="secondHand"
              className="hands"
              x1="100"
              y1="100"
              x2="100"
              y2="20"
              stroke="red"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <g
              className="numbers"
              fill="black"
              fontFamily="sans-serif"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              stroke="none"
            >
              <text x="100" y="200">
                6
              </text>
            </g>
          </svg>
  
          <section className="invisible peer-hover:visible">
            {/* hover時の時間を固定表示 */}
            {/* <div>
               <a>{secondstate}</a>
             </div> */}
            <div className="">
              <section className="">
                <picture>
                  <Image
                    className="border border-white"
                    src={"/images/" + charactersData[secondstate].image}
                    alt={charactersData[secondstate].name}
                    width={175}
                    height={250}
                  />
                </picture>
              </section>
  
              <section className="">
                <table className="text-surface min-w-full text-left font-mono text-sm font-light">
                  <tbody>
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="px-1 py-1 font-medium text-red-600">name</td>
                      <td className="px-1 py-1 text-pink-600">
                        {charactersData[secondstate].name}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="px-1 py-1 font-medium text-red-600">
                        house
                      </td>
                      <td className="px-1 py-1 text-pink-600">
                        {charactersData[secondstate].house}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="px-1 py-1 font-medium text-red-600">
                        ancestry
                      </td>
                      <td className="px-1 py-1 text-pink-600">
                        {charactersData[secondstate].ancestry}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="px-1 py-1 font-medium text-red-600">
                        actor
                      </td>
                      <td className="px-1 py-1 text-pink-600">
                        {charactersData[secondstate].actor}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </section>
        </div>
      </div>
      <div className="text-right cursor-pointer hover:underline">
        <a target="_blank" href="https://icons8.com/icon/miGsADVMw4gL/hedwig">
          ヘドウィグ
        </a>
        アイコン by
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
      <Footer/>
    </div>
  );
}
