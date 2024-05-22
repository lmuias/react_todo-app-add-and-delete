import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  handleToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  loadingIds: number[];
  setLoadingIds: Dispatch<SetStateAction<number[]>>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleToggleTodo,
  loadingIds,
  setLoadingIds,
  onDeleteTodo,
}) => {
  const { completed, id, title } = todo;
  const handleDelete = (todoId: number) => {
    setLoadingIds(prevIds => [...prevIds, todoId]);

    return onDeleteTodo(todoId);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleToggleTodo(id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDelete(id)}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loadingIds.includes(id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
