"use client";

import { useState, useEffect } from "react";
import { Camera, Plus, X, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploader from "@/components/ImageUploader";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { div } from "framer-motion/client";
import {
  addPantryItemManually,
  saveToPantry,
  scanPantryImage,
} from "@/actions/pantry.actions";

const AddToPantryModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("scan");
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedIngredients, setScannedIngredients] = useState([]);
  const [manualItem, setManualItem] = useState({ name: "", quantity: "" });

  // Scan image
  const {
    loading: scanning,
    data: scanData,
    fn: scanImage,
  } = useFetch(scanPantryImage);

  // Save scanned items
  const {
    loading: saving,
    data: saveData,
    fn: saveScannedItems,
  } = useFetch(saveToPantry);

  // Add manual item
  const {
    loading: adding,
    data: addData,
    fn: addManualItem,
  } = useFetch(addPantryItemManually);

  // Handle image selection
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setScannedIngredients([]); // Reset when new image selected
  };

  // Scan image
  const handleScan = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);
    await scanImage(formData);
  };

  // Update scanned ingredients when scan completes
  useEffect(() => {
    if (scanData?.success && scanData?.ingredients) {
      setScannedIngredients(scanData.ingredients);
      toast.success(`Found ${scanData.ingredients.length} ingredients!`);
    }
  }, [scanData]);

  // Handle save scanned items
  const handleSaveScanned = async () => {
    if (scannedIngredients.length === 0) {
      toast.error("No ingredients to save");
      return;
    }

    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(scannedIngredients));
    await saveScannedItems(formData);
  };

  // Reset modal state
  const handleClose = () => {
    setActiveTab("scan");
    setSelectedImage(null);
    setScannedIngredients([]);
    setManualItem({ name: "", quantity: "" });
    onClose();
  };

  // Handle save success
  useEffect(() => {
    if (saveData?.success) {
      toast.success(saveData.message);
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [saveData]);

  // Handle manual add
  const handleAddManual = async (e) => {
    e.preventDefault();
    if (!manualItem.name.trim() || !manualItem.quantity.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", manualItem.name);
    formData.append("quantity", manualItem.quantity);
    await addManualItem(formData);
  };

  // Handle manual add success
  useEffect(() => {
    if (addData?.success) {
      toast.success("Item added to pantry!");
      setManualItem({ name: "", quantity: "" });
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [addData]);

  // Remove scanned ingredient
  const removeIngredient = (index) => {
    setScannedIngredients(scannedIngredients.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl h-128 flex flex-col rounded-xl p-6 py-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl transition-all duration-200">
        <DialogHeader className="shrink-0">
          <DialogTitle>Add to Pantry</DialogTitle>
          <DialogDescription>
            Scan your pantry with AI or add items manually
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-4 flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="relative grid w-full grid-cols-2 h-11 items-center bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden isolation-auto select-none shrink-0">
            {/* AI Scan Trigger */}
            <TabsTrigger
              value="scan"
              className="relative h-full w-full inline-flex items-center justify-center gap-2 px-3 z-10 text-sm font-medium text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors duration-200 outline-none focus-visible:ring-0"
            >
              <Camera className="w-4 h-4" />
              <span>AI Scan</span>

              {activeTab === "scan" && (
                <motion.div
                  layoutId="active-pantry-tab"
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] -z-10 transform-gpu"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                />
              )}
            </TabsTrigger>

            {/* Add Manually Trigger */}
            <TabsTrigger
              value="manual"
              className="relative h-full w-full inline-flex items-center justify-center gap-2 px-3 z-10 text-sm font-medium text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors duration-200 outline-none focus-visible:ring-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Manually</span>

              {activeTab === "manual" && (
                <motion.div
                  layoutId="active-pantry-tab"
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] -z-10 transform-gpu"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                />
              )}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4 pr-1">
            {/* AI Scan Tab */}
            <TabsContent
              value="scan"
              className="space-y-6 outline-none mt-0 data-[state=inactive]:hidden "
            >
              {scannedIngredients.length === 0 ? (
                <div className="space-y-8">
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    loading={scanning}
                  />
                  {selectedImage && !scanning && (
                    <Button
                      onClick={handleScan}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg rounded-xl transition-all duration-200"
                      disabled={scanning}
                    >
                      {scanning ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Camera className="w-5 h-5 mr-2" />
                          Scan Image
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold text-stone-900 ">
                        Review Detected Items
                      </h3>
                      <p className="text-xs text-stone-600 ">
                        Found {scannedIngredients.length} ingredients
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setScannedIngredients([]);
                        setSelectedImage(null);
                      }}
                      className="gap-2 rounded-lg mr-2"
                    >
                      <Camera className="w-4 h-4" />
                      Scan Again
                    </Button>
                  </div>

                  <div className="space-y-3 pr-1">
                    {scannedIngredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-neutral-900 rounded-xl border border-stone-200 dark:border-neutral-800"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-stone-900 dark:text-stone-100">
                            {ingredient.name}
                          </div>
                          <div className="text-sm text-stone-500 dark:text-stone-400">
                            {ingredient.quantity}
                          </div>
                        </div>
                        {ingredient.confidence && (
                          <Badge
                            variant="outline"
                            className="text-xs text-green-700 border-green-200 dark:text-green-400 dark:border-green-900/50"
                          >
                            {Math.round(ingredient.confidence * 100)}%
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeIngredient(index)}
                          className="text-stone-600 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleSaveScanned}
                    disabled={saving || scannedIngredients.length === 0}
                    className="bg-green-600 hover:bg-green-700 text-white h-12 w-full rounded-xl transition-all duration-200"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Save {scannedIngredients.length} Items to Pantry
                      </>
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Manual Add Tab */}
            <TabsContent
              value="manual"
              className="outline-none mt-0 data-[state=inactive]:hidden"
            >
              <form onSubmit={handleAddManual} className="space-y-5 mt-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-neutral-300 mb-2">
                    Ingredient Name
                  </label>
                  <input
                    type="text"
                    value={manualItem.name}
                    onChange={(e) =>
                      setManualItem({ ...manualItem, name: e.target.value })
                    }
                    placeholder="e.g., Flour, Milk, Eggs"
                    className="w-full px-4 py-3 border border-stone-200 dark:border-neutral-800 bg-transparent dark:bg-neutral-900/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 dark:text-stone-100"
                    disabled={adding}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-neutral-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={manualItem.quantity}
                    onChange={(e) =>
                      setManualItem({ ...manualItem, quantity: e.target.value })
                    }
                    placeholder="e.g., 500g, 2 cups, 3 pieces"
                    className="w-full px-4 py-3 border border-stone-200 dark:border-neutral-800 bg-transparent dark:bg-neutral-900/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 dark:text-stone-100"
                    disabled={adding}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={adding}
                  className="bg-orange-600 hover:bg-orange-700 text-white h-12 w-full rounded-xl transition-all duration-200 mt-5"
                >
                  {adding ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add Item
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPantryModal;
