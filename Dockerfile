# ---- Base Node image ----
FROM node:20 AS base
WORKDIR /usr/src/app

# ---- Install dependencies ----
FROM base AS deps
COPY package*.json ./
RUN npm install

# ---- Build Next.js app ----
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Set environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}

# Add NODE_ENV=production to optimize the build
ENV NODE_ENV=production
# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Run the build with error handling
RUN npm run build || (echo "Build failed. Check the logs above for details." && exit 1)

# ---- Production image ----
FROM node:20-slim AS runner
WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only necessary files from builder
COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

# Set runtime environment variables
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}

EXPOSE 3000
CMD ["npm", "start"]
