import React from 'react';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <div
            key={step.label}
            className={`flex flex-col items-center ${
              index < steps.length - 1 ? 'w-full' : ''
            }`}
          >
            <div className="flex items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <StepIcon size={20} />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-full ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-2 text-sm ${
                isActive ? 'text-indigo-600 font-medium' : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;