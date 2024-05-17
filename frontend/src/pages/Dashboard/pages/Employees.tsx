import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { MdOutlineDeleteSweep as DeleteIcon } from 'react-icons/md';
import { BiSolidEditAlt as EditIcon } from 'react-icons/bi';
import { AddIcon, CloseIcon } from '../../../utils/icons';
import useGetEmployees from '../../../hooks/useGetEmployees';
import useCreateEmployee from '../../../hooks/useCreateEmployees';
import useUpdateEmployee from '../../../hooks/useUpdateEmployee';
import useDeleteEmployee from '../../../hooks/useDeleteEmployee';

interface EmployeeData {
  employeeId: string;
  name: string;
  destination: string;
  country: string;
  hireDate: string;
  profilePicture: string;
}

const data: string[] = ['employeeId', 'name', 'destination', 'country', 'hireDate', 'profilePicture'];

const Employees: React.FC = () => {
  const { employees: initialEmployees, loading } = useGetEmployees();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { createEmployee, loading: createLoading, error: createError } = useCreateEmployee();
  const [employees, setEmployees] = useState<EmployeeData[]>(initialEmployees);
  const { deleteEmployee } = useDeleteEmployee();
  const { updateEmployee } = useUpdateEmployee();
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    employeeId: '',
    name: '',
    destination: '',
    country: '',
    hireDate: '',
    profilePicture: '',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setEmployees(initialEmployees);
    }
  }, [initialEmployees, loading]);

  const handleDelete = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employeeId !== employeeId));
    } catch (error) {
      console.error('Failed to delete employee', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing && editingEmployeeId) {
      try {
        await updateEmployee(editingEmployeeId, employeeData);
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) => (employee.employeeId === editingEmployeeId ? { ...employeeData, employeeId: editingEmployeeId } : employee))
        );
      } catch (error) {
        console.error('Failed to update employee', error);
      }
    } else {
      try {
        const newEmployee = await createEmployee(employeeData);
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      } catch (error) {
        console.error('Failed to create employee', error);
      }
    }

    setEmployeeData({
      employeeId: '',
      name: '',
      destination: '',
      country: '',
      hireDate: '',
      profilePicture: '',
    });
    setShowPopup(false);
    setIsEditing(false);
    setEditingEmployeeId(null);
  };

  const handleEdit = (employee: EmployeeData) => {
    setEmployeeData(employee);
    setIsEditing(true);
    setEditingEmployeeId(employee.employeeId);
    setShowPopup(true);
  };

  const filteredEmployees = employees.map((employee, index) => {
    const filteredData: any = {};
    for (const key of data) {
      if (employee.hasOwnProperty(key)) {
        filteredData[key] = employee[key];
      }
    }

    return (
      <tr
        key={index}
        className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-secondary hover:bg-opacity-20 transition-all duration-500 text-dark`}
      >
        <td className="px-4 text-[15px] py-2">{filteredData.employeeId}</td>
        <td className="px-4 text-[15px] py-2">{filteredData.name}</td>
        <td className="px-4 text-[15px] py-2">{filteredData.destination}</td>
        <td className="px-4 text-[15px] py-2">{filteredData.country}</td>
        <td className="px-4 text-[15px] py-2">{new Date(filteredData.hireDate).toLocaleDateString()}</td>
        <td className="px-4 text-[15px] py-2">
          <img src={filteredData.profilePicture} alt="pic" className="w-12 rounded-full" />
        </td>
        <td className="px-4 text-[15px] py-2">
          <button className="py-2 px-4" onClick={() => handleEdit(employee)}>
            <EditIcon className="text-dark text-2xl hover:text-blue-500 transition-all duration-500" />
          </button>
        </td>
        <td className="px-4 py-2">
          <button className="text-dark hover:text-red-500 transition-all duration-500 py-2 px-4 rounded" onClick={() => handleDelete(filteredData.employeeId)}>
            <DeleteIcon className="text-2xl" />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section className="py-8 px-4">
      <div className="flex flex-col xs:flex-row items-center justify-between">
        <Header category="app" title="Employees" />
        <button
          className="flex items-center gap-2 bg-secondary text-gray-100 p-3 rounded-md cursor-pointer hover:bg-dark transition-all duration-400"
          onClick={() => setShowPopup(true)}
        >
          <AddIcon className="text-xl" />
          Add Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="text-center bg-secondary">
              <th className="text-gray-50 capitalize border-r-2 border-black px-4 py-2">Employee ID</th>
              <th className="text-gray-50 capitalize border-r-2 border-black px-4 py-2">Name</th>
              <th className="text-gray-50 capitalize border-r-2 border-black px-4 py-2">Destination</th>
              <th className="text-gray-50 capitalize border-r-2 border-black px-4 py-2">Country</th>
              <th className="text-gray-50 capitalize border-r-2 border-black px-4 py-2">Hire Date</th>
              <th className="text-gray-50 capitalize border-r-2 border-black px-4 py-2">Profile Picture</th>
              <th className="text-gray-50 capitalize border-r-2 border-black px-4 py-2">Edit</th>
              <th className="text-gray-50 capitalize border-r-2 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>{filteredEmployees}</tbody>
        </table>
      </div>

      {showPopup && (
        <AddEmployeePopup
          setShowPopup={setShowPopup}
          setEmployeeData={setEmployeeData}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          employeeData={employeeData}
          isEditing={isEditing}
        />
      )}
    </section>
  );
};

export default Employees;

interface AddEmployeePopupProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setEmployeeData: React.Dispatch<React.SetStateAction<EmployeeData>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  employeeData: EmployeeData;
  isEditing: boolean;
}

const AddEmployeePopup: React.FC<AddEmployeePopupProps> = ({ setShowPopup, setEmployeeData, handleSubmit, handleInputChange, employeeData, isEditing }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg relative">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
        <button className="absolute top-6 right-6 text-xl text-secondary hover:text-dark transition-all duration-500" onClick={() => setShowPopup(false)}>
          <CloseIcon />
        </button>
        <form className="grid grid-cols-1 items-center justify-center xs:grid-cols-2 gap-10 sm:grid-cols-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="employeeId"
              className="mb-1 font
-medium"
            >
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
              disabled={isEditing} // Disable ID field when editing
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              Name
            </label>
            <input type="text" id="name" name="name" value={employeeData.name} onChange={handleInputChange} className="border p-2 rounded" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="destination" className="mb-1 font-medium">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={employeeData.destination}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="country" className="mb-1 font-medium">
              Country
            </label>
            <input type="text" id="country" name="country" value={employeeData.country} onChange={handleInputChange} className="border p-2 rounded" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="hireDate" className="mb-1 font-medium">
              Hire Date
            </label>
            <input
              type="date"
              id="hireDate"
              name="hireDate"
              value={employeeData.hireDate}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="profilePicture" className="mb-1 font-medium">
              Profile Picture URL
            </label>
            <input
              type="text"
              id="profilePicture"
              name="profilePicture"
              value={employeeData.profilePicture}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="xs:col-span-2 sm:col-span-3 bg-secondary text-gray-100 py-2 px-4 rounded mt-4 hover:bg-dark transition-all duration-400"
          >
            {isEditing ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
      </div>
    </div>
  );
};
