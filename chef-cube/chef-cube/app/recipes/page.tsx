"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import { IoTime, IoTrash, IoPencil, IoCube } from "react-icons/io5";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch("/api/recipes");
      const json = await res.json();
      if (json.success) {
        setRecipes(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRecipes(recipes.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete recipe", error);
    }
  };

  return (
    <div className="animated-gradient min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recipe Collection
            </h1>
            <p className="text-gray-400">
              Browse and manage your 3D recipe collection
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-400">Loading recipes...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && recipes.length === 0 && (
            <div className="text-center py-12 glass-strong rounded-2xl">
              <IoCube className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400 mb-6">No recipes yet</p>
              <Link
                href="/add"
                className="inline-block px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                Add Your First Recipe
              </Link>
            </div>
          )}

          {/* Recipe Grid */}
          {!loading && recipes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform group"
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <IoTime />
                    <span>{recipe.ingredients.length} ingredients</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/recipe/${recipe._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full hover:bg-yellow-400/30 transition text-sm font-medium"
                    >
                      <IoCube /> View 3D
                    </Link>
                    <button
                      onClick={() => deleteRecipe(recipe._id)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition"
                      aria-label="Delete recipe"
                    >
                      <IoTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
