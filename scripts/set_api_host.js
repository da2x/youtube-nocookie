var pattern = [
  '*://youtube.com/iframe_api',
  '*://www.youtube.com/iframe_api',
  '*://s.ytimg.com/yts/jsbin/www-widgetapi*/www-widgetapi.js'
];


function change_default_api_host(requestDetails)
{
  let filter = browser.webRequest.filterResponseData(requestDetails.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    str = str.replace(/www\.youtube\.com/g, 'www.youtube-nocookie.com');
    filter.write(encoder.encode(str));
    filter.disconnect();
  }
}


browser.webRequest.onBeforeRequest.addListener(
  change_default_api_host,
  {urls: pattern},
  ["blocking"]
);
