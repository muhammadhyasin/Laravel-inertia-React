import Expense from "@/interface";
import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import route from "ziggy-js"; 

interface Props {
  expense: Expense;
  paymentMethods: Array<any>;
  expenseCategories: Array<string>;
  submitUrl: string; 
}

const ExpenseForm: React.FC<Props> = ({ 
    expense,
    expenseCategories,
    paymentMethods,
    submitUrl,
 }) => {
    const [state, setState] = React.useState({
        id: expense.id,
        description: expense.description,
        date: expense.date,
        amount: expense.amount || 0,
        category: expense.category || expenseCategories[0],
        payment_method: expense.payment_method ||  paymentMethods[0]
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({...state,[event.currentTarget.name]: event.currentTarget.value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(state);
        Inertia.post(submitUrl, state); 
    }
   
    return (
        <div className="container mx-auto">
            
                        <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={expense.id} />
<div className="mb-4">
  <label htmlFor="description" className="block">Description</label>
  <input type="text" name="description" className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" value={state.description} onChange={handleChange} />
  <div className="text-red-500">{}</div>
</div>

<div className="mb-4">
  <label htmlFor="date" className="block">Date</label>
  <input type="date" name="date" className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" value={state.date} onChange={handleChange} />
  <div className="text-red-500">{}</div>
</div>

<div className="mb-4">
  <label htmlFor="amount" className="block">Amount</label>
  <input type="text" name="amount" className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" value={state.amount} onChange={handleChange}/>
  <div className="text-red-500">{}</div>
</div>

<div className="mb-4">
  <label htmlFor="category" className="block">Category</label>
  <select
          name="category"
          id="category"
          className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          value={state.category}
          onChange={handleChange}
        >
          {expenseCategories.map((category: string, index: number) => {
            return (
              <option value={category} key={index}>
                {category}
              </option>
            );
          })}
        </select>
  <div className="text-red-500">{}</div>
</div>

<div className="mb-4">
  <label htmlFor="payment_method" className="block">Payment Method</label>
  <select name="payment_method" id="payment_method" className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
    value={state.payment_method} onChange={handleChange}>
    {paymentMethods.map((paymentMethod, index) => (
      <option key={index} value={paymentMethod} >{paymentMethod} </option>
    ))}
  </select>
</div>

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Save</button>
<Link href={route("expense.list").url()} className=" text-black font-bold py-2 px-4 rounded">Back</Link>
</form>
                    </div>
               
    );
};

export default ExpenseForm;
