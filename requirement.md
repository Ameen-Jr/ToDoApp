# Todo App Project

## Business Requirements

- An MVP of a Todo application as a full-stack web app
- Users must be able to sign up and log in to access their accounts
- Authenticated users can create new personal tasks
- Users can mark their tasks as complete or incomplete
- Users can delete their existing tasks
- Each task requires a title and tracks its completion status
- No more functionality: no priorities, no due dates, no labels. Keep it simple.
- The priority is a clean, professional UI/UX with very simple features

## Technical Details

- Implemented as a modern Next.js app (App Router)
- The Next.js app should be created in a subdirectory `frontend`
- Supabase as the backend: database and authentication
- Authentication via Supabase Auth (email/password)
- Tasks are stored in Supabase and scoped per user (Row Level Security)
- Use popular libraries
- As simple as possible but with an elegant UI

## Color Scheme

- Accent Yellow: `#ecad0a` - accent lines, highlights
- Blue Primary: `#209dd7` - links, key sections
- Purple Secondary: `#753991` - submit buttons, important actions
- Dark Navy: `#032147` - main headings
- Gray Text: `#888888` - supporting text, labels

## Strategy

1. Write plan with success criteria for each phase to be checked off. Include project scaffolding, including .gitignore, and rigorous unit testing.
2. Execute the plan ensuring all criteria are met
3. Carry out extensive integration testing with Playwright or similar, fixing defects
4. Only complete when the MVP is finished and tested, with the server running and ready for the user

## Coding Standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
