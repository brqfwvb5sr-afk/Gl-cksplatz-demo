const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const yearNode = document.querySelector("#year");
const statusNode = document.querySelector("#open-status");
const todayHoursNode = document.querySelector("#today-hours");
const revealNodes = document.querySelectorAll(".reveal");
const hourRows = document.querySelectorAll(".hours-row[data-day]");

const openingHours = {
  monday: [["09:00", "20:30"]],
  tuesday: [["09:00", "21:00"]],
  wednesday: [["09:00", "21:30"]],
  thursday: [["09:00", "17:00"]],
  friday: [["09:00", "17:00"]],
  saturday: [],
  sunday: []
};

const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const dayLabels = {
  sunday: "Sonntag",
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag"
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear().toString();
}

function toMinutes(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return (hours * 60) + minutes;
}

function formatHours(slots) {
  if (!slots || slots.length === 0) {
    return "Geschlossen";
  }

  return slots.map(([start, end]) => `${start}–${end}`).join(" / ");
}

function getZurichNow() {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zurich",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(new Date());
  const weekday = parts.find((part) => part.type === "weekday")?.value.toLowerCase();
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return {
    weekday,
    dayIndex: dayKeys.indexOf(weekday),
    totalMinutes: (hour * 60) + minute
  };
}

function findNextOpening(now) {
  for (let offset = 0; offset <= 7; offset += 1) {
    const dayKey = dayKeys[(now.dayIndex + offset) % 7];
    const slots = openingHours[dayKey] ?? [];

    if (slots.length === 0) {
      continue;
    }

    if (offset === 0) {
      const sameDaySlot = slots.find(([start]) => now.totalMinutes < toMinutes(start));
      if (sameDaySlot) {
        return `${dayLabels[dayKey]} ab ${sameDaySlot[0]}`;
      }

      continue;
    }

    return `${dayLabels[dayKey]} ab ${slots[0][0]}`;
  }

  return "Zurzeit geschlossen";
}

function currentOpenStatus() {
  const now = getZurichNow();
  const todaySlots = openingHours[now.weekday] ?? [];

  if (todayHoursNode) {
    todayHoursNode.textContent = formatHours(todaySlots);
  }

  hourRows.forEach((row) => {
    row.classList.toggle("is-today", row.dataset.day === now.weekday);
  });

  for (const [start, end] of todaySlots) {
    const startMinutes = toMinutes(start);
    const endMinutes = toMinutes(end);

    if (now.totalMinutes >= startMinutes && now.totalMinutes <= endMinutes) {
      return {
        label: `Jetzt geöffnet bis ${end}`,
        closed: false
      };
    }
  }

  return {
    label: findNextOpening(now),
    closed: true
  };
}

if (statusNode) {
  const status = currentOpenStatus();
  statusNode.textContent = status.label;
  statusNode.classList.toggle("closed", status.closed);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16
  });

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
