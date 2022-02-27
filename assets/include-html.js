document.addEventListener("DOMContentLoaded", (e) => {
  const getHTML = (options) => {
    const xhr = new XMLHttpRequest();
    let { url, success, error } = options;

    xhr.addEventListener("readystatechange", (e) => {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) success(xhr.responseText);
      else {
        let message =
          xhr.statusText ||
          "Ocurrió un error recuerden usar siempre el protoloco HTTPS o HTTP";
        error(`Error: ${xhr.status}: ${message}`);
      }
    });

    xhr.open("GET", url);
    xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
    xhr.send();
  };
  document.querySelectorAll("[data-include]").forEach((el) => {
    getHTML({
      url: el.getAttribute("data-include"),
      success: (res) => (el.outerHTML = res),
      error: (err) => (el.outerHTML = err),
    });
  });
});
