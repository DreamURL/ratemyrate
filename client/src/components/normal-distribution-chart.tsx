import { useEffect, useRef } from "react";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend, ChartConfiguration, LineController } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend, LineController);

interface NormalDistributionChartProps {
  userScore: number;
  percentile: number;
}

export default function NormalDistributionChart({ userScore, percentile }: NormalDistributionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Generate normal distribution data
    const generateNormalDistribution = (mean: number, stdDev: number, points: number) => {
      const data = [];
      const labels = [];
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * 100;
        const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
                  Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
        data.push(y);
        labels.push(x);
      }
      return { data, labels };
    };

    const { data: normalData, labels } = generateNormalDistribution(75, 15, 100);
    
    // Create gradient for the area under curve
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

    // Find user position in the data
    const userIndex = Math.round(userScore);
    const userHighlight = normalData.map((_, index) => 
      index <= userIndex ? normalData[index] : null
    );

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: labels.map(x => Math.round(x).toString()),
        datasets: [
          {
            label: 'Population Distribution',
            data: normalData,
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: 'Your Position',
            data: userHighlight,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Score',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frequency',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 8,
            padding: 12,
            callbacks: {
              title: function(context) {
                return `Score: ${context[0].label}`;
              },
              label: function(context) {
                if (context.datasetIndex === 1) {
                  return `Your percentile: ${percentile}%`;
                }
                return '';
              }
            }
          }
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 4
          }
        }
      }
    };

    chartRef.current = new Chart(ctx, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [userScore, percentile]);

  return (
    <div className="relative w-full h-64">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width="400"
        height="256"
      />
    </div>
  );
}