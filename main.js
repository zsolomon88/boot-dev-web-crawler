function main() {
  console.log(process.argv.length);
  if (process.argv.length != 3) {
    console.log("Invalid arguments: expecting URL");
    return;
  }

  const baseURL = process.argv[2];
  console.log(`Starting crawler at: ${baseURL}`);
}

main();
