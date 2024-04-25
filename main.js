const { crawlPage, printReport } = require("./crawl");

async function main() {
  console.log(process.argv.length);
  if (process.argv.length != 3) {
    console.log("Invalid arguments: expecting URL");
    return;
  }

  const baseURL = process.argv[2];
  try {
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
  } catch (error) {
    console.error(`Unable to crawl: ${error.message}`);
  }
  console.log(`Starting crawler at: ${baseURL}`);
}

main();
