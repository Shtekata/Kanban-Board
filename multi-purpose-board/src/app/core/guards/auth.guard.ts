import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../../shared/interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let stream$: Observable<IUser | null>;
       
        stream$ = of(this.authService.user);

        return stream$.pipe(
            map((x: IUser | null) => {
                const isLoggedFromData = route.data.isLogged;
                return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!x;
            }),
            tap((canContinue) => {
                if (canContinue) { return; }
                const url = this.router.url;
                this.router.navigateByUrl(url);
            }
            )
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let stream$: Observable<IUser | null>;
    
        stream$ = of(this.authService.user);

        return stream$.pipe(
            map((x: IUser | null) => {
                const isLoggedFromData = childRoute.data.isLogged;
                return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!x;
            }),
            tap((canContinue) => {
                if (canContinue) { return; }
                const url = this.router.url;
                this.router.navigateByUrl(url);
            }
            )
        );
    }

}
