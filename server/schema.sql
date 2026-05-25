-- MathVerse Database Schema
-- PostgreSQL

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free', -- free, premium, enterprise
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Calculation history
CREATE TABLE calculations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  calculator_type VARCHAR(50) NOT NULL, -- basic, scientific, matrix, geometry, etc.
  expression TEXT NOT NULL,
  result TEXT NOT NULL,
  steps JSONB, -- JSON array of step-by-step explanation
  execution_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Formula library
CREATE TABLE formulas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- algebra, geometry, trigonometry, calculus, statistics, physics, chemistry, finance
  formula_latex TEXT NOT NULL,
  description TEXT,
  variables JSONB, -- Variable definitions
  derivation TEXT,
  examples JSONB, -- Array of example objects
  practical_uses JSONB, -- Array of strings
  related_formulas TEXT[], -- Array of formula IDs
  search_text TSVECTOR, -- Full-text search column
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Formula search index
CREATE INDEX formulas_search_idx ON formulas USING GIN(search_text);
CREATE INDEX formulas_category_idx ON formulas(category);

-- Saved formulas (bookmarks)
CREATE TABLE saved_formulas (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  formula_id INTEGER REFERENCES formulas(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, formula_id)
);

-- Learning modules
CREATE TABLE learning_modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  level VARCHAR(50), -- beginner, intermediate, advanced
  content JSONB, -- Markdown or structured content
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  module_id INTEGER REFERENCES learning_modules(id) ON DELETE CASCADE,
  questions JSONB, -- Array of question objects
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  score DECIMAL(5, 2),
  answers JSONB, -- User's answers
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI chat history
CREATE TABLE ai_chat_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  problem TEXT NOT NULL,
  solution TEXT,
  steps JSONB,
  alternate_approaches JSONB,
  concepts JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User dashboard/progress
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  total_calculations INTEGER DEFAULT 0,
  learning_streak INTEGER DEFAULT 0,
  total_quizzes_completed INTEGER DEFAULT 0,
  total_score DECIMAL(10, 2) DEFAULT 0,
  weak_topics JSONB, -- Array of topics with low scores
  achievements JSONB, -- Array of achievement IDs
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions and billing
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  tier VARCHAR(50) NOT NULL,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(50), -- active, cancelled, past_due
  current_period_start DATE,
  current_period_end DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
