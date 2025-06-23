import React, { useState } from 'react';
import {styled} from "styled-components";
import Input from "./components/Input";
import { MetricAnalyzed } from './types/metrics';
import { BarChart, LineChart } from '@mui/x-charts';

const AppContainer = styled.div`
  text-align: center;
  justify-content:center;
  height: fit-content;
  min-height: 100vh;
  margin: 0;
  padding: 15px;
  background-image: linear-gradient(to right, #2693cd, #3a4c83);
  color: #FFF;
`

function App() {
  const [metricsResult, setMetricsResult] = useState<MetricAnalyzed | null>(null);
  return (
    <AppContainer>
      <h2>Inga Code - test</h2>
        <Input metricsResult={metricsResult} setMetricsResult={setMetricsResult}/>        
        
        {metricsResult && 
        <BarChart 
          xAxis={[{id : 'Sensor Type',
          data: Object.keys(metricsResult)
        }]} 
        series={[{data:Object.keys(metricsResult).map(key => metricsResult[key].total)}]
        }
        height={300}
        title='Total por tipo' />}

        {metricsResult && 
        <BarChart 
          xAxis={[{id : 'Sensor Type',
          data: Object.keys(metricsResult)
        }]} 
        series={[{data:Object.keys(metricsResult).map(key => metricsResult[key].valid)}]
        }
        height={300}
        title='Total válido por tipo' />}

        {metricsResult && 
        <BarChart 
          xAxis={[{id : 'Sensor Type',
          data: Object.keys(metricsResult)
        }]} 
        series={[{data:Object.keys(metricsResult).map(key => metricsResult[key].invalid)}]
        }
        height={300}
        title='Total inválido por tipo' />}

    </AppContainer>    
  );
}

export default App;
