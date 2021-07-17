const Benchmark = require("benchmark");

const lengthList = [100, 10000, 1000000, 100000000];

const run_RegExp_test_benchmark = (length) =>
  new Promise((resolve) => {
    const target = "a".repeat(length);
    new Benchmark.Suite()
      .add(`/begin/y for string of length ${length}`, function () {
        /begin/y.test(target);
      })
      .add(`/^begin/ for string of length ${length}`, function () {
        /^begin/.test(target);
      })
      .on("cycle", function (event) {
        console.log(String(event.target));
      })
      .on("complete", function () {
        console.log(`Fastest is ${this.filter("fastest").map("name")}\n`);
        resolve();
      })
      .run({ async: false });
  });

const run_RegExp_exec_benchmark = (length) =>
  new Promise((resolve) => {
    const target = "a".repeat(length);
    new Benchmark.Suite()
      .add(`/begin/y for string of length ${length}`, function () {
        /begin/y.exec(target);
      })
      .add(`/^begin/ for string of length ${length}`, function () {
        /^begin/.exec(target);
      })
      .on("cycle", function (event) {
        console.log(String(event.target));
      })
      .on("complete", function () {
        console.log(`Fastest is ${this.filter("fastest").map("name")}\n`);
        resolve();
      })
      .run({ async: false });
  });

const run_String_match_benchmark = (length) =>
  new Promise((resolve) => {
    const target = "a".repeat(length);
    new Benchmark.Suite()
      .add(`/begin/y for string of length ${length}`, function () {
        target.match(/begin/y);
      })
      .add(`/^begin/ for string of length ${length}`, function () {
        target.match(/^begin/);
      })
      .on("cycle", function (event) {
        console.log(String(event.target));
      })
      .on("complete", function () {
        console.log(`Fastest is ${this.filter("fastest").map("name")}\n`);
        resolve();
      })
      .run({ async: false });
  });

const benchmark = async () => {
  console.log("RegExp#test\n");
  for (const length of lengthList) {
    await run_RegExp_test_benchmark(length);
  }

  console.log(`${"=".repeat(100)}\n`);

  console.log("RegExp#exec\n");
  for (const length of lengthList) {
    await run_RegExp_exec_benchmark(length);
  }

  console.log(`${"=".repeat(100)}\n`);

  console.log("String#match\n");
  for (const length of lengthList) {
    await run_String_match_benchmark(length);
  }
};

benchmark().catch(console.error);
