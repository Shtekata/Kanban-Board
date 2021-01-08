import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from '../../shared/interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
       
        return this.authService.currentUser$.pipe(
            switchMap(x => x === undefined ? this.authService.authenticate() : [x]),
            map((x: IUser | null) => {
                const isLoggedFromData = route.data.isLogged;
                return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!x;
            }),
            tap((canContinue) => {
                if (canContinue) { return; }
                const url = this.router.url;
                this.router.navigateByUrl(url);
            }),
            first()
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.currentUser$.pipe(
            switchMap(x => x === undefined ? this.authService.authenticate() : [x]),
            map((x: IUser | null) => {
                const isLoggedFromData = childRoute.data.isLogged;
                return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!x;
            }),
            tap((canContinue) => {
                if (canContinue) { return; }
                const url = this.router.url;
                this.router.navigateByUrl(url);
            }),
            first()
        );
    }

}
