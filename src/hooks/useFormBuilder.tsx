import { useState } from 'react';

export const formOptionTypesList = [
  'text',
  'textarea',
  'number',
  'checkbox',
  'radio',
  'select',
  'date',
  'switch',
] as const;

export type FormComponentType = (typeof formOptionTypesList)[number];

export interface FormComponent {
  id: string;
  name: string;
  type: FormComponentType;
  label: string;
  placeholder?: string;
  options?: string[]; // for radio and select
  required?: boolean;
}

export function useFormBuilder() {
  const [components, setComponents] = useState<FormComponent[]>([]);

  const addComponent = (type: FormComponentType) => {
    const newComponent: FormComponent = {
      id: Date.now().toString(),
      type,
      label: '',
      name: '',
      required: false,
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (id: string, updates: Partial<FormComponent>) => {
    setComponents(components.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)));
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter((comp) => comp.id !== id));
  };

  const moveComponent = (fromIndex: number, toIndex: number) => {
    const newComponents = Array.from(components);
    const [reorderedItem] = newComponents.splice(fromIndex, 1);
    newComponents.splice(toIndex, 0, reorderedItem);
    setComponents(newComponents);
  };

  const validateComponent = (component: FormComponent) => {
    if (component.name.length < 2) {
      alert('Component name must be at least 2 characters long.');
      return false;
    }
    if (component.label.length === 0) {
      alert('Component label is required.');
      return false;
    }

    if (
      (component.type === 'radio' || component.type === 'select') &&
      (!component.options || component.options.length === 0)
    ) {
      alert('Radio and select components must have at least one option.');
      return false;
    }

    return true;
  };

  const validateForm = () => {
    components.forEach((component) => {
      if (!validateComponent(component)) {
        return false;
      }
    });
    return true;
    // if (components.some((component) => component.name.length < 2)) {
    //   alert('All components must have a name of at least 2 characters!');
    //   return false;
    // }

    // const nameSet = new Set(components.map((component) => component.name));
    // if (nameSet.size !== components.length) {
    //   alert('Component names must be unique!');
    //   return false;
    // }

    // if (
    //   components.some(
    //     (component) =>
    //       (component.type === 'radio' || component.type === 'select') &&
    //       (!component.options || component.options.length === 0)
    //   )
    // ) {
    //   alert('All radio and select components must have options!');
    //   return false;
    // }

    // return true;
  };

  const getFormJson = () => JSON.stringify(components, null, 2);

  return {
    components,
    addComponent,
    updateComponent,
    removeComponent,
    moveComponent,
    getFormJson,
    validateForm,
    validateComponent,
  };
}
