import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const LoyerChart = ({ users }) => {
  if (users.length === 0) return null;

  const totalLoyer = users.reduce((acc, user) => acc + user.loyer, 0);
  const minLoyer = Math.min(...users.map(user => user.loyer));
  const maxLoyer = Math.max(...users.map(user => user.loyer));

  const data = [
    { name: 'Total loyers', value: totalLoyer },
    { name: 'Loyer minimum', value: minLoyer },
    { name: 'Loyer maximum', value: maxLoyer },
  ];

  return (
    <div
      style={{
        margin: '3rem auto',
        padding: '2rem',
        maxWidth: '600px',
        backgroundColor: '#2c2c3a',
        borderRadius: '20px',
        color: '#fff',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
      }}
    >
      <h2 style={{ marginBottom: '1.5rem' }}>Visualisation des loyers</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoyerChart;
