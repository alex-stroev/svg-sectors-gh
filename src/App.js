import React, { useState, useLayoutEffect, useMemo } from "react";
import styles from "./App.module.scss";
import Path from "./components/Path";
import Legend from "./components/Legend";

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a === b) return 0;
  if (a < b) return -1;
}

function useWindowSize() {
  const [size, setSize] = useState([0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function App() {
  const [value, setValue] = useState(0);
  const width = useWindowSize();

  ////////////////////////////////

  const kernelSizePadding = 24;

  const initialSize = 400;
  const svgSize =
    width > initialSize + kernelSizePadding * 2
      ? initialSize
      : width - kernelSizePadding * 2;

  const viewBox = `0 0 ${svgSize} ${svgSize}`;

  const colors = [
    "#f2c94c",
    "#eb5757",
    "#f2994a",
    "#6fcf97",
    "#9b51e0",
    "#2f80ed",
    "#56ccf2",
    "#219653",
  ];

  const q = useMemo(() => randomInteger(1, colors.length), [value]);

  const createOptions = () => {
    ///////////////////////////////////////////////
    // Предварительно (потому что нам понадобится MAX) генерируем случайные радиусы
    ///////////////////////////////////////////////
    const initialRadiuses = [];

    for (let i = 0; i < q; i++) {
      initialRadiuses.push(randomInteger(25, 100));
    }

    const maxInitialRadius = Math.max.apply(Math, initialRadiuses);

    ///////////////////////////////////////////////
    // Генерируем случайные углы (через Set во избежание дублей)
    ///////////////////////////////////////////////
    const anglesSet = new Set();

    // Проверку на q делать не будем - пустой так пустой
    while (anglesSet.size < q - 1) {
      anglesSet.add(randomInteger(1, 35) * 10); // для красоты делаем углы кратными 10
    }

    const angles = [...anglesSet].sort(compareNumeric);
    angles.push(360);
    angles.unshift(0);

    ///////////////////////////////////////////////
    // Генерируем объект для paths
    ///////////////////////////////////////////////
    const opts = [];
    const test = [];

    for (let i = 0; i < q; i++) {
      let opt = {};
      opt.color = colors[i];
      opt.d = {};
      opt.d.radius = initialRadiuses[i];
      opt.d.start_angle = angles[i];
      opt.d.end_angle = angles[i + 1];
      opts.push(opt);

      test.push(((svgSize / 2) * initialRadiuses[i]) / maxInitialRadius);
    }

    return [opts, maxInitialRadius];
  };

  const [opts, maxInitialRadius] = useMemo(() => createOptions(), [value]);

  return (
    <div className={styles.app}>
      <div className={styles.kernel}>
        <div
          className={styles.container}
          style={{ maxWidth: initialSize + "px" }}
          onClick={() => setValue(value + 1)}
        >
          {svgSize > 0 && (
            <svg
              viewBox={viewBox}
              width={svgSize}
              height={svgSize}
              style={{ backgroundColor: "transparent" }}
            >
              {q === 1 ? (
                <circle
                  cx={svgSize / 2}
                  cy={svgSize / 2}
                  fill={colors[0]}
                  r={svgSize / 2}
                />
              ) : (
                opts.map((opt) => (
                  <Path
                    fill={opt.color}
                    key={opt.color}
                    d={opt.d}
                    svgSize={svgSize}
                    maxInitialRadius={maxInitialRadius}
                  />
                ))
              )}

              <circle
                cx={svgSize / 2}
                cy={svgSize / 2}
                fill="#1E1E1E"
                r={(66 * svgSize) / 400 / 2}
              />
            </svg>
          )}
        </div>
        <Legend opts={opts} maxInitialRadius={maxInitialRadius} />
      </div>
    </div>
  );
}

export default App;
