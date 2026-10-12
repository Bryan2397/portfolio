Edit `content.js` to update your name, role, location, email, phone, GitHub/LinkedIn URLs, availability, introduction, and about text. Add projects with a title, category, concise description, technologies, and optional live-demo and repository links:
# Software engineer portfolio

A green-and-white static portfolio with no build step, framework, or package install required.

## Personalize it

Edit `content.js` to update your name, role, location, email, GitHub profile, availability, introduction, and about text. Add projects with a title, your role/category, a concise description, technologies, and optional live-demo and repository links:

```js
{
	title: "Task tracker",
	category: "Full-stack project · 2026",
	description: "A short explanation of the problem, what you built, and one useful result.",
	technologies: ["React", "Node.js", "MongoDB"],
	demoUrl: "https://example.com",
	repositoryUrl: "https://github.com/your-name/task-tracker"
}
```

Optional `image` and `imageAlt` fields let you add a project screenshot. Add skill groups as `{ category: "Languages", items: ["JavaScript", "Python"] }` and recommendation letters as `{ title: "Recommendation from Alex Lee", author: "Alex Lee", context: "Mentor, Example Co.", url: "https://example.com/letter.pdf" }`. Use public links only for documents you are comfortable sharing.
Optional `image` and `imageAlt` fields let you add a project screenshot. Add skill groups as `{ category: "Languages", items: ["JavaScript", "Python"] }`. Recommendation entries can use a public `url` or a `body` array of paragraphs to display the letter on the page. Use public links only for documents you are comfortable sharing.

Update the `experience` array for internships or leadership roles, and the `education` object for school and degree details. Social buttons appear only after you add the corresponding public profile URL.

## Preview

Open `index.html` in a browser, or run a local static server from this folder:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`.

The Contact link opens `contact.html`. Its form opens a pre-addressed email draft in the visitor's email app; it does not store or transmit messages through a server. The recipient address is read from `content.js`.

## Deploy

**GitHub Pages:** Push the files to a repository. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

**Netlify:** Import the repository and set the publish directory to `.` with no build command, or use Netlify Drop.

Any host that serves static HTML files will work. Google Fonts are loaded from Google Fonts; self-host the font files if you want to avoid that external dependency.