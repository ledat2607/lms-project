import "server-only";
import Stripe from "stripe";
import { env } from "./env";

export const stripe = new Stripe(env.STRIPE_SECRET, {
  apiVersion: "2025-08-27.basil",
  typescript: true,
});
