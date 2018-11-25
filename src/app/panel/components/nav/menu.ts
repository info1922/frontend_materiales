

export class VerticalNavCases {

    menuCompleto: any = {

        items: [
            {
                label: 'Principal',
                icon: 'home',
                submenu: [
                    {label: 'Panel pricipal', url: ''}
                ]
            },
            // {
            //     label: 'Usuarios',
            //     icon: 'users',
            //     submenu: [
            //         {label: 'Usuarios', url: 'usuarios'},
            //         // {label: 'Nuevo usuario', url: 'nuevo-usuario'}
            //     ]
            // },
            {
                label: 'Lugares',
                icon: 'map-marker',
                submenu: [
                    {label: 'Lugares', url: 'lugares'},
                    {label: 'Nuevo lugar', url: 'lugares/nuevo'}
                ]
            },
            {
                label: 'Materiales',
                icon: 'wrench',
                submenu: [
                    {label: 'Materiales', url: 'materiales'},
                    {label: 'Nuevo material', url: 'materiales/nuevo'}
                ]
            }
        ]

    };

    basicMenu = {
        title: 'Basic',
        items: [
          { label: 'Music Note Text' },
          { label: 'Bug Text' },
          { label: 'Bolt Text' },
          { label: 'Edit has a long text that should overflow' },
          { label: 'Hourglass Text' },
          { label: 'Happy Face Text' },
          { label: 'Flame Text' },
          { label: 'Thermometer Text' },
          { label: 'Lightbulb Text' },
        ],
      };

      iconMenu = {
        title: 'With icons',
        items: [
          { label: 'Inicio', icon: 'home', submenu: [ {titulo: 'Panel pricipal'}] },
          { label: 'Usuarios', icon: 'users', submenu: [ {titulo: 'Usuarios'}, {titulo: 'Nuevo usuario'}] },
          { label: 'Lugares', icon: 'map-marker', submenu: [ {titulo: 'Lugares'}, {titulo: 'Nuevo lugar'}] },
          { label: 'Materiales', icon: 'wrench', submenu: [ {titulo: 'Materiales'}, {titulo: 'Nuevo material'}] },
        ],
      };

      submenu = {
        items: [
            {label: 'Panel pricipal'},
            {label: 'Usuarios'},
            {label: 'Lugares'},
            {label: 'Materiales'}
        ]
      };


      allNestedIconMenu = {
        title: 'When all items with icon have nested items',
        items: this.menuCompleto.items,
        hasIcons: true,
      };



}
