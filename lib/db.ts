import 'server-only';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial,
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL 연결 설정
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: false,
});

// Drizzle ORM 초기화
export const db = drizzle(pool);

// Enum 정의
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// 테이블 정의
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull(),
});

// 데이터 스키마 및 함수 정의
export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

// 데이터 가져오기 함수
export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  if (search) {
    const filteredProducts = await db
      .select()
      .from(products)
      .where(ilike(products.name, `%${search}%`))
      .limit(1000);
    return {
      products: filteredProducts,
      newOffset: null,
      totalProducts: filteredProducts.length,
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const totalProductsResult = await db
    .select({ count: count() })
    .from(products);
  const totalProducts = totalProductsResult[0]?.count || 0;

  const moreProducts = await db
    .select()
    .from(products)
    .limit(5)
    .offset(offset);
  const newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts,
  };
}

// 데이터 삭제 함수
export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}
