import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Child component that receives its data through props
function StudentInfo({ studentId, name, college }) {
  return (
    <>
      <h3>{studentId}</h3>
      <h4>{name}</h4>
      <h5>{college}</h5>
    </>
  );
}

function App() {
  // Page headings come from state
  const [title] = useState('Welcome to Fullstack Development - I');
  const [subtitle] = useState('React JS Programming Week09 Lab exercise');

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="React logo" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <StudentInfo
        studentId="101539944"
        name="Ishan Sood"
        college="George Brown College, Toronto"
      />
    </div>
  );
}

export default App;