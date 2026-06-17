"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function HowToCookModal() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setRecipeName(""); // Reset input when closing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name.");
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="hover:text-orange-600 transition-colors flex items-center gap-1.5 text-sm font-medium text-stone-600 cursor-pointer group">
          <ChefHat className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>How to Cook?</span>
        </button>
      </DialogTrigger>

      {/* Ultra-responsive dialog containment box */}
      <DialogContent className="w-[92vw] sm:max-w-lg rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200/80 bg-white gap-0 shadow-xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl sm:text-2xl font-serif font-bold flex items-center gap-2 text-stone-900 tracking-tight">
            <div className="bg-orange-50 p-2 rounded-xl border border-orange-100 shrink-0">
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            How to Cook?
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-stone-500 font-light mt-2 leading-relaxed">
            Enter any recipe name and our AI chef will guide you through the
            cooking process step-by-step.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:space-y-6">
          {/* Recipe Input field */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-stone-700">
              What do you like to cook?
            </label>
            <div className="relative group">
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g., Chocolate Cake, Pasta Carbonara"
                className="w-full text-sm sm:text-base px-4 py-3 pr-12 border border-stone-200/80 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-stone-900 placeholder:text-stone-400 transition-all"
                autoFocus
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-400 pointer-events-none group-focus-within:text-orange-500 transition-colors" />
            </div>
          </div>

          {/* Micro-pills / Suggestions Box */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/60">
            <h4 className="text-xs font-semibold text-stone-700 mb-2.5 flex items-center gap-1">
              <span>💡</span> Try These:
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                "Chocolate Brownies",
                "Caesar Salad",
                "Spaghetti Bolognese",
                "Pasta Carbonara",
              ].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setRecipeName(example)}
                  className="px-2.5 py-1.5 sm:px-3 bg-white text-stone-700 border border-stone-200 rounded-lg text-xs sm:text-sm hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all cursor-pointer font-medium shadow-2xs"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Action Submission Button */}
          <Button
            type="submit"
            disabled={!recipeName.trim()}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm h-11 sm:h-12 rounded-xl gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>Get Recipe</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default HowToCookModal;
