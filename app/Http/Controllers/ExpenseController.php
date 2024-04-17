<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    private $expenseCategories;
    private $paymentMethods;
    private $rules=[];
    public function __construct()
    {
        $this->expenseCategories = config('expense.expense_category');
        $this->paymentMethods = config('expense.payment_method');

        $this->rules = [
            'description' => ['required', 'min:3'],
            'date' => ['required', 'date'],
            'amount' => ['required', 'min:1'],
            'category' => ['required', Rule::in($this->expenseCategories)],
            'payment_method' => ['required', Rule::in($this->paymentMethods)],
        ];
    }
    use ValidatesRequests; 
    public function index()
    {
        $expense = Expense::orderByDesc('id')
        ->paginate(7);
        return Inertia::render('Expenses/index', [
            'expenses'=> $expense,
        ]);
    }
  public function add()
    {
        return Inertia::render('Expenses/add/index')
            ->with('expense', new Expense)
            ->with('expenses', $this->expenseCategories)
            ->with('paymentMethods', $this->paymentMethods);

        // return view('expenses.expenses-add')
        //     ->with('expense', new Expense)
        //     ->with('expenses', $this->expenseCategories)
        //     ->with('paymentMethods', $this->paymentMethods);
    }
    public function store(Request $request)
    {
        $expenseCategories = \config('expense.expense_category');
        $paymentMethods = \config('expense.payment_method');

        $postData = $this->validate($request,$this->rules);
        $postData['user_id'] = Auth::user()->id;
         Expense::create($postData);
         return redirect(\route('expense.list'))
            ->with('success', 'Expense added');

    }
    public function view(Expense $expense)
    {
        return Inertia::render('Expenses/view/index', [
            'expense' => $expense,
            'expenses' => $this->expenseCategories,
            'paymentMethods' => $this->paymentMethods,
        ]);
    }
    public function update(Request $request)
    {
        $this->rules['id'] = ['required','exists:expenses,id'];
        $postData = $this->validate($request, $this->rules);
        $expenseId = $postData['id'];
        unset($postData['id']);

        Expense::where('id', $expenseId)
            ->update($postData);

            return redirect(\route('expense.list'))
            ->with('success', 'Expense added');
    }
    public function delete(Expense $expense)
    {
        if ($expense->user_id !== Auth::user()->id) {
            abort(401, 'You cannot delete any other user\'s entry.');
        }

        $expense->delete();

        return redirect()->route('expense.list');
    }
    public function showByCategory($category)
    {
        // Fetch expenses for the selected category
        $expenses = Expense::where('category', $category)->orderByDesc('id')->paginate(5);

        // Calculate total amount for the selected category
        $totalAmount = Expense::where('category', $category)->sum('amount');

        // Pass expenses, total amount, and selected category to the view
        return view("expenses.expense-index", compact('expenses', 'totalAmount', 'category'));
    }
}