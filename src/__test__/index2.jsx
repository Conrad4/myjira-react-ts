function Demo() {
  const [count, setCount] = useState(0);

  // setTimeout 会造成闭包问题
  useEffect(() => {
    const timer = setTimeout(() => {
      //   console.log(count);
      // setCount(count);
      setCount((v) => v + 1);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
    // 什么时候写这个？
  }, []);

  return <div>{count}</div>;
}

export default Demo;
