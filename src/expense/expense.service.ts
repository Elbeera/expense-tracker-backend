import { Injectable } from '@nestjs/common';
import { Expense } from './expense.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExpenseService {
  private expenses: Expense[] = [];

  getExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(
    title: string,
    amount: number,
    category: string,
    createdAt: string,
  ): Expense {
    const newExpense: Expense = {
      id: uuidv4(),
      title,
      amount,
      category,
      createdAt,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  deleteExpense(id: string): Expense | undefined {
    const expenseIndex = this.expenses.findIndex(
      (expense) => expense.id === id,
    );
    if (expenseIndex === -1) return undefined;
    return this.expenses.splice(expenseIndex, 1)[0];
  }

  deleteAllExpenses(): void {
    this.expenses = [];
  }
}
