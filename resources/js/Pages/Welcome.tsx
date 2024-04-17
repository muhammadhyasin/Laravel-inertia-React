import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Form } from 'react-hook-form';
import '../a.css'; 
import { NavLink } from 'react-router-dom';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    
  const isAuthenticated = auth.user !== null;

    return (
        <>
         
         <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-5xl font-bold mb-8">Expense Tracker</h1>
            {isAuthenticated ? (
                <div>
                    <p>Welcome back!</p>
                    <div>&nbsp;</div>
                    <Link href={route('nm')}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">

                        Continue
                    </button>
                    </Link>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href={route('login')}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Log In
                        </button>
                    </Link>
                    <Link href={route('register')}>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                        Sign Up
                    </button>
                    </Link>
                </div>
            )}
        </div>
        </>
    );
    
}
