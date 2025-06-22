import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
  tooltip?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon: Icon, children, tooltip }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {tooltip && (
          <div className="group relative">
            <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs cursor-help">
              ?
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default FormField;