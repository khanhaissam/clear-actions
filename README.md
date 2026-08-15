# Action Tracker

Build a clean, professional web application called **ActionTrack**.

### Purpose

ActionTrack is a simple meeting action tracker for project managers.

It should help a project manager quickly see:

* what actions are open

* who owns each action

* which actions are overdue

* which actions are due soon

* which actions have been completed

This is the first version of the application. Keep it simple and focused.

### Main screen

Create a responsive dashboard with:

#### 1. Header

Show:

**ActionTrack**

Subtitle:

**Meeting actions. Clear owners. Clear deadlines.**

Add a simple "Add Action" button on the right.

#### 2. Summary cards

Show four cards:

* Open Actions

* Overdue

* Due This Week

* Completed

Use realistic fictional numbers based on the sample action data.

#### 3. Action table

Create a clean table showing:

* Action

* Meeting

* Owner

* Due Date

* Priority

* Status

Use fictional sample data for around 10–12 actions.

Example meetings can include:

* Project Kickoff

* Weekly Project Review

* Supplier Coordination

* Risk Review

* Steering Committee

Example owners can include fictional names.

Statuses:

* Open

* In Progress

* Completed

Priorities:

* High

* Medium

* Low

Make overdue actions easy to identify visually without making the interface too colourful.

#### 4. Filters

Above the table, add simple filters for:

* Status

* Priority

* Owner

Also add a simple search box.

#### 5. Add Action

When the user clicks "Add Action", open a simple form.

Fields:

* Action description

* Meeting

* Owner

* Due date

* Priority

* Status

The user should be able to add an action and see it in the table.

### Design direction

The application is intended for professional project managers and business users.

Use:

* clean modern layout

* good spacing

* clear typography

* neutral professional design

* subtle visual hierarchy

* responsive design for desktop and mobile

Avoid:

* excessive gradients

* unnecessary animations

* overly colourful design

* gaming-style UI

* large decorative graphics

The dashboard should feel like a lightweight professional business application.

### Technical scope for V1

For this first version:

* do NOT add authentication

* do NOT add a backend or database

* do NOT use external APIs

* do NOT add AI

* use fictional local sample data

* keep the architecture simple

* focus on the user experience and basic interaction

Do not add features outside this scope.

After building the first version, briefly tell me what you created and what I should test first.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://clear-actions.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8ced18c0-8634-4777-9412-07515f863b07).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
