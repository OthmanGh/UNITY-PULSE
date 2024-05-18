import { useState } from 'react';
import { TrashIcon } from '../../../utils/icons';
import { Task, Id } from '../pages/Kanban/types';
import Overlay from '../../../components/Overlay';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TaskCardProps = {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
};

const TaskCard = ({ task, deleteTask, updateTask }: TaskCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },

    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="bg-secondary p-2.5  items-center flex text-left  hover:ring-2 cursor-grab relative opacity-50"></div>;
  }

  const handleEdit = () => {
    updateTask(task.id, newContent);
    toggleEditMode();
  };

  if (editMode) {
    return (
      <>
        <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md">
          <input type="text" value={newContent} onChange={(e) => setNewContent(e.target.value)} className="border rounded-md p-1 w-full" />
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2" onClick={handleEdit}>
              Save
            </button>
            <button className="bg-red-500 text-white px-4 py-1 rounded-md" onClick={toggleEditMode}>
              Cancel
            </button>
          </div>
        </div>
        <Overlay />
      </>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-secondary text-slate-100 mb-2 p-2 border-l-4 border-l-dark h-[40] hover:bg-extraDark transition-all duration-500 flex justify-between"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={toggleEditMode}
    >
      {task.content}

      {mouseIsOver && (
        <button
          className="stroke-white right-4  p-1 rounded opacity-60 hover:opacity-100"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
