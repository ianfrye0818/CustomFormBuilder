import { FormPreview } from '@/components/JsonForm';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const paramsSchema = z.object({
  formJson: z.string().optional(),
});

export const Route = createFileRoute('/render-form')({
  component: RouteComponent,
  validateSearch: (search) => paramsSchema.parse(search),
});

export default function RouteComponent() {
  const formJson = Route.useSearch().formJson || '';
  return (
    <div className='p-2 container mx-auto'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>Form Preview</h2>
        <div className='border rounded-md p-4'>
          <FormPreview formJson={formJson} />
        </div>
      </div>
    </div>
  );
}
