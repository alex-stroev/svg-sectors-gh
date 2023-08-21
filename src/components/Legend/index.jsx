import styles from "./styles.module.scss";
const Legend = ({ opts, maxInitialRadius }) => {
  const showRadius = (arg) => Math.round((arg * 100) / maxInitialRadius);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Радиус</th>
            <th>Начальный угол</th>
            <th>Конечный угол</th>
            <th>Ширина сектора</th>
          </tr>
        </thead>
        <tbody>
          {opts.map((opt, index) => (
            <tr key={opt.color}>
              <td style={{ backgroundColor: opt.color }}>
                <b>{index + 1} </b>
              </td>
              <td> {showRadius(opt.d.radius)}%</td>
              <td> {opt.d.start_angle}°</td>
              <td> {opt.d.end_angle}°</td>
              <td> {opt.d.end_angle - opt.d.start_angle}°</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Legend;
