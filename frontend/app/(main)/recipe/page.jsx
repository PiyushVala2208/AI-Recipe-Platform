"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Flame,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/useFetch";
import {
  getOrGenerateRecipe,
  saveRecipeToCollection,
  removeRecipeFromCollection,
} from "@/actions/recipe.action";
import { toast } from "sonner";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RecipePDF } from "@/components/RecipePDF";
import { ClockLoader } from "react-spinners";
import ProLockedSection from "@/components/ProLockedSection";

function RecipeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeName = searchParams.get("cook");

  const [recipe, setRecipe] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Get or generate recipe
  const {
    loading: loadingRecipe,
    data: recipeData,
    fn: fetchRecipe,
  } = useFetch(getOrGenerateRecipe);

  // Save to collection
  const {
    loading: saving,
    data: saveData,
    fn: saveToCollection,
  } = useFetch(saveRecipeToCollection);

  // Remove from collection
  const {
    loading: removing,
    data: removeData,
    fn: removeFromCollection,
  } = useFetch(removeRecipeFromCollection);

  // Fetch recipe on mount
  useEffect(() => {
    if (recipeName && !recipe) {
      const formData = new FormData();
      formData.append("recipeName", recipeName);
      fetchRecipe(formData);
    }
  }, [recipeName]);

  // Update recipe when data arrives
  useEffect(() => {
    if (recipeData?.success) {
      setRecipe(recipeData.recipe);
      setRecipeId(recipeData.recipeId);
      setIsSaved(recipeData.isSaved);

      if (recipeData.fromDatabase) {
        toast.success("Recipe loaded from database");
      } else {
        toast.success("New recipe generated and saved!");
      }
    }
  }, [recipeData]);

  // Handle save success
  useEffect(() => {
    if (saveData?.success) {
      if (saveData.alreadySaved) {
        toast.info("Recipe is already in your collection");
      } else {
        setIsSaved(true);
        toast.success("Recipe saved to your collection!");
      }
    }
  }, [saveData]);

  // Handle remove success
  useEffect(() => {
    if (removeData?.success) {
      setIsSaved(false);
      toast.success("Recipe removed from collection");
    }
  }, [removeData]);

  // Toggle save/unsave
  const handleToggleSave = async () => {
    if (!recipeId) return;

    const formData = new FormData();
    formData.append("recipeId", recipeId);

    if (isSaved) {
      await removeFromCollection(formData);
    } else {
      await saveToCollection(formData);
    }
  };

  // No recipe name in URL
  if (!recipeName) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="container mx-auto max-w-md text-center py-12 sm:py-20 bg-white border border-stone-200/80 p-6 sm:p-8 rounded-2xl shadow-xs">
          <div className="bg-orange-50 w-16 h-16 sm:w-20 sm:h-20 border-2 border-orange-200 flex items-center justify-center mx-auto mb-6 rounded-2xl shadow-xs shrink-0">
            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
            No recipe specified
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mb-6 font-light leading-relaxed">
            Please select a recipe from the dashboard
          </p>
          <Link href="/dashboard" className="w-full sm:w-auto inline-block">
            <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-xs font-semibold px-6 py-5 cursor-pointer">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loadingRecipe === null || loadingRecipe) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="container mx-auto max-w-xl text-center py-12 sm:py-20 bg-white border border-stone-200/80 p-6 sm:p-10 rounded-2xl shadow-xs w-full">
          <ClockLoader className="mx-auto mb-6" color="#dc6300" />
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2 tracking-tight">
            Preparing Your Recipe
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed max-w-md mx-auto">
            Our AI chef is crafting detailed instructions for{" "}
            <span className="font-bold text-orange-600 break-words">
              {recipeName}
            </span>
            ...
          </p>
          <div className="mt-8 max-w-xs sm:max-w-md mx-auto">
            <div className="flex items-center gap-3 text-sm text-stone-500">
              <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full bg-orange-600 rounded-full animate-slow-fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log(recipe, recipeData);

  // Error state
  if (loadingRecipe === false && !recipe) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="container mx-auto max-w-md text-center py-12 bg-white border border-stone-200/80 p-6 sm:p-8 rounded-2xl shadow-xs w-full">
          {/* Icon Box with modern organic rounding */}
          <div className="bg-red-50 w-16 h-16 sm:w-20 sm:h-20 border-2 border-red-200 flex items-center justify-center mx-auto mb-6 rounded-2xl shadow-xs shrink-0">
            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 tracking-tight">
            Failed to load recipe
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mb-6 font-light leading-relaxed">
            Something went wrong while loading the recipe. Please try again.
          </p>

          {/* Ultra-responsive button stack: wraps vertically on extra-small viewports */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full sm:w-auto border-2 border-stone-900 hover:bg-stone-900 hover:text-white rounded-xl shadow-xs font-semibold px-5 py-5 cursor-pointer flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2 shrink-0" />
              Go Back
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-xs font-semibold px-6 py-5 cursor-pointer"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main recipe view
  return (
    <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header Navigation */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-stone-600 hover:text-orange-600 transition-colors mb-4 sm:mb-6 font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          {/* Hero & Title Card Section */}
          <div className="bg-white p-5 sm:p-8 md:p-10 border border-stone-200/80 rounded-2xl sm:rounded-3xl shadow-xs mb-6 overflow-hidden">
            {/* Main Recipe Graphic Cover */}
            {recipe.imageUrl && (
              <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden mb-6 sm:mb-8 rounded-xl sm:rounded-2xl border border-stone-100 shadow-inner">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover hover:scale-102 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            )}

            {/* Core Descriptive Metas */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="outline"
                className="text-orange-600 bg-orange-50/50 border border-orange-200/60 rounded-full px-3 py-0.5 text-xs font-semibold capitalize"
              >
                {recipe.cuisine}
              </Badge>
              <Badge
                variant="outline"
                className="text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-0.5 text-xs font-semibold capitalize"
              >
                {recipe.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight leading-tight">
              {recipe.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-stone-600 mb-6 font-light leading-relaxed">
              {recipe.description}
            </p>

            {/* Meta Information Horizontal Cluster */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:text-base text-stone-600 mb-8 pb-6 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0" />
                <span className="font-medium">
                  {parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} mins
                  total
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0" />
                <span className="font-medium">{recipe.servings} servings</span>
              </div>
              {recipe.nutrition?.calories && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0" />
                  <span className="font-medium">
                    {recipe.nutrition.calories} cal/serving
                  </span>
                </div>
              )}
            </div>

            {/* User Utility Action Button Row */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button
                onClick={handleToggleSave}
                disabled={saving || removing}
                className={`w-full sm:w-auto px-5 py-4 sm:py-5 font-semibold text-sm rounded-xl cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2 ${
                  isSaved
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                {saving || removing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {saving ? "Saving..." : "Removing..."}
                  </>
                ) : isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    Saved to Collection
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    Save to Collection
                  </>
                )}
              </Button>

              <PDFDownloadLink
                document={<RecipePDF recipe={recipe} />}
                fileName={`${recipe.title.replace(/\s+/g, "-").toLowerCase()}.pdf`}
                className="w-full sm:w-auto"
              >
                {({ loading }) => (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-5 py-4 sm:py-5 text-sm font-semibold border-2 border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-orange-600 hover:text-orange-700 rounded-xl gap-2 cursor-pointer transition-all flex items-center justify-center"
                    disabled={loading}
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    {loading ? "Preparing PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>

        {/* Main Multi-Column Split Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COMPARTMENT: Ingredients & Quick Metric Tracking */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white p-5 sm:p-6 border border-stone-200/80 rounded-2xl shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-2 pb-3 border-b border-stone-100">
                <ChefHat className="w-5 h-5 text-orange-600" />
                Ingredients
              </h2>

              {/* List Groupings mapped by categorization tags */}
              {Object.entries(
                recipe.ingredients.reduce((acc, ing) => {
                  const cat = ing.category || "Other";
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(ing);
                  return acc;
                }, {}),
              ).map(([category, items]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {items.map((ingredient, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-start gap-3 text-sm sm:text-base text-stone-700 py-2 border-b border-stone-50 last:border-0"
                      >
                        <span className="flex-1 font-light leading-snug">
                          {ingredient.item}
                        </span>
                        <span className="font-bold text-orange-600 text-sm whitespace-nowrap bg-orange-50/60 border border-orange-100/40 px-2 py-0.5 rounded-md">
                          {ingredient.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Floating Premium Locked Analytical Matrix */}
              {recipe.nutrition && (
                <div className="mt-6 pt-5 border-t border-stone-200/80">
                  <h3 className="font-bold text-stone-900 mb-4 uppercase tracking-wider text-xs flex items-center justify-between gap-2">
                    <span>Nutrition (per serving)</span>
                    {!recipeData.isPro && (
                      <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold tracking-wide">
                        PRO
                      </span>
                    )}
                  </h3>

                  <ProLockedSection
                    isPro={recipeData.isPro}
                    lockText="Nutrition info is Pro-only"
                  >
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-orange-50/50 p-3 text-center border border-orange-100/70 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">
                          {recipe.nutrition.calories}
                        </div>
                        <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wide">
                          Calories
                        </div>
                      </div>

                      <div className="bg-stone-50 p-3 text-center border border-stone-200/40 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-stone-900">
                          {recipe.nutrition.protein}
                        </div>
                        <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wide">
                          Protein
                        </div>
                      </div>

                      <div className="bg-stone-50 p-3 text-center border border-stone-200/40 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-stone-900">
                          {recipe.nutrition.carbs}
                        </div>
                        <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wide">
                          Carbs
                        </div>
                      </div>

                      <div className="bg-stone-50 p-3 text-center border border-stone-200/40 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-stone-900">
                          {recipe.nutrition.fat}
                        </div>
                        <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wide">
                          Fat
                        </div>
                      </div>
                    </div>
                  </ProLockedSection>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COMPARTMENT: Chronological Step Assembly & Advisory Tiers */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Directives Layout Container */}
            <div className="bg-white p-5 sm:p-8 border border-stone-200/80 rounded-2xl shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-8">
                Step-by-Step Instructions
              </h2>

              <div className="relative">
                {recipe.instructions.map((step, index) => (
                  <div
                    key={step.step}
                    className={`relative pl-10 sm:pl-12 pb-8 group/step ${
                      index !== recipe.instructions.length - 1
                        ? "border-l-2 border-stone-100 ml-4 sm:ml-5"
                        : "ml-4 sm:ml-5"
                    }`}
                  >
                    {/* Absolute Anchored Timeline Indicator Roundlet */}
                    <div className="absolute -left-4 sm:-left-5 top-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold text-sm sm:text-base shadow-md border border-orange-700/50 group-hover/step:scale-105 transition-transform">
                      {step.step}
                    </div>

                    {/* Core Instructional Typography Blocks */}
                    <div className="pt-0.5">
                      <h3 className="font-bold text-base sm:text-lg text-stone-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-stone-700 font-light leading-relaxed mb-4">
                        {step.instruction}
                      </p>

                      {/* Embedded Context Pro-Tip Block inside current instruction tracking */}
                      {step.tip && (
                        <div className="bg-orange-50/60 border-l-4 border-orange-600 p-4 rounded-r-xl rounded-l-xs shadow-3xs">
                          <p className="text-xs sm:text-sm text-orange-900 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 fill-orange-600 text-orange-600" />
                            <span>
                              <strong className="font-bold">Pro Tip:</strong>{" "}
                              {step.tip}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Success Plate Signal Banner */}
              <div className="mt-4 p-5 sm:p-6 bg-linear-to-br from-green-50/60 to-emerald-50 border border-green-200/60 rounded-2xl shadow-3xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-green-900 text-sm sm:text-base mb-1">
                      You&apos;re all done!
                    </h3>
                    <p className="text-xs sm:text-sm text-green-800 font-light leading-relaxed">
                      Plate your masterpiece and enjoy your delicious{" "}
                      <span className="font-semibold">{recipe.title}</span>!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Advisory Panel Tier: Pro Chef Advice Matrix */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="bg-linear-to-br from-orange-50/40 to-amber-50/30 p-5 sm:p-8 border border-orange-200/60 rounded-2xl shadow-3xs">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 fill-orange-600" />
                  Chef&apos;s Tips & Tricks
                  {!recipeData.isPro && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold tracking-wide">
                      PRO
                    </span>
                  )}
                </h2>

                <ProLockedSection
                  isPro={recipeData.isPro}
                  lockText="Chef tips are Pro-only"
                  ctaText="Unlock Pro Tips →"
                >
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm sm:text-base text-stone-700"
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ProLockedSection>
              </div>
            )}

            {/* Substitutions Matrix View Scaffold */}
            {recipe.substitutions && recipe.substitutions.length > 0 && (
              <div className="bg-white p-5 sm:p-8 border border-stone-200/80 rounded-2xl shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 flex flex-wrap items-center gap-2">
                  <span>Ingredient Substitutions</span>
                  {!recipeData.isPro && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold tracking-wide">
                      PRO
                    </span>
                  )}
                </h2>

                <p className="text-stone-500 mb-6 text-xs sm:text-sm font-light">
                  Don&apos;t have everything? Here are some clean alternatives
                  you can use:
                </p>

                <ProLockedSection
                  isPro={recipeData.isPro}
                  lockText="Substitutions are Pro-only"
                >
                  <div className="space-y-4">
                    {recipe.substitutions.map((sub, i) => (
                      <div
                        key={i}
                        className="border-b border-stone-100 pb-4 last:border-0 last:pb-0"
                      >
                        <h3 className="font-semibold text-sm sm:text-base text-stone-800 mb-2">
                          Instead of{" "}
                          <span className="text-orange-600 font-bold">
                            {sub.original}
                          </span>
                          :
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {sub.alternatives.map((alt, j) => (
                            <Badge
                              key={j}
                              variant="outline"
                              className="text-stone-600 border border-stone-200 bg-stone-50/50 rounded-lg px-2.5 py-0.5 text-xs font-medium"
                            >
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ProLockedSection>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function RecipePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="container mx-auto max-w-md text-center py-12 bg-white border border-stone-200/80 p-6 sm:p-10 rounded-2xl shadow-xs w-full">
            {/* Smooth scaling dynamic loading spinner */}
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-orange-600 animate-spin mx-auto mb-6 shrink-0" />
            <p className="text-sm sm:text-base text-stone-600 font-light tracking-tight">
              Loading recipe...
            </p>
          </div>
        </div>
      }
    >
      <RecipeContent />
    </Suspense>
  );
}
