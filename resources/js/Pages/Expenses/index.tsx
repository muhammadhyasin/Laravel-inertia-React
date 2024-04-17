import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import PaginatedData from '@/paginateddata';
import { Inertia } from '@inertiajs/inertia';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Expense from '@/interface';

interface Props {
  expenses: PaginatedData;
}

const ExpensePageList: React.FC<Props & PageProps<{ auth: User }>> = ({ expenses, auth }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentMethodTotals, setPaymentMethodTotals] = useState<{ [key: string]: number }>({});
  const [categoryTotal, setCategoryTotal] = useState<number>(0);

  const handleExpenseDelete = (expense: Expense) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this expense?');
    if (shouldDelete) {
      Inertia.get(route('expense.delete', { expense: expense }).url());
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    if (category === selectedCategory) {
      setCategoryTotal(0);
    } else {
      const total = expenses.data.filter(expense => expense.category === category).reduce((acc, expense) => acc + expense.amount, 0);
      setCategoryTotal(total);
    }
  };

  const handlePaymentMethodClick = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod === selectedPaymentMethod ? null : paymentMethod);
  };


  const calculatePaymentMethodTotals = () => {
    const totals: { [key: string]: number } = {};
    expenses.data.forEach((expense: Expense) => {
      if (!totals[expense.payment_method]) {
        totals[expense.payment_method] = 0;
      }
      totals[expense.payment_method] += expense.amount;
    });
    return totals;
  };


  useEffect(() => {
    const totals = calculatePaymentMethodTotals();
    setPaymentMethodTotals(totals);
  }, [expenses]);

  return (
    
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Expenses</h2>}>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleCategoryClick(null)}>Category</th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handlePaymentMethodClick(null)}>Payment Method</th>
              <th>
                <Link href="/expenses/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Expense
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.data.map((expense: Expense, index: any) => (
              <tr key={index}>
                <td className="px-6 py-4">{expense.id}</td>
                <td className="px-6 py-4">{expense.description}</td>
                <td className="px-6 py-4">{expense.date}</td>
                <td className="px-6 py-4">{expense.amount}</td>
                <td className={`px-6 py-4 cursor-pointer ${selectedCategory === expense.category ? 'text-orange-500' : 'text-blue-500'}`} onClick={() => handleCategoryClick(expense.category)}>
                  {expense.category}
                </td>
                <td className={`px-6 py-4 cursor-pointer ${selectedPaymentMethod === expense.payment_method ? 'text-green-500' : 'text-blue-500'}`} onClick={() => handlePaymentMethodClick(expense.payment_method)}>
                  {expense.payment_method}
                </td>
                <td>
                  <Link href={`/expenses/view/${expense.id}`} className="mr-3 text-blue-500 hover:text-blue-700">
                    View
                  </Link>
                  <span className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleExpenseDelete(expense)}>
                    Delete
                  </span>
                </td>
                <tr>
                  
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
      {selectedCategory && (
        <div className="mt-4">
          <p className="font-semibold text-xl text-gray-800">Total Budget Used for {selectedCategory}:</p>
          <p className="text-gray-600">{categoryTotal}</p>
        </div>
      )}
      
      <div className="mt-4">
        <p className="font-semibold text-xl text-gray-800">Total Expenses by Payment Method:</p>
        <ul className="list-disc list-inside">
          {Object.entries(paymentMethodTotals).map(([paymentMethod, total]) => (
            <li key={paymentMethod}>{paymentMethod}: {total}</li>
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  );
};

export default ExpensePageList;
