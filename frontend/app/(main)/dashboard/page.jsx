import { getCategories, getRecipeOfTheDay } from "@/actions/mealdb.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COUNTRY_FLAGS, getCategoryEmoji } from "@/lib/data";
import { ArrowRight, Flame, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = async () => {
  // Fetch data server-side
  const recipeData = await getRecipeOfTheDay();
  const categoriesData = await getCategories();

  const recipeOfTheDay = recipeData?.recipe;
  const categories = categoriesData?.categories || [];

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-900 mb-4 tracking-tight leading-[1.1] md:leading-tight">
            Fresh Recipes, <br className="xs:inline md:hidden" /> Servd Daily 🔥
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 font-light max-w-2xl mx-auto md:mx-0">
            Discover thousands of recipes from around the world. Cook, create,
            and savor.
          </p>
        </div>

        {/* Recipe of the Day - Hero Section */}
        {recipeOfTheDay && (
          <section className="mb-16 sm:mb-24 relative">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Recipe of the Day
              </h2>
            </div>

            <Link
              href={`/recipe?cook=${encodeURIComponent(
                recipeOfTheDay.strMeal,
              )}`}
              className="block"
            >
              <div className="relative bg-white border-2 border-stone-900 rounded-2xl overflow-hidden hover:border-orange-600 hover:shadow-xl transition-all duration-300 group cursor-pointer shadow-sm">
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-2 border-orange-600 text-orange-700 bg-orange-50/95 backdrop-blur-xs font-bold uppercase tracking-wide text-xs py-1 px-2.5 shadow-sm rounded-lg"
                  >
                    <Flame className="mr-1 w-3.5 h-3.5" />
                    Today&apos;s Special
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Image wrapper */}
                  <div className="relative aspect-video md:aspect-auto min-h-[260px] sm:min-h-[340px] md:min-h-full border-b-2 md:border-b-0 md:border-r-2 border-stone-900">
                    <Image
                      src={recipeOfTheDay.strMealThumb}
                      alt={recipeOfTheDay.strMeal}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Content wrapper */}
                  <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      <Badge
                        variant="outline"
                        className="border-2 border-orange-600 text-orange-700 bg-orange-50 font-bold rounded-md"
                      >
                        {recipeOfTheDay.strCategory}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-2 border-stone-900 text-stone-700 bg-stone-50 font-bold rounded-md"
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        {recipeOfTheDay.strArea}
                      </Badge>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                      {recipeOfTheDay.strMeal}
                    </h3>

                    <p className="text-stone-600 mb-6 line-clamp-3 font-light text-base sm:text-lg">
                      {recipeOfTheDay.strInstructions?.substring(0, 200)}...
                    </p>

                    {recipeOfTheDay.strTags && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                        {recipeOfTheDay.strTags
                          .split(",")
                          .slice(0, 3)
                          .map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-stone-100 text-stone-600 border border-stone-200 font-mono text-[10px] sm:text-xs uppercase rounded-md"
                            >
                              {tag.trim()}
                            </Badge>
                          ))}
                      </div>
                    )}

                    <Button className="w-full sm:w-fit bg-orange-600 hover:bg-orange-700 text-white font-bold border-2 border-orange-700 px-6 py-5 rounded-xl cursor-pointer transition-transform active:scale-[0.98]">
                      Start Cooking <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Browse by Categories */}
        <section className="mb-16 sm:mb-24">
          <div className="mb-6 sm:mb-8 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2 tracking-tight">
              Browse by Category
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light">
              Find recipes that match your mood
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category.strCategory}
                href={`/recipes/category/${category.strCategory.toLowerCase()}`}
                className="block"
              >
                <div className="bg-white p-5 sm:p-6 border-2 border-stone-200 rounded-xl hover:border-orange-600 hover:shadow-lg transition-all text-center group cursor-pointer h-full flex flex-col justify-center items-center">
                  <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {getCategoryEmoji(category.strCategory)}
                  </div>
                  <h3 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors text-xs sm:text-sm tracking-tight line-clamp-1">
                    {category.strCategory}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Cuisine */}
        <section className="pb-8">
          <div className="mb-6 sm:mb-8 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2 tracking-tight">
              Explore World Cuisines
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light">
              Travel the globe through food
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {COUNTRY_FLAGS.map((area) => (
              <Link
                key={area.country}
                href={`/recipes/cuisine/${area.country
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                title={area.country}
                aria-label={area.country}
                className="block"
              >
                <div className="bg-white p-4 sm:p-5 border-2 border-stone-200 rounded-xl hover:border-orange-600 hover:shadow-lg transition-all group cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[90px] sm:min-h-[100px] text-center shadow-xs">
                  <span className="text-3xl sm:text-4xl leading-none group-hover:scale-110 transition-transform duration-200">
                    {area.emoji}
                  </span>
                  <span className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors text-xs sm:text-sm leading-tight tracking-tight line-clamp-1">
                    {area.country}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
