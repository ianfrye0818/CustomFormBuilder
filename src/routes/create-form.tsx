import { FormBuilder } from '@/components/FormBuilder';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/create-form')({
  component: RouteComponent,
});

function RouteComponent() {
  return <FormBuilder />;
}
