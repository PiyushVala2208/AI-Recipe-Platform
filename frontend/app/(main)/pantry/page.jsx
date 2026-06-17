"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChefHat,
  Loader2,
  Package,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/useFetch";
import {
  getPantryItems,
  deletePantryItem,
  updatePantryItem,
} from "@/actions/pantry.actions";
import { toast } from "sonner";
import AddToPantryModal from "@/components/AddToPantryModal";
import PricingModal from "@/components/PricingModal";

export default function PantryPage() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", quantity: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pantry items
  const {
    loading: loadingItems,
    data: itemsData,
    fn: fetchItems,
  } = useFetch(getPantryItems);

  // Delete item
  const {
    loading: deleting,
    data: deleteData,
    fn: deleteItem,
  } = useFetch(deletePantryItem);

  // Update item
  const {
    loading: updating,
    data: updateData,
    fn: updateItem,
  } = useFetch(updatePantryItem);

  // Load items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Update items when data arrives
  useEffect(() => {
    if (itemsData?.success) {
      setItems(itemsData.items);
    }
  }, [itemsData]);

  // Refresh after delete
  useEffect(() => {
    if (deleteData?.success && !deleting) {
      toast.success("Item removed from pantry");
      fetchItems();
    }
  }, [deleteData]);

  // Refresh after update
  useEffect(() => {
    if (updateData?.success) {
      toast.success("Item updated successfully");
      setEditingId(null);
      fetchItems();
    }
  }, [updateData]);

  // Handle delete
  const handleDelete = async (itemId) => {
    const formData = new FormData();
    formData.append("itemId", itemId);
    await deleteItem(formData);
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item.documentId);
    setEditValues({
      name: item.name,
      quantity: item.quantity,
    });
  };

  // Save edit
  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("itemId", editingId);
    formData.append("name", editValues.name);
    formData.append("quantity", editValues.quantity);
    await updateItem(formData);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", quantity: "" });
  };

  // Handle modal success (refresh items)
  const handleModalSuccess = () => {
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <div className="flex items-start gap-4">
              <Package className="w-12 h-12 sm:w-16 sm:h-16 text-orange-600 shrink-0 mt-1 sm:mt-0" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-none mb-2">
                  My Pantry
                </h1>
                <p className="text-sm sm:text-base text-stone-600 font-light max-w-xl">
                  Manage your ingredients and discover what you can cook
                </p>
              </div>
            </div>

            {/* Add to Pantry Button - Desktop */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex bg-orange-600 hover:bg-orange-700 text-white gap-2 rounded-xl cursor-pointer shadow-xs"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add to Pantry
            </Button>
          </div>

          {/* Add to Pantry Button - Mobile (Full Width) */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="sm:hidden w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 mb-4 rounded-xl cursor-pointer"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add to Pantry
          </Button>

          {/* Usage Stats */}
          {itemsData?.scansLimit !== undefined && (
            <div className="bg-white py-3 px-4 border-2 border-stone-200 rounded-xl inline-flex items-center gap-3 shadow-xs max-w-full">
              <Sparkles className="w-5 h-5 text-orange-600 shrink-0" />
              <div className="text-sm tracking-tight overflow-hidden text-ellipsis">
                {itemsData.scansLimit === "unlimited" ? (
                  <>
                    <span className="font-bold text-green-600 mr-1">∞</span>
                    <span className="text-stone-500">
                      Unlimited AI scans (Pro Plan)
                    </span>
                  </>
                ) : (
                  <PricingModal>
                    <span className="text-stone-500 cursor-pointer hover:text-orange-600 transition-colors">
                      Upgrade to Pro for unlimited Pantry scans
                    </span>
                  </PricingModal>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Card - Find Recipes */}
        {items.length > 0 && (
          <Link href="/pantry/recipes" className="block mb-8 group">
            <div className="bg-linear-to-br from-green-600 to-emerald-500 text-white p-5 sm:p-6 border-2 border-emerald-700 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2.5 sm:p-3 border-2 border-white/30 rounded-xl group-hover:bg-white/30 transition-colors shrink-0">
                  <ChefHat className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg sm:text-xl mb-0.5 sm:mb-1 tracking-tight">
                    What Can I Cook Today?
                  </h3>
                  <p className="text-green-100 text-xs sm:text-sm font-light line-clamp-1">
                    Get AI-powered recipe suggestions from your {items.length}{" "}
                    ingredients
                  </p>
                </div>
                <div className="hidden sm:block shrink-0">
                  <Badge className="bg-white/20 text-white border-2 border-white/30 font-bold uppercase tracking-wide rounded-lg px-2.5 py-1">
                    {items.length} items
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Loading State */}
        {loadingItems && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
            <p className="text-stone-500 font-light">Loading your pantry...</p>
          </div>
        )}

        {/* Pantry Items Grid */}
        {!loadingItems && items.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Your Ingredients
              </h2>
              <Badge
                variant="outline"
                className="text-stone-600 border-2 border-stone-900 font-bold uppercase tracking-wide rounded-lg px-2.5"
              >
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.documentId}
                  className="bg-white p-5 border-2 border-stone-200 rounded-xl hover:border-orange-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between shadow-xs min-h-[140px]"
                >
                  {editingId === item.documentId ? (
                    // Edit Mode
                    <div className="space-y-3 w-full my-auto">
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-stone-200 focus:outline-none focus:border-orange-600 text-sm rounded-lg bg-stone-50/50"
                        placeholder="Ingredient name"
                      />
                      <input
                        type="text"
                        value={editValues.quantity}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            quantity: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-stone-200 focus:outline-none focus:border-orange-600 text-sm rounded-lg bg-stone-50/50"
                        placeholder="Quantity"
                      />
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          disabled={updating}
                          className="flex-1 bg-green-600 hover:bg-green-700 border-2 border-green-700 rounded-lg cursor-pointer"
                        >
                          {updating ? (
                            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                          ) : (
                            <Check className="w-4 h-4 mx-auto" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={updating}
                          className="flex-1 border-2 border-stone-900 hover:bg-stone-900 hover:text-white rounded-lg cursor-pointer"
                        >
                          <X className="w-4 h-4 mx-auto" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex flex-col justify-between h-full w-full">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg text-stone-900 tracking-tight line-clamp-1 mb-0.5">
                            {item.name}
                          </h3>
                          <p className="text-stone-500 text-sm font-light line-clamp-1">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-1.5 sm:p-2 border-2 border-transparent rounded-lg hover:border-orange-600 hover:bg-orange-50 transition-all text-stone-600 hover:text-orange-600 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.documentId)}
                            disabled={deleting}
                            className="p-1.5 sm:p-2 border-2 border-transparent rounded-lg hover:border-red-600 hover:bg-red-50 transition-all text-stone-600 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-stone-400 mt-auto">
                        Added {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loadingItems && items.length === 0 && (
          <div className="bg-white p-8 sm:p-12 text-center border-2 border-dashed border-stone-200 rounded-2xl shadow-xs max-w-2xl mx-auto">
            <div className="bg-orange-50 w-16 h-16 sm:w-20 sm:h-20 border-2 border-orange-200 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
              Your Pantry is Empty
            </h3>
            <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-md mx-auto font-light leading-relaxed">
              Start by scanning your pantry with AI or adding ingredients
              manually to discover amazing recipes!
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white gap-2 rounded-xl cursor-pointer shadow-xs"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add Your First Item
            </Button>
          </div>
        )}
      </div>

      {/* Add to Pantry Modal */}
      <AddToPantryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
