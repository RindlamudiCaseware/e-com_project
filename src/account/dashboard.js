import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const chartTypes = ['pie', 'bar', 'line', 'doughnut'];

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, categories: 0, accounts: 0 });
  const chartRefs = useRef([]);
  const chartInstances = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, orderRes, categoryRes, accountRes] = await Promise.all([
          axios.get('http://localhost:1234/productapi'),
          axios.get('http://localhost:1234/orderapi'),
          axios.get('http://localhost:1234/category'),
          axios.get('http://localhost:1234/account')
        ]);
        setStats({
          products: productRes.data.length,
          orders: orderRes.data.length,
          categories: categoryRes.data.length,
          accounts: accountRes.data.length
        });
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const labels = ['Products', 'Orders', 'Categories', 'Accounts'];
    const dataValues = Object.values(stats);
    const total = dataValues.reduce((sum, val) => sum + val, 0);

    chartTypes.forEach((type, i) => {
      const ctx = chartRefs.current[i]?.getContext('2d');
      if (!ctx) return;

      if (chartInstances.current[i]) {
        chartInstances.current[i].destroy();
      }

      const commonData = {
        labels,
        datasets: [{
          data: dataValues,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(251, 180, 109, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(241, 47, 17, 0.89)',
          ],
          borderWidth: 1,
          borderColor: '#fff',
          fill: type === 'line'
        }]
      };

      const options = {
        responsive: true,
        plugins: {
          datalabels: {
            color: '#000',
            formatter: (val) => `${((val / total) * 100).toFixed(1)}%`,
            font: { weight: 'bold', size: 14 }
          },
          legend: { position: 'bottom' }
        },
        scales: type === 'bar' || type === 'line' ? { y: { beginAtZero: true } } : undefined
      };

      chartInstances.current[i] = new Chart(ctx, { type, data: commonData, options });
    });
  }, [stats]);

  return (
    <div>
      <h2 className="text-center mt-3">E-Commerce Dashboard - Charts</h2>
      <div className="container styledata-chart">
        <div className="row">
          {chartTypes.map((type, index) => (
            <div key={type} className="col-xl-3 col-lg-6 col-md-12"  style={{ marginTop: '30px' }}>
              <div className="style-card">
                <canvas
                  ref={(el) => (chartRefs.current[index] = el)}
                  width="400"
                  height="400"
                ></canvas>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;