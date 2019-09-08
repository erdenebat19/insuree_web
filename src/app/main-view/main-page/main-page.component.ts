import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css", "./main-page-responsive.css"]
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  title = "Даатгуулагчийн вэб";
  Logout() {
    localStorage.clear();
    this.router.navigate(["/account/login"]);
  }
}
