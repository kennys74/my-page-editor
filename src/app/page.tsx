'use client';

import Canvas from '@/components/Canvas';
import Sidebar from '@/components/Sidebar';
import EditorPanel from '@/components/EditorPanel';
import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';

export default function PageBuilder() {
  const { elements, selectedId, saveToServer } = useEditorStore();
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    saveToServer('My Page');
    setOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 bg-gray-50">
        <Canvas elements={elements} />
        {selectedId && <EditorPanel />}
        <div className="mt-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Save Page</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Are you sure you want to save this page?</DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}