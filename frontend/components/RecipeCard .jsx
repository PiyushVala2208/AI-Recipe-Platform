import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecipeCard({ recipe, variant = "default" }) {
  // Handle different recipe data structures
  const getRecipeData = () => {
    // For MealDB recipes (category/cuisine pages)
    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
        showImage: true,
      };
    }

    // For AI-generated pantry recipes
    if (recipe.matchPercentage) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        matchPercentage: recipe.matchPercentage,
        missingIngredients: recipe.missingIngredients || [],
        image: recipe.imageUrl,
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl,
      };
    }

    // For Strapi recipes (saved recipes, search results)
    if (recipe) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        image: recipe.imageUrl,
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl,
      };
    }

    return {};
  };

  const data = getRecipeData();

  // Variant: grid (for category/cuisine pages with images)
  if (variant === "grid") {
    return (
      <Link href={data.href} className="group block">
        <Card className="rounded-2xl overflow-hidden border border-stone-200/80 bg-white shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer pt-0">
          {/* Image Container */}
          {data.showImage ? (
            <div className="relative aspect-square overflow-hidden rounded-t-2xl">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-xs font-semibold tracking-wide uppercase">
                    Click to view recipe
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Fallback gradient background when no image */
            <div className="relative aspect-square bg-linear-to-br from-orange-400 via-amber-400 to-yellow-400 flex items-center justify-center rounded-t-2xl">
              <ChefHat className="w-16 h-16 text-white/30" />
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
            </div>
          )}

          {/* Title */}
          <CardHeader className="p-4 sm:p-5">
            <CardTitle className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 tracking-tight leading-snug">
              {data.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  // Variant: pantry (for AI-generated suggestions with match percentage)
  if (variant === "pantry") {
    return (
      <Card className="rounded-2xl border border-stone-200/80 bg-white shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-out overflow-hidden flex flex-col h-full group">
        {/* Image at top (if available) */}
        {data.showImage && (
          <div className="relative aspect-video overflow-hidden rounded-t-2xl shrink-0">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Match Percentage Badge on Image */}
            {data.matchPercentage && (
              <div className="absolute top-4 right-4 z-10">
                <Badge
                  className={`${
                    data.matchPercentage >= 90
                      ? "bg-green-600 hover:bg-green-600"
                      : data.matchPercentage >= 75
                        ? "bg-orange-600 hover:bg-orange-600"
                        : "bg-stone-600 hover:bg-stone-600"
                  } text-white font-bold tracking-tight text-sm px-3 py-1.5 shadow-md rounded-lg border-0`}
                >
                  {data.matchPercentage}% Match
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader className="p-5 sm:p-6 pb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {data.cuisine && (
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-200/60 bg-orange-50/30 capitalize rounded-md px-2 text-xs font-medium"
                  >
                    {data.cuisine}
                  </Badge>
                )}
                {data.category && (
                  <Badge
                    variant="outline"
                    className="text-stone-600 border-stone-200 bg-stone-50/50 capitalize rounded-md px-2 text-xs font-medium"
                  >
                    {data.category}
                  </Badge>
                )}
              </div>
            </div>
            {/* Match Percentage Badge (if no image) */}
            {!data.showImage && data.matchPercentage && (
              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <Badge
                  className={`${
                    data.matchPercentage >= 90
                      ? "bg-green-600 hover:bg-green-600"
                      : data.matchPercentage >= 75
                        ? "bg-orange-600 hover:bg-orange-600"
                        : "bg-stone-600 hover:bg-stone-600"
                  } text-white font-bold text-sm px-2.5 py-0.5 rounded-md border-0`}
                >
                  {data.matchPercentage}%
                </Badge>
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  Match
                </span>
              </div>
            )}
          </div>

          <CardTitle className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
            {data.title}
          </CardTitle>

          {data.description && (
            <CardDescription className="text-stone-600 text-sm leading-relaxed mt-2 font-light line-clamp-2">
              {data.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="p-5 sm:p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
          {/* Time & Servings */}
          {(data.prepTime || data.cookTime || data.servings) && (
            <div className="flex gap-4 text-xs font-medium text-stone-500">
              {(data.prepTime || data.cookTime) && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    {parseInt(data.prepTime || 0) +
                      parseInt(data.cookTime || 0)}{" "}
                    mins
                  </span>
                </div>
              )}
              {data.servings && (
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>{data.servings} servings</span>
                </div>
              )}
            </div>
          )}

          {/* Missing Ingredients Box */}
          {data.missingIngredients && data.missingIngredients.length > 0 && (
            <div className="p-4 bg-orange-50/50 border border-orange-100/70 rounded-xl mt-2">
              <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wider mb-2">
                You&apos;ll need:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {data.missingIngredients.map((ingredient, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-orange-700 border-orange-200/60 bg-white text-xs font-normal rounded-md"
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-5 sm:p-6 pt-0 mt-auto">
          <Link href={data.href} className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 rounded-xl font-semibold shadow-xs cursor-pointer h-10 sm:h-11 transition-all">
              <ChefHat className="w-4 h-4" />
              View Full Recipe
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // Variant: list (for saved recipes, search results)
  if (variant === "list") {
    return (
      <Link href={data.href} className="group block">
        <Card className="rounded-2xl border border-stone-200/80 bg-white shadow-xs hover:shadow-md hover:border-orange-200/80 transition-all duration-500 ease-out cursor-pointer overflow-hidden py-0">
          <div className="flex flex-col md:flex-row">
            {/* Image (if available) */}
            {data.showImage ? (
              <div className="relative w-full md:w-48 aspect-video md:aspect-square shrink-0 overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-l-2xl">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>
            ) : (
              /* Fallback gradient when no image */
              <div className="relative w-full md:w-48 aspect-video md:aspect-square shrink-0 bg-linear-to-br from-orange-400 to-amber-400 flex items-center justify-center rounded-t-2xl md:rounded-t-none md:rounded-l-2xl">
                <ChefHat className="w-12 h-12 text-white/30" />
              </div>
            )}

            {/* Content Container */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center min-w-0">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {data.cuisine && (
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-200/60 bg-orange-50/30 capitalize rounded-md px-2 text-xs font-medium"
                  >
                    {data.cuisine}
                  </Badge>
                )}
                {data.category && (
                  <Badge
                    variant="outline"
                    className="text-stone-600 border-stone-200 bg-stone-50/50 capitalize rounded-md px-2 text-xs font-medium"
                  >
                    {data.category}
                  </Badge>
                )}
              </div>

              <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors tracking-tight truncate mb-1">
                {data.title}
              </h3>

              {data.description && (
                <p className="text-stone-500 text-sm font-light line-clamp-2 leading-relaxed mb-3">
                  {data.description}
                </p>
              )}

              {(data.prepTime || data.cookTime || data.servings) && (
                <div className="flex gap-4 text-xs font-medium text-stone-400 pt-1 border-t border-stone-100">
                  {(data.prepTime || data.cookTime) && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {parseInt(data.prepTime || 0) +
                          parseInt(data.cookTime || 0)}{" "}
                        mins
                      </span>
                    </div>
                  )}
                  {data.servings && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{data.servings} servings</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Default variant (fallback)
  return (
    <Link href={data.href} className="group block">
      <Card className="rounded-xl border border-stone-200 bg-white hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden py-0">
        {data.showImage && (
          <div className="relative aspect-video overflow-hidden rounded-t-xl">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-1">
            {data.title}
          </CardTitle>
          {data.description && (
            <CardDescription className="line-clamp-2 text-xs text-stone-500 font-light mt-1">
              {data.description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
