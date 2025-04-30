import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Query(() => [Expense])
  getExpenses() {
    return this.expenseService.getExpenses();
  }

  @Mutation(() => Expense)
  addExpense(
    @Args('title') title: string,
    @Args('amount') amount: number,
    @Args('category') category: string,
    @Args('createdAt') createdAt: string,
  ) {
    return this.expenseService.addExpense(title, amount, category, createdAt);
  }

  @Mutation(() => Boolean)
  deleteAllExpenses(): boolean {
    this.expenseService.deleteAllExpenses();
    return true;
  }

  @Mutation(() => Expense, { nullable: true })
  deleteExpense(@Args('id') id: string) {
    return this.expenseService.deleteExpense(id);
  }
}
