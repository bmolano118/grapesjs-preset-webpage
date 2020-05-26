import openImport from "./openImport";
import exportHtml from "./exportHtml";
import {
  cmdImport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdPreviewNew,
  cmdClear,
  cmdExportHtml,
} from "./../consts";

export default (editor, config) => {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;

  cm.add(cmdImport, openImport(editor, config));
  cm.add(cmdDeviceDesktop, (e) => {
    e.setDevice("Desktop");
  });
  cm.add(cmdDeviceTablet, (e) => {
    e.setDevice("Tablet");
  });
  cm.add(cmdDeviceMobile, (e) => {
    e.setDevice("Mobile portrait");
  });
  cm.add(cmdPreviewNew, (e) => {
    const frame = e.Canvas.getFrame().view.getEl();
    const w = window.open("", "_blank");
    w.document.documentElement.innerHTML =
      frame.contentWindow.document.documentElement.innerHTML;
    w.document.title = "Preview";
  });
  cm.add(
    cmdClear,
    (e) => confirm(txtConfirm) && e.runCommand("core:canvas-clear")
  );
  cm.add(cmdExportHtml, exportHtml(editor, config));
};
