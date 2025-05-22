import { pgTable, text, serial, integer, boolean, doublePrecision, date, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phoneNumber: text("phone_number"),
  createdAt: date("created_at").defaultNow(),
});

// Properties table
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: doublePrecision("bathrooms").notNull(),
  squareFeet: integer("square_feet"),
  propertyType: text("property_type").notNull(),
  programType: text("program_type").notNull(), // e.g. Section 8, Income Restricted, Senior Housing
  isPetFriendly: boolean("is_pet_friendly").default(false),
  isAccessible: boolean("is_accessible").default(false),
  amenities: json("amenities").default([]),
  availableDate: date("available_date"),
  imageUrls: json("image_urls").default([]),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  rating: doublePrecision("rating"),
  reviewCount: integer("review_count").default(0),
  createdAt: date("created_at").defaultNow(),
});

// User saved properties
export const savedProperties = pgTable("saved_properties", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  propertyId: integer("property_id").notNull().references(() => properties.id),
  savedAt: date("saved_at").defaultNow(),
});

// Housing programs
export const housingPrograms = pgTable("housing_programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  details: text("details"),
  icon: text("icon").notNull(),
  iconBg: text("icon_bg").notNull(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

// Insert schema definitions
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertPropertySchema = createInsertSchema(properties).omit({ id: true, createdAt: true });
export const insertSavedPropertySchema = createInsertSchema(savedProperties).omit({ id: true, savedAt: true });
export const insertHousingProgramSchema = createInsertSchema(housingPrograms).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

export type InsertSavedProperty = z.infer<typeof insertSavedPropertySchema>;
export type SavedProperty = typeof savedProperties.$inferSelect;

export type InsertHousingProgram = z.infer<typeof insertHousingProgramSchema>;
export type HousingProgram = typeof housingPrograms.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
