const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  let fullUrl = new URL(url);
  let path = `${fullUrl.hostname}${fullUrl.pathname}`;
  if (path.length > 0 && path.slice(-1) === "/") {
    path = path.slice(0, -1);
  }
  return path;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const linksList = [];
  const aTags = dom.window.document.querySelectorAll("a");
  for (let element of aTags) {
    if (element.href.slice(0, 1) === "/") {
      try {
        linksList.push(new URL(element.href, baseURL).href);
      } catch (e) {
        console.log(`${e.message}: ${element.href}`);
      }
    } else {
      try {
        linksList.push(new URL(element.href).href);
      } catch (e) {
        console.log(`${e.message}: ${element.href}`);
      }
    }
  }
  return linksList;
}

async function crawlPage(baseUrl) {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Unable to fetch page, HTTP Code: ${response.code}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      throw new TypeError(`Expected HTML type, got: ${contentType}`);
    }
    console.log(await response.text());
  } catch (error) {
    console.error(`Unable to fetch page: ${error.message}`);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
