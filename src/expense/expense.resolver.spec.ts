import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';

describe('ExpenseResolver', () => {
  let resolver: ExpenseResolver;
  let expenseService: jest.Mocked<ExpenseService>;

  const mockExpense = {
    id: '1',
    title: 'Test Expense',
    amount: 100,
    category: 'Food',
    createdAt: '2025-04-28T00:00:00Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseResolver,
        {
          provide: ExpenseService,
          useValue: {
            getExpenses: jest.fn().mockResolvedValue([mockExpense]),
            addExpense: jest.fn().mockResolvedValue(mockExpense),
            deleteAllExpenses: jest.fn(),
            deleteExpense: jest.fn().mockResolvedValue(mockExpense),
          },
        },
      ],
    }).compile();

    resolver = module.get<ExpenseResolver>(ExpenseResolver);
    expenseService = module.get(ExpenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getExpenses', () => {
    it('should return a list of expenses', async () => {
      const result = await resolver.getExpenses();
      expect(result).toEqual([mockExpense]);
      expect(expenseService.getExpenses).toHaveBeenCalled();
    });
  });

  describe('addExpense', () => {
    it('should add a new expense and return it', async () => {
      const result = await resolver.addExpense(
        mockExpense.title,
        mockExpense.amount,
        mockExpense.category,
        mockExpense.createdAt,
      );
      expect(result).toEqual(mockExpense);
      expect(expenseService.addExpense).toHaveBeenCalledWith(
        mockExpense.title,
        mockExpense.amount,
        mockExpense.category,
        mockExpense.createdAt,
      );
    });
  });

  describe('deleteAllExpenses', () => {
    it('should delete all expenses and return true', async () => {
      const result = await resolver.deleteAllExpenses();
      expect(result).toBe(true);
      expect(expenseService.deleteAllExpenses).toHaveBeenCalled();
    });
  });

  describe('deleteExpense', () => {
    it('should delete an expense by id and return the deleted expense', async () => {
      const result = await resolver.deleteExpense(mockExpense.id);
      expect(result).toEqual(mockExpense);
      expect(expenseService.deleteExpense).toHaveBeenCalledWith(mockExpense.id);
    });
  });
});
