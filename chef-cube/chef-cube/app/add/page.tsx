"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import { IoAdd, IoClose, IoCheckmark } from "react-icons/io5";

export default function AddRecipePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: [""],
    step1Title: "",
    step1Content: "",
    step2Title: "",
    step2Content: "",
    step3Title: "",
    step3Content: "",
    outroTitle: "",
    outroContent: "",
  });

  const addIngredient = () => {
    setForm({ ...form, ingredients: [...form.ingredients, ""] });
  };

  const removeIngredient = (index: number) => {
    setForm({
      ...form,
      ingredients: form.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...form.ingredients];
    newIngredients[index] = value;
    setForm({ ...form, ingredients: newIngredients });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      description: form.description,
      ingredients: form.ingredients.filter((i) => i.trim() !== ""),
      steps: {
        step1: { title: form.step1Title, content: form.step1Content },
        step2: { title: form.step2Title, content: form.step2Content },
        step3: { title: form.step3Title, content: form.step3Content },
      },
      outro: { title: form.outroTitle, content: form.outroContent },
    };

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/recipes");
      } else {
        alert("Failed to create recipe");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animated-gradient min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="glass-strong rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-2">Add New Recipe</h1>
            <p className="text-gray-400 mb-8">
              Create a new 3D recipe experience
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:outline-none transition"
                  placeholder="e.g., Chocolate Cake"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:outline-none transition resize-none"
                  placeholder="A delicious chocolate cake recipe..."
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ingredients *
                </label>
                {form.ingredients.map((ing, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={ing}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:outline-none transition"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {form.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                      >
                        <IoClose />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition text-sm"
                >
                  <IoAdd /> Add Ingredient
                </button>
              </div>

              {/* Steps */}
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3"
                >
                  <h3 className="font-semibold">Step {num}</h3>
                  <input
                    type="text"
                    required
                    value={form[`step${num}Title` as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [`step${num}Title`]: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:outline-none transition"
                    placeholder="Step title"
                  />
                  <textarea
                    required
                    value={form[`step${num}Content` as keyof typeof form]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [`step${num}Content`]: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:outline-none transition resize-none"
                    placeholder="Step instructions"
                  />
                </div>
              ))}

              {/* Outro */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                <h3 className="font-semibold">Final Message</h3>
                <input
                  type="text"
                  required
                  value={form.outroTitle}
                  onChange={(e) =>
                    setForm({ ...form, outroTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:outline-none transition"
                  placeholder="e.g., Enjoy!"
                />
                <textarea
                  required
                  value={form.outroContent}
                  onChange={(e) =>
                    setForm({ ...form, outroContent: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:outline-none transition resize-none"
                  placeholder="Final tips or serving suggestions"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <IoCheckmark /> Create Recipe
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-white/5 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
