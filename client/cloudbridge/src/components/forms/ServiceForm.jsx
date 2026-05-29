import React from "react";
import Button from "../layout/components/Button";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition duration-150 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-100";

const ServiceForm = ({
  values,
  errors,
  categories,
  onChange,
  onStatusChange,
  onSubmit,
  onCancel,
  isSaving,
  submitLabel = "Add Service",
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <div className="space-y-1">
        <label htmlFor="service-name" className="block text-sm font-medium text-slate-700">
          Service Name
        </label>
        <input
          id="service-name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          className={inputClass}
          placeholder="Service name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "service-name-error" : undefined}
          required
        />
        {errors.name && (
          <p id="service-name-error" className="text-xs text-rose-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="service-category" className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="service-category"
            name="category"
            value={values.category}
            onChange={(event) => onChange("category", event.target.value)}
            className={inputClass}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "service-category-error" : undefined}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="service-category-error" className="text-xs text-rose-600">
              {errors.category}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="service-specs" className="block text-sm font-medium text-slate-700">
            Specifications
          </label>
          <input
            id="service-specs"
            name="specs"
            type="text"
            value={values.specs}
            onChange={(event) => onChange("specs", event.target.value)}
            className={inputClass}
            placeholder="e.g., 2 vCPU, 4GB RAM"
            aria-invalid={Boolean(errors.specs)}
            aria-describedby={errors.specs ? "service-specs-error" : undefined}
            required
          />
          {errors.specs && (
            <p id="service-specs-error" className="text-xs text-rose-600">
              {errors.specs}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="service-price" className="block text-sm font-medium text-slate-700">
            Price/Month
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
              $
            </span>
            <input
              id="service-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={values.price}
              onChange={(event) => onChange("price", event.target.value)}
              className={`${inputClass} pl-8`}
              placeholder="0"
              aria-invalid={Boolean(errors.price)}
              aria-describedby={errors.price ? "service-price-error" : undefined}
              required
            />
          </div>
          {errors.price && (
            <p id="service-price-error" className="text-xs text-rose-600">
              {errors.price}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-slate-700">Status</div>
        <div className="flex items-center gap-4">
          {[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ].map((option) => (
            <label key={option.value} className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name={option.value}
                value={option.value}
                checked={values.status === option.value}
                onChange={() => onStatusChange(option.value)}
                className="h-4 w-4 rounded border border-slate-300 text-blue-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errors.status && (
          <p className="text-xs text-rose-600">{errors.status}</p>
        )}
      </div>

      {errors.submit ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {errors.submit}
        </div>
      ) : null}

      <div className="border-t border-slate-200 pt-4">
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            className="px-4 py-2 text-sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 text-sm shadow-lg shadow-blue-400/40"
            disabled={isSaving}
          >
            {isSaving ? `${submitLabel}...` : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ServiceForm;
