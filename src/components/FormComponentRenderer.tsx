import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FormComponent } from '../hooks/useFormBuilder';
import { Switch } from './ui/switch';
import { Calendar } from './ui/calendar';

interface FormComponentRendererProps {
  component: FormComponent;
}

export function FormComponentRenderer({ component }: FormComponentRendererProps) {
  switch (component.type) {
    case 'text':
      return <Input placeholder={component.placeholder} />;
    case 'textarea':
      return <Textarea placeholder={component.placeholder} />;
    case 'number':
      return (
        <Input
          type='number'
          placeholder={component.placeholder}
        />
      );
    case 'checkbox':
      return (
        <div className='flex items-center space-x-2'>
          <Checkbox id={component.id} />
          <Label htmlFor={component.id}>{component.label}</Label>
        </div>
      );
    case 'switch':
      return (
        <div className='flex items-center space-x-2'>
          <Switch id={component.id} />
          <Label htmlFor={component.id}>{component.label}</Label>
        </div>
      );
    case 'date':
      return <Calendar />;
    case 'radio':
      return (
        <RadioGroup>
          {component.options?.map((option: string, index: number) => (
            <div
              key={index}
              className='flex items-center space-x-2'
            >
              <RadioGroupItem
                value={option}
                id={`${component.id}-${index}`}
              />
              <Label htmlFor={`${component.id}-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case 'select':
      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select an option' />
          </SelectTrigger>
          <SelectContent>
            {component.options?.map((option: string, index: number) => (
              <SelectItem
                key={index}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    default:
      return null;
  }
}
