import React, { useEffect, useState } from 'react';
import useCandidates from '../../hooks/candidateData';

const EditResultPage = () => {
const { fetchAllCandidates, fetchFilterData, deletePatient, deletePatientData, candidates } = useCandidates();

useEffect(() => {
    fetchAllCandidates();
}, []);

const [data, setData] = useState([
    {
      name: "John Doe",
      maritalStatus: "Single",
      centerCode: "001",
      age: 28,
      gender: "Male",
      category: "General",
      caste: "OBC",
      location: "New York",
      bloodGroup: "A+",
      resultStatus: "Normal",
      cardStatus: "Pending"
    },
    // Add more rows as needed
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  return (
    <div className="mx-auto mt-5 p-5 bg-white shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Screening Data</h1>
        <div className="flex items-center space-x-5">
          <button className="btn btn-primary">Filter Data</button>
          <div className="flex items-center">
            <label className="mr-2">Number of List</label>
            <input type="checkbox" className="checkbox" />
          </div>
        </div>
      </div>
      
      <table className="table-auto w-full mt-5 border-collapse">
        <thead>
          <tr className="border-b">
            <th>Select</th>
            <th>Name</th>
            <th>Marital Status</th>
            <th>Center Code</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Caste</th>
            <th>Location</th>
            <th>Blood Group</th>
            <th>Result Status</th>
            <th>Card Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
              <td className="flex items-center">
                {/* <span className="mr-2">Icon</span> */}
                <input 
                  type="text"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="input input-sm w-full"
                />
              </td>
              <td>
                <select 
                  value={row.maritalStatus}
                  onChange={(e) => handleInputChange(index, 'maritalStatus', e.target.value)}
                  className="select select-sm w-full"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </td>
              <td>
                <input 
                  type="text"
                  value={row.centerCode}
                  onChange={(e) => handleInputChange(index, 'centerCode', e.target.value)}
                  className="input input-sm w-full"
                />
              </td>
              <td>
                <input 
                  type="text"
                  value={row.age}
                  onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                  className="input input-sm w-full"
                />
              </td>
              <td>
                <select 
                  value={row.gender}
                  onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                  className="select select-sm w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </td>
              <td>
                <select 
                  value={row.category}
                  onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                  className="select select-sm w-full"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </td>
              <td>
                <select 
                  value={row.caste}
                  onChange={(e) => handleInputChange(index, 'caste', e.target.value)}
                  className="select select-sm w-full"
                >
                  <option value="OBC">OBC</option>
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </td>
              <td>
                <input 
                  type="text"
                  value={row.location}
                  onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                  className="input input-sm w-full"
                />
              </td>
              <td>
                <select 
                  value={row.bloodGroup}
                  onChange={(e) => handleInputChange(index, 'bloodGroup', e.target.value)}
                  className="select select-sm w-full"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                </select>
              </td>
              <td>
                <select 
                  value={row.resultStatus}
                  onChange={(e) => handleInputChange(index, 'resultStatus', e.target.value)}
                  className="select select-sm w-full"
                >
                  <option value="Normal">Normal</option>
                  <option value="Sickle Cell Trait">Sickle Cell Trait</option>
                </select>
              </td>
              <td>
                <select 
                  value={row.cardStatus}
                  onChange={(e) => handleInputChange(index, 'cardStatus', e.target.value)}
                  className="select select-sm w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Distributed">Distributed</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(index)} className="btn btn-error btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditResultPage;
