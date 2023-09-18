export const MENUITEM = [
    {
      label: 'Home',
      items: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
      ],
    },
    {
      label: 'Modules',
      items: [
        {
          label: 'Sales',
          icon: 'pi pi-fw pi-cart-plus',
          items: [
            {
              label: 'Invoice List',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Sales Report',
              icon: 'pi pi-fw pi-file-pdf',
            },
          ],
        },
        {
          label: 'Supply',
          icon: 'pi pi-fw pi-truck',
          items: [
            {
              label: 'Invoice List',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Supply Report',
              icon: 'pi pi-fw pi-file-pdf',
            },
          ],
        },
        {
          label: 'Clients',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Customers',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Suppliers',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Employees',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Loan Clients',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Users',
              icon: 'pi pi-fw pi-users',
            },
          ],
        },
        {
          label: 'Transaction',
          icon: 'pi pi-fw pi-wallet',
          items: [
            {
              label: 'Cash',
              icon: 'pi pi-fw pi-wallet',
            },
            {
              label: 'Expense',
              icon: 'pi pi-fw pi-chart-line',
            },
            {
              label: 'Loan',
              icon: 'pi pi-fw pi-calendar-plus',
            }
          ],
        }
      ],
    },
    {
      label: 'Need Help?',
      items: [
        {
          label: 'FAQ',
          icon: 'pi pi-fw pi-question',
          routerLink: ['/documentation'],
        },
        {
          label: 'Tutorials',
          icon: 'pi pi-fw pi-question',
          routerLink: ['/documentation'],
        },
      ],
    },
  ];
  
  