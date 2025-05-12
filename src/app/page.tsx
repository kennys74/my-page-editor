'use client';

import Canvas from '@/components/Canvas';
import Sidebar from '@/components/Sidebar';
import EditorPanel from '@/components/EditorPanel';
import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { CheckCircle, Sun, Moon } from 'lucide-react';

export default function PageBuilder() {
  const { elements, selectedId, saveToServer, addElement } = useEditorStore();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleSave = async () => {
    await saveToServer('My Page');
    setOpen(false);
    toast.success('Page saved successfully', {
      description: 'Your changes have been persisted.',
      icon: <CheckCircle className="text-green-500" />,
      duration: 4000,
      action: {
        label: 'Undo',
        onClick: () => {
          // Optional undo logic goes here
        },
      },
    });
  };

  const handleAddInput = () => {
    addElement('input', {
      placeholder: 'Enter text...',
      value: '',
      multiline: true,
    });
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between mb-4">
          <Button onClick={() => setDarkMode(!darkMode)} variant="ghost">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button onClick={handleAddInput} variant="outline">Add Text Field</Button>
        </div>
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