import { useEffect, useState } from "react";
import Modal from "./Modal";
import ServiceForm from "../forms/ServiceForm";
import useAxios from "../../hooks/useAxios";
import { useToast } from "../../context/ToastContext";

const DEFAULT_CATEGORIES = ["Compute", "Database", "Storage", "Network"];
const INITIAL_FORM = {
  name: "",
  category: "",
  specs: "",
  price: "",
  status: "active",
};

const AddServiceModal = ({
  isOpen,
  onClose,
  onCreate,
  categories = DEFAULT_CATEGORIES,
  service = null,
}) => {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const api = useAxios();
  const { toast } = useToast();

  const isEditing = Boolean(service?.id);

  useEffect(() => {
    if (isOpen) {
      setFormValues(
        service
          ? {
              name: service.name ?? "",
              category: service.category ?? "",
              specs:
                service.specifications ?? service.specs ?? "",
              price:
                service.price?.toString() ??
                service.startingPrice?.toString() ??
                "",
              status:
                service.status ??
                (service.isActive === false ? "inactive" : "active"),
            }
          : INITIAL_FORM
      );
      setErrors({});
      setIsSaving(false);
    }
  }, [isOpen, service]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleStatusChange = (value) => {
    setFormValues((prev) => ({ ...prev, status: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.status;
      return next;
    });
  };

  const validateForm = () => {
    const validation = {};
    if (!formValues.name.trim()) {
      validation.name = "Service name is required.";
    }
    if (!formValues.category) {
      validation.category = "Category is required.";
    }
    if (!formValues.specs.trim()) {
      validation.specs = "Specifications are required.";
    }
    const priceValue = Number(formValues.price);
    if (formValues.price === "" || Number.isNaN(priceValue)) {
      validation.price = "Price is required.";
    } else if (priceValue < 0) {
      validation.price = "Price cannot be negative.";
    }
    if (!["active", "inactive"].includes(formValues.status)) {
      validation.status = "Select a valid status.";
    }
    return validation;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateForm();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        name: formValues.name.trim(),
        category: formValues.category,
        specifications: formValues.specs.trim(),
        basePrice: Number(Number(formValues.price).toFixed(2)),
        currency: "USD",
        billingInterval: "MONTHLY",
        isActive: formValues.status === "active",
      };

      console.log("Submitting service form values:", formValues);
      console.log("Submitting service payload:", payload);

      const response = isEditing
        ? await api.put(`/admin/services/${service.id}`, payload)
        : await api.post("/admin/services", payload);

      const savedService = response.data?.data ?? response.data;
      await onCreate(savedService);

      toast.success(
        isEditing ? "Service updated successfully." : "Service added successfully."
      );
      onClose();
    } catch (error) {
      console.error("Failed to save service:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Unable to save service. Please try again.";
      toast.error(message);
      setErrors((prev) => ({
        ...prev,
        submit: message,
      }));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Service">
      <ServiceForm
        values={formValues}
        errors={errors}
        categories={categories}
        onChange={handleChange}
        onStatusChange={handleStatusChange}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSaving={isSaving}
        submitLabel={isEditing ? "Save Changes" : "Add Service"}
      />
    </Modal>
  );
};

export default AddServiceModal;
