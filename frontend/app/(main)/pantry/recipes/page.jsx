"use client";

import { useEffect } from "react";
import {
  ArrowLeft,
  ChefHat,
  Loader2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Package,
} from "lucide-react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { getRecipesByPantryIngredients } from "@/actions/recipe.action";
import { Badge } from "@/components/ui/badge";
import RecipeCard from "@/components/RecipeCard ";
import PricingModal from "@/components/PricingModal";
import { Button } from "@/components/ui/button";

const PantryRecipesPage = () => {
  const {
    loading,
    data: recipesData,
    fn: fetchSuggestions,
  } = useFetch(getRecipesByPantryIngredients);

  // Load suggestions on mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  const recipes = recipesData?.recipes || [];
  const ingredientsUsed = recipesData?.ingredientsUsed || "";

  return (
    <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/pantry"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 transition-colors mb-6 font-medium group text-sm sm:text-base cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Pantry
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <ChefHat className="w-14 h-14 sm:w-18 sm:h-18 text-green-600 shrink-0" />
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-none mb-2">
                What Can I Cook?
              </h1>
              <p className="text-sm sm:text-base text-stone-600 font-light">
                AI-powered recipe suggestions based on your pantry
              </p>
            </div>
          </div>

          {/* Ingredients Used Box */}
          {ingredientsUsed && (
            <div className="bg-white p-4 border-2 border-stone-200 rounded-xl mb-4 shadow-xs max-w-full">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-0.5 tracking-tight">
                    Your Available Ingredients:
                  </h3>
                  <p className="text-stone-600 text-sm font-light break-words leading-relaxed">
                    {ingredientsUsed}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Usage Stats Badge */}
          {recipesData !== undefined && (
            <div className="bg-orange-50 p-3.5 sm:p-4 border-2 border-orange-200 rounded-xl inline-flex items-center gap-3 shadow-xs max-w-full">
              <Sparkles className="w-5 h-5 text-orange-600 shrink-0" />
              <div className="text-sm tracking-tight overflow-hidden text-ellipsis">
                {recipesData.recommendationsLimit === "unlimited" ? (
                  <>
                    <span className="font-bold text-green-600 mr-1">∞</span>
                    <span className="text-orange-700 font-light">
                      Unlimited AI recommendations (Pro Plan)
                    </span>
                  </>
                ) : (
                  <span className="text-orange-700 font-light">
                    Upgrade to Pro for unlimited AI recommendations
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
              Finding Perfect Recipes...
            </h2>
            <p className="text-stone-600 font-light text-sm sm:text-base">
              Our AI chef is analyzing your ingredients
            </p>
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && recipes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  Recipe Suggestions
                </h2>
              </div>
              <Badge
                variant="outline"
                className="border-2 border-stone-900 text-stone-900 font-bold uppercase tracking-wide rounded-lg px-2.5"
              >
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} variant="pantry" />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                onClick={() => fetchSuggestions(new FormData())}
                variant="outline"
                className="w-full sm:w-auto border-2 border-stone-900 hover:bg-stone-900 hover:text-white gap-2 rounded-xl cursor-pointer shadow-xs font-semibold py-5 px-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get New Suggestions
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Empty Pantry State */}
        {!loading && recipes.length === 0 && recipesData?.success === false && (
          <div className="bg-white p-8 sm:p-12 text-center border-2 border-dashed border-stone-200 rounded-2xl shadow-xs max-w-2xl mx-auto">
            <div className="bg-orange-50 w-16 h-16 sm:w-20 sm:h-20 border-2 border-orange-200 rounded-xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
              Your Pantry is Empty
            </h3>
            <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-md mx-auto font-light leading-relaxed">
              Add ingredients to your pantry first so we can suggest delicious
              recipes you can make right away!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pantry/scan" className="w-full sm:w-auto">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 rounded-xl cursor-pointer shadow-xs">
                  <Sparkles className="w-4 h-4" />
                  Scan with AI
                </Button>
              </Link>
              <Link href="/pantry" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full border-2 border-stone-900 hover:bg-stone-900 hover:text-white gap-2 rounded-xl cursor-pointer"
                >
                  Add Manually
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Rate Limit Reached */}
        {!loading && recipesData === undefined && (
          <div className="bg-linear-to-br from-orange-50 to-amber-50 p-8 sm:p-12 text-center border-2 border-orange-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <div className="bg-orange-100 w-16 h-16 sm:w-20 sm:h-20 border-2 border-orange-200 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
              Monthly Limit Reached
            </h3>
            <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-md mx-auto font-light leading-relaxed">
              You&apos;ve used all your AI recipe recommendations this month.
              Upgrade to Pro for unlimited premium suggestions!
            </p>
            <PricingModal>
              <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white gap-2 rounded-xl cursor-pointer shadow-xs py-5 px-6 font-semibold">
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            </PricingModal>
          </div>
        )}
      </div>
    </div>
  );
};

export default PantryRecipesPage;
