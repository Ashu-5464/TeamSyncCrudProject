import React, { useState ,useEffect} from 'react';
import axios from 'axios';
const Attendance = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [attendanceObj, setAttendanceObj] = useState({
        attendanceId: 0,
        employeeId: 0,
        attendanceDate: "",
        inTime: "",
        outTime: "",
        isFullDay: false,
    });
    
    const [show, setShow] = useState(false);

  const getAttendanceList=async()=>
  {
       const result=await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendance");
       setAttendanceList(result.data.data);
  }
  useEffect(() => {
    getAttendanceList();
    getAllEmployee ();
    updateAttendance();
}, []);

const handleChange = (event, key) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setAttendanceObj((prevObj) => ({ ...prevObj, [key]: value }));
};


const getAllEmployee = async () => {
    const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee");
    setEmployeeList(result.data.data);
};

const saveAttendance= async()=>
{
    try
    {
      const result= await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAttendance",attendanceObj);
      if(result.data.data)
      {
        alert('data save successfully')
        setAttendanceObj({
            attendanceId: 0,
            employeeId: 0,
            attendanceDate: Date(),
            inTime: "",
            outTime: "",
            isFullDay: false,
        });
        getAttendanceList();

      }
      else {
        alert(result.data.message);
    }
} catch (error) {
    console.error('Error occurred while saving attendance:', error);
}
setShow(false);
};

const editAttendance=async(attendance)=>
{
    const formattedDate = attendance. attendanceDate.split('T')[0];
    setAttendanceObj({ ...attendance, attendanceDate: formattedDate });

}

const updateAttendance = async () => {
    try {
        const result = await axios.post("https://onlinetestapi.gerasim.in/api/TeamSync/UpdateAttendance", attendanceObj); // Send attendanceObj with the request
        if (result.data.data) {
            alert('Data saved successfully');
            setAttendanceObj({
                attendanceId: 0,
                employeeId: 0,
                attendanceDate: Date(),
                inTime: "",
                outTime: "",
                isFullDay: false,
            });
            getAttendanceList();
        } else {
            alert(result.data.message);
        }
    } catch (error) {
        console.error('Error occurred while updating attendance:', error);
    }
    setShow(false);
};

const deleteAttendance = async (attendanceId) => {
    try {
        const result = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById?attendanceId=" + attendanceId);
        if (result.data.data) {
            alert('Attendance deleted successfully');
            getAttendanceList();
        } else {
            alert(result.data.message);
        }
    } catch (error) {
        console.error('Error occurred while deleting attendance:', error);
    }
    setShow(false);
};

    return (
        <div>
        <div className='row mt-3'>
            
            <div className='col-8'>
                <div className='card'>
                    <div className='card-heading bg-warning'>
                        Attendance List
                    </div>
                    <div className='card-body'>
                        
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th style={{backgroundColor:'green'}}>Sr.No</th>
                                        <th style={{backgroundColor:'green'}}>Employee</th>
                                        <th style={{backgroundColor:'green'}}>Contact No.</th>
                                        <th style={{backgroundColor:'green'}}>Attendance Date</th>
                                        <th style={{backgroundColor:'green'}}>In Time</th>
                                        <th style={{backgroundColor:'green'}}>Out Time</th>
                                        <th style={{backgroundColor:'green'}}>Is FullDay</th>
                                        <th style={{backgroundColor:'green'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceList.map((attendance,index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{attendance.empName}</td>
                                            <td>{attendance.empContactNo}</td>
                                            <td>{attendance.attendanceDate.split('T')[0]}</td>
                                            <td>{attendance.inTime.split('T')[0]}</td>
                                            <td>{attendance.outTime.split('T')[0]}</td>
                                            <td>{attendance.isFullDay ? 'Yes' : 'No'}</td>
                                            <td>
                                        <button className="btn btn-sm btn-success m-2" onClick={() => editAttendance(attendance)}> Edit </button>
                                         <button className="btn btn-sm btn-danger" onClick={()=> deleteAttendance(attendance.attendanceId)}> Delete </button> </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                
            </div>
                <div className='col-md-4'>
                    <div className='card '>
                        <div className='card-header bg-warning'>
                            Employee
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                <label>Employee</label>
                                            <select
                                                className="form-select"
                                                value={attendanceObj.employeeId}
                                                onChange={(event) => handleChange(event, "employeeId")}>
                                                <option>Select Employee</option>
                                                {employeeList.map((employee) => {
                                                    return (
                                                        <option key={employee.empId} value={employee.empId}> {employee.empName}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                <div className='col-md-6'>
                                    <label> Attendance Date</label>
                                    <input
                                        type="date"
                                        name='attendanceDate'
                                        className='form-control'
                                        value={attendanceObj.attendanceDate}
                                        onChange={(event) => handleChange(event, "attendanceDate")}
                                        placeholder='Enter attendanceDate'
                                    />

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>InTime</label>
                                    <input
                                        type="time"
                                        name='inTime'
                                        className='form-control'
                                        placeholder='Enter inTime.'
                                        value={attendanceObj.inTime}
                                        onChange={(event) => handleChange(event, "inTime")}
                                    />

                                </div>
                                <div className='col-md-6'>
                                    <label>OutTime</label>
                                    <input
                                        type="time"
                                        name="outTime"
                                        className='form-control'
                                        placeholder='Enter outTime'
                                        value={attendanceObj.outTime}
                                        onChange={(event) => handleChange(event, "outTime")}
                                    />

                                
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>IsFullDay</label>
                                    <input
                                                type="checkbox"
                                                checked={attendanceObj.isFullDay}
                                                onChange={(event) => handleChange(event, "isFullDay")} />

                                </div>

                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='text-center'>

                            {attendanceObj.attendanceId === 0 && (
                            <button className="btn btn-sm btn-primary m-2" onClick={saveAttendance}>Add</button>
                        )}
                        {attendanceObj.attendanceId !== 0 && (
                            <button className="btn btn-sm btn-primary m-2" onClick={updateAttendance}>Update</button>
                        )}
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => setShow(false)}
                        >
                            Cancel
                        </button>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Attendance;