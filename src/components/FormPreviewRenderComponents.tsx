import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DatePicker } from '@/components/ui/Date-picker';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FormComponent } from '@/hooks/useFormBuilder';

interface RenderFormComponentProps {
  component: FormComponent;
  formData: Record<string, any>;
  handleInputChange: (name: string, value: any) => void;
}

export function RenderFormComponent({
  component,
  formData,
  handleInputChange,
}: RenderFormComponentProps) {
  switch (component.type) {
    case 'text':
      return (
        <Input
          id={component.id}
          placeholder={component.placeholder}
          value={formData[component.name] || ''}
          name={component.name}
          onChange={(e) => handleInputChange(component.name, e.target.value)}
        />
      );
    case 'textarea':
      return (
        <Textarea
          id={component.id}
          name={component.name}
          placeholder={component.placeholder}
          value={formData[component.name] || ''}
          onChange={(e) => handleInputChange(component.name, e.target.value)}
        />
      );
    case 'number':
      return (
        <Input
          type='number'
          id={component.id}
          name={component.name}
          placeholder={component.placeholder}
          value={formData[component.name] || ''}
          onChange={(e) => handleInputChange(component.name, e.target.value)}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          id={component.id}
          name={component.name}
          checked={formData[component.name] || false}
          onCheckedChange={(checked) => handleInputChange(component.name, checked)}
        />
      );
    case 'switch':
      return (
        <Switch
          id={component.id}
          name={component.name}
          checked={formData[component.name] || false}
          onCheckedChange={(checked) => handleInputChange(component.name, checked)}
        />
      );
    case 'date':
      return (
        <DatePicker
          id={component.id}
          name={component.name}
          selectedDate={formData[component.name] || new Date()}
          onSelect={(date) => handleInputChange(component.name, date)}
        />
      );
    case 'radio':
      return (
        <RadioGroup
          value={formData[component.name] || ''}
          onValueChange={(value) => handleInputChange(component.name, value)}
          name={component.name}
        >
          {component.options?.map((option, index) => (
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
        <Select
          value={formData[component.name] || ''}
          onValueChange={(value) => handleInputChange(component.name, value)}
          name={component.name}
        >
          <SelectTrigger>
            <SelectValue placeholder={component.placeholder || 'Select an option'} />
          </SelectTrigger>
          <SelectContent>
            {component.options?.map((option, index) => (
              <SelectItem
                key={index}
                value={option || `option-${index + 1}`}
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
