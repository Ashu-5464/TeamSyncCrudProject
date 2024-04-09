import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Employee = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeObj, setEmployeeObj] = useState({
        empId: 0,
        empName: "",
        empContactNo: "",
        empAltContactNo: "",
        empEmail: "",
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        city: "",
        state: "",
        bankName: "",
        ifsc: "",
        accountNo: "",
        bankBranch: "",
        salary: ""
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";

    useEffect(() => {
        getAllEmployee();
    }, []);

    const getAllEmployee = async () => {
        try {
            const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllEmployee');
            setEmployeeList(result.data.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
            alert('Error fetching employee data');
        }
    }

    const handleChange = (e, key) => {
        setEmployeeObj(prevObj => ({ ...prevObj, [key]: e.target.value }));
    }

    const saveEmployee = async () => {
        try {
            setIsFormSubmitted(true);
            if (validateForm()) {
                const result = await axios.post('https://onlinetestapi.gerasim.in/api/TeamSync/CreateEmployee', employeeObj);
                if (result.data.result) {
                    alert('User created successfully');
                    getAllEmployee();
                } else {
                    const errorMessage = result.data.message;
                    alert(errorMessage || 'Failed to create user');
                }
            }
        } catch (error) {
            console.error('Error creating user:', error);
            alert('An error occurred while creating user');
        }
    }

    const validateForm = () => {
        return (
            employeeObj.empName.trim() !== '' &&
            employeeObj.empContactNo.trim() !== '' &&
            employeeObj.empAltContactNo.trim() !== '' &&
            employeeObj.empEmail.trim() !== '' &&
            employeeObj.city.trim() !== '' &&
            employeeObj.bankName.trim() !== '' &&
            employeeObj.bankBranch.trim() !== '' &&
            employeeObj.addressLine2.trim() !== '' &&
            employeeObj.addressLine1.trim() !== '' &&
            employeeObj.state.trim() !== '' &&
            employeeObj.ifsc.trim() !== '' &&
            employeeObj.accountNo.trim() !== '' &&
            employeeObj.pincode.trim() !== '' &&
            employeeObj.salary.trim() !== ''
        );
    }

    const onEdit = (employeeObj) => {
        setEmployeeObj(employeeObj);
    }

    const userUpdate = async () => {
        try {
            const result = await axios.post(`${url}UpdateEmployee`, employeeObj);
            if (result.data.result) {
                alert('User updated successfully');
                getAllEmployee();
            } else {
                const errorMessage = result.data.message;
                alert(errorMessage || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('An error occurred while updating user');
        }
    }

    const onDelete = async (empId) => {
        try {
            const result = await axios.get(`${url}DeleteEmployeeByEmpId?empid=` + empId);
            if (result.data.result) {
                alert('User deleted successfully');
                getAllEmployee();
            } else {
                const errorMessage = result.data.message;
                alert(errorMessage || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting user');
        }
    }

    return (
        <div>
            <div className='row mt-3'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-heading bg-warning'>
                            Employee List
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Name</th>
                                        <th>Contact No</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>Salary</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeList.map((employee, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{employee.empName}</td>
                                            <td>{employee.empContactNo}</td>
                                            <td>{employee.empEmail}</td>
                                            <td>{employee.city}</td>
                                            <td>{employee.salary}</td>
                                            <td>
                                                <button className='btn btn-sm btn-success m-2' onClick={() => onEdit(employee)}>Edit</button>
                                                <button className='btn btn-sm btn-danger' onClick={() => onDelete(employee.empId)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-warning'>
                            Employee
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Name</label>
                                    <input type="text" className='form-control' value={employeeObj.empName} placeholder='Enter Name' onChange={(event) => handleChange(event, 'empName')} />
                                    {isFormSubmitted && employeeObj.empName.trim() === '' && <div className='text-danger'>This field is required</div>}
                                </div>
                                <div className='col-md-6'>
                                    <label>Contact No.</label>
                                    <input type="text" value={employeeObj.empContactNo}  onChange={(event)=>handleChange(event,'empContactNo')} name='empContactNo' className='form-control' placeholder='Enter Contact Number' />
                                    {
                                       isFormSubmitted&& employeeObj.empContactNo.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Alternate Contact No</label>
                                    <input type="text" value={employeeObj.empAltContactNo} onChange={(event)=>handleChange(event,'empAltContactNo')} name='empAltContactNo' className='form-control' placeholder='Enter Alternate Contact No.' />
                                    {
                                       isFormSubmitted && employeeObj.empAltContactNo.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div className='col-md-6'>
                                    <label>Email</label>
                                    <input type="text" value={employeeObj.empEmail} onChange={(event)=>handleChange(event,'empEmail')} name="empEmail" className='form-control' placeholder='Enter Email' />
                                    {
                                       isFormSubmitted && employeeObj.empEmail.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Address 1</label>
                                    <input type="text" value={employeeObj.addressLine1}  onChange={(event)=>handleChange(event,'addressLine1')} name="addressLine1" className='form-control' placeholder='Enter Address 1' />
                                    {
                                      isFormSubmitted &&  employeeObj.addressLine1.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div className='col-md-6'>
                                    <label>Address 2</label>
                                    <input type="text" value={employeeObj.addressLine2}  onChange={(event)=>handleChange(event,'addressLine2')} name="addressLine2" className='form-control' placeholder='Enter Address 2' />
                                    {
                                       isFormSubmitted && employeeObj.addressLine2.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Pin Code</label>
                                    <input type="text" value={employeeObj.pincode}  onChange={(event)=>handleChange(event,'pincode')} name="pincode" className='form-control' placeholder='Enter Pin Code' />
                                    {
                                       isFormSubmitted && employeeObj.pincode.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div className='col-md-6'>
                                    <label>City</label>
                                    <input type="text" value={employeeObj.city}  onChange={(event)=>handleChange(event,'city')} name="city" className='form-control' placeholder='Enter City' />
                                    {
                                       isFormSubmitted && employeeObj.city.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>State</label>
                                    <input type="text" value={employeeObj.state} onChange={(event)=>handleChange(event,'state')} name="state" className='form-control' placeholder='Enter State' />
                                    {
                                        isFormSubmitted && employeeObj.state.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div className='col-md-6'>
                                    <label>Bank Name</label>
                                    <input type="text" value={employeeObj.bankName} onChange={(event)=>handleChange(event,'bankName')} name='bankName' className='form-control' placeholder='Enter Bank Name' />
                                    {
                                        isFormSubmitted && employeeObj.bankName.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>IFSC Code</label>
                                    <input type="text" value={employeeObj.ifsc}  onChange={(event)=>handleChange(event,'ifsc')} name="ifsc" className='form-control' placeholder='Enter IFSC Code' />
                                    {
                                        isFormSubmitted && employeeObj.ifsc.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div className='col-md-6'>
                                    <label>Account Number</label>
                                    <input type="text" value={employeeObj.accountNo}  onChange={(event)=>handleChange(event,'accountNo')} name="accountNo" className='form-control' placeholder='Enter Account Number' />
                                    {
                                        isFormSubmitted && employeeObj.accountNo.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Bank Branch</label>
                                    <input type="text" value={employeeObj.bankBranch}  onChange={(event)=>handleChange(event,'bankBranch')} className='form-control' placeholder='Enter Bank Branch' />
                                    {
                                        isFormSubmitted && employeeObj.bankBranch.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div className='col-md-6'>
                                    <label>Salary</label>
                                    <input type="text" value={employeeObj.salary}  onChange={(event)=>handleChange(event,'salary')} name="salary" className='form-control' placeholder='Enter Salary' />
                                    {
                                        isFormSubmitted && employeeObj.salary.trim()==='' &&  <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='text-center'>
                                {
                                    employeeObj.empId === 0 && <button className='btn btn-sm btn-primary m-2' onClick={saveEmployee}>Add</button>
                                }
                                 {
                                    employeeObj.empId !== 0 && <button className='btn btn-sm btn-primary m-2' onClick={userUpdate}>Update</button>
                                }
                                <button className='btn btn-sm btn-danger'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
