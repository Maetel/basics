
import { useEffect, useState } from 'react';

export async function loadWasm(): Promise<any> {
  const wasmModule = await fetch('/main.js');
  const jsFile = await wasmModule.text();
  eval(jsFile);

  // Wait for WebAssembly module to be ready
  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const Module = window.Module;
      if (typeof Module !== 'undefined' && Module.ready) {
        clearInterval(interval);
        resolve();
      } else {
        console.log("Module not ready");
      }
    }, 100);
  });

  return Module;
}

export function addNumbers(a: number, b: number): Promise<number> {
  return loadWasm().then((Module: any) => {
    return Module.ccall('add', 'number', ['number', 'number'], [a, b]);
  });
}

export default Home;
function Home() {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const performAddition = async () => {
      const sum = await addNumbers(5, 3);
      setResult(sum);
    };

    performAddition();
  }, []);

  return (
    <div>
      <h1>WebAssembly Example</h1>
      <p>Result of 5 + 3 is: {result !== null ? result : 'Loading...'}</p>
    </div>
  );
}
