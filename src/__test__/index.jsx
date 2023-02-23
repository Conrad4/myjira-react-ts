import React from "react";
import { useEffect, useState } from "react";
const getUsername = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("John");
    }, 3000);
  });
};

function Demo() {
  const [count, setCount] = useState(0);

  // setTimeout 会造成闭包问题
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(count);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  // setInterval 会造成闭包问题
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Promise.then 会造成闭包问题
  useEffect(() => {
    getUsername().then(() => {
      console.log(count);
    });
  }, []);

  // useEffect 卸载函数会造成闭包问题
  useEffect(() => {
    return () => {
      console.log(count);
    };
  }, []);

  return <button onClick={() => setCount((c) => c + 1)}>click </button>;
}

export default Demo;
