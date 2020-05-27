import {
  cmdImport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  cmdOpenContentCategory,
} from "./../consts";

export default (editor, config) => {
  const pn = editor.Panels;
  const eConfig = editor.getConfig();
  const crc = "create-comp";
  const mvc = "move-comp";
  const swv = "sw-visibility";
  const expt = "export-template";
  const osm = "open-sm";
  const otm = "open-tm";
  const ola = "open-layers";
  const obl = "open-blocks";
  const orb = "open-row-blocks";
  const ful = "fullscreen";
  const prv = "preview";

  eConfig.showDevices = 0;

  const panels = [];
  panels.push({
    id: "commands",
    buttons: [
      {
        id: "save",
        command: (e) => e.runCommand("core:save"),
        className: "fa fa-save",
        label: "",
      },
      {
        id: "downlad",
        command: (e) => e.runCommand("core:download"),
        className: "fa fa-download",
        label: "",
      },
      {
        id: "export",
        command: (e) => e.runCommand("gjs-export-html"),
        className: "fa fa-book",
        label: "",
      },
    ],
  });
  panels.push({
    id: "options",
    buttons: [
      {
        id: swv,
        command: swv,
        context: swv,
        className: "fa fa-square-o",
      },
      {
        id: prv,
        context: prv,
        command: (e) => e.runCommand(prv),
        className: "fa fa-eye",
      },
      {
        id: ful,
        command: ful,
        context: ful,
        className: "fa fa-arrows-alt",
      },
      {
        id: expt,
        className: "fa fa-code",
        command: (e) => e.runCommand(expt),
      },
      {
        id: "undo",
        className: "fa fa-undo",
        command: (e) => e.runCommand("core:undo"),
      },
      {
        id: "redo",
        className: "fa fa-repeat",
        command: (e) => e.runCommand("core:redo"),
      },
      {
        id: cmdImport,
        className: "fa fa-download",
        command: (e) => e.runCommand(cmdImport),
      },
      {
        id: cmdClear,
        className: "fa fa-trash",
        command: (e) => e.runCommand(cmdClear),
      },
    ],
  });
  panels.push({
    id: "views",
    preSpace: 1,
    buttons: [
      {
        id: obl,
        command: obl,
        className: "",
        label: "Content",
      },
      {
        id: orb,
        command: orb,
        className: "",
        label: "Blocks",
      },
      {
        id: osm,
        command: osm,
        active: true,
        className: "",
        label: "Body",
      },
      // {
      //   id: osm,
      //   command: osm,
      //   active: true,
      //   className: "",
      //   label: "Style",
      // },
      // {
      //   id: otm,
      //   command: otm,
      //   className: "",
      //   label: "Trait",
      // },
      // {
      //   id: ola,
      //   command: ola,
      //   className: "",
      //   label: "Layout",
      // },
    ],
  });
  pn.getPanels().reset(panels);

  // Add devices buttons
  const panelDevices = pn.addPanel({ id: "devices-c" });
  panelDevices.get("buttons").add([
    {
      id: cmdDeviceDesktop,
      command: cmdDeviceDesktop,
      className: "fa fa-desktop",
      active: 1,
      disable: 1,
    },
    {
      id: cmdDeviceTablet,
      command: cmdDeviceTablet,
      className: "fa fa-tablet",
    },
    {
      id: cmdDeviceMobile,
      command: cmdDeviceMobile,
      className: "fa fa-mobile",
    },
  ]);

  const openBl = pn.getButton("views", obl);
  editor.on("load", () => openBl && openBl.set("active", 1));

  // On component change show the Style Manager
  config.showStylesOnChange &&
    editor.on("component:selected", () => {
      const openSmBtn = pn.getButton("views", osm);
      const openLayersBtn = pn.getButton("views", ola);

      // Don't switch when the Layer Manager is on or
      // there is no selected component
      if (
        (!openLayersBtn || !openLayersBtn.get("active")) &&
        editor.getSelected()
      ) {
        openSmBtn && openSmBtn.set("active", 1);
      }
    });
};
