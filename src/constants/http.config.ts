import { HttpConfigQa } from './http.config.qa';
import { HttpConfigUat } from './http.config.uat';
import { HttpConfigProd } from './http.config.prod';
let HttpConfig=HttpConfigQa;
let env=process.env.environment;
if(env==='uat'){
    HttpConfig=HttpConfigUat;
}
if(env==='prod'){
    HttpConfig=HttpConfigProd;
}
export default HttpConfig;