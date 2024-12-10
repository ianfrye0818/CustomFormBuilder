import { FormComponent } from '@/hooks/useFormBuilder';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const removePlaceHolder = (component: FormComponent) => {
  return component.type !== 'select' && component.type !== 'radio' && component.type !== 'checkbox';
};
