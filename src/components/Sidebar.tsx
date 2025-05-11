'use client';

import { useEditorStore } from '@/store/editorStore';
import { Button } from './ui/button';

export default function Sidebar() {
  const { addElement } = useEditorStore();

  return (
    <div className="w-48 bg-gray-200 p-4 border-r">
      <Button onClick={() => addElement('text')} className="mb-2 w-full">
        Add Text
      </Button>
      <Button onClick={() => addElement('button')} className="w-full">
        Add Button
      </Button>
    </div>
  );
}