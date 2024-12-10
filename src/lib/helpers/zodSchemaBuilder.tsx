import { FormComponent } from '@/hooks/useFormBuilder';
import { z } from 'zod';
export function buildZodSchema(formJson: FormComponent[]) {
  let zodSchema = z.object({});

  formJson.forEach((component) => {
    const type = component.type;
    const required = component.required;

    let fieldSchema;
    switch (type) {
      case 'text':
        fieldSchema = z.string();
        break;
      case 'number':
        fieldSchema = z.number();
        break;
      case 'checkbox':
        fieldSchema = z.boolean();
        break;
      case 'radio':
        fieldSchema = z.string();
        break;
      case 'select':
        fieldSchema = z.string();
        break;
      case 'textarea':
        fieldSchema = z.string();
        break;
      default:
        fieldSchema = z.string();
    }

    // Create a new object with the updated shape
    const newShape = {
      ...zodSchema.shape,
      [component.name]: required ? fieldSchema : fieldSchema.optional(),
    };

    // Create a new schema with the updated shape
    zodSchema = z.object(newShape);
  });

  return zodSchema;
}
