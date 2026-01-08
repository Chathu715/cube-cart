import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Recipe from '@/app/lib/models/Recipe';

export async function GET() {
  await dbConnect();

  try {
    let recipes = await Recipe.find({});

    // SEED DATA: If DB is empty, create the Carbonara recipe automatically
    if (recipes.length === 0) {
      const carbonara = await Recipe.create({
        title: "Classic Spaghetti Carbonara",
        description: "A Roman classic made with eggs, hard cheese, cured pork, and black pepper.",
        ingredients: [
          "Spaghetti (400g)",
          "Guanciale/Bacon (150g)",
          "Pecorino Romano (100g)",
          "4 Large Eggs",
          "Black Pepper"
        ],
        steps: {
          step1: { title: "Boil Water", content: "Boil a large pot of salted water. Cook spaghetti until al dente." },
          step2: { title: "Fry Meat", content: "Fry the guanciale until crisp. Beat the eggs and cheese in a bowl." },
          step3: { title: "Combine", content: "Combine pasta with guanciale, remove from heat, and mix in egg mixture quickly." }
        },
        outro: { title: "Bon Appétit", content: "Serve immediately with extra cheese and pepper." }
      });
      recipes = [carbonara];
    }

    return NextResponse.json({ success: true, data: recipes });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const recipe = await Recipe.create(body);
    return NextResponse.json({ success: true, data: recipe }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
