import React, { useState } from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title  } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title );

export default function ExpenseChart({ expensesMap, expensesList }) {

    const [ selectedCategory, setSelectedCategory ] = useState('All');
    const chartRef = React.useRef(null);

        const data = {
        labels: Object.keys(expensesMap),
        datasets: [
            {
                data: Object.values(expensesMap),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",   // Soft Red
                    "rgba(54, 162, 235, 0.7)",   // Soft Blue
                    "rgba(255, 206, 86, 0.7)",   // Soft Yellow
                    "rgba(75, 192, 192, 0.7)",   // Aqua Green
                    "rgba(153, 102, 255, 0.7)",  // Lavender Purple
                    "rgba(255, 159, 64, 0.7)",   // Orange
                    "rgba(99, 255, 189, 0.7)",   // Mint Green
                    "rgba(255, 145, 164, 0.7)",  // Pink
                    "rgba(140, 140, 140, 0.7)",  // Gray
                    "rgba(60, 179, 113, 0.7)"    // Medium Sea Green
                ],
                borderWidhth: 1
            }
        ]
    };

    const options = {
        responsive : true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        plugins: {
            title: {
                display: true,
                text: 'Expenses Breakdown',
                font: {
                    size: 20,
                    weight: 'bold'
                },
                color: 'black',
                padding: { top: 10, bottom: 20 }
            }
        }
};


    const handleSliceClick = (event) => {

        const chart = chartRef?.current;
        
        if (!chart) return;

        const evt = event?.native ?? event;

        const elems = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);

        if (!elems?.length) {
            return;
        } else {
              const index = elems[0].index;
              setSelectedCategory(Object.keys(expensesMap)[index]);
        }
    }

    return (
        <div style={{ display: "flex", gap: "50px", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
            <div style={{ width: "400px", height: "400px" }}>
                <Pie ref = {chartRef} data={data}
                options={options}
                onClick={handleSliceClick}
                />
            </div>
            { 
            expensesList && expensesList?.length && <div>
                <table style={{width: "300px"}}>
                    <thead>
                        <tr>
                            <th style={{backgroundColor: '#edeef2', color: 'black'}}>Selected Category:</th>
                            <th style={{backgroundColor: '#edeef2', color: 'black'}}>
                                <select style = {{height: '35px', borderRadius: '4px'}} 
                                    value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
                                    <option key='All' value='All'>All</option>
                                    {
                                        Object.keys(expensesMap).map((category) => (
                                            <option 
                                                key={category}
                                                value={category}>{category}</option>
                                        ))
                                    }
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th style={{backgroundColor: '#edeef2', color: 'black'}}>Total Amount:</th>
                            <th style={{backgroundColor: '#edeef2', color: 'black'}}>{
                                expensesList
                                .filter(
                                    (expense) => (expense.category.value === selectedCategory || selectedCategory === 'All')
                                ).map((expense) => (expense.amount
                                )).reduce((acc, curr) => acc + curr, 0)
                                } INR</th>
                        </tr>
                        <tr>
                            <th colSpan={2} style={{ height: "2px", backgroundColor: "white" }}></th>
                            </tr>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            
                            expensesList
                                .filter(
                                    (expense) => (expense.category.value === selectedCategory || selectedCategory === 'All')
                                ).map((expense) => (<tr key={expense.id}>
                                    <td>{expense.category.value}</td>
                                    <td>{expense.amount}</td>
                                </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div> }
        </div>
    );
}