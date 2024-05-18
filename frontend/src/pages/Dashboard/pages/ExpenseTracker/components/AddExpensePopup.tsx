import React, { useState } from 'react';

interface AddExpensePopupProps {
  onAddExpense: (newExpense: { date: string; description: string; category: string; amount: string }) => void;
  onClose: () => void;
}

const AddExpensePopup: React.FC<AddExpensePopupProps> = ({ onAddExpense, onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    const newExpense = {
      name,
      date,
      description,
      category,
      amount,
    };
    onAddExpense(newExpense);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-10">
      <div className="bg-white p-8 rounded-lg relative">
        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <InputField type="text" placeholder="Enter name" name="name" value={name} onChange={(e) => setName(e.target.value)} label="Name" id="name" />
          <InputField type="date" placeholder="Enter date" name="date" value={date} onChange={(e) => setDate(e.target.value)} label="Date" id="date" />
          <InputField
            type="text"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            id="description"
          />
          <InputField
            type="text"
            placeholder="Enter category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            id="category"
          />
          <InputField
            type="number"
            placeholder="Enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount"
            id="amount"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500">
              Cancel
            </button>
            <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-dark transition-all duration-500 ">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpensePopup;

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, name, value, onChange, label, id, disabled = false }) => {
  return (
    <label className="flex flex-col">
      <span className="text-slate-600 mb-[1px]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={id}
        className={`p-3 rounded-md bg-slate-200  outline-none w-[500px]  text-dark `}
        disabled={disabled}
        required
      />
    </label>
  );
};
