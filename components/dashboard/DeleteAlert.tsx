"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DeleteAlertProps } from "@/types";
import { deleteItem } from "@/lib/actions";

export const DeleteAlert = ({
  modelId,
  modelName,
  isSingle,
  ids,
  open,
  setOpen,
  onDeleteComplete,
}: DeleteAlertProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteSingleModel = async () => {
    try {
      setIsDeleting(true);
      if (modelId) {
        await deleteItem(modelId);
      } else {
        throw new Error("Model ID is undefined");
      }
      router.refresh();

      toast({
        title: "Success",
        description: `"${modelName}" has been deleted successfully`,
      });

      onDeleteComplete?.();
    } catch (error) {
      console.error("Error deleting item:", error);

      toast({
        title: "Error",
        description: `Failed to delete "${modelName}". Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  const deleteAllSelectedModels = async (ids: string[]) => {
    try {
      setIsDeleting(true);
      await Promise.all(ids.map((id: string) => deleteItem(id)));
      router.refresh();

      toast({
        title: "Success",
        description: "Selected items have been deleted successfully",
      });

      onDeleteComplete?.();
    } catch (error) {
      console.error("Error deleting models:", error);

      toast({
        title: "Error",
        description: "Failed to delete selected items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {isSingle ? `"${modelName}"` : "Selected Items"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove{" "}
            {isSingle ? "this item" : "all selected items"} and all associated
            data. Published content may become unavailable, and this action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (isSingle) {
                await deleteSingleModel();
              } else {
                await deleteAllSelectedModels(ids || []);
              }
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Deleting...
              </div>
            ) : (
              `Delete ${isSingle ? "Item" : "Items"}`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
