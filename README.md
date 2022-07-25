# Growhaus Site

```
minimum hugo version 0.92.2
tailwindcss version 3.1.5
```

# Setup dev env

Run "npm install" (first time only)

Then configure "config.toml"

# Run hugo server

1. Hugo only

```
hugo serve -D
```

2. Hugo with tailwindcss watcher (dev)

```
hugo serve -D
```

then run tailwindcss server

```
npm run watch
```

Tailwind CSS file located at "./tailwindcss".
Generated Tailwind CSS located at "./static/css/main.css".

# Build hugo site

```
hugo --ignoreCache --minify
```

# To create new page

```
hugo new content/page_name.md
```

and then edit file located at "./content/page_name.md", setup frontmatter
