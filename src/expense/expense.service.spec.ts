import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';

// Mock the uuidv4 function to return a fixed ID
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('fixed-uuid'), // Fixed UUID
}));

describe('ExpenseService', () => {
  let service: ExpenseService;

  const mockExpense: Expense = {
    id: 'fixed-uuid', // Use the fixed ID in the mock
    title: 'Test Expense',
    amount: 100,
    category: 'Food',
    createdAt: '2025-04-28T00:00:00Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  describe('getExpenses', () => {
    it('should return all expenses', () => {
      // Adding a mock expense to the service's internal array
      service['expenses'] = [mockExpense];

      const result = service.getExpenses();
      expect(result).toEqual([mockExpense]);
    });
  });

  describe('addExpense', () => {
    it('should add a new expense and return it', () => {
      const result = service.addExpense(
        mockExpense.title,
        mockExpense.amount,
        mockExpense.category,
        mockExpense.createdAt,
      );

      expect(result).toEqual(mockExpense);
      expect(service['expenses']).toHaveLength(1); // Ensure the array length increases by 1
    });
  });

  describe('deleteExpense', () => {
    it('should delete an expense by id and return the deleted expense', () => {
      // Adding a mock expense to the service's internal array
      service['expenses'] = [mockExpense];

      const result = service.deleteExpense(mockExpense.id);
      expect(result).toEqual(mockExpense);
      expect(service['expenses']).toHaveLength(0); // Ensure the expense is deleted from the array
    });

    it('should return undefined if the expense is not found', () => {
      const result = service.deleteExpense('non-existent-id');
      expect(result).toBeUndefined();
    });
  });

  describe('deleteAllExpenses', () => {
    it('should delete all expenses and return an empty array', () => {
      // Adding mock expenses to the service's internal array
      service['expenses'] = [mockExpense];

      service.deleteAllExpenses();

      expect(service['expenses']).toHaveLength(0); // Ensure the array is empty
    });
  });
});
