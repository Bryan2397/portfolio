const content = window.portfolioContent;
const form = document.querySelector("#contact-form");
const status = document.querySelector("#contact-status");

document.querySelectorAll("[data-name]").forEach((element) => {
  element.textContent = content.name;
});
document.querySelectorAll("[data-email]").forEach((element) => {
  element.textContent = content.email;
});
document.querySelectorAll("[data-email-link]").forEach((element) => {
  element.href = `mailto:${content.email}`;
});
document.querySelectorAll("[data-phone]").forEach((element) => {
  element.textContent = content.phone;
});
document.querySelectorAll("[data-phone-link]").forEach((element) => {
  const number = String(content.phone ?? "").replace(/[^\d+]/g, "");
  if (number) element.href = `tel:${number}`;
  else element.hidden = true;
});
document.querySelectorAll("[data-location]").forEach((element) => {
  element.textContent = content.location;
});
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const fields = new FormData(form);
  const visitorName = String(fields.get("visitorName")).trim();
  const visitorEmail = String(fields.get("visitorEmail")).trim();
  const subject = String(fields.get("subject")).trim();
  const message = String(fields.get("message")).trim();
  const body = `${message}\n\n--\n${visitorName}\n${visitorEmail}`;
  const mailto = `mailto:${content.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  form.dataset.mailto = mailto;
  status.textContent = "Opening your email app. If it doesn’t open, use the direct email link.";
  window.location.href = mailto;
});