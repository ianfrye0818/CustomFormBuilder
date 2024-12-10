import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FormComponent, useFormBuilder } from '../hooks/useFormBuilder';
import _ from 'lodash';
interface FormComponentOptionsDialogProps {
  component: FormComponent;
  updateComponent: (id: string, updates: Partial<FormComponent>) => void;
}

export function FormComponentOptionsDialog({
  component,
  updateComponent,
}: FormComponentOptionsDialogProps) {
  const [tempComponent, setTempComponent] = useState<FormComponent>({ ...component });
  const [open, setOpen] = useState(false);
  const { validateComponent } = useFormBuilder();

  const handleChange = (field: keyof FormComponent, value: any) => {
    setTempComponent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (validateComponent(tempComponent)) {
      updateComponent(component.id, tempComponent);
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          onClick={() => setTempComponent({ ...component })}
        >
          Edit Options
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {tempComponent.name}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              value={tempComponent.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() =>
                handleChange('name', _.startCase(_.camelCase(tempComponent.name)).replace(/ /g, ''))
              }
            />
          </div>
          <div>
            <Label htmlFor='label'>Label</Label>
            <Input
              id='label'
              value={tempComponent.label}
              onChange={(e) => handleChange('label', e.target.value)}
            />
          </div>
          {tempComponent.type !== 'checkbox' &&
            tempComponent.type !== 'radio' &&
            tempComponent.type !== 'select' &&
            tempComponent.type !== 'date' &&
            tempComponent.type !== 'switch' && (
              <div>
                <Label htmlFor='placeholder'>Placeholder</Label>
                <Input
                  id='placeholder'
                  value={tempComponent.placeholder}
                  onChange={(e) => handleChange('placeholder', e.target.value)}
                />
              </div>
            )}
          {(tempComponent.type === 'radio' || tempComponent.type === 'select') && (
            <div>
              <Label htmlFor='options'>Options (comma-separated)</Label>
              <Input
                id='options'
                onChange={(e) =>
                  handleChange(
                    'options',
                    e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s)
                  )
                }
              />
            </div>
          )}
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='required'
              checked={tempComponent.required}
              onCheckedChange={(checked) => handleChange('required', checked === true)}
            />
            <Label htmlFor='required'>Required</Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={'outline'}
            type='button'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
