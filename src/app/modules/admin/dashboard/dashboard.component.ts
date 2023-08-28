import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 isNavbarCollapsed: boolean = true;
  baseURL = environment.baseURL;
  private isNavbarCollapsed$: Subscription = new Subscription();

  @ViewChild('toggleMenu', { static: false }) toggleMenu: ElementRef;

  isHomeActive: boolean = false;
  isSetupActive: boolean = false;
  isDataActive: boolean = false;
  isReportActive: boolean = false;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.onToggleSidebar();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.toggleMenu.nativeElement.contains(target);
    if (!clickedInside) {
      this.hideAllSubMenu();
    }
  }

  onSelectMenu(menuRoute:any): void{
    this.hideAllSubMenu();
    this.router.navigate([menuRoute])
  }

  hideAllSubMenu():void{
    this.isHomeActive = false;
    this.isSetupActive = false;
    this.isDataActive = false;
    this.isReportActive = false;
  }

  onToggleMenu(menu: any) {
    let vnavItemsElements = document.querySelectorAll('.vnav-items');
    vnavItemsElements.forEach(element => {
      if (menu) {
        if (element.getAttribute('id') == menu) {
          element.classList.toggle('active');
        } else {
          element.classList.remove('active');
        }
      } else if (this.isNavbarCollapsed) {
        element.classList.remove('active');
      }
    });
  }

  onToggleHomeMenu(): void{
    this.isHomeActive = !this.isHomeActive;
    this.isSetupActive = false;
    this.isDataActive = false;
    this.isReportActive = false;
  }
  onToggleSetupMenu(): void{
    this.isSetupActive = !this.isSetupActive;
    this.isHomeActive = false;
    this.isDataActive = false;
    this.isReportActive = false;
  }
  onToggleDataMenu(): void{
    this.isDataActive = !this.isDataActive;
    this.isHomeActive = false;
    this.isSetupActive = false;
    this.isReportActive = false;
  }
  onToggleReportMenu(): void{
    this.isReportActive = !this.isReportActive;
    this.isHomeActive = false;
    this.isSetupActive = false;
    this.isDataActive = false;
  }

  redirectToDashBoard() {
    window.location.href = `${environment.baseURL}analytics/dashboard/list`;
    // window.location.href = 'http://localhost:8088/analytics/dashboard/list';
  }

  onToggleSidebar() {
    this.isNavbarCollapsed$ = this.sharedService.sidebarToggled.subscribe((value: boolean) => {
      this.isNavbarCollapsed = value;
      this.onToggleMenu('');
    });
  }

  ngOnDestroy(): void {
    this.isNavbarCollapsed$.unsubscribe();
  }
  onRedirectToReportDashboard() {
    this.hideAllSubMenu();
    window.location.href = `${environment.baseURL}analytics/login/keycloak?next=${environment.baseURL}analytics/dashboard/list`;
  }

  onRedirectToReportChart() {
    this.hideAllSubMenu();
    window.location.href = `${environment.baseURL}analytics/login/keycloak?next=${environment.baseURL}analytics/chart/list`;
  }
}
