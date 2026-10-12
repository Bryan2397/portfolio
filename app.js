const content = window.portfolioContent;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function safeExternalURL(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

document.querySelectorAll("[data-name]").forEach((element) => {
  element.textContent = content.name;
});
document.querySelectorAll("[data-role]").forEach((element) => {
  element.textContent = content.role;
});
document.querySelectorAll("[data-location]").forEach((element) => {
  element.textContent = content.location;
});
document.querySelectorAll("[data-intro]").forEach((element) => {
  element.textContent = content.intro;
});
document.querySelectorAll("[data-about]").forEach((element) => {
  element.textContent = content.about;
});
document.querySelectorAll("[data-code-name]").forEach((element) => {
  element.textContent = content.name;
});
document.querySelectorAll("[data-availability]").forEach((element) => {
  element.textContent = content.availability;
});
document.querySelectorAll("[data-email]").forEach((element) => {
  element.textContent = content.email;
});
document.querySelectorAll("[data-phone]").forEach((element) => {
  element.textContent = content.phone;
});
document.querySelectorAll("[data-email-link]").forEach((element) => {
  element.href = `mailto:${content.email}`;
});
document.querySelectorAll("[data-phone-link]").forEach((element) => {
  const number = String(content.phone ?? "").replace(/[^\d+]/g, "");
  if (number) element.href = `tel:${number}`;
  else element.hidden = true;
});
document.querySelectorAll("[data-github-link]").forEach((element) => {
  const url = safeExternalURL(content.githubUrl);
  if (url) element.href = url;
  else element.hidden = true;
});
document.querySelectorAll("[data-linkedin-link]").forEach((element) => {
  const url = safeExternalURL(content.linkedinUrl);
  if (url) element.href = url;
  else element.hidden = true;
});
for (const [attribute, value] of Object.entries({
  "data-school": content.education.school,
  "data-degree": content.education.degree,
  "data-minor": content.education.minor,
  "data-education-location": content.education.location,
  "data-education-dates": content.education.dates
})) {
  document.querySelectorAll(`[${attribute}]`).forEach((element) => {
    element.textContent = value;
  });
}
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
document.title = `${content.name} | Software Engineer`;

const projectList = document.querySelector("#project-list");
projectList.innerHTML = content.projects.length
  ? content.projects.map((project, index) => {
      const demoUrl = safeExternalURL(project.demoUrl);
      const repositoryUrl = safeExternalURL(project.repositoryUrl);
      const imageUrl = safeExternalURL(project.image);
      const title = escapeHTML(project.title);
      const image = imageUrl
        ? `<img src="${escapeHTML(imageUrl)}" alt="${escapeHTML(project.imageAlt)}" loading="lazy">`
        : `<div class="project-art-code" aria-hidden="true"><span>PROJECT / 0${index + 1}</span><strong>{ }</strong><span>Build. Learn. Repeat.</span></div>`;
      const technologies = (project.technologies ?? []).map((technology) => `<span>${escapeHTML(technology)}</span>`).join("");
      const links = [
        demoUrl ? `<a class="project-link" href="${escapeHTML(demoUrl)}" target="_blank" rel="noreferrer">Live demo <span aria-hidden="true">↗</span></a>` : "",
        repositoryUrl ? `<a class="project-link project-link-muted" href="${escapeHTML(repositoryUrl)}" target="_blank" rel="noreferrer">Source code <span aria-hidden="true">↗</span></a>` : ""
      ].filter(Boolean).join("");
      return `
        <article class="project-item">
          <div class="project-image">
            ${image}
            <span class="project-number">0${index + 1}</span>
          </div>
          <div class="project-meta"><span>${escapeHTML(project.category)}</span></div>
          <h3>${title}</h3>
          <p class="project-description">${escapeHTML(project.description)}</p>
          <div class="project-technologies">${technologies || "<span>Add your stack</span>"}</div>
          <div class="project-links">${links || '<span class="project-link-placeholder">Add demo or repository links</span>'}</div>
        </article>`;
    }).join("")
  : '<p class="empty-state">Your projects will show up here. Add one in <code>content.js</code> to get started.</p>';

const experienceList = document.querySelector("#experience-list");
experienceList.innerHTML = content.experience?.length
  ? content.experience.map((item, index) => `
      <article class="experience-item">
        <span class="experience-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="experience-details">
          <div class="experience-meta"><span class="experience-kind">${escapeHTML(item.kind)}</span><span>${escapeHTML(item.period)}</span></div>
          <h3>${escapeHTML(item.role)}</h3>
          <p class="experience-organization">${escapeHTML(item.organization)}</p>
          <ul>${(item.highlights ?? []).map((highlight) => `<li>${escapeHTML(highlight)}</li>`).join("")}</ul>
        </div>
      </article>`).join("")
  : '<p class="empty-state">Add internships and leadership roles in <code>content.js</code>.</p>';

const skillsList = document.querySelector("#skills-list");
skillsList.innerHTML = content.skills?.length
  ? content.skills.map((group) => `
      <div class="skill-group">
        <h3>${escapeHTML(group.category)}</h3>
        <ul>${(group.items ?? []).map((skill) => `<li>${escapeHTML(skill)}</li>`).join("")}</ul>
      </div>`).join("")
  : '<p class="empty-state">Add the languages, frameworks, and tools you use in <code>content.js</code>.</p>';

const recommendationList = document.querySelector("#recommendation-list");
recommendationList.innerHTML = content.recommendations?.length
  ? content.recommendations.map((recommendation, index) => {
      const url = safeExternalURL(recommendation.url);
      const action = url
        ? `<a href="${escapeHTML(url)}" target="_blank" rel="noreferrer">Read letter <span aria-hidden="true">↗</span></a>`
        : "";
      const body = (recommendation.body ?? []).map((paragraph) => `<p>${escapeHTML(paragraph).replace(/\n/g, "<br>")}</p>`).join("");
      const letter = body
        ? `<details class="recommendation-letter"><summary>Read letter</summary><div class="letter-body">${body}</div></details>`
        : "";
      return `
        <article class="recommendation-item">
          <span class="recommendation-number">0${index + 1}</span>
          <div class="recommendation-content"><h3>${escapeHTML(recommendation.title)}</h3><p>${escapeHTML(recommendation.author)} <span>·</span> ${escapeHTML(recommendation.context)}</p>${letter}</div>
          ${action}
        </article>`;
    }).join("")
  : '<p class="empty-state recommendations-empty">Recommendation links can be added in <code>content.js</code>.</p>';