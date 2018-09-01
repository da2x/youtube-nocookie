var pattern = [
  '*://youtube.com/embed/*',
  '*://www.youtube.com/embed/*',
  'http://youtube-nocookie.com/embed/*',
  'http://www.youtube-nocookie.com/embed/*'
];


function redirector(requestDetails) {
  var redirection = new URL(requestDetails.url);
  redirection.hostname = 'www.youtube-nocookie.com';
  redirection.protocol = 'https:';
  browser.storage.local.get('redirect_count').then(
    data => browser.storage.local.set({'redirect_count': (data.redirect_count || 0) + 1})
  );
  return {
    redirectUrl: redirection.toString()
  };
}


browser.webRequest.onBeforeRequest.addListener(
  redirector,
  {urls: pattern},
  ["blocking"]
);