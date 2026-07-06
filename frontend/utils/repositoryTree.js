export function buildRepositoryTree(files) {
  const root = {
    name: "root",
    type: "folder",
    children: {},
  };

  for (const file of files) {
    const pathParts = file.file_path.split("/");
    let currentNode = root;

    pathParts.forEach((part, index) => {
      const isFile = index === pathParts.length - 1;

      if (isFile) {
        currentNode.children[part] = {
          name: part,
          type: "file",
          file,
        };

        return;
      }

      if (!currentNode.children[part]) {
        currentNode.children[part] = {
          name: part,
          type: "folder",
          children: {},
        };
      }

      currentNode = currentNode.children[part];
    });
  }

  return root;
}

export function getSortedChildren(node) {
  return Object.values(node.children || {}).sort(
    (first, second) => {
      if (first.type !== second.type) {
        return first.type === "folder" ? -1 : 1;
      }

      return first.name.localeCompare(second.name);
    }
  );
}