import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';

export type ElementType = 'text' | 'button';

export interface EditorElement {
  id: string;
  type: ElementType;
  props: Record<string, string>;
}

interface EditorStore {
  elements: EditorElement[];
  selectedId: string | null;
  addElement: (type: ElementType) => void;
  setSelectedId: (id: string | null) => void;
  updateElement: (id: string, newProps: Record<string, string>) => void;
  reorderElements: (activeId: string, overId: string) => void;
  saveToServer: (pageName: string) => Promise<any>;
}

export const useEditorStore = create<EditorStore>()(
  devtools(
    (set, get) => ({
      elements: [],
      selectedId: null,
      addElement: (type) =>
        set((state) => ({
          elements: [
            ...state.elements,
            {
              id: uuidv4(),
              type,
              props: type === 'text' ? { text: 'Edit me' } : { label: 'Click me' },
            },
          ],
        }), false, 'addElement'),
      setSelectedId: (id) => set({ selectedId: id }, false, 'setSelectedId'),
      updateElement: (id, newProps) =>
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, props: { ...el.props, ...newProps } } : el
          ),
        }), false, 'updateElement'),
      reorderElements: (activeId, overId) =>
        set((state) => {
          const oldIndex = state.elements.findIndex((el) => el.id === activeId);
          const newIndex = state.elements.findIndex((el) => el.id === overId);
          if (oldIndex === -1 || newIndex === -1) return {};
          const updated = [...state.elements];
          const [moved] = updated.splice(oldIndex, 1);
          updated.splice(newIndex, 0, moved);
          return { elements: updated };
        }, false, 'reorderElements'),
      saveToServer: async (pageName: string) => {
        const res = await fetch('/api/pages', {
          method: 'POST',
          body: JSON.stringify({ name: pageName, elements: get().elements }),
          headers: { 'Content-Type': 'application/json' },
        });
        return res.json();
      },
    }),
    { name: 'EditorStore' }
  )
);