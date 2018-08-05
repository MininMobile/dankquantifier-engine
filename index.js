if (process.argv[0].endsWith("node.exe")) {
	process.argv.shift();
	process.argv.shift();
} else {
	process.argv.shift();
}

console.log(process.argv);
