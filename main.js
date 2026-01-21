function addExtraCourseButtons() {
  const coursesMenu = document.querySelector("#coursesMenu .topnav__menu__hdr");
  if (!coursesMenu) return;

  // check of we ze al toegevoegd hebben
  if (coursesMenu.querySelector(".ext-extra-course-buttons")) return;

  const filtersContainer = coursesMenu.querySelector(".js-course-filters");
  if (!filtersContainer) return;

  const wrapper = document.createElement("div");
  wrapper.className = "ext-extra-course-buttons course-btnbar";

  const buttons = [
    { id: "ext_course_1", label: "Extra 1", onClick: () => alert("Extra 1") },
    { id: "ext_course_2", label: "Extra 2", onClick: () => alert("Extra 2") },
    { id: "ext_course_3", label: "Extra 3", onClick: () => alert("Extra 3") },
    { id: "ext_course_4", label: "Extra 4", onClick: () => alert("Extra 4") },
    { id: "ext_course_5", label: "Extra 5", onClick: () => alert("Extra 5") }
  ];

  buttons.forEach(btnDef => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = btnDef.id;
    btn.textContent = btnDef.label;
    btn.className = "smscButton smscButton--fit-text"; // sluit aan bij bestaande stijl
    btn.addEventListener("click", btnDef.onClick);
    wrapper.appendChild(btn);
  });

  // na de bestaande filters plaatsen
  filtersContainer.insertAdjacentElement("afterend", wrapper);
}

// Omdat Smartschool het Vakken-menu dynamisch opent, luisteren op DOM-mutaties
const observer = new MutationObserver(() => {
  const menuOpen =
    document.querySelector("#coursesMenu") &&
    !document.getElementById("coursesMenu").hasAttribute("hidden");
  if (menuOpen) {
    addExtraCourseButtons();
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

// fallback: eerste load
document.addEventListener("DOMContentLoaded", addExtraCourseButtons);
