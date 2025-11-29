function loadRuler(htmlFile, containerId) {
  fetch(htmlFile)
    .then((r) => r.text())
    .then((html) => {
      document.getElementById(containerId).innerHTML = html;
      initScaleLogic(containerId);
    })
    .catch((err) => console.error("Erro ao carregar", htmlFile, err));
}

loadRuler("../html/interval-scale.html", "intervalScaleContainer");
loadRuler(
  "../html/pentatonic-minor-scale.html",
  "pentatonicMinorScaleContainer"
);
loadRuler("../html/minor-scale.html", "minorScaleContainer");
loadRuler("../html/major-scale.html", "majorScaleContainer");
loadRuler("../html/triad-minor-5d-scale.html", "triadMinor5dScaleContainer");
loadRuler("../html/triad-minor-scale.html", "triadMinorScaleContainer");
loadRuler("../html/triad-major-scale.html", "triadMajorScaleContainer");
