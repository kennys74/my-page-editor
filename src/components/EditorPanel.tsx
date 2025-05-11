'use client';

import { useEditorStore } from '@/store/editorStore';

export default function EditorPanel() {
  const { elements, selectedId, updateElement } = useEditorStore();
  const element = elements.find((el) => el.id === selectedId);

  if (!element) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateElement(element.id, { [name]: value });
  };

  return (
    <div className="mt-4 p-4 bg-white border rounded">
      <h2 className="font-bold mb-2">Edit {element.type}</h2>
      {Object.keys(element.props).map((key) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {key}
          </label>
          <input
            name={key}
            value={element.props[key]}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      ))}
    </div>
  );
}