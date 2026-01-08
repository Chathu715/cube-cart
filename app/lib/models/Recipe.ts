import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string[];
  steps: {
    step1: { title: string; content: string };
    step2: { title: string; content: string };
    step3: { title: string; content: string };
  };
  outro: { title: string; content: string };
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: {
    step1: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
    step2: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
    step3: {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
  },
  outro: {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
});

export default mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);
