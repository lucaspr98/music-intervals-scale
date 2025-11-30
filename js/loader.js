const loadScale = async (htmlFilePath, id, notesScaleHtml) => {
  try {
    const htmlFile = await fetch(htmlFilePath);
    const html = await htmlFile.text();
    const containerId = `${id}Container`;
    document.getElementById(containerId).innerHTML = html;

    document.getElementById(`${id}NotesScaleContainer`).innerHTML =
      notesScaleHtml;

    initScaleLogic(containerId);
  } catch (error) {
    console.error(`Error loading scale from ${htmlFilePath}:`, error);
  }
};

const loadAllFiles = async () => {
  const notesScaleHtmlFile = await fetch("html/notes-scale.html");
  const notesScaleHtml = await notesScaleHtmlFile.text();

  await Promise.all([
    loadScale("html/interval-scale.html", "intervalScale", notesScaleHtml),
    loadScale(
      "html/pentatonic-minor-scale.html",
      "pentatonicMinorScale",
      notesScaleHtml
    ),
    loadScale("html/minor-scale.html", "minorScale", notesScaleHtml),
    loadScale("html/major-scale.html", "majorScale", notesScaleHtml),
    loadScale(
      "html/triad-minor-5d-scale.html",
      "triadMinor5dScale",
      notesScaleHtml
    ),
    loadScale("html/triad-minor-scale.html", "triadMinorScale", notesScaleHtml),
    loadScale("html/triad-major-scale.html", "triadMajorScale", notesScaleHtml),
  ]);
};

loadAllFiles();
