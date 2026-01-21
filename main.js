const EXTRA_ITEMS = [
  {
    label: "Ships 3D",
    descr: "Play as a sailor on servers up to 90 players.",
    url: "https://yp3d.com/ships3d/"
  },
  {
    label: "Tanks 3D",
    descr: "Play as a tank, fighting up to 1,000 players.",
    url: "https://yp3d.com/tanks3d/"
  },
  {
    label: "Sharks 3D",
    descr: "Play as a shark and eat other sharks.",
    url: "https://yp3d.com/sharks3d/"
  },
  {
    label: "Spinball 3D",
    descr: "Play Pong in 3D withspin physics.",
    url: "https://yp3d.com/spinball3d/"
  },
  {
    label: "[BETA] Napoleonic.io]",
    descr: "Play as a soldier in Napoleonic battles.",
    url: "https://napoleonic.io/"
  },
  {
    label: "Privacy Policy",
    descr: "Read yp3d.com privacy policy.",
    url: "https://yp3d.com/privacy--policy.html"
  }
];

function openOverlayWithUrl(url) {
  let overlay = document.querySelector(".ext-yp3d-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "ext-yp3d-overlay";
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: "999999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    });

    const frameWrapper = document.createElement("div");
    frameWrapper.className = "ext-yp3d-frame-wrapper";
    Object.assign(frameWrapper.style, {
      position: "relative",
      width: "90%",
      height: "90%",
      maxWidth: "1400px",
      maxHeight: "900px"
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.setAttribute("aria-label", "Sluiten");
    Object.assign(closeBtn.style, {
      position: "absolute",
      top: "-14px",
      right: "-14px",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
      backgroundColor: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0"
    });
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });

    const iframe = document.createElement("iframe");
    iframe.className = "ext-yp3d-iframe";
    Object.assign(iframe.style, {
      width: "100%",
      height: "100%",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 16px rgba(0,0,0,0.5)"
    });

    frameWrapper.appendChild(iframe);
    frameWrapper.appendChild(closeBtn);
    overlay.appendChild(frameWrapper);
    document.body.appendChild(overlay);
  }

  const iframe = overlay.querySelector(".ext-yp3d-iframe");
  if (iframe) {
    iframe.src = url;
  }
  overlay.style.display = "flex";
}

function createExtraCourseItem(cfg) {
  const li = document.createElement("li");
  li.className = "ext-extra-course-item";

  const a = document.createElement("a");
  a.role = "menuitem";
  a.href = "javascript://";
  a.className =
    "topnav__menuitem topnav__menuitem--icon course-link hlp-vert-box smsc-svg--schoolbord--24";
  a.addEventListener("click", () => openOverlayWithUrl(cfg.url));

  const nameSpan = document.createElement("span");
  nameSpan.className = "course-link__name js-course-name";
  nameSpan.textContent = cfg.label;

  const descrSpan = document.createElement("span");
  descrSpan.className = "course-link__descr js-course-descr";
  descrSpan.textContent = cfg.descr || "";

  a.appendChild(nameSpan);
  a.appendChild(descrSpan);
  li.appendChild(a);

  return li;
}

function addExtraCourseButtonsInList() {
  const list = document.querySelector(
    "#coursesMenu ul.course-list.js-courses-list"
  );
  if (!list) return;

  // niet opnieuw toevoegen
  if (list.querySelector(".ext-extra-course-item")) return;

  const fragment = document.createDocumentFragment();
  EXTRA_ITEMS.forEach(cfg => {
    fragment.appendChild(createExtraCourseItem(cfg));
  });

  // helemaal onderaan de vakkenlijst
  list.appendChild(fragment);
}

const observer = new MutationObserver(() => {
  const menu = document.getElementById("coursesMenu");
  if (menu && !menu.hasAttribute("hidden")) {
    addExtraCourseButtonsInList();
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

document.addEventListener("DOMContentLoaded", addExtraCourseButtonsInList);
