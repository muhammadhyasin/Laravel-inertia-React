import ExpenseForm from "@/Components/forms/expenseforms";
import Expense from "@/interface";
import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { PageProps } from '@/types';

interface Props {
  expense: Expense;
  expenses: Array<any>;
  paymentMethods: Array<any>;
}

const ExpenseViewPage: React.FC<Props & PageProps<{ auth: User }>> = ({ expense, expenses, paymentMethods,auth }) => {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"><button>Expenses</button></h2>}>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
          <div>&nbsp;</div>
            <div className="w-96 mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
                    <div className="p-6">
                        <div className="text-xl font-semibold mb-4">Edit expense</div>
           <ExpenseForm 
           expense={expense}
           expenseCategories={expenses}
           paymentMethods={paymentMethods}
           submitUrl={route("expense.update")}
           ></ExpenseForm>
           
          </div>
        </div>
      </div>
      </div>
            </div>
        </div>
      </AuthenticatedLayout>
   
  );
};

export default ExpenseViewPage;