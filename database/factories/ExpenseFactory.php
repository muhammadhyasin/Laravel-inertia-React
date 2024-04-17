<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $expenseCategory = config('expense.expense_category');
        $paymentMethods= config('expense.payment_method');
        return [
            'description' => $this->faker->sentence(4),
            'date' => $this->faker->date('Y-m-d'),
            'amount'=> $this->faker->numberBetween(50,100),
            'category'=> $this->faker->randomElement($expenseCategory),
            'user_id'=> 1,
            'payment_method'=> $this->faker->randomElement($paymentMethods ),
        ];
    }
}
