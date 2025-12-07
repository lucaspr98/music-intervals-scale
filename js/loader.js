const loadScale = async (htmlFilePath, id, notesScaleHtml, resetBtnId) => {
  try {
    const htmlFile = await fetch(htmlFilePath);
    const html = await htmlFile.text();
    const containerId = `${id}Container`;
    document.getElementById(containerId).innerHTML = html;

    document.getElementById(`${id}NotesScaleContainer`).innerHTML =
      notesScaleHtml;

    initScaleLogic(containerId, resetBtnId);
  } catch (error) {
    console.error(`Error loading scale from ${htmlFilePath}:`, error);
  }
};

const loadAllFiles = async () => {
  const notesScaleHtmlFile = await fetch("html/notes-scale.html");
  const notesScaleHtml = await notesScaleHtmlFile.text();

  await Promise.all([
    loadScale(
      "html/interval-scale.html",
      "intervalScale",
      notesScaleHtml,
      "resetBtnInterval"
    ),
    loadScale(
      "html/pentatonic-minor-scale.html",
      "pentatonicMinorScale",
      notesScaleHtml,
      "resetBtnPentatonicMinor"
    ),
    loadScale(
      "html/minor-scale.html",
      "minorScale",
      notesScaleHtml,
      "resetBtnMinor"
    ),
    loadScale(
      "html/major-scale.html",
      "majorScale",
      notesScaleHtml,
      "resetBtnMajor"
    ),
    loadScale(
      "html/triad-minor-5d-scale.html",
      "triadMinor5dScale",
      notesScaleHtml,
      "resetBtnTriadMinor5d"
    ),
    loadScale(
      "html/triad-minor-scale.html",
      "triadMinorScale",
      notesScaleHtml,
      "resetBtnTriadMinor"
    ),
    loadScale(
      "html/triad-major-scale.html",
      "triadMajorScale",
      notesScaleHtml,
      "resetBtnTriadMajor"
    ),
  ]);
};

loadAllFiles();
