'use client';

import { useEditorStore } from '@/store/editorStore';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function Canvas({ elements }: { elements: any[] }) {
  const { setSelectedId, selectedId, reorderElements } = useEditorStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = elements.findIndex((el) => el.id === active.id);
      const newIndex = elements.findIndex((el) => el.id === over.id);
      reorderElements(oldIndex, newIndex);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
        <div className="w-full min-h-[500px] border p-4 bg-white rounded shadow-inner">
          {elements.map((el) => (
            <SortableItem key={el.id} id={el.id}>
              <div
                onClick={() => setSelectedId(el.id)}
                className={`border p-2 mb-2 rounded cursor-pointer ${
                  selectedId === el.id ? 'border-blue-500 bg-blue-50' : 'bg-gray-100'
                }`}
              >
                {el.type === 'text' && <p>{el.props.text}</p>}
                {el.type === 'button' && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    {el.props.label}
                  </button>
                )}
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}