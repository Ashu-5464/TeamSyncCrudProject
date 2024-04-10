import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Salary = () => {
    const [salaryList, setsalaryList] = useState([]);

    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const [salaryObj, setsalaryObj] = useState({
        "salaryId": 0,
        "employeeId": 0,
        "salaryDate": "",
        "totalAdvance": 0,
        "presentDays": 0,
        "salaryAmount": 0
    });
    const[AllEmployee ,setEmployeeList]=useState([]);
    

    useEffect(()=>
{     
    getAllEmployee();
    getSalaryList();
},[])
const getSalaryList = async () => {
    const result = await axios.get(`${url}GetAllSalary`);
    setsalaryList(result.data.data);
}

const getAllEmployee=async()=>
{
    const result= await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
    setEmployeeList(result.data.data);
}
const handleChange = (event, key) => {
    setsalaryObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
}
const addSalary=async()=>
{
      const result= await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddSalary",salaryObj);
      if(result.data.result)
      {
      alert("Add salary successfully")
     getSalaryList();
      }
      else{
         alert(result.data.message)
      }
}

const onEditSalary=(salary)=>
{
      setsalaryObj(salary)
}

const updateSalary=async()=>
{
     const result= await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateSalary",salaryObj);
     if(result.data.result)
      {
      alert("UPdate salary successfully")
     getSalaryList();
      }
      else{
         alert(result.data.message)
      }
}

const onDeleteSalary=async(salaryId)=>
{
    const result= await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteSalaryById?salaryId=" +salaryId);
    if(result.data.result)
    {
    alert("Deleted salary successfully")
   getSalaryList();
    }
    else{
       alert(result.data.message)
    }
}
    return (
        <div>
            <div className='row'>
               
                <div className='col-8'>
                  <div className='card'>
                    <div className='card-header bg-warning'>
                        Salary
                        </div>
                        <table className='table table-bordered'>
                          <thead>
                            <tr>
                                <th>Sr no</th>
                                <th>Employee Name</th>
                                <th>Employee Contact no</th>
                                <th>Salary date</th>
                                <th>Present date</th>
                                <th>Salary amount</th>
                                <th>Salary advance</th>
                                <th>Action  </th>
                            </tr>
                          </thead>
                          <tbody>
                                {
                                    salaryList.map((salary, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{salary.empName}</td>
                                                <td>{salary.salaryDate.split('T')[0]}</td>
                                                <td>{salary.totalAdvance}</td>
                                                <td>{salary.presentDays}</td>
                                                <td>{salary.salaryAmount}</td>
                                                <td>{salary.totalAdvance}</td>
                                                <td>
                                                {<button className='btn btn-success m-2' onClick={()=>onEditSalary(salary)}>Edit</button>}
                                                { <button className='btn btn-danger' onClick={()=>onDeleteSalary(salary.salaryId)}>Delete</button>}
                                                </td>
                                            </tr>
                                    );
                                })}
                           </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                    <div className='card-header bg-warning'>
                         Salary Form
                    </div>
                    
                <div className='card-body'>
                   
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <label>Employee</label>
                                            <select
                                                className="form-select"
                                                value={salaryObj.employeeId}
                                                onChange={(event) => handleChange(event, 'employeeId')} >
                                                <option>Select Employee</option>
                                                {AllEmployee.map((employee) => {
                                                    return (
                                                        <option key={employee.empId} value={employee.empId}>
                                                            {employee.empName}
                                                        </option>
                                                    );
                                                })}

                                            </select>
                                        
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Salary Date</label>
                                            <input type="Date" className='form-control'
                                                value={salaryObj.salaryDate} onChange={(event) => handleChange(event, 'salaryDate')} />
                                          
                                        </div>
                                    </div>
                                    <div className='row my-2'>
                                        <div className='col-md-6'>
                                            <label>Total Advance</label>
                                            <input type="text" className='form-control' placeholder='Enter Total Advance '
                                                value={salaryObj.totalAdvance} onChange={(event) => handleChange(event, 'totalAdvance')} />
                                          
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Present Days</label>
                                            <input type="text" className='form-control' placeholder='Enter Present Days'
                                                value={salaryObj.presentDays} onChange={(event) => handleChange(event, 'presentDays')} />
                                          
                                        </div>

                                    </div>
                                    <div className="row">
                                    <div className='col-md-6'>
                                            <label>Salary Amount</label>
                                            <input type="text" className='form-control' placeholder='Enter Salary Amount'
                                                value={salaryObj.salaryAmount} onChange={(event) => handleChange(event, 'salaryAmount')} />
                                          
                                        </div>
                                <div className='card-footer pt-3'>
                                    <div className='text-center'>
                                        {
                                            salaryObj.salaryId === 0 && <button className='btn btn-sm btn-primary m-2' onClick={addSalary}>Add</button>
                                        }
                                        {
                                            salaryObj.salaryId !== 0 && <button className='btn btn-sm btn-primary m-2' onClick={updateSalary}>Update</button>
                                        }
                                        <button className='btn btn-sm btn-danger'>Cancel</button>
                                    </div>
                                </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                </div>
    </div>
    );
};

export default Salary;