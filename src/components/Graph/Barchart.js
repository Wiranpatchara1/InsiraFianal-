import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export default class Barchart extends React.Component {
    render() {
        const {data, name, value,color} = this.props;
        return (
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={name} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={value} fill={color} />
            </BarChart>
        );
    }
}
