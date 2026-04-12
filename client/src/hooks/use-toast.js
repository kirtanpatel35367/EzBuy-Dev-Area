import { toast as sonnerToast } from "sonner";

/**
 * useToast Bridge
 * Connects the legacy Shadcn UI toast hook calls to the new Premium Sonner system.
 * This ensures every notification in the app is automatically upgraded to the boutique aesthetic.
 */

const toast = ({ title, description, variant, ...props }) => {
  const options = {
    description: description,
    ...props,
  };

  // Map Shadcn variants to Sonner types/styles
  if (variant === "destructive" || variant === "error") {
    return sonnerToast.error(title, options);
  } else if (variant === "success") {
    return sonnerToast.success(title, options);
  } else if (variant === "info") {
    return sonnerToast.info(title, options);
  }

  // Default toast
  return sonnerToast(title, options);
};

function useToast() {
  return {
    toast,
    dismiss: (id) => sonnerToast.dismiss(id),
  };
}

export { useToast, toast };
