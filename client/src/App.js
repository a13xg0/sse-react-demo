import React, { useState, useEffect } from 'react';
import "react-table/react-table.css";
import ReactTable from "react-table";
import {getInitialFlightData} from "./DataProvider";

function App() {
    const [data, setData] = useState(getInitialFlightData());

    const eventSource = new EventSource("api/events");
    const eventSourceOther = new EventSource("api/eventsOther");

    const updateFlightState = (flightState) => {
        let newData = data.map(item => {
            if (item.flight === flightState.flight) {
                item.state = flightState.state;
            }
            return item;
        });

        setData(newData);
    };

    useEffect(() => {
        eventSource.onmessage = e =>
            updateFlightState(JSON.parse(e.data));

        eventSourceOther.onmessage = e =>
            updateFlightState(JSON.parse(e.data));
    }, []);



    const columns = [
        {
            Header: "Origin",
            accessor: "origin"
        },
        {
            Header: "Flight",
            accessor: "flight"
        },
        {
            Header: "Arrival",
            accessor: "arrival"
        },
        {
            Header: "State",
            accessor: "state"
        }
    ];



    return (
    <div className="App">
        <ReactTable data={data} columns={columns} />
    </div>
    );
}

export default App;
