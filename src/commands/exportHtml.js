import FileSaver from "file-saver";

export default (editor, config) => {
  const conf = {
    filenamePfx: "grapesjs_template",
    filename: null,
    html: (ed) =>
      `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <link rel="stylesheet" href="./css/style.css">
        </head>
        <body>${ed.getHtml()}</body>
      <html>`,
    isBinary: null,
    ...config.exportHtmlOpts,
  };

  return {
    run(editor, opts) {
      const content = conf.html(editor);
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

      const filename = conf.filename
        ? conf.filename
        : `${conf.filenamePfx}_${Date.now()}.html`;

      FileSaver.saveAs(blob, filename);
    },
  };
};
