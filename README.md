# Page Builder App

This is a drag-and-drop page builder built with the following stack:

- **React.js + Next.js**
- **TypeScript**
- **Tailwind CSS** for styling
- **ShadCN UI** for components
- **Zustand** for state management
- **Dnd-kit** for drag-and-drop support
- **uuid** for unique element IDs
- **PostgreSQL** for persistence via Prisma ORM

## Features

- Drag and drop elements (Text, Button) into a canvas
- Edit element properties in a live editor panel
- Save pages to the database with confirmation modal
- Reorder elements via drag-and-drop

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/page-builder-app.git
cd page-builder-app
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Set up the database
Create a `.env` file and add your PostgreSQL connection string:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```
Then run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

### 4. Run the development server
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `components/` – UI components like Canvas, Sidebar, EditorPanel
- `store/` – Zustand store for editor state
- `app/` – Next.js app directory structure
- `pages/api/` – API route to save pages to PostgreSQL

## Available Scripts
- `yarn dev` – Start the development server
- `yarn build` – Build for production
- `yarn lint` – Lint the project

## License
MIT