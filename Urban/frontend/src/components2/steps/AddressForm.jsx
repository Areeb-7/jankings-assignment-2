import React from 'react';
import { useForm } from 'react-hook-form';

const AddressForm = ({ data, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
          Area/Street
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="area"
            {...register('area', { required: 'Area is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.area && (
            <p className="mt-2 text-sm text-red-600">{errors.area.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="city"
            {...register('city', { required: 'City is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.city && (
            <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="state"
            {...register('state', { required: 'State is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.state && (
            <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
          Zip Code
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="zipCode"
            {...register('zipCode', { required: 'Zip code is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.zipCode && (
            <p className="mt-2 text-sm text-red-600">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue
      </button>
    </form>
  );
};

export default AddressForm;