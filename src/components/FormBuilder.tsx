import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  FormComponent,
  FormComponentType,
  formOptionTypesList,
  useFormBuilder,
} from '../hooks/useFormBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from '@tanstack/react-router';
import { capitalizeFirstLetter } from '@/lib/utils';
import { buildZodSchema } from '@/lib/helpers/zodSchemaBuilder';
import { FormComponentRenderer } from './FormComponentRenderer';
import { FormComponentOptionsDialog } from './FormComponentsOptionsDialog';

export function FormBuilder() {
  const {
    components,
    addComponent,
    updateComponent,
    removeComponent,
    moveComponent,
    getFormJson,
    validateForm,
  } = useFormBuilder();
  const router = useRouter();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    moveComponent(result.source.index, result.destination.index);
  };

  const handleGenerateForm = () => {
    if (validateForm()) {
      const formJson = getFormJson();
      const formSchema = buildZodSchema(components);
      router.navigate({ to: '/render-form', search: { formJson } });
    }
  };
  console.log({ componentsFromFormBuilder: components });
  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold mb-4'>Form Builder</h1>
        <Button onClick={handleGenerateForm}>Generate Form</Button>
      </div>
      <div className='flex gap-10'>
        <div className='p-2'>
          <h2 className='text-xl font-semibold mb-2'>Available Components</h2>
          <div className='space-y-2 flex flex-col gap-2'>
            <Button onClick={() => addComponent('text')}>Add Text Input</Button>
            <Button onClick={() => addComponent('textarea')}>Add Textarea</Button>
            <Button onClick={() => addComponent('number')}>Add Number Input</Button>
            <Button onClick={() => addComponent('checkbox')}>Add Checkbox</Button>
            <Button onClick={() => addComponent('radio')}>Add Radio Group</Button>
            <Button onClick={() => addComponent('select')}>Add Select</Button>
            <Button onClick={() => addComponent('date')}>Add Date</Button>
            <Button onClick={() => addComponent('switch')}>Add Switch</Button>
          </div>
        </div>
        <div className='flex-1 p-2'>
          <h2 className='text-xl font-semibold mb-2'>Form Items</h2>
          <div className='text-sm text-gray-500 mb-4'>
            <p>Drag and drop components to reorder them</p>
            <p>
              Click Edit Options to change properties. All items must have a name before generating
            </p>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='form-components'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='space-y-4'
                >
                  {components.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CardHeader>
                            <p className='text-xs'>
                              Form Component Type:{' '}
                              <span className='font-bold'>
                                {capitalizeFirstLetter(component.type)}
                              </span>
                            </p>
                            <CardTitle>
                              {component.label} {component.required && '(Required)'}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className='space-y-2'>
                              <FormComponentRenderer component={component} />
                              <div className='flex justify-end gap-2'>
                                <FormComponentOptionsDialog
                                  component={component}
                                  updateComponent={updateComponent}
                                />
                                <Button
                                  variant='destructive'
                                  onClick={() => removeComponent(component.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
