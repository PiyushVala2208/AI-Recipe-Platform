"use client";

import { useEffect } from "react";
import { Bookmark, Loader2, ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { getSavedRecipes } from "@/actions/recipe.action";
import RecipeCard from "@/components/RecipeCard ";

export default function SavedRecipesPage() {
  const {
    loading,
    data: recipesData,
    fn: fetchSavedRecipes,
  } = useFetch(getSavedRecipes);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const rawRecipes = recipesData?.recipes || [];

  // Deduplicate recipes by documentId
  const recipes = rawRecipes.filter(
    (recipe, index, self) =>
      recipe?.documentId &&
      self.findIndex((r) => r?.documentId === recipe.documentId) === index,
  );

  return (
    <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 bg-white p-5 sm:p-8 border border-stone-200/80 rounded-2xl shadow-xs">
          <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 shrink-0">
            <Bookmark className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              My Saved Recipes
            </h1>
            <p className="text-sm sm:text-base text-stone-500 font-light mt-0.5">
              Your personal collection of favorite culinary masterpieces
            </p>
          </div>
        </div>

        {/* Loading State Container */}
        {loading && (
          <div className="bg-white border border-stone-200/80 rounded-2xl p-10 sm:p-20 flex flex-col items-center justify-center text-center shadow-xs">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4 shrink-0" />
            <p className="text-sm sm:text-base text-stone-600 font-light">
              Accessing your secure personal collection...
            </p>
          </div>
        )}

        {/* Recipes Responsive Grid Layout */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.documentId}
                recipe={recipe}
                variant="list"
              />
            ))}
          </div>
        )}

        {/* Empty State Platform Box */}
        {!loading && recipes.length === 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-16 text-center border border-dashed border-stone-200/80 shadow-xs max-w-3xl mx-auto">
            <div className="bg-orange-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs border border-orange-100/50">
              <Bookmark className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
              No Saved Recipes Yet
            </h3>
            <p className="text-sm sm:text-base text-stone-500 mb-8 max-w-md mx-auto font-light leading-relaxed">
              Start exploring curated recipes and lock in your favorites to
              construct your premium cookbook!
            </p>

            {/* Action Stack: Adjusts perfectly from stack to row */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl px-5 py-5 text-sm gap-2 cursor-pointer shadow-xs transition-all flex items-center justify-center">
                  <ChefHat className="w-4 h-4 shrink-0" />
                  Explore Recipes
                </Button>
              </Link>
              <Link href="/pantry" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold rounded-xl px-5 py-5 text-sm gap-2 cursor-pointer transition-all flex items-center justify-center"
                >
                  Check Your Pantry
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
