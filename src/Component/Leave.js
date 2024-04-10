import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Leave = () => {
    const[leavesList,setleavesList]=useState([]);
     const[leaveObj,setleaveObj]=useState({
        leaveId: 0,
        employeeId: 0,
        leaveDate: '',
        leaveReason: '',
        noOfFullDayLeaves: 0,
        noOfHalfDayLeaves: 0,
     })

     const [employeeList,setEmployeeList]=useState([]);
     useEffect(()=>
    {
        getAllLeaves();
        getAllEmployee();
    
    },[]);
    const getAllLeaves=async()=>
    {
          const result=await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeavesByEmpId");
          setleavesList(result.data.data);
        }  
     
        const getAllEmployee=async()=>
        {
            const result= await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
            setEmployeeList(result.data.data);
        }
   const handleChange=(event,key)=>
   {
    setleaveObj((prevObj)=>({...prevObj,[key]:event.target.value}));
   }
   const Addleave = async () => {

    try {
        debugger;
        const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddLeave", leaveObj);
        debugger;
        console.log(result); // Log the result object to inspect its contents
        if (result.data.result) {
            alert('Data added successfully');
            getAllLeaves();
        } else {
            alert(result.data.message);
        }
    } catch (error) {
        console.error("Error occurred:", error);
        alert("An error occurred while adding data. Please try again later.");
    }
}


const onEdit=(leave)=>
{
    const formattedDate = leave. leaveDate.split('T')[0];
    setleaveObj({ ...leave, leaveDate: formattedDate });
}
const updateLeave=async()=>
{
    const result=await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeave",leaveObj);
    debugger;
    if (result.data.result) {
        alert('Updated success');
        getAllLeaves();
    }
    else {
        alert(result.data.message);
    }

}
const deleteLeave=async(leaveId)=>
{
    const result= await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteLeaveById?leaveId=" +leaveId);
    debugger;
    if(result.data.result)
    {
        alert("deleted successfully")
        getAllLeaves();
    }
    else{
        alert(result.data.message);
    }
}
    return (
        <div>
             <div className='row '>
                <div className='col-8'>
                 <div className='card'>
                    <div className='card header bg-warning'>
                    Leave List
                    </div>
                        
                        <table className='table table-bordered mt-4'>
                        <thead>
                        <tr>
                            <th style={{backgroundColor:'green'}}>Sr no</th>
                            <th style={{backgroundColor:'green'}}>Leaves Date</th>
                            <th style={{backgroundColor:'green'}}>Leaves Reason</th>
                            <th style={{backgroundColor:'green'}}>No of Full DayLeaves</th>
                            <th style={{backgroundColor:'green'}}>No of Half DayLeaves</th>
                            <th style={{backgroundColor:'green'}}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                         {
                            leavesList.map((leave,index)=>
                            {
                                return(<tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{leave.leaveDate.split('T')[0]}</td>
                                    <td>{leave.leaveReason}</td>
                                    <td>{leave.noOfFullDayLeaves}</td>
                                    <td>{leave.noOfHalfDayLeaves}</td>
                                    <td>{<button className='btn btn-success m-2' onClick={()=>onEdit(leave)}>Edit</button>}
                                   { <button className='btn btn-danger' onClick={()=>deleteLeave(leave.leaveId)}>Delete</button>}
                                    </td>
                                </tr>)
                            }
                        )
                         }
                      </tbody>
                      </table>
                    </div>
                   </div>
                
            
                <div className='col-4'>
                  <div className='card'>
                    <div className='card-header bg-warning'>
                        Leave
                    </div>
                    <div className='body'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Employee name</label>
                                <select name='ememployeeId' value={leaveObj.employeeId} onChange={(event)=>handleChange(event,'employeeId')}
                                className='form-select' >
                                      <option>Select Employee</option>
                                    {
                                      employeeList.map((employee)=>
                                    {
                                        return(<option key={employee.empId} value={employee.empId}>{employee.empName}</option>)
                                    })
                                    }
                                     
                                </select>
                            </div>
                            <div className='col-6'>
                                <label>Leave Date</label>
                                <input type='Date' className='form-control' value={leaveObj.leaveDate}
                                 onChange={(event)=>handleChange(event,'leaveDate')}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                             <label>Leave Reason</label>
                             <input type='text' className='form-control' value={leaveObj.leaveReason}
                              onChange={(event)=>handleChange(event,'leaveReason')}/>
                            </div>
                            <div className='col-6'>
                             <label>No of Full Day Leave</label>
                             <input type='text' className='form-control' value={leaveObj.noOfFullDayLeaves}
                              onChange={(event)=>handleChange(event,'noOfFullDayLeaves')}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                            <label>No of Half Days leaves</label> 
                            <input type='text' className='form-control' value={leaveObj.noOfHalfDayLeaves}
                             onChange={(event)=>handleChange(event,'noOfHalfDayLeaves')}/>
                            </div>
                        </div>
                        <div className='card-footer mt-3'>
                                <div className='text-center'>
                                
                                     <button className='btn btn-sm btn-primary m-2'onClick={ Addleave} >Add</button>
                                    
                                
                                     <button className='btn btn-sm btn-primary m-2' onClick={updateLeave}>Update</button>
                                  
                                    <button className='btn btn-sm btn-danger'>Cancel</button>
                                </div>
                            </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default Leave;