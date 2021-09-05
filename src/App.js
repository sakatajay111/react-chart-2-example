import { useEffect, useState, useCallback } from "react";
import * as data from './data/assignment-sample-data.json'
import { BarChart } from "./components/BarChart";
import { setBarData, getFiltredData, getValues } from './util/chart'
// import { SelectDropdown } from './components/shared'
import Select from 'react-select';
import "./App.css";

export default function App() {
  const { result, status, issueType, priority } = setBarData(data.records.slice(0))
  const [chartData, setChartData] = useState({})
  let [statusVal, setStatusFilter] = useState(null)
  let [priorityVal, setPriorityFilter] = useState(null)
  let [issueTypeVal, setIssueTypeFilter] = useState(null)
  
  const setData = useCallback((result) => {
    setChartData({
      labels: Object.keys(result),
      datasets: [
        {
          label: "Ticket Count",
          data: Object.values(result).map((val) => { return val.ticket_count }),
          backgroundColor: [
            "#50AF95"
          ]
        }
      ]
    });
  }, [])

  useEffect(() => { setData(result); }, [setData]);

  
  const setFilteredData = useCallback((value, type) => {
    switch(true) {
      case type.name === 'status':
        setStatusFilter(value)
        statusVal = value
        break;
      case type.name === 'priority':
        setPriorityFilter(value)
        priorityVal = value
        break;
      case type.name === 'issue_type':
        setIssueTypeFilter(value)
        issueTypeVal = value
        break;
      default: 
    }
    const res = getFiltredData(data.records.slice(0), getValues(statusVal), getValues(priorityVal), getValues(issueTypeVal))
    setData(res)
  })

  return (
    <div className="App">
      <div className='filters'>
        <Select
          placeholder="Filter By Status"
          options={status}
          name="status"
          selectValue={statusVal}
          onChange={setFilteredData}
          isMulti
          classNamePrefix='filter'
        />
        <Select
          placeholder="Filter By Type"
          options={issueType}
          name="issue_type"
          selectValue={issueTypeVal}
          onChange={setFilteredData}
          isMulti
          classNamePrefix='filter'
        />
        <Select
          placeholder="Filter By Priority"
          options={priority}
          name="priority"
          selectValue={priorityVal}
          onChange={setFilteredData}
          isMulti 
          classNamePrefix='filter'
        />
      </div>
      <BarChart chartData={chartData} />
    </div>
  );
}
