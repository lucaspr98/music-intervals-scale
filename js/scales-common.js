const notesIds = [
  "note-cs",
  "note-ds",
  "note-fs",
  "note-gs",
  "note-as",
  "note-cs-1",
  "note-c",
  "note-d",
  "note-e",
  "note-f",
  "note-g",
  "note-a",
  "note-b",
  "note-c-1",
  "note-db",
  "note-eb",
  "note-gb",
  "note-ab",
  "note-bb",
  "note-db-1",
];

const initScaleLogic = (id) => {
  const container = document.getElementById(id);
  const intervalScale = container.querySelector(".interval-scale");
  const notesScale = container.querySelector(".notes-scale");
  const resetBtn = container.querySelector(".reset-btn");

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let currentX = 0;

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const getBounds = () => {
    const notesRect = notesScale.getBoundingClientRect();
    const intervalRect = intervalScale.getBoundingClientRect();
    const maxOffset = notesRect.width - intervalRect.width;
    return {
      minX: Math.min(0, maxOffset),
      maxX: Math.max(0, maxOffset),
    };
  };

  const applyTransform = (x) => {
    currentX = x;
    intervalScale.style.transform = `translateX(${currentX}px)`;
  };

  intervalScale.addEventListener("mousedown", (e) => {
    isDragging = true;
    intervalScale.classList.add("dragging");
    startX = e.clientX;
    scrollLeft = currentX;
  });

  intervalScale.addEventListener("mouseleave", () => {
    if (!isDragging) return;
    isDragging = false;
    intervalScale.classList.remove("dragging");
  });

  intervalScale.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    intervalScale.classList.remove("dragging");
  });

  intervalScale.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = e.clientX - startX;
    let nextX = scrollLeft + walk;
    const { minX, maxX } = getBounds();
    nextX = clamp(nextX, minX, maxX);
    applyTransform(nextX);
  });

  intervalScale.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    scrollLeft = currentX;
  });

  intervalScale.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    intervalScale.classList.remove("dragging");
  });

  intervalScale.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const walk = touch.clientX - startX;
    let nextX = scrollLeft + walk;
    const { minX, maxX } = getBounds();
    nextX = clamp(nextX, minX, maxX);
    applyTransform(nextX);
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => applyTransform(0));
  }

  notesIds.forEach((noteId) => {
    const noteElement = notesScale.querySelector(`#${noteId}`);
    if (noteElement) {
      noteElement.addEventListener("click", () => {
        intervalScale.style.transform = `translateX(${noteElement.offsetLeft}px)`;
      });
    }
  });

  intervalScale.addEventListener("selectstart", (e) => {
    if (isDragging) e.preventDefault();
  });
};
