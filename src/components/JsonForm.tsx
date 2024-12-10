import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormComponent } from '@/hooks/useFormBuilder';
import { RenderFormComponent } from './FormPreviewRenderComponents';

interface FormPreviewProps {
  formJson: string;
}

export function FormPreview({ formJson }: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const formComponents: FormComponent[] = JSON.parse(formJson);

  const handleInputChange = (id: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // TODO: send the data to your server
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        {formComponents.map((component) => (
          <div
            key={component.id}
            className='flex flex-col gap-2'
          >
            <Label htmlFor={component.id}>{component.label}</Label>
            <RenderFormComponent
              component={component}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
        ))}
        <Button type='submit'>Submit</Button>
      </form>
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Form Data:</h3>
        <pre className='text-sm'>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </>
  );
}
