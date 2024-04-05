let baseUrl="";

if(process.env.NODE_ENV=="development"){
  baseUrl = '/dpc';
}

 /* #ifndef H5 */
baseUrl="http://localhost:7007"
  /* #endif*/
export default baseUrl;