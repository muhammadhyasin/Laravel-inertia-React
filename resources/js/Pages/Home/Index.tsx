import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import  Expense  from '@/interface'; 
import { User } from '@/types';

interface Props {
    expenses: Expense[];
}

const HomePage: React.FC<Props & PageProps<{ auth: User }>> = ({ expenses, auth }) => {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"><button>Expenses</button></h2>}>
            <div>
                <p>Welcome to home</p>
                <ul>
                    {expenses.map((value: Expense, index) => (
                        <React.Fragment key={index}>
                            <li>{value.description}</li>
                            <li>{value.amount}</li>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
};

export default HomePage;
