# Starter project

## UI Component Library

An accessible UI component library built with React, TypeScript, and Tailwind CSS. This project provides a collection of reusable components to accelerate development of modern web applications while maintaining consistency and accessibility.

## Overview

This UI library offers a comprehensive set of components designed with a focus on:

- Accessibility: All components follow WCAG guidelines with features like keyboard navigation, focus management, and appropriate ARIA attributes
- Flexibility: Components are highly customizable through variants, sizes, and props
- Consistency: A unified design language across all components
- TypeScript Support: Full type safety and autocompletion
- Modern Design: Clean, minimal aesthetic with thoughtful interactions

## Components

The library includes several key components:

- Button: Multi-variant buttons with various sizes and states
- Modal: Accessible modal dialogs with focus trapping
- Tooltip: Contextual information displayed on hover
- Toggle Switch: Interactive on/off controls
- Price Card: Showcasing pricing plans with feature lists
- Check List: Styled lists for features and options

## Examples

The project includes a collection of example implementations demonstrating how to use each component in real-world scenarios. These examples serve as both documentation and starting points for your own implementations.

## Step by step guide for creating a new project based on this one

### Local setup

- Duplicate this `starter` directory and rename it to your `<project_name>`
- Update the `name` field in the `package.json` file to your `<project_name>`
- Update the `description` field in the `package.json` file to your `<project_description>`
- Update `Title` and `Description` metadata in `app/layout.tsx`

### Git setup

- Check if the current repository is pointing to a remote repository

```bash
git remote -v
```

- Remove the `git remote` pointing to this repository

```bash
git remote remove origin
```

- Create a new repository in your GitHub account `https://github.com/TheFernande?tab=repositories`
- Add the new repository as the `origin` remote `https://github.com/TheFernande/<your_repository_name>.git`

```bash
git remote add origin <your_repository_url>
```

### Development

- Install the dependencies

```bash
yarn
```

- Start the development server

```bash
yarn run dev
```

### Publish

- Build the project -> Always test the build before publishing 🤓

```bash
yarn run build
```

- Publish the project either with the following commands or with VsCode's GUI

```bash
git add .
git commit -m "<commit_message>"
git push --set-upstream origin main
```

- Explanation of the `git push --set-upstream origin main` command

- `git push` -> Push the changes to the remote repository
- `--set-upstream` -> Create a new branch in the remote repository with the same name as the current branch
- `origin` -> The remote repository
- `main` -> The current branch

## Useful commands

- Reload VsCode window

```bash
Cmd + Shift + P -> Reload Window
```
