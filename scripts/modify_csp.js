// Modify CSP to allow youtube-nocookie.com where youtube.com is allowed
function modify_csp_to_allow_nocookie(requestDetails)
{
  var modified_csp = false;
  requestDetails.responseHeaders.forEach(
    (item, index, array) => {
      if (item.name == 'Content-Security-Policy' &&
          item.value.includes('.youtube.com')    &&
         !item.value.includes('.youtube-nocookie.com'))
      {
        item.value = item.value.replace('.youtube.com', '.youtube.com www.youtube-nocookie.com');
        modified_csp = true;
      }
    }
  );
  if (modified_csp)
  {
    return {responseHeaders: requestDetails.responseHeaders};
  }
}

browser.webRequest.onHeadersReceived.addListener(
  modify_csp_to_allow_nocookie,
  {urls: ["*://*/*"], types: ['main_frame', 'sub_frame']},
  ["blocking", "responseHeaders"]
);
