import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';

export type ElementType = 'text' | 'button' | 'input';

export interface ElementProps {
  [key: string]: any;
}

export interface PageElement {
  id: string;
  type: ElementType;
  props: ElementProps;
}

interface EditorState {
  elements: PageElement[];
  selectedId: string | null;
  addElement: (type: ElementType, props?: ElementProps) => void;
  setSelectedId: (id: string | null) => void;
  updateElement: (id: string, newProps: ElementProps) => void;
  reorderElements: (from: number, to: number) => void;
  saveToServer: (title: string) => Promise<void>;
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set, get) => ({
      elements: [],
      selectedId: null,
      addElement: (type, props = {}) => {
        const defaultProps: Record<ElementType, ElementProps> = {
          text: { text: 'Edit me' },
          button: { label: 'Click me' },
          input: { placeholder: 'Enter text...', value: '', multiline: false },
        };
        set((state) => ({
          elements: [
            ...state.elements,
            {
              id: uuidv4(),
              type,
              props: { ...defaultProps[type], ...props },
            },
          ],
          selectedId: null,
        }));
      },
      setSelectedId: (id) => set({ selectedId: id }),
      updateElement: (id, newProps) =>
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, props: { ...el.props, ...newProps } } : el
          ),
        })),
      reorderElements: (from, to) =>
        set((state) => {
          const updated = [...state.elements];
          const [moved] = updated.splice(from, 1);
          updated.splice(to, 0, moved);
          return { elements: updated };
        }),
      saveToServer: async (title: string) => {
        const pageData = {
          title,
          elements: get().elements,
        };
        await fetch('/api/save-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pageData),
        });
      },
    }),
  )
);