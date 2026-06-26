const fs = require("fs").promises;
const path = require("path");



async function pullRepo(input = []) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  const objects = Array.isArray(input)
    ? input
    : input && input.objects && Array.isArray(input.objects)
      ? input.objects
      : input && input.Key
        ? [input]
        : [];

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });

    if (objects.length === 0) {
      console.log("No commits to pull from S3.");
      return;
    }

    for (const object of objects) {
      const key = object.Key;
      const fileContent = object.Body;
      const targetPath = path.join(repoPath, key);

      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, fileContent);
    }

    console.log("All commits pulled from S3.");
  } catch (err) {
    console.error("Unable to pull:", err);
  }
}

module.exports = {
  pullRepo,
};