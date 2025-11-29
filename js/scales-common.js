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

  // Mouse events
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

  // Touch events
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

  // Reset
  if (resetBtn) {
    resetBtn.addEventListener("click", () => applyTransform(0));
  }

  intervalScale.addEventListener("selectstart", (e) => {
    if (isDragging) e.preventDefault();
  });
};
