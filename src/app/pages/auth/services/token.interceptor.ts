import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthOAuth2JWTToken, NbAuthOAuth2Token, NbAuthService } from '@nebular/auth';
import { ConfigService } from '@ngx-config/core';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token;
  constructor(public auth: NbAuthService, public config:ConfigService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/assets/') > -1) {
      return next.handle(req);
    }

    if (req.url.indexOf('/oauth2/token') > -1 || req.url.indexOf('/openid-connect/token') > -1 || req.url.indexOf('/api/menu-blocks') > -1|| req.url.indexOf('/public/dashboards') > -1) {
      return next.handle(req);
    }

    if (req.url.indexOf(this.config.getSettings('idra_base_url')+'/Idra') > -1) {
      return next.handle(req);
    }


    let newHeaders = req.headers;

    if(this.config.getSettings('enableAuthentication')) {
      return this.auth.isAuthenticatedOrRefresh().pipe(
        tap(authenticated=>{
          // console.log("tap authenticated => "+authenticated);
        }),

        switchMap((authenticated)=>{
          this.auth.getToken().subscribe((x: NbAuthOAuth2JWTToken) => this.token = x);
          let newHeaders = req.headers;
          console.log(this.token.getPayload());
          if (this.token.getPayload() != null) {
            newHeaders = newHeaders.append('Authorization', this.token.getPayload().access_token);
          }
          const authReq = req.clone({ headers: newHeaders });
          return next.handle(authReq);
        })
      )
    } else {
      const authReq = req.clone({ headers: newHeaders });
      return next.handle(authReq);
    }

  }
}
