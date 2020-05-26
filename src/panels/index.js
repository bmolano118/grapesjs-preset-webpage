import {
  cmdImport,
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
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
  const oco = "open-contents";
  const ful = "fullscreen";
  const prv = "preview";

  eConfig.showDevices = 0;

  pn.getPanels().reset([
    {
      //   id: 'commands',
      //   buttons: [{
      //     id: swv,
      //     command: swv,
      //     context: swv,
      //     className: 'fa fa-square-o',
      //   },{
      //     id: ful,
      //     command: ful,
      //     context: ful,
      //     className: 'fa fa-arrows-alt',
      //   },{
      //     id: cmdImport,
      //     className: 'fa fa-download',
      //     command: e => e.runCommand(cmdImport),
      //   },{
      //     id: cmdClear,
      //     className: 'fa fa-trash',
      //     command: e => e.runCommand(cmdClear),
      //   }],
      // },{
    //   id: "exports",
    //   buttons: [
    //     {
    //       id: "save",
    //       command: (e) => e.runCommand("core:save"),
    //       className: "",
    //       label: "Save Lander",
    //     },
    //     {
    //       id: "downlad",
    //       command: (e) => e.runCommand("core:download"),
    //       className: "",
    //       label: "Download",
    //     },
    //     {
    //       id: "export",
    //       command: (e) => e.runCommand("gjs-export-html"),
    //       className: "",
    //       label: "Export",
    //     },
    //   ],
    // },
    // {
      //   id: 'actions',
      //   buttons: [{
      //     id: 'undo',
      //     className: 'mi mi-undo',
      //     command: e => e.runCommand('core:undo'),
      //     disable: true,
      //   },{
      //     id: 'redo',
      //     className: 'mi mi-redo',
      //     command: e => e.runCommand('core:redo'),
      //     disable: true,
      //   }],
      // },{
      //   id: 'options',
      //   buttons: [{
      //     id: expt,
      //     className: 'mi mi-code',
      //     command: e => e.runCommand(expt),
      //   },{
      //     id: prn,
      //     context: prn,
      //     command: e => {
      //       e.runCommand(prn, { force:1 })
      //     },
      //     className: 'mi mi-outlined mi-remove-red-eye',
      //   }],
      // },{
      id: "views",
      preSpace: true,
      buttons: [
        {
          id: oco,
          command: oco,
          className: "",
          label: "Content",
        },
        {
          id: obl,
          command: obl,
          className: "",
          label: "Blocks",
        },
        {
          id: osm,
          command: osm,
          active: true,
          className: "",
          label: "Style",
        },
        {
          id: ola,
          command: ola,
          className: "",
          label: "Layout",
        },
        {
          id: otm,
          command: otm,
          className: "",
          label: "Settings",
        },
      ],
    },
  ]);

  // // Add devices buttons
  // const panelDevices = pn.addPanel({id: 'devices-c'});
  // panelDevices.get('buttons').add([{
  //   id: cmdDeviceMobile,
  //   command: cmdDeviceMobile,
  //   className: 'fa fa-mobile',
  // },{
  //   id: cmdDeviceTablet,
  //   command: cmdDeviceTablet,
  //   className: 'fa fa-tablet',
  // },{
  //   id: cmdDeviceDesktop,
  //   command: cmdDeviceDesktop,
  //   className: 'fa fa-desktop',
  //   active: 1,
  //   disable: 1,
  // }]);

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

  // // enable, disable undo, redo button
  // editor.on('undo:all undo:add undo:remove', () => {
  //   editor.Panels.getButton('actions', 'undo').set('disable', !editor.UndoManager.hasUndo());
  //   editor.Panels.getButton('actions', 'redo').set('disable', !editor.UndoManager.hasRedo());
  // });
};
