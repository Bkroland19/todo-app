import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useTasks, Task } from './hooks/useTasks'; 
import React from 'react';

jest.mock('./hooks/useTasks');

describe('TaskApp', () => {
  it('should toggle task completion when the button is clicked', () => {
    const mockToggleCompletion = jest.fn();

    const tasks: Task[] = [
      { id: '1', title: 'Test Task', description: 'Test Description', completed: false },
    ];

    (useTasks as jest.Mock).mockReturnValue({
      tasks,
      addTask: jest.fn(),
      removeTask: jest.fn(),
      updateTask: jest.fn(),
      toggleCompletion: mockToggleCompletion,
    });

    render(<App />);

    const toggleButton = screen.getByRole('button', { name: /check circle/i });

    expect(screen.getByText('Test Task'))

    fireEvent.click(toggleButton);

    expect(mockToggleCompletion).toHaveBeenCalledWith('1');
  });
});
