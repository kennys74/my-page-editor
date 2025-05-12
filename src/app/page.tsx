'use client';

import Canvas from '@/components/Canvas';
import Sidebar from '@/components/Sidebar';
import EditorPanel from '@/components/EditorPanel';
import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';


export default function PageBuilder() {
  const { elements, selectedId, saveToServer } = useEditorStore();
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    saveToServer('My Page');
    setOpen(false);
    toast.success('Page saved successfully', {
      description: 'Your changes have been persisted.',
      icon: <CheckCircle className="text-green-500" />,
      duration: 4000,
      action: {
        label: 'Undo',
        onClick: () => {
          // Optional: implement undo logic
        },
      },
    });
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
              <DialogHeader>
              <DialogTitle>Edit Page</DialogTitle>
              <DialogDescription>
                Are you sure you want to save your changes to the page?
              </DialogDescription>
              </DialogHeader>
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