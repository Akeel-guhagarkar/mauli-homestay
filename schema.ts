import { mysqlTable, text, int, boolean, timestamp, date, json, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const rooms = mysqlTable("rooms", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: int("price").notNull(), // Price per night
  capacity: int("capacity").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'AC', 'Non-AC'
  facilities: json("facilities").notNull().$type<string[]>(), // Array of strings: ["Bed", "Fan", "Bathroom"]
  imageUrl: text("image_url").notNull(),
  isAvailable: boolean("is_available").default(true),
});

export const menuItems = mysqlTable("menu_items", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // 'Veg Thali', 'Bhaji', 'Roti', 'Rice'
  price: int("price").notNull(),
  imageUrl: text("image_url").notNull(),
  isAvailable: boolean("is_available").default(true),
});

export const bookings = mysqlTable("bookings", {
  id: int("id").primaryKey().autoincrement(),
  roomId: int("room_id").notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  totalPrice: int("total_price").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // 'pending', 'confirmed', 'cancelled'
  paymentScreenshot: text("payment_screenshot"), // URL to uploaded image
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedbacks = mysqlTable("feedbacks", {
  id: int("id").primaryKey().autoincrement(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  ratingRoom: int("rating_room").notNull(),
  ratingCleanliness: int("rating_cleanliness").notNull(),
  ratingFood: int("rating_food").notNull(),
  ratingStaff: int("rating_staff").notNull(),
  suggestion: text("suggestion"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertRoomSchema = createInsertSchema(rooms).omit({ id: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertBookingSchema = z.object({
  roomId: z.number(),
  customerName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  checkIn: z.string(),
  checkOut: z.string(),
  totalPrice: z.number(),
  paymentScreenshot: z.string().optional().nullable(),
});
export const insertFeedbackSchema = createInsertSchema(feedbacks).omit({ id: true, createdAt: true });

// === TYPES ===

export type Room = typeof rooms.$inferSelect;
export type InsertRoom = z.infer<typeof insertRoomSchema>;

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Feedback = typeof feedbacks.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

// Request types
export type CreateBookingRequest = InsertBooking;
export type CreateFeedbackRequest = InsertFeedback;
