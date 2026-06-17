import PricingSection from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LiquidMetalButton from "@/components/ui/liquid-metal";
import { FEATURES, HOW_IT_WORKS_STEPS, SITE_STATS } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Clock, Flame, Star, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { has } = await auth();
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
            <div className="w-full lg:flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
              <Badge
                variant="outline"
                className="inline-flex border-2 border-orange-600 text-orange-700 bg-orange-50 text-xs sm:text-sm font-bold mb-6 uppercase tracking-wide py-2 sm:py-4 px-3"
              >
                <Flame className="mr-1 w-4 h-4 sm:w-5 sm:h-5" />
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1] sm:leading-[0.95] lg:leading-[0.9] tracking-tight max-w-xl sm:max-w-2xl lg:max-w-none">
                Turn your{" "}
                <span className="italic underline decoration-4 decoration-black text-orange-600">
                  Leftovers
                </span>{" "}
                into <br className="hidden sm:inline" />
                masterpieces.
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-stone-600 mb-10 max-w-lg mx-auto lg:mx-0 font-light">
                Snap a photo of your fridge. We&apos;ll tell you what to cook.
                Save money, reduce waste, and eat better tonight.
              </p>

              <Link href={"/dashboard"} className="w-full sm:w-auto">
                <LiquidMetalButton
                  icon={<ArrowRight className="w-5 h-5" />}
                  metalConfig={{
                    colorBack: "#3b82f6",
                    colorTint: "#93c5fd",
                  }}
                >
                  <span className="font-extrabold text-base sm:text-lg px-6 sm:px-8 block text-center">
                    Start Cooking Free
                  </span>
                </LiquidMetalButton>
              </Link>

              <p className="mt-6 text-sm text-stone-500">
                <span className="font-bold text-stone-900">10k+ cooks</span>{" "}
                joined last month
              </p>
            </div>

            {/* Hero Image wrapper container */}
            <div className="w-full lg:flex-1 max-w-md lg:max-w-none">
              <Card className="relative aspect-square md:aspect-4/5 border-4 bg-stone-200 overflow-hidden py-0 shadow-xl">
                <Image
                  src="/pasta-dish.png"
                  alt="Delicious pasta dish"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />

                <Card className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/10 backdrop-blur-sm border-2 border-stone-500 py-0">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base md:text-lg line-clamp-1">
                          Rustic Tomato Basil Pasta
                        </h3>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-orange-500 text-orange-500"
                            />
                          ))}
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className="border-2 border-green-700 bg-green-50 text-green-700 font-bold text-[10px] sm:text-xs whitespace-nowrap shrink-0"
                      >
                        98% Match
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-[11px] sm:text-xs text-black font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 25 mins
                      </span>
                      <span className="flex items-center gap-1">
                        <Users2 className="w-3 h-3" /> 2 servings
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y-2 border-stone-900 bg-stone-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center px-4 sm:px-6 lg:px-8">
          {SITE_STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1 text-stone-50 tracking-tight">
                {stat.val}
              </div>
              <Badge
                variant="secondary"
                className="bg-transparent text-orange-500 text-xs sm:text-sm uppercase tracking-wider font-medium border-none text-center"
              >
                {stat.label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              Your Smart Kitchen
            </h2>
            <p className="text-stone-600 text-lg sm:text-xl font-light">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-stone-200 bg-white hover:border-orange-600 hover:shadow-lg transition-all group py-0"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-6 gap-4">
                      <div className="border-2 rounded-full border-stone-200 bg-orange-50 p-3 group-hover:border-orange-600 group-hover:bg-orange-100 transition-colors shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[10px] sm:text-xs font-mono bg-stone-100 text-stone-600 uppercase tracking-wide border border-stone-200 whitespace-nowrap"
                      >
                        {feature.limit}
                      </Badge>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 text-base sm:text-lg font-light">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y-2 border-stone-200 bg-stone-900 text-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-16">
            Cook in 3 Steps
          </h2>

          <div className="space-y-8 sm:space-y-12">
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <div key={i}>
                <div className="flex gap-4 sm:gap-6 items-start">
                  <Badge
                    variant="outline"
                    className="text-4xl sm:text-5xl font-extrabold text-orange-500 border-none bg-transparent p-0 sm:p-1 h-auto leading-none shrink-0"
                  >
                    {item.step}
                  </Badge>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-stone-400 font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <hr className="my-6 sm:my-8 border-stone-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Component Wrapper */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <PricingSection subscriptionTier={subscriptionTier} />
      </section>
    </div>
  );
}
