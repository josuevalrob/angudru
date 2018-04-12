// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  mainUrl : 'http://druang.dd:8080/',    
  grant_type: "password",
  client_id: "f011cc58-40ce-43a9-8f71-842494e3a997",
  client_secret: "abc123",
  // httpHaljson : {
  //   headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded"})
  // }
};