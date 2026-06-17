import useFetch from "@/hooks/useFetch";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import RecipeCard from "./RecipeCard ";

function RecipeGrid({
  type, // "category" or "cuisine"
  value, // actual category/cuisine name
  fetchAction, // server action to fetch meals
  backLink = "/dashboard",
}) {
  const { loading, data, fn: fetchMeals } = useFetch(fetchAction);

  useEffect(() => {
    if (value) {
      // Capitalize first letter for API call
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
      fetchMeals(formattedValue);
    }
  }, [value]);

  const meals = data?.meals || [];
  const displayName = value?.replace(/-/g, " "); // Convert "saudi-arabian" to "saudi arabian"

  return (
    <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 bg-white p-5 sm:p-8 border border-stone-200/80 rounded-2xl shadow-xs">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-sm sm:text-base text-stone-600 hover:text-orange-600 transition-colors mb-4 font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 capitalize tracking-tight leading-tight">
            {displayName}{" "}
            <span className="text-orange-600">
              {type === "cuisine" ? "Cuisine" : "Recipes"}
            </span>
          </h1>

          {!loading && meals.length > 0 && (
            <p className="text-xs sm:text-sm md:text-base text-stone-500 font-light mt-2">
              {meals.length} delicious {displayName}{" "}
              {type === "cuisine" ? "dishes" : "recipes"} carefully curated for
              you
            </p>
          )}
        </div>

        {/* Loading State Box */}
        {loading && (
          <div className="bg-white border border-stone-200/80 rounded-2xl p-12 sm:p-24 flex flex-col items-center justify-center text-center shadow-xs">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4 shrink-0" />
            <p className="text-sm sm:text-base text-stone-600 font-light">
              Gathering premium {displayName} options...
            </p>
          </div>
        )}

        {/* Meals Grid Layout */}
        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} recipe={meal} variant="grid" />
            ))}
          </div>
        )}

        {/* Premium Empty State Platform Card */}
        {!loading && meals.length === 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-16 text-center border border-dashed border-stone-200/80 shadow-xs max-w-2xl mx-auto">
            <div className="bg-orange-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs border border-orange-100/50 text-3xl sm:text-4xl">
              🍽️
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
              No recipes found
            </h3>
            <p className="text-sm sm:text-base text-stone-500 mb-6 max-w-md mx-auto font-light leading-relaxed">
              We couldn&apos;t find any {displayName}{" "}
              {type === "cuisine" ? "dishes" : "recipes"} right now.
            </p>
            <Link href={backLink} className="inline-block">
              <span className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl px-5 py-3.5 transition-all shadow-xs cursor-pointer group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Go back to explore more
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeGrid;
