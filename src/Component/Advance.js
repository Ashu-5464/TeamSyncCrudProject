import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Advance = () => {
    const [advanceList,setadvanceList]=useState([]);
    const [employeeList, setEmployeeList] = useState([]);
   
    useEffect(()=>
{
    getAllAdvance();
    getAllEmployee();
    updateAdvance();
},[]);

const getAllAdvance=async()=>
{
         const result= await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance");
         setadvanceList(result.data.data);
}

const getAllEmployee=async()=>
{
    const result= await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
    setEmployeeList(result.data.data);
}
 const[advanceObj,setadvanceObj]=useState(
        {
            empName: "",
            empContactNo: "",
            employeeId: 0,
            advanceDate: "",
            advanceAmount: 0,
            advanceId: 0,
            reason: ""
        }
    )
    const handleChange=(event,key)=>
{
    setadvanceObj((prevObj)=>({...prevObj,[key]:event.target.value}));
}
const Addemp = async () => {
    debugger;
    const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAdvance",advanceObj);
    debugger;
    if (result.data.result) {
        alert('creted success');
        getAllAdvance();
    }
    else {
        alert(result.data.message);
    }

}
const onEdit=(advance)=>{
    setadvanceObj(advance);
}

const updateAdvance=async()=>
{ debugger;
    const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance",advanceObj);
    debugger;
    if (result.data.result) {
        alert('Updated success');
        getAllAdvance();
    }
    else {
        alert(result.data.message);
    }

}
const onDelete=async(advanceId)=>
{
    const result=await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAdvanceById?advanceId="+ advanceId)
    debugger;
    if (result.data.result) {
        alert('deleted success');
    }
    else {
        alert(result.data.message);
    }

}
    return (
        <div>
            <div className='row mt-3'>
                <div className='col-8'>
                 <div className='card'>
                    <div className='card header bg-warning'>
                        Advance List
                       </div>
                       
                        <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr no</th>
                                        <th>Emp name</th>
                                        <th>Emp contactno</th>
                                        <th>Advance Date</th>
                                        <th>Advance amount</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       advanceList.map((advance,index)=>
                                    {
                                        return(<tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{advance.empName}</td>
                                            <td>{advance.empContactNo}</td>
                                            <td>{advance.advanceDate}</td>
                                            <td>{advance.advanceAmount}</td>
                                            <td>{advance.reason}</td>
                                            <td>
                                                <button className='btn btn-sm btn-success m-2'onClick={()=>onEdit(advance)}>Edit</button>
                                                <button className='btn btn-sm btn-danger' onClick={()=>onDelete(advance.advanceId)}>Delete</button>
                                            </td>
                                        </tr>)
                                    })
                                    }
                                </tbody>
                                </table>
                
                
                 </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-warning'>
                            Attendance
                        </div>
                        <div className='body'>
                   <div className='row'>
                    <div className='col-6'>
                    <label>Emp Name</label>
                                    <select name="employeeId" id="" value={advanceObj.employeeId} onChange={(event)=>handleChange(event,'employeeId')} className='form-select'>
                                        {
                                          employeeList.map((employee) => {
                                                return (
                                                    <option value={employee.empId}>{employee.empName}</option>
                                                )
                                            })
                                        }
                                    </select>

                         </div>
                         <div className='col-6'>
                            <label> Emp Contact no</label>
                            <input type='text' className='form-control' placeholder='Enter Contact no'
                            value={advanceObj.empContactNo} name='empContactNo' onChange={(event)=>handleChange(event,'empContactNo')}/>
                         </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                          <label>Advance Date</label>
                          <input type='Date' name='advanceDate' value={advanceObj.advanceDate}  className='form-control'
                          onChange={(event)=>handleChange(event,'advanceDate')}/>
                        </div>
                        <div className='col-6'>
                         <label>Advance Amount</label>
                         <input type='text' placeholder='Enter Amount' className='form-control'name='advanceAmount'
                         value={advanceObj.advanceAmount} onChange={(event)=>handleChange(event,'advanceAmount')}/>
                        </div>
                    </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Reason</label>
                                    <input type="text" value={advanceObj.reason} onChange={(event) => handleChange(event, 'reason')} name="reason"
                                     className='form-control' placeholder='Enter Reason' />
                                </div>
                            </div>
                            <div className='card-footer mt-3'>
                            <div className='text-center'>
                                {
                                    advanceObj.advanceId === 0 && <button className='btn btn-sm btn-primary m-2'onClick={Addemp}>Add</button>
                                }
                                 {
                                    advanceObj.advanceId !== 0 && <button className='btn btn-sm btn-primary m-2' onClick={updateAdvance}>Update</button>
                                }
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

export default Advance;