
const Circle = ({ por }) => {
  const radius = 45.5; // radius of the circle
  const circumference = 2 * Math.PI * radius; // circumference of the circle

  // Calculate the stroke dash offset based on the percentage
  const strokeDashoffset = circumference - (por / 100) * circumference;

  const strokeColorf = () => {
    if (por <= 50) return 'red';
    if (por <= 70) return 'yellow';
    if (por < 100) return 'green';
    return null;
  };

  const strokeColor = strokeColorf()

  return (
    <svg className="CircularProgressbar" viewBox="0 0 100 100" data-test-id="CircularProgressbar">
      <circle
        className="CircularProgressbar-background"
        cx="50"
        cy="50"
        r="50"
        style={{ fill: 'black' }}
      />
      <path
        className="CircularProgressbar-trail"
        d="
          M 50,50
          m 0,-45.5
          a 45.5,45.5 0 1 1 0,91
          a 45.5,45.5 0 1 1 0,-91
        "
        strokeWidth="7"
        fillOpacity="0"
        style={{
          stroke: 'rgba(19, 206, 102, 0.3)',
          strokeDasharray: `${circumference}px ${circumference}px`,
          strokeDashoffset: '0px',
        }}
      />
      <path
        className="CircularProgressbar-path"
        d="
          M 50,50
          m 0,-45.5
          a 45.5,45.5 0 1 1 0,91
          a 45.5,45.5 0 1 1 0,-91
        "
        strokeWidth="7"
        fillOpacity="0"
        style={{
          stroke: strokeColor,
          strokeDasharray: `${circumference}px ${circumference}px`,
          strokeDashoffset: `${strokeDashoffset}px`,
          transition: 'stroke-dashoffset 0.35s', // smooth transition
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
      <text
        className="CircularProgressbar-text"
        x="50"
        y="50"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ fill: 'white', fontSize: '28px' }}
      >
        {por}%
      </text>
    </svg>
  );
};

export default Circle;
