import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SelectSingleEventHandler } from 'react-day-picker';

interface DatePickerProps {
  selectedDate: Date;
  onSelect: SelectSingleEventHandler;

  id: string;
  name: string;
}

export function DatePicker({ selectedDate, onSelect, id, name }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0'
        align='start'
      >
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={onSelect}
          initialFocus
          id={id}
        />
      </PopoverContent>
    </Popover>
  );
}
